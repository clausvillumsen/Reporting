import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components';
import Loading from './components/Loading';
import Home from './screens/Home';
import Header from './components/Header';

/* const Home = React.lazy(() => import("./screens/Home")); */

const Master = styled.div`
  padding-top: 94px;
  padding-bottom: 86px;
`;

const AppRouter = () => {
  return (
    <Router>
      <div id="app-router">
        <Master>
          <Loading />
          <Header />
          <Switch>
            <Route
              path="/reports"
              exact
              component={props => <Home {...props} />}
            />
          </Switch>
        </Master>
      </div>
    </Router>
  );
};

export default AppRouter;
