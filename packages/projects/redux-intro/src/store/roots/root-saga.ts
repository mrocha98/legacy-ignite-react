import { all } from 'redux-saga/effects'

import { cartSagas } from '../modules/cart/sagas'

export function* rootSaga() {
  const sagas: unknown = yield all([cartSagas])
  return sagas
}
