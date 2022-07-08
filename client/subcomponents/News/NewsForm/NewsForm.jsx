import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { motion } from 'framer-motion'
import { getAllGardens } from '../../../views/user/Gardens/Index/IndexHelper'
import Conditional from '../../Conditional'
import { formButtonVariants } from '../../../views/animationVariants'
import { useDispatch } from 'react-redux'
import { showError } from '../../../slices/error'

const newsSchema = Yup.object({
  title: Yup.string().required('Required'),
  content: Yup.string().required('Required'),
  gardenId: Yup.number().required('Required'),
})

// add selected garden to export function
export default function NewsForm(props) {
  const news = props.formData
  const { gardenId, title, content } = news
  const [gardenList, setGardenList] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    getAllGardens()
      .then((gardens) => {
        setGardenList(gardens)
        return null
      })
      .catch((err) => {
        dispatch(showError(err.message))
        return false
      })
  }, [])

  const formik = useFormik({
    initialValues: {
      title,
      content,
      gardenId,
    },
    onSubmit: (values) => {
      console.log(values)
      console.log('form submitted')
      props.submitNews(values)
    },
    validationSchema: newsSchema,
  })

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
            <input
              className="form-box"
              id="title"
              name="title"
              type="text"
              placeholder="news title"
              onChange={formik.handleChange}
              value={formik.values.title}
            />
            {/* 
            // add drop down with possible gardens, send info to addNewsHelper
            // get gardens from gardenList, admin/gardens/index/index.js */}

            <label htmlFor="select garden" className="label">
              Select Garden
            </label>
            <Conditional
              condition={
                formik.errors.selectGarden && formik.touched.selectGarden
              }
            >
              <p className="inputError">{formik.errors.selectGarden}</p>
            </Conditional>
            <select
              name="gardenId"
              id="gardenId"
              onChange={formik.handleChange}
              value={formik.values.gardenId}
            >
              {/* //provide option for everything in gardenList */}
              <option hidden>Select from this list</option>
              {gardenList.map((garden) => {
                return (
                  <option key={garden.id} value={garden.id}>
                    {garden.name}
                  </option>
                )
              })}
            </select>

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
            <motion.button
              className="submit form-box"
              // navigate
              type="submit"
              variants={formButtonVariants}
              whileHover="hover"
            >
              Submit
            </motion.button>
          </div>
        </form>
      </div>
    </>
  )
}
