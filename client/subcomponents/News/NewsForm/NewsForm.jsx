import React from 'react'
import { Field, Formik, Form } from 'formik'
import * as Yup from 'yup'
import { motion } from 'framer-motion'
import { formButtonVariants } from '../../../views/animationVariants'

const newsSchema = Yup.object({
  title: Yup.string().required('Required'),
  content: Yup.string().required('Required'),
  gardenId: Yup.number().required('Required'),
})

export default function NewsForm({
  submitNews,
  gardenList,
  initialFormData,
  action,
}) {
  return (
    <>
      <div>
        <h2 className="form-title">{action}</h2>
        <Formik
          initialValues={initialFormData}
          validationSchema={newsSchema}
          onSubmit={(values) => {
            submitNews(values)
          }}
        >
          {({ errors, touched }) => (
            <Form className="form-content">
              <div className="field">
                <label htmlFor="title" className="label">
                  News Title
                </label>

                <Field
                  className="form-box"
                  id="title"
                  name="title"
                  type="text"
                  placeholder="news title"
                />
                {errors.name && touched.name ? <div>{errors.name}</div> : null}

                <label htmlFor="select garden" className="label">
                  Select Garden
                </label>
                {errors.gardenId && touched.gardenId ? (
                  <div>{errors.gardenId}</div>
                ) : null}
                <Field className="gardenId" name="gardenId" id="gardenId">
                  {({ field }) => (
                    <select {...field}>
                      <option value=""></option>
                      {gardenList.map(({ id, name }) => (
                        <option key={id} value={id}>
                          {name}
                        </option>
                      ))}
                    </select>
                  )}
                </Field>
                <label htmlFor="content" className="label">
                  Content
                </label>

                <Field
                  className="content-box"
                  id="content"
                  name="content"
                  type="text"
                  placeholder="news content"
                />
                {errors.content && touched.content ? (
                  <div>{errors.content}</div>
                ) : null}
              </div>
              <div className="button-group">
                <motion.button
                  className="submit form-box"
                  type="submit"
                  variants={formButtonVariants}
                  whileHover="hover"
                >
                  Submit
                </motion.button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  )
}
