import { clearCartState } from '@/store/shop/cart-slice';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';


const PaymentSuccess = () => {
 const dispatch = useDispatch();

  dispatch(clearCartState());
  
  return (
    <div className='mt-20'>
    Payement completed SuccessFully
    </div>
  )
}

export default PaymentSuccess
