from django.urls import path, include, re_path
from payment import views

urlpatterns = [
    # path('paypal/create/order', views.CreateOrderViewRemote.as_view(), name='ordercreate'),
    # path('paypal/capture/order', views.CaptureOrderView.as_view(), name='captureorder'),
    path('paypal/create-payment/', views.PaymentView.as_view(), name='paypal_create_payment'),
    path('paypal/execute-payment/', views.ExecutePaymentView.as_view(), name='paypal_execute_payment'),
    path('cart/', views.AddToCartView.as_view()),
    path('cart/all/',views.CartView.as_view()),
    path('cart/q/',views.UpdateCartItemView.as_view()),
    # path('cart/amount/',views.CartItemCountView.as_view())
]