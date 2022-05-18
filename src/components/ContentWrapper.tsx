import React from 'react'
import Loader from './Loader'
import ErrorMessage from './ErrorMessage'
import EmptyData from './EmptyData'

const ContentWrapper = ({
  isLoading,
  errorMessage,
  isEmpty = false,
  contentGeneratorCallback,
}) => {
  if (isLoading) {
    return <Loader />
  } else if (errorMessage) {
    return <ErrorMessage message={errorMessage} />
  } else if (isEmpty) {
    return <EmptyData />
  } else {
    return <>{contentGeneratorCallback()}</>
  }
}

export default ContentWrapper
