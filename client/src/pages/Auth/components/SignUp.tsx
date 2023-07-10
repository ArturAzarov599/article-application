import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

import Alert from 'src/components/Alert'
import Loader from 'src/components/Loader'

import { useSignUpMutation } from 'src/store/auth/auth.api'
import { getAuthErrorMessage } from 'src/store/auth/selectors'
import { useAuthActions } from 'src/store/auth/hooks/useAuthActions'

import { IExtendedAuth } from 'src/interfaces/extended-auth'

import { AUTH_SIGN_IN_ROUTE } from 'src/constants/routes'

const initialValues: IExtendedAuth = {
  email: '',
  password: '',
  username: '',
}

const validationSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
  username: Yup.string().min(5).required(),
})

const SignUp = () => {
  const navigate = useNavigate()
  const { resetErrorMessage } = useAuthActions()
  const [signUp, { isLoading }] = useSignUpMutation()
  const authErrorMessage = useSelector(getAuthErrorMessage)

  const onSubmit = async (values: IExtendedAuth): Promise<void> => {
    try {
      await signUp(values).unwrap()
      navigate(AUTH_SIGN_IN_ROUTE)
    } catch (error) {
      console.log(error)
    }
  }

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <Box component='form' onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Username'
                name='username'
                value={values.username}
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username && errors.username}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Email Address'
                name='email'
                autoComplete='email'
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name='password'
                label='Password'
                type='password'
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
            </Grid>
          </Grid>
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link href={AUTH_SIGN_IN_ROUTE} variant='body2'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Loader open={isLoading} />
      <Alert
        message={authErrorMessage}
        onCloseHandler={() => {
          resetErrorMessage()
        }}
        open={!!authErrorMessage}
        type='error'
      />
    </Container>
  )
}

export default SignUp
