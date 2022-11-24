import React from 'react'
import Layout from '../../components/users/Layout/Layout'
import ErrorPageContent from '../../components/ErrorPage/ErrorPage'

const ErrorPage = () => {
  return (
    <Layout children={<ErrorPageContent/>} />
  )
}

export default ErrorPage