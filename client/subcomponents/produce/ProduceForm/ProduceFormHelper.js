import requestor from '../../../consume'
import { dispatch, getState } from '../../../store'
import { setWaiting, clearWaiting } from '../../../slices/waiting'
import { showError } from '../../../slices/error'

export function getProduceTypes(consume = requestor) {
  dispatch(setWaiting())

  const storeState = getState()
  const { token } = storeState.user

  return consume('/producetypes', token, 'get')
    .then((res) => {
      dispatch(clearWaiting())
      const { produceTypes } = res.body
      return produceTypes
    })
    .catch((error) => {
      dispatch(showError(error.message))
    })
}