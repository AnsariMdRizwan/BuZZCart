import React, { useEffect, useState } from 'react'

import img from "../../assets/account.jpg"
import Address from '@/components/shopping/address'
import { useDispatch, useSelector } from 'react-redux'
import UserCartItemsContent from '@/components/shopping/cards-items-content'
import { Button } from '@/components/ui/button'
import { createNewOrder } from '@/store/shop/order-slice'
import toast from 'react-hot-toast'
import { clearCartState } from '@/store/shop/cart-slice'


const Shoppingcheckout = () => {
  const { cartItems } = useSelector(state => state.shopCart)
  const { user } = useSelector(state => state.auth)
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null)
  const dispatch = useDispatch();
  const { approvalURL } = useSelector(state => state.shoppingOrder)
  const [isPaymentStart, setIsPaymentStart] = useState(false)


  const totalCartAmount = cartItems && cartItems.items && cartItems.items.length > 0
    ? cartItems.items.reduce(
      (sum, currentValue) =>
        sum + (currentValue?.salePrice > 0
          ? currentValue.salePrice
          : currentValue?.price) * currentValue?.quantity,
      0
    )
    : 0;


  const handleInitatePayment = () => {


    
    if (cartItems.length ===0){
      toast.error("your cart is Empty.")
      return
    }
    if(currentSelectedAddress===null){
      toast.error("Please Select Atleast one Address to proceed ")
      return 
    }
    
    setIsPaymentStart(true)

    const orderData = {
      userId: user?.id,
      cartId:cartItems?.id,
      addressInfo: {
        arrdessId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes
      },
      cartItems: cartItems.items.map(singleCartItem => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price: singleCartItem?.salePrice > 0 ? singleCartItem?.salePrice : singleCartItem?.price,
        quantity: singleCartItem?.quantity
      })),
      orderStatus: 'Pending',
      paymentMethod: 'paypal',
      paymentStatus: 'Pending',
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      PaymentId: '',
      PayerId: ''
    }
    dispatch(createNewOrder(orderData)).then((data) => {
      console.log(data, " this is the final data")
      if (data?.payload?.success) {
        setIsPaymentStart(true);
      } else {
        setIsPaymentStart(false)
      }
    })


    console.log(orderData);
    

    
   

  }


  
  if (approvalURL) {
    dispatch(clearCartState());
    window.location.href = approvalURL;
  }

  


  return (
    <div className='flex flex-col mt-14'>
      <div className='relative h-[300px] w-full overflow-hidden'>
        <img src={img} className='h-full w-full object-cover object-center' />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-1 
    md:grid-cols-2 mt-5 p-5 gap-5'>
        <Address
        selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className='flex flex-col gap-4'>
          {
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items.map((item) => <UserCartItemsContent cartItem={item} />) : null
          }
          <div className="mt-8 space-y4 bg-emerald-100 rounded-md">
            <div className="flex justify-between m-5">
              <span className="font-bold">Total</span>
              <span className="font-bold">₹ {totalCartAmount}</span>
            </div>
          </div>
          <div className='mt-4 w-full'>
            <Button
              onClick={handleInitatePayment}
              className=" bg-emerald-700">
                {
                  isPaymentStart ?  "Processing...":"Checkout With PayPal"
                }
             
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shoppingcheckout
