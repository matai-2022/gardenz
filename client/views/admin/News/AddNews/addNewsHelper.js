import { dispatch, getState } from '../../../../store'
import { setWaiting, clearWaiting } from '../../../../slices/waiting'
import { showError } from '../../../../slices/error'
import requestor from '../../../../consume'

export function addNews(news, navigateTo, consume = requestor) {
  // const navigateTo = useNavigate()
  const storeState = getState()
  // change this so that garnden id comes from drop down in newsfrom
  const { token } = storeState.user
  const newNews = {
    ...news,
    // ...NewsForm,
  }

  dispatch(setWaiting())
  console.log(news)
  return consume(`/news/${news.gardenId}`, token, 'post', newNews)
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
