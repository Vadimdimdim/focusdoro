import React, {Suspense} from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import Auth from "../hoc/auth";
import HomePage from "./pages/HomePage/HomePage.js";
import LoginPage from "./pages/LoginPage/LoginPage.js";
import RegisterPage from "./pages/RegisterPage/RegisterPage.js";
import NavBar from "./pages/NavBar/NavBar";
import Footer from "./pages/Footer/Footer"

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(HomePage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;