import React from 'react'
import axios from 'axios'
import {Form, Text} from 'informed'

import AuthHelper from '../utils/AuthHelper'

export default class AddPaydays extends React.Component {
    state = {
        budget: {
            payDays: []
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:8080/budgets/${this.props.match.params.id}`, AuthHelper.createConfig())
            .then((response) => {
                this.setState({budget: response.data})
            })
    }

    addPayDay = () => {
        let paydays = [...this.state.budget.payDays]
        paydays.push({
            name: this.formApi.getState().values.name,
            amount: this.formApi.getState().values.amount,
            examplePayDay: this.formApi.getState().values.examplePayDay
        })
        this.setState({...this.state, budget: {paydays: paydays}})
        axios.get(`http://localhost:8080/budgets/${this.props.match.params.id}`, AuthHelper.createConfig())
            .then((response) => {
                let budget = response.data

                if (!budget.payDays) {
                    budget.payDays = []
                }

                budget.payDays.push({
                    name: this.formApi.getState().values.name,
                    amount: this.formApi.getState().values.amount,
                    examplePayDay: this.formApi.getState().values.examplePayDay
                })
                return axios.put(`http://localhost:8080/budgets/${this.props.match.params.id}`, budget, AuthHelper.createConfig())
            })
            .then(() => {
                this.formApi.setValue("name", "")
                this.formApi.setValue("amount", "")
                this.formApi.setValue("examplePayDay", "")
            })
    }

    render() {
        return (
            <div>
                <h1>Add Pay Day</h1>
                <table style={{margin: "10px auto"}}>
                    <tbody>
                        {this.state.budget.payDays.map((payday, index) => {
                            return (
                                <tr key={`payday-${index}`}>
                                    <td>{payday.name}</td><td>${payday.amount}</td><td>{payday.examplePayDay}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <Form getApi={formApi => this.formApi = formApi}>
                    <label>Employer</label><Text field="name" /><br />
                    <label>Amount</label><Text field="amount" /><br />
                    <label>Next Payday</label><Text field="examplePayDay" /><br />
                    <button onClick={() => {this.addPayDay()}}>Add Pay Day</button>
                    <button onClick={() => {this.props.history.push(`/create/budgets/${this.props.match.params.id}/bills`)}}>Next</button>
                </Form>
            </div>
        )
    }
}