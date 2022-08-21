import React, {useState, useEffect} from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import axios from 'axios';
import Budget from './routes/Budget'
import Budgets from './routes/Budgets'
import NewBudget from './routes/NewBudget'
import AddBills from './routes/AddBills'
import AddPaydays from './routes/AddPaydays'
import CreateUser from './routes/CreateUser'
import Login from './routes/Login'

import './App.css'

const App = () => {
    const [loggedInUserProfile, setLoggedInUserProfile] = useState(null);

    const getUserProfile = async () => {
        // If no access token is present, don't retrieve their information
        if (!localStorage.getItem("accessToken")) {
            return;
        }

        try {
            let {data: profile} = await axios.get(`https://deusprogrammer.com/api/profile-svc/users/~self`, {
                headers: {
                    "X-Access-Token": localStorage.getItem("accessToken")
                }
            });

            if (profile.username !== null) {
                setLoggedInUserProfile(profile);
            }
        } catch (error) {
        }
    }

    useEffect(() => {
        getUserProfile();
    }, []);

    const login = () => {
        window.localStorage.setItem("twitchRedirect", "https://deusprogrammer.com/util/budget");
        window.location.replace("https://deusprogrammer.com/util/auth/login?redirect=https://deusprogrammer.com/util/budget");
    }

    let profileHeader = <button onClick={login}>Login</button>;
    if (loggedInUserProfile) {
        profileHeader = <div>Logged in as {loggedInUserProfile.username}</div>
    }

    return (
        <div className="App">
            <div style={{textAlign: "right"}}>
                {profileHeader}
            </div>
            <Router history="hash">
                <nav>
                    <Link to={`${process.env.PUBLIC_URL}/budgets`}>View Budgets</Link>|
                    <Link to={`${process.env.PUBLIC_URL}/create/budgets`}>Create Budget</Link>
                </nav>
                <Switch>
                    <Route path={`${process.env.PUBLIC_URL}/create/budgets`} exact component={NewBudget} />
                    <Route path={`${process.env.PUBLIC_URL}/create/users`} exact component={CreateUser} />
                    <Route path={`${process.env.PUBLIC_URL}/create/budgets/:id/bills`} exact component={AddBills} />
                    <Route path={`${process.env.PUBLIC_URL}/create/budgets/:id/paydays`} exact component={AddPaydays} />
                    <Route path={`${process.env.PUBLIC_URL}/budgets`} exact component={Budgets} />
                    <Route path={`${process.env.PUBLIC_URL}/budgets/:id`} exact component={Budget} />
                    <Route path={`${process.env.PUBLIC_URL}/budgets/:id/bills`} exact component={AddBills} />
                    <Route path={`${process.env.PUBLIC_URL}/login`} exact component={Login} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
