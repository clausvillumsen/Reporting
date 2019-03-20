import React from 'react';
import {
  Switch,
  Route,
  BrowserRouter as Router
} from 'react-router-dom';
import styled from 'styled-components';
import Loading from './components/Loading';
// import Home from './screens/Home';
import Header from './components/Header';

const Home = React.lazy(() => import('./screens/Home'));

const Master = styled.div`
  padding-top: 60px;
`;


const AppRouter = () => {
  return (
    <Router>
      <div id="app-router">
        <Master>
          <Loading />
          <Header />
          <React.Suspense fallback={<Loading />}>
            <Switch>
              <Route path='/' exact component={(props) => <Home {...props}/>} />
            </Switch>
          </React.Suspense>
        </Master>
      </div>
    </Router>
  )
}

export default AppRouter;
