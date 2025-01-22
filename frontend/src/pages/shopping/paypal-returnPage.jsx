import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { clearCartState, deleteCartAfterPayment, deleteCartItems, fetchCartItems } from '@/store/shop/cart-slice';
import { capturePayment } from '@/store/shop/order-slice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom';

const PayPalReturn = () => {
  const dispatch  = useDispatch();
  const location = useLocation();
  const {user} = useSelector(state => state.auth)
  const params = new URLSearchParams(location.search)
  const paymentId = params.get('paymentId')
  const payerId = params.get('PayerID')
  // let {cartItems} = useSelector(state => state.shopCart)

  // let cartData = JSON.parse(localStorage.getItem('cartItems'));
  useEffect(() => {
    console.log("Payment ID:", paymentId);
    console.log("Payer ID:", payerId);

    if (paymentId && payerId) {
      const orderId = JSON.parse(sessionStorage.getItem('currentOrderId'))
      console.log("Order ID:", orderId);
      
      dispatch(capturePayment({paymentId, payerId, orderId})).then(data => {
        console.log("Capture Payment response:", data);
        
        if (data?.payload?.success) {
          
          // sessionStorage.removeItem('currentOrderId')
           console.log("Payment successful");
           sessionStorage.removeItem("currentOrderId"); 
           dispatch(deleteCartAfterPayment(user?.id));         
          window.location.href = '/shop/payment-success'
        } else {
          console.log("Payment not successful");
        }
      })
    }
  }, [paymentId, payerId, dispatch])
  
  return (
    <Card className="mt-16">
      <CardHeader className="">
        <CardTitle>Processing The Payment.... please wait </CardTitle>
      </CardHeader>
    </Card>
  )
}

export default PayPalReturn