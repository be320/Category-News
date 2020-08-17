import React from  'react';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import Board from './screens/Board';
import NewsDetails from './screens/NewsDetails';
import "./App.css"

const App = () => {

  return(
    <Router>
        <Route exact path='/' component={Board} />
        <Route exact path='/category/:category/news/:newsID' component={NewsDetails} />
    </Router>
  )

}

export default App;