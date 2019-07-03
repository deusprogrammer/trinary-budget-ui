import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Budget from './routes/Budget'
import NewBudget from './routes/NewBudget'
import AddBills from './routes/AddBills'
import AddPaydays from './routes/AddPaydays'

import './App.css'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/create/budgets" exact component={NewBudget} />
          <Route path="/create/budgets/:id/bills" exact component={AddBills} />
          <Route path="/create/budgets/:id/paydays" exact component={AddPaydays} />
          <Route path="/budgets/:id" component={Budget} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
