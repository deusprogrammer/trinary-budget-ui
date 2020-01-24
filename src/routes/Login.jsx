import React from 'react'
import {Form, Text} from 'informed'
import axios from 'axios'

import config from '../utils/config'

export default class Login extends React.Component {
    login = () => {
        axios.post(config.baseUrl + "/users/auth", {
            username: this.formApi.getState().values.username,
            password: this.formApi.getState().values.password
        }).then(response => {
            window.localStorage.setItem("jwt", response.data.token)
            this.props.history.push(`${process.env.PUBLIC_URL}/budgets`)
        })
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <Form getApi={formApi => this.formApi = formApi}>
                    <label>Username</label><Text field="username" /><br />
                    <label>Password:</label><Text field="password" type="password" /><br />
                    <button onClick={() => {this.login()}}>Login</button>
                </Form>
            </div>
        )
    }
}