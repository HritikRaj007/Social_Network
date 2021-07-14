import React, { Fragment,useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Routes from './components/routing/Routes';
import './App.css';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';


// Redux
import { Provider } from 'react-redux';
import store from './store';
import { CLEAR_PROFILE, LOGOUT } from './actions/types';


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
      <Switch>
            <Route exact path='/' component={Landing} />
            <Route component={Routes} />
      </Switch>
    </Fragment>
    </Router>
  </Provider>
  );
}

export default App;
