from django.shortcuts import render
import json
import base64
import requests
from rest_framework.response import Response
from rest_framework.views import APIView

clientID='AUnpX4UponOKKMzKFa7NIBUnvM8SrgD-wcK3EmAqXuxFYuXB5IwGkQRmAioP_ZERBzadgRGX5pUh4DfY'
clientSecret='EFqLuZ08oY8mkWdOoCDdpQNRElc3bZtddbbPpxhUn1XToARL3ma2SN2GyBdn78ZxHHbk70ciUwT-WmJC'


class CreateOrderViewRemote(APIView):

    def get(self, request):
        # token = PaypalToken(clientID, clientSecret)
        token = 'A21AAJ7JmO2sgiA0AFtADFCTtzlUK-TFXObquJhgeGgxhyLtWLZj1MiKbPRctNGNrYDqzf2sfH4kQJrHkNfnF8s3wzPAWkvaQ'
        headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token,
        }
        json_data = {
             "intent": "CAPTURE",
             "application_context": {
                 "notify_url": "https://pesapedia.co.ke",
                 "return_url": "https://pesapedia.co.ke",#change to your doma$
               
          "cancel_url": "https://pesapedia.co.ke", #change to your domain
                 "brand_name": "PESAPEDIA SANDBOX",
                 "landing_page": "BILLING",
                 "shipping_preference": "NO_SHIPPING",
                 "user_action": "CONTINUE"
             },
             "purchase_units": [
                 {
                     "reference_id": "294375635",
                     "description": "African Art and Collectibles",

                     "custom_id": "CUST-AfricanFashion",
                     "soft_descriptor": "AfricanFashions",
                     "amount": {
                         "currency_code": "USD",
                         "value": "200" #amount,
                     },
                 }
             ]
         }
        response = requests.post('https://api-m.sandbox.paypal.com/v2/checkout/orders', headers=headers, json=json_data)
        order_id = response.json()['id']
        linkForPayment = response.json()['links'][1]['href']
        return Response(linkForPayment)


class CaptureOrderView(APIView):
    #capture order aims to check whether the user has authorized payments.
    def post(self, request):
        # token = request.data.get('token')#the access token we used above for creating an order, or call the function for generating the token
        token = 'A21AAJWAuppq0kEKaWvj81ljhu0mjehC9uef8GX0JCIp-bX9hb46WMKDv2GPWH1_0AOKtb4zShjTuMwrqoqO6wUcTXZvkPExA'
        # captureurl = request.data.get('url')#captureurl = 'https://api.sandbox.paypal.com/v2/checkout/orders/6KF61042TG097104C/capture'#see transaction status
        captureurl = "https://api-m.sandbox.paypal.com/v1/payments/payment"#see transaction status
        
        headers = {"Content-Type": "application/json", "Authorization": "Bearer "+token}
        response = requests.post(captureurl, headers=headers)
        # response = requests.get(url)
        response.raise_for_status()  # raises exception when not a 2xx response
        if response.status_code != 204:
            return response.json()
        return Response(response.json())


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
    print(token)
    return token.json()['access_token']

