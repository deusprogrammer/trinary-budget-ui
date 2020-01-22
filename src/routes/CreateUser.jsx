import React from 'react'
import axios from 'axios'
import {Form, Text, Scope} from 'informed'

export default class CreateUser extends React.Component {
    createUser = () => {
        if (this.formApi.getState().values.password !== this.formApi.getState().values.passwordCheck) {
            alert("Password doesn't match")
            return
        }

        axios.post(process.env.REACT_APP_API_DOMAIN + "/users", {
            username: this.formApi.getState().values.username,
            password: this.formApi.getState().values.password
        }).then(response => {
            this.props.history.push("/login")
        })
    }

    render() {
        return (
            <div>
                <h1>Create User</h1>
                <Form getApi={formApi => this.formApi = formApi}>
                    <label>Username</label><Text field="username" /><br />
                    <label>Password:</label><Text field="password" type="password" /><br />
                    <label>Validate:</label><Text field="passwordCheck" type="password" /><br />
                    <button onClick={() => {this.createUser()}}>Create</button>
                </Form>
            </div>
        )
    }
}
