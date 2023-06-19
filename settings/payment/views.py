from django.shortcuts import render
import json
import base64
import requests
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from furni.models import * 

from django.contrib.auth.hashers import make_password
import paypalrestsdk
from rest_framework import status

clientID='AUnpX4UponOKKMzKFa7NIBUnvM8SrgD-wcK3EmAqXuxFYuXB5IwGkQRmAioP_ZERBzadgRGX5pUh4DfY'
clientSecret='EFqLuZ08oY8mkWdOoCDdpQNRElc3bZtddbbPpxhUn1XToARL3ma2SN2GyBdn78ZxHHbk70ciUwT-WmJC'


def PaypalToken(client_ID, client_Secret):
    url = "https://api-m.sandbox.paypal.com/v1/oauth2/token"
    data = {
                "client_id":client_ID,
                "client_secret":client_Secret,
                "grant_type":"client_credentials"
            }
            
    headers = {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic {0}".format(base64.b64encode((client_ID + ":" + client_Secret).encode()).decode())
            }

    token = requests.post(url, data, headers=headers)
    return token.json()['access_token']


class PaymentView(APIView):

    def post(self, request, format=None):
        amount = request.data.get('amount')

        paypalrestsdk.configure({
            "mode": "sandbox", 
            "client_id": clientID,
            "client_secret": clientSecret
        })
        payment = paypalrestsdk.Payment({
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "transactions": [{
                "amount": {
                    "total": amount,
                    "currency": "USD"
                }
            }],
            "redirect_urls": {
                "return_url": "http://localhost:8000/pay/paypal/execute-payment/",
                "cancel_url": "http://localhost:8000/pay/paypal/cancel-payment/"
            }
        })

        if payment.create():
            for link in payment.links:
                if link.method == "REDIRECT":
                    approval_url = str(link.href)
                    return Response({'approval_url': approval_url})
        else:
            return Response(payment.error, status=status.HTTP_400_BAD_REQUEST)


class ExecutePaymentView(APIView):
    def get(self, request, format=None):
        payment_id = request.GET.get('paymentId')
        payer_id = request.GET.get('PayerID')

        paypalrestsdk.configure({
            "mode": "sandbox", 
            "client_id": clientID,
            "client_secret": clientSecret,
        })

        payment = paypalrestsdk.Payment.find(payment_id)

        if payment.execute({"payer_id": payer_id}):
            return Response({'status': 'success'})
        else:
            return Response(payment.error, status=status.HTTP_400_BAD_REQUEST)


class AddToCartView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        item_id = request.data.get('id')
        product = Products.objects.get(id=item_id)
        product_image = ProductImages.objects.filter(product=product)

        if not all([item_id]):
            return Response({'error': 'Invalid data'})
        
        cart = request.session.get('cart', {})
        cart_item = cart.get('',{})
        cart_item['key'] = item_id
        cart_item['name'] = product.producttitle
        cart_item['price'] = product.price
        cart_item['quantity'] = product.quantity
        cart_item['image'] = product_image[0].image.url 
        cart[item_id] = cart_item
        request.session['cart'] = cart
        return Response({'status': 'success'})

class CartView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        cart = request.session.get('cart', {})
        new_list = []
        for key in cart:
            new_list.append(cart[key])
        return Response(new_list)
        
class UpdateCartItemView(APIView):
    def put(self, request,):
        cart = request.session.get('cart', {})
        product_id = request.data.get('item_id')
        quantity = request.data.get('quantity')
        if quantity is not None:
            cart[str(product_id)]['quantity'] = int(quantity)
        request.session.modified = True
        request.session.save()
        return Response(cart)


# class CartItemCountView(APIView):
#     def get(self, request):
#         cart = request.session.get('cart', {})
#         item_count = sum(item['price'] for item in cart.values())
#         return Response({'item_count': item_count})