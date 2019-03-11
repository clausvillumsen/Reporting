import React from 'react';
import {
  Switch,
  Route,
  BrowserRouter as Router
} from 'react-router-dom';
import { Spinner } from 'reactstrap';

const Home = React.lazy(() => import('./screens/Home'));


const AppRouter = () => {
  return (
    <Router>
      <div>
        <React.Suspense fallback={<div className='spinner-wrapper'><Spinner color="light" /></div>}>
          <Switch>
            <Route path='/' exact component={(props) => <Home {...props}/>} />
          </Switch>
        </React.Suspense>
      </div>
    </Router>
  )
}

export default AppRouter;
