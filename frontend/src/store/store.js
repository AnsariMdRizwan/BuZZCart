import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./auth-slice"
import AdmminProductsSlice from './admin/products-slice/index.js'
import shopProductsSlice from './shop/product-slice'
import shopCartSlice from './shop/cart-slice'
import shopAddressSlice from './shop/address-slice'
import shopOrderSlice from './shop/order-slice'
import adminOrderSlice from './admin/order-slice'
import shopSearchSlice from "./shop/search-slice"
import shopReviewSlice from "./shop/review-slice"
import commonFeatureSlice from "./common-slice"
import profileSlice from "./profile-slice"



const store = configureStore({
    reducer: {
        auth: authReducer,
        adminproducts: AdmminProductsSlice,
        shopProducts: shopProductsSlice,
        shopCart: shopCartSlice,
        shopingAddress: shopAddressSlice,
        shoppingOrder: shopOrderSlice,
        adminOrder: adminOrderSlice,
        shopSearch:shopSearchSlice,
        shopReview:shopReviewSlice,
        commonFeature:commonFeatureSlice,
        profilePhoto:profileSlice
    },
})



export default store;