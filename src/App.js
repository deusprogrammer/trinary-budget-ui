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
        <Router history="hash">
            <nav>
                <Link to={`${process.env.PUBLIC_URL}/create/users`}>Create User</Link>|
                <Link to={`${process.env.PUBLIC_URL}/budgets`}>View Budgets</Link>|
                <Link to={`${process.env.PUBLIC_URL}/create/budgets`}>Create Budget</Link>
                <Link to={`${process.env.PUBLIC_URL}/login`}>Login</Link>
            </nav>
            <Switch>
                <Route path={`${process.env.PUBLIC_URL}/create/budgets`} exact component={NewBudget} />
                <Route path={`${process.env.PUBLIC_URL}/create/users`} exact component={CreateUser} />
                <Route path={`${process.env.PUBLIC_URL}/create/budgets/:id/bills`} exact component={AddBills} />
                <Route path={`${process.env.PUBLIC_URL}/create/budgets/:id/paydays`} exact component={AddPaydays} />
                <Route path={`${process.env.PUBLIC_URL}/budgets`} exact component={Budgets} />
                <Route path={`${process.env.PUBLIC_URL}/budgets/:id`} exact component={Budget} />
                <Route path={`${process.env.PUBLIC_URL}/login`} exact component={Login} />
            </Switch>
        </Router>
    </div>
  );
}

export default App;
