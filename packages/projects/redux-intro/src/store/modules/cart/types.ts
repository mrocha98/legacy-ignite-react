export enum ActionTypes {
  addProductToCartRequest = 'ADD_PRODUCT_TO_CART_REQUEST',
  addProductToCartSuccess = 'ADD_PRODUCT_TO_CART_SUCCESS',
  addProductToCartFailure = 'ADD_PRODUCT_TO_CART_FAILURE',
}

export interface Product {
  id: number
  title: string
  price: number
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface CartState {
  items: CartItem[]
  failedStockCheck: number[]
}
