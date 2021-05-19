import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { PrivateRoute } from './components/PrivateRoute';

import { AuthContext } from './contexts/AuthContext';

import { Home } from './views/Home';
import { Login } from './views/Login';

function App() {

  const { authenticated } = useContext(AuthContext);

  return (
    <AuthContext.Provider value={{ authenticated }}>
      <BrowserRouter>
        <Switch>
          <PrivateRoute path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
        </Switch>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
