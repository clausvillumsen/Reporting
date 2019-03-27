import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components';
import Loading from './components/Loading';
import Home from './screens/Home';

/* const Home = React.lazy(() => import("./screens/Home")); */

const Master = styled.div`
  padding-bottom: 86px;
`;

const AppRouter = () => {
  return (
    <Router>
      <div id="app-router">
        <Master>
          <Loading />
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
