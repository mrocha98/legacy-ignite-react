import { all, call, put, select, takeLatest } from 'redux-saga/effects'
import type { AxiosResponse } from 'axios'
import {
  addProductToCartFailure,
  addProductToCartRequest,
  addProductToCartSuccess,
} from './actions'
import type { State } from '../../index'
import { api } from '../../../services/api'
import { ActionTypes } from './types'

type CheckProductStockRequest = ReturnType<typeof addProductToCartRequest>

type StockResponse = {
  id: number
  quantity: number
}

function* checkProductStock({ payload }: CheckProductStockRequest) {
  const { product } = payload

  const currentQuantity: number = yield select(
    (state: State) =>
      state.cart.items.find((item) => item.product.id === product.id)
        ?.quantity ?? 0,
  )

  const { data: availableStockResponse }: AxiosResponse<StockResponse> =
    yield call(api.get, `stock/${product.id}`)

  if (availableStockResponse.quantity > currentQuantity) {
    yield put(addProductToCartSuccess(product))
  } else {
    yield put(addProductToCartFailure(product.id))
  }
}

export const cartSagas = all([
  takeLatest(ActionTypes.addProductToCartRequest, checkProductStock),
])
