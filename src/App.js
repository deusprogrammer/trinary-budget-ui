import React from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import Budget from './routes/Budget'
import Budgets from './routes/Budgets'
import NewBudget from './routes/NewBudget'
import AddBills from './routes/AddBills'
import AddPaydays from './routes/AddPaydays'
import CreateUser from './routes/CreateUser'
import Login from './routes/Login'

import './App.css'

function App() {
  return (
    <div className="App">
        <Router>
            <nav>
                <Link to="/create/users">Create User</Link>|
                <Link to="/budgets">View Budgets</Link>|
                <Link to="/create/budgets">Create Budget</Link>
            </nav>
            <Switch>
                <Route path="/create/budgets" exact component={NewBudget} />
                <Route path="/create/users" exact component={CreateUser} />
                <Route path="/create/budgets/:id/bills" exact component={AddBills} />
                <Route path="/create/budgets/:id/paydays" exact component={AddPaydays} />
                <Route path="/budgets" exact component={Budgets} />
                <Route path="/budgets/:id" exact component={Budget} />
                <Route path="/login" exact component={Login} />
            </Switch>
        </Router>
    </div>
  );
}

export default App;
