import React from 'react'
import Loader from './Loader'
import ErrorMessage from './ErrorMessage'
import EmptyData from './EmptyData'

interface Props {
  isLoading: boolean
  errorMessage: string
  isEmpty?: boolean
  contentGeneratorCallback: () => JSX.Element | Array<JSX.Element>
}

const ContentWrapper = ({
  isLoading,
  errorMessage,
  isEmpty = false,
  contentGeneratorCallback,
}: Props) => {
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
