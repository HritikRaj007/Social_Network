import React, { Fragment,useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import Login from './components/auth/Login';
import ProfileForm from './components/profile-forms/ProfileForm';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import './App.css';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';


// Redux
import { Provider } from 'react-redux';
import store from './store';
import Profiles from './components/profiles/Profiles';
import { CLEAR_PROFILE, LOGOUT } from './actions/types';
import Profile from './components/profile/Profile';


function App() {
  useEffect(() => {
    // check for token in LS
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token){ 
        store.dispatch({ type: LOGOUT });
        store.dispatch({ type: CLEAR_PROFILE });
      }  
    });
  }, []);
//  console.log("My name is doraemon")
  return (
    <Provider store={store}>
    <Router>
    <Fragment>
      <Navbar />
      <Route exact path='/' component={Landing} />
      <section className='container'>
        <Alert/>
        <Switch>
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/profiles' component={Profiles} />
          <Route exact path='/profile/:id' component={Profile} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
          <PrivateRoute
                exact
                path='/create-profile'
                component={ProfileForm}
          />
           <PrivateRoute
                exact
                path='/add-experience'
                component={AddExperience}
            />
            <PrivateRoute
                exact
                path='/add-education'
                component={AddEducation}
            />
          <PrivateRoute exact path="/edit-profile" component={ProfileForm} />
        </Switch>
      </section>
    </Fragment>
  </Router>
  </Provider>
  );
}

export default App;
