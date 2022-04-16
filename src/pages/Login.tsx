import React, { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, NavLink } from 'react-router-dom'
import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  Box,
} from '@material-ui/core'
import { RootState } from '../store/configureStore'
import { loginQuery } from '../services'
import useInput from '../hooks/useInput'
import { login } from '../store/slices/accountSlice'

const Login: FC = () => {
  const dispatch = useDispatch()
  const [errorMessage, setErrorMessage] = useState(null)
  const [isLoading, setLoading] = useState(false)

  const email = useInput('')
  const password = useInput('')

  const token = useSelector((state: RootState) => state.account.token)

  if (token) {
    return <Navigate to={'/'} />
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    await dispatch(
      login(
        () => loginQuery({ email: email.value, password: password.value }),
        setErrorMessage
      )
    )
    setLoading(false)
  }

  return (
    <Container component="main" maxWidth="xs">
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          type="email"
          id="email"
          value={email.value}
          onChange={email.onChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          autoComplete="current-password"
          type="password"
          id="password"
          value={password.value}
          onChange={password.onChange}
        />
        {errorMessage && (
          <Grid container alignItems="center" justify="center">
            <Typography variant="body1" component="p" color="error">
              {errorMessage}
            </Typography>
          </Grid>
        )}
        <Button
          fullWidth
          variant="contained"
          color="primary"
          disabled={isLoading}
          type="submit"
        >
          Войти
        </Button>
      </form>
      <Box mt={1}>
        <Grid container alignItems="center" justify="center">
          <NavLink to={'/registration'}>
            <Typography variant="caption" component="p" color="primary">
              Еще нет аккаунта? Зарегистрируйся!
            </Typography>
          </NavLink>
        </Grid>
      </Box>
    </Container>
  )
}

export default Login
