import request from 'superagent'
import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import Conditional from '../../Conditional'
import { formButtonVariants } from '../../../views/animationVariants'

const newsSchema = Yup.object({
  title: Yup.string().required('Required'),
  content: Yup.string().required('Required'),
})

export default function NewsForm(props) {
  const formik = useFormik({
    initialValues: {
      gardenId: 0,
      title: '',
      content: '',
    },
    onSubmit: (values) => {
      props.submitNews(values)
    },
    validationSchema: newsSchema,
  })

  const [gardens, setGardens] = useState([])
  useEffect(() => {
    request['get']('/api/v1/gardens')
      .set({ Accept: 'application/json' })
      .then((res) => {
        setGardens(res.body.gardens)
        return
      })
      .catch((error) => {
        const errMessage = error.response?.body?.error?.title
        throw new Error(errMessage || error.message)
      })
  }, [])

  return (
    <>
      <div>
        <h2 className="form-title">{props.action}</h2>
        <form className="form-content" onSubmit={formik.handleSubmit}>
          <div className="field">
            <label htmlFor="title" className="label">
              News Title
            </label>
            <Conditional
              condition={formik.errors.title && formik.touched.title}
            >
              <p className="inputError">{formik.errors.title}</p>
            </Conditional>
            <select
              name="gardenId"
              id="garden"
              onChange={formik.handleChange}
              value={formik.values.gardenId}
              className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
            >
              <option hidden>Select from this list</option>
              {gardens.map((garden) => {
                return (
                  <option key={garden.id} value={garden.id}>
                    {garden.name}
                  </option>
                )
              })}
            </select>
            <input
              className="form-box"
              id="title"
              name="title"
              type="text"
              placeholder="news title"
              onChange={formik.handleChange}
              value={formik.values.title}
            />

            <label htmlFor="content" className="label">
              Content
            </label>
            <Conditional
              condition={formik.errors.content && formik.touched.content}
            >
              <p className="inputError">{formik.errors.content}</p>
            </Conditional>

            <textarea
              className="content-box"
              id="content"
              name="content"
              placeholder="news content"
              onChange={formik.handleChange}
              value={formik.values.content}
            />
          </div>

          <div className="button-group">
            <button
              className="submit form-box"
              type="submit"
              variants={formButtonVariants}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
