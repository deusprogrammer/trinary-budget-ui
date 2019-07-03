import React from 'react'
import {Form, Text} from 'informed'
import axios from 'axios'

export default class Login extends React.Component {
    login = () => {
        axios.post("http://localhost:8080/users/auth", {
            username: this.formApi.getState().values.username,
            password: this.formApi.getState().values.password
        }).then(response => {
            window.localStorage.setItem("jwt", response.data.token)
            this.props.history.push("/budgets")
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