import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Budget from './routes/Budget'
import './App.css'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/budgets/:id" component={Budget} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
