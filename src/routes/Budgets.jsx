import React from 'react'
import axios from 'axios'

import AuthHelper from '../utils/AuthHelper'

import config from '../utils/config'
import { Link } from 'react-router-dom'

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
                        <div>
                            <Link to={`${process.env.PUBLIC_URL}/budgets/${budget._id}`}>{budget.name}</Link>
                            <Link to={`${process.env.PUBLIC_URL}/budgets/${budget._id}/bills`}><button>Edit</button></Link>
                        </div>
                    )
                })}
            </div>
        )
    }
}
