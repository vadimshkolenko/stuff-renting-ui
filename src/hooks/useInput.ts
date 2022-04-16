import { useState, ChangeEvent } from 'react'

export interface ReturnData {
  value: string
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void
  clear: () => void
}

const useInput = (initialValue: string): ReturnData => {
  const [value, setValue] = useState(initialValue)

  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setValue(e.target.value)
  }

  const clear = () => setValue('')

  return {
    value,
    onChange,
    clear,
  }
}

export default useInput
