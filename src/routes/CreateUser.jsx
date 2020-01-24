import React from 'react'
import axios from 'axios'
import {Form, Text} from 'informed'

import config from '../utils/config'

export default class CreateUser extends React.Component {
    createUser = () => {
        if (this.formApi.getState().values.password !== this.formApi.getState().values.passwordCheck) {
            alert("Password doesn't match")
            return
        }
        
        axios.post(config.baseUrl + "/users", {
            username: this.formApi.getState().values.username,
            password: this.formApi.getState().values.password
        }).then(response => {
            this.props.history.push(`${process.env.PUBLIC_URL}/login`)
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
