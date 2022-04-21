import { combineReducers } from 'redux'
import { cartReducer } from '../modules/cart/reducer'

export const rootReducer = combineReducers({
  cart: cartReducer,
})
