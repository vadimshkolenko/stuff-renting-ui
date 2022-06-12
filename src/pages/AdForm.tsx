import React, { FC, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useInput from '../hooks/useInput'
import { createAddQuery, updateAddQuery } from '../services'
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
import { NavLink, useParams, useLocation } from 'react-router-dom'
import RequestAnswerInfo from '../components/RequestAnswerInfo'
import { clearData } from '../store/slices/adDetailSlice'

const AdForm: FC = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const { adId } = useParams<{ adId: string }>()
  const isEditMode = Boolean(adId)
  const { data: adData } = useSelector((state: RootState) => state.adDetail)
  const [errorMessage, setErrorMessage] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [isSuccess, setSuccess] = useState(false)

  const [images, setImages] = useState(adData.Images ?? [])
  const maxNumber = 69

  const name = useInput(adData.name ?? '')
  const price = useInput(adData.price ?? '')
  const deposit = useInput(adData.deposit ?? '')
  const description = useInput(adData.description ?? '')
  const assessedValue = useInput(adData.assessedValue ?? '')

  const UserId = useSelector((state: RootState) => state.account.UserId)

  // TODO disable reload if edit mode
  // TODO reload if we leave page
  // TODO don't clear data if we change from edit to create mode
  useEffect((): (() => void) => {
    return () => dispatch(clearData())
  }, [clearData, dispatch, location])

  const createAddCallback = async (data) => {
    setLoading(true)
    try {
      await (isEditMode ? updateAddQuery : createAddQuery)(data)
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

  const generateFormData = () => {
    const options = {
      noFilesWithArrayNotation: true,
    }
    return serialize(
      {
        name: name.value,
        price: price.value,
        deposit: deposit.value,
        assessedValue: assessedValue.value,
        description: description.value,
        UserId,
        adId,
      },
      options
    )
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = generateFormData()
    console.log('images', images)
    for (const image of images) {
      formData.append('images', image.file)
    }
    createAddCallback(formData)
  }

  // TODO add text for update
  if (isSuccess) {
    return (
      <RequestAnswerInfo
        content={
          <>
            Ваше объявление успешно создано!
            <br />
            Просмотреть все созданные объявления можно в разделе{' '}
            <NavLink to={'/myAds'}>Мои объявления</NavLink>.
          </>
        }
      />
    )
  }

  const onChange = (imageList) => {
    setImages(imageList)
  }

  return (
    <Container component="main" maxWidth="md">
      <Box mt={3} mb={3}>
        <Typography variant="h2" component="h1" color="primary">
          {isEditMode ? 'Редактирование объявления' : 'Создать объявление'}
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
          label="Оценочная стоимость"
          name="assessedValue"
          autoComplete="assessedValue"
          autoFocus
          type="text"
          id="assessedValue"
          value={assessedValue.value}
          onChange={assessedValue.onChange}
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
            // isDragging,
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
              {/*TODO change for editing*/}
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
            {isEditMode ? 'Обновить' : 'Опубликовать'}
          </Button>
        </Box>
      </form>
    </Container>
  )
}

export default AdForm
