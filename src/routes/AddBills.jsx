import React from 'react'

import axios from 'axios'

import {Form, Text} from 'informed'

import AuthHelper from '../utils/AuthHelper'

import config from '../utils/config'

export default class AddBills extends React.Component {
    state = {
        budget: {
            bills: []
        }
    }

    componentDidMount() {
        axios.get(`${config.baseUrl}/budgets/${this.props.match.params.id}`, AuthHelper.createConfig())
            .then((response) => {
                this.setState({budget: response.data})
            })
    }

    addBill = () => {
        let bills = [...this.state.budget.bills]
        bills.push({
            name: this.formApi.getState().values.name,
            amount: this.formApi.getState().values.amount,
            payoff: this.formApi.getState().values.payoff,
            dayOfMonth: this.formApi.getState().values.dayOfMonth
        })
        this.setState({...this.state, budget: {bills: bills}})
        axios.get(`${config.baseUrl}/budgets/${this.props.match.params.id}`, AuthHelper.createConfig())
            .then((response) => {
                let budget = response.data

                if (!budget.bills) {
                    budget.bills = []
                }

                budget.bills.push({
                    name: this.formApi.getState().values.name,
                    amount: this.formApi.getState().values.amount,
                    payoff: this.formApi.getState().values.payoff,
                    dayOfMonth: this.formApi.getState().values.dayOfMonth
                })
                return axios.put(`${config.baseUrl}/budgets/${this.props.match.params.id}`, budget, AuthHelper.createConfig())
            })
            .then(() => {
                this.formApi.setValue("name", "")
                this.formApi.setValue("amount", "")
                this.formApi.setValue("payoff", "")
                this.formApi.setValue("dayOfMonth", "")
            })
    }

    render() {
        return (
            <div>
                <h1>Add Bill</h1>
                <table style={{margin: "10px auto"}}>
                    <tbody>
                        {this.state.budget.bills.map((bill, index) => {
                            return (
                                <tr key={`bill-${index}`}>
                                    <td>{bill.name}</td><td>${bill.amount}</td><td>{bill.dayOfMonth}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <Form getApi={formApi => this.formApi = formApi} >
                    <label>Name</label><Text field="name" /><br />
                    <label>Amount</label><Text field="amount" /><br />
                    <label>Payoff</label><Text field="payoff" /><br />
                    <label>Day of Month</label><Text field="dayOfMonth" /><br />
                    <button onClick={() => {this.addBill()}}>Add Bill</button>
                    <button onClick={() => {this.props.history.push(`/budgets/${this.props.match.params.id}`)}}>Next</button>
                </Form>
            </div>
        )
    }
}
