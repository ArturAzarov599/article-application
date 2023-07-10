import * as Yup from "yup";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import Alert from "src/components/Alert";
import Loader from "src/components/Loader";

import { useSignInMutation } from "src/store/auth/auth.api";
import { getAuthErrorMessage } from "src/store/auth/selectors";
import { useAuthActions } from "src/store/auth/hooks/useAuthActions";

import { ARTICLES_ROUTE, AUTH_SIGN_UP_ROUTE } from "src/constants/routes";

interface IInitialValues {
  email: string;
  password: string;
}

const initialValues: IInitialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email().required(),
});

const SignIn = () => {
  const navigate = useNavigate();
  const [signIn, { isLoading }] = useSignInMutation();
  const errorMessage = useSelector(getAuthErrorMessage);
  const { resetErrorMessage } = useAuthActions();

  const onSubmit = async (values: IInitialValues): Promise<void> => {
    try {
      await signIn(values).unwrap();
      navigate(ARTICLES_ROUTE, {
        replace: true,
      });
    } catch (error) {}
  };

  const { errors, values, handleSubmit, handleChange, handleBlur, touched } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit,
    });

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="email"
            name="email"
            label="Email Address"
            autoFocus
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />
          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Box textAlign="end">
            <Link href={AUTH_SIGN_UP_ROUTE} variant="body2">
              Don't have an account? Sign Up
            </Link>
          </Box>
        </Box>
      </Box>

      <Loader open={isLoading} />
      <Alert
        message={errorMessage}
        open={!!errorMessage}
        type="error"
        onCloseHandler={() => {
          resetErrorMessage();
        }}
      />
    </Container>
  );
};

export default SignIn;
