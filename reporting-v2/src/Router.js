import React from 'react';
import {
  Switch,
  Route,
  BrowserRouter as Router
} from 'react-router-dom';
import Loading from './components/Loading';
import Home from './screens/Home';

// const Home = React.lazy(() => import('./screens/Home'));


const AppRouter = () => {
  return (
    <Router>
      <div id="app-router">
        <Loading />
        <Switch>
          <Route path='/' exact component={(props) => <Home {...props}/>} />
        </Switch>
      </div>
    </Router>
  )
}

export default AppRouter;
