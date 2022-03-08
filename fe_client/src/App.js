import './App.css';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import LoginModule from './modules/LoginSignup/Login';
import Dashboard from './modules/Dashboard/Dashboard';
import PrivateRoute from './modules/PrivateRoute';
import PageNotFound from './modules/PageNotFound/PageNotFound';
import { validateUser, clearSession } from './api/auth';
import { useEffect, useState } from 'react';
import AppBar from './components/AppBar';
import SignupModule from './modules/LoginSignup/Signup';
import './styles/AppBar.scss';

function App() {
 const [auth, setAuth] = useState(false);

  useEffect(() => {
    validateUser().then(
      (res) => {
        setAuth(res);
      }
    )
  }, []);

  const logoutButtonClick = () => {
    clearSession();
    setAuth(false);
  }

  return (
    <>
      <Router>
        <AppBar isVisible={auth} logout={logoutButtonClick} />
        <Routes>
          <Route path={'/'} exact element={<Navigate to={'/signin'} />}/>
          <Route path={'/signin'} exact element={<LoginModule loggedIn={setAuth}/>}/>
          <Route path={'/signup'} exact element={<SignupModule />}/>
          <Route path={'/dashboard'} element={<PrivateRoute />}>
            <Route path="/dashboard" exact element={<Dashboard />}/>
          </Route>
          <Route path={'/*'} element={<PageNotFound />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;