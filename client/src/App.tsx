import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Grid from '@mui/material/Grid'

import Menu from 'src/components/Menu'
import Articles from 'src/pages/Articles/Articles'

import { store } from 'src/store/store'
import { WebsocketProvider, socket } from 'src/context/WebsocketContext'

import SignIn from 'src/pages/Auth/components/SignIn'
import SignUp from 'src/pages/Auth/components/SignUp'

import { ARTICLES_ROUTE, AUTH_SIGN_IN_ROUTE, AUTH_SIGN_UP_ROUTE } from 'src/constants/routes'

const App = () => (
  <WebsocketProvider value={socket}>
    <Provider store={store}>
      <BrowserRouter>
        <Grid container direction='column' style={{ height: '100%' }}>
          <Grid item>
            <Menu />
          </Grid>

          <Grid xs item>
            <Routes>
              <Route path='/' element={<Navigate to={ARTICLES_ROUTE} />} />
              <Route path={AUTH_SIGN_IN_ROUTE} element={<SignIn />} />
              <Route path={AUTH_SIGN_UP_ROUTE} element={<SignUp />} />
              <Route path={ARTICLES_ROUTE} element={<Articles />} />
            </Routes>
          </Grid>
        </Grid>
      </BrowserRouter>
    </Provider>
  </WebsocketProvider>
)

export default App
