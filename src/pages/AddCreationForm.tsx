import React, { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import useInput from '../hooks/useInput'
import { createAddQuery } from '../services'
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core'
import { RootState } from '../store/configureStore'
import ImageUploading from 'react-images-uploading'
import { serialize } from 'object-to-formdata'

const AddCreationForm: FC = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [isSuccess, setSuccess] = useState(false)

  const [images, setImages] = useState([])
  const maxNumber = 69

  const name = useInput('')
  const price = useInput('')
  const deposit = useInput('')
  const description = useInput('')

  const userId = useSelector((state: RootState) => state.account.userId)

  const createAddCallback = async (data) => {
    setLoading(true)
    console.log('DATA', data)
    try {
      await createAddQuery(data)
      setSuccess(true)
    } catch (err) {
      const error =
        err?.response?.data?.errors?.email ||
        err?.response?.data?.errors?.username ||
        'Ошибка!'
      setErrorMessage(error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const options = {
      noFilesWithArrayNotation: true,
    }
    const formData = serialize(
      {
        name: name.value,
        price: price.value,
        deposit: deposit.value,
        description: description.value,
        userId,
      },
      options
    )
    for (const image of images) {
      formData.append('images', image.file)
    }
    createAddCallback(formData)
  }

  // if (isSuccess) {
  //   return (
  //     <Grid container alignItems="center" justifyContent="center">
  //       <Typography variant="h4" component="h1" color="primary">
  //         Поздравляем вы зарегистрированы!
  //       </Typography>
  //       <Box mt={1}>
  //         <Typography variant="body1" component="p" color="primary">
  //           На указанную вами почту отправлено письмо. Для завершения
  //           регистрации, пожалуйста, перейдите по ссылке из этого письма.
  //         </Typography>
  //       </Box>
  //     </Grid>
  //   )
  // }

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    // console.log(imageList, addUpdateIndex)
    setImages(imageList)
  }

  return (
    <Container component="main" maxWidth="md">
      <Box mt={3} mb={3}>
        <Typography variant="h2" component="h1" color="primary">
          Создать объявление
        </Typography>
      </Box>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Название"
          name="name"
          autoComplete="name"
          autoFocus
          type="text"
          id="name"
          value={name.value}
          onChange={name.onChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Цена"
          name="price"
          autoComplete="price"
          autoFocus
          type="text"
          id="price"
          value={price.value}
          onChange={price.onChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Залог"
          name="deposit"
          autoComplete="deposit"
          autoFocus
          type="text"
          id="deposit"
          value={deposit.value}
          onChange={deposit.onChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Описание"
          name="description"
          autoComplete="description"
          autoFocus
          type="text"
          id="description"
          multiline
          rows={5}
          value={description.value}
          onChange={description.onChange}
        />
        <ImageUploading
          multiple
          value={images}
          onChange={onChange}
          maxNumber={maxNumber}
          dataURLKey="data_url"
        >
          {({
            imageList,
            onImageUpload,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            // write your building UI
            <div className="upload__image-wrapper">
              <Button
                variant="outlined"
                fullWidth
                // style={isDragging ? { color: 'primary.main' } : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
                Нажмите или перетащите изображение сюда
              </Button>
              {imageList.map((image, index) => (
                <div key={index} className="image-item">
                  <img src={image['data_url']} alt="" width="100" />
                  <div className="image-item__btn-wrapper">
                    <button onClick={() => onImageRemove(index)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ImageUploading>
        {errorMessage && (
          <Grid container alignItems="center" justifyContent="center">
            <Typography variant="body1" component="p" color="error">
              {errorMessage}
            </Typography>
          </Grid>
        )}
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            disabled={isLoading}
            type="submit"
          >
            Опубликовать
          </Button>
        </Box>
      </form>
    </Container>
  )
}

export default AddCreationForm
