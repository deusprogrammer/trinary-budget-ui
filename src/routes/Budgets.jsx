import React from 'react'
import axios from 'axios'

import AuthHelper from '../utils/AuthHelper'

import config from '../utils/config'

export default class Budgets extends React.Component {
    state = {
        budgets: []
    }

    componentDidMount() {
        axios.get(config.baseUrl + "/budgets", AuthHelper.createConfig())
        .then(response => {
            this.setState({budgets: response.data})
        })
    }

    render() {
        return (
            <div>
                <h1>Budgets</h1>
                {this.state.budgets.map(budget => {
                    return (
                        <div style={{cursor: "pointer"}} onClick={() => {this.props.history.push(`${process.env.PUBLIC_URL}/budgets/${budget._id}`)}}>{budget.name}</div>
                    )
                })}
            </div>
        )
    }
}
