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
      <div className="flex flex-col items-center w-full ">
        <h2 className="font-bold">{action}</h2>
        <Formik
          initialValues={initialFormData}
          validationSchema={newsSchema}
          onSubmit={(values) => {
            submitNews(values)
          }}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col form-content w-6/12 items-center">
              <div className="flex flex-col w-full">
                <label htmlFor="title" className="label">
                  News Title
                </label>

                <Field
                  className="border-2 border-lightGreen rounded-sm"
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Enter News Title"
                />
                {errors.name && touched.name ? <div>{errors.name}</div> : null}

                <label htmlFor="select garden" className="label">
                  Gardens
                </label>
                {errors.gardenId && touched.gardenId ? (
                  <div>{errors.gardenId}</div>
                ) : null}
                <Field
                  className="border-2 border-lightGreen bg-white rounded-sm w-5/6"
                  //specfic to dropdown formatting?
                  name="gardenId"
                  id="gardenId"
                >
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
                <label htmlFor="content" className="">
                  Description
                </label>

                <Field
                  className="border-2 border-lightGreen rounded-sm pb-24 mb-2"
                  id="content"
                  name="content"
                  type="text"
                  placeholder="Enter Description"
                />
                {errors.content && touched.content ? (
                  <div>{errors.content}</div>
                ) : null}
              </div>
              <div className="button-group ">
                <motion.button
                  className="text-white bg-orange rounded-sm px-5 "
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
      {/* </div> */}
    </>
  )
}
