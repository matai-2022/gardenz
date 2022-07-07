import { dispatch, getState } from '../../../store'
import { setWaiting, clearWaiting } from '../../../slices/waiting'
import { showError } from '../../../slices/error'
import requestor from '../../../consume'

export function addNews(gardenId, news, navigateTo, consume = requestor) {
  const storeState = getState()
  const { token } = storeState.user
  const newNews = {
    gardenId,
    ...news,
  }

  dispatch(setWaiting())

  return consume(`/news/${gardenId}`, token, 'post', newNews)
    .then(() => {
      navigateTo(`/gardens/${gardenId}/news`)
      return null
    })
    .catch((err) => {
      dispatch(showError(err.message))
    })
    .finally(() => {
      dispatch(clearWaiting())
    })
}
