import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Grid from "@mui/material/Grid";

import Auth from "src/pages/Auth/Auth";
import Menu from "src/components/Menu";
import Articles from "src/pages/Articles/Articles";

import { store } from "src/store/store";

import { ARTICLES_ROUTE, AUTH_ROUTE } from "src/constants/routes";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Grid container direction="column" style={{ height: "100%" }}>
          <Grid item>
            <Menu />
          </Grid>

          <Grid xs item>
            <Routes>
              <Route path="/" element={<Navigate to={ARTICLES_ROUTE} />} />
              <Route path={AUTH_ROUTE} element={<Auth />} />
              <Route path={ARTICLES_ROUTE} element={<Articles />} />
            </Routes>
          </Grid>
        </Grid>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
