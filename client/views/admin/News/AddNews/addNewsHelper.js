import { dispatch, getState } from '../../../../store'
import { setWaiting, clearWaiting } from '../../../../slices/waiting'
import { showError } from '../../../../slices/error'
import requestor from '../../../../consume'

export function addNews(news, navigateTo, consume = requestor) {
  const storeState = getState()
  const { token } = storeState.user

  dispatch(setWaiting())

  return consume(`/news/${news.gardenId}`, token, 'post', news)
    .then(() => {
      navigateTo(`/gardens/${news.gardenId}/news`)
      return null
    })
    .catch((err) => {
      dispatch(showError(err.message))
    })
    .finally(() => {
      dispatch(clearWaiting())
    })
}
