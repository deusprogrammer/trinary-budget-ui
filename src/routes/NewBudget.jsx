import React from 'react'
import axios from 'axios'
import {Form, Text, Scope} from 'informed'

import AuthHelper from '../utils/AuthHelper'

export default class NewBudget extends React.Component {
    createBudget = () => {
        axios.post(process.env.REACT_APP_API_DOMAIN + "/budgets", {
            name: this.formApi.getState().values.name
        }, AuthHelper.createConfig())
        .then((response) => {
            this.props.history.push(`/create/budgets/${response.data._id}/paydays`)
        })
    }

    render() {
        return (
            <div>
                <h1>Create New Budget</h1>
                <Form getApi={formApi => this.formApi = formApi}>
                    <label>Name:</label><Text field="name" />
                    <button onClick={() => {this.createBudget()}}>Create</button>
                </Form>
            </div>
        )
    }
}
