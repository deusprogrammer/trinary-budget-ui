import React from 'react'
import axios from 'axios'
import moment from 'moment'

import AuthHelper from '../utils/AuthHelper'

import config from '../utils/config'

function ordinalSuffixOf(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

export default class Budget extends React.Component {
    state = {
        budget: {},
        paydays: []
    }

    componentDidMount() {
        axios.get(`${config.baseUrl}/budgets/${this.props.match.params.id}`, AuthHelper.createConfig())
            .then((response) => {
                this.setState({budget: response.data})
                let paydays = []

                var today = moment()
                var examplePayDate = moment(response.data.payDays[0].examplePayDay, "YYYY-MM-DDTHH:mm:ss.SSSZ")

                var daysUntilNextPayDay = Math.ceil(examplePayDate.diff(today, "hours")/24)

                console.log("DAYS (FLOAT): " + daysUntilNextPayDay)

                if (daysUntilNextPayDay < 0) {
                    daysUntilNextPayDay = 14 - Math.abs(daysUntilNextPayDay % 14)
                }

                console.log("DAYS: " + daysUntilNextPayDay)

                var nextPayDay = moment(today).add(daysUntilNextPayDay - 14, "days")

                for (var i = 0; i < 24; i++) {
                    let previousPayDay = moment(nextPayDay)
                    nextPayDay = moment(previousPayDay).add(14, "days")

                    // Determine bills that fall in this timeline
                    let billsDue = response.data.bills.sort((a, b) => {return a.dayOfMonth - b.dayOfMonth}).filter((bill) => {
                        if (previousPayDay.date() > nextPayDay.date()) {
                            return bill.dayOfMonth >= previousPayDay.date() || bill.dayOfMonth < nextPayDay.date()
                        }

                        return bill.dayOfMonth >= previousPayDay.date() && bill.dayOfMonth < nextPayDay.date()
                    })

                    let billMap = {};
                    billsDue.forEach(({name, dayOfMonth, amount}) => {
                        if (!billMap[name]) {
                            billMap[name] = {
                                amount: 0,
                                dayOfMonth: dayOfMonth
                            }
                        }

                        billMap[name].amount += amount;
                    });

                    billsDue = Object.keys(billMap).map(name => {
                        let {dayOfMonth, amount} = billMap[name];
                        return {
                            name,
                            amount,
                            dayOfMonth
                        }
                    })

                    paydays.push({
                        date: previousPayDay,
                        amount: response.data.payDays[0].amount,
                        billsDue: billsDue,
                        totalBills: billsDue.reduce((acc, bill) => {
                            return acc + bill.amount
                        }, 0)
                    })
                }

                this.setState({paydays: paydays})
            })
    }

    render() {
        return (
            <div>
                <h1>Budget Outline</h1>
                { this.state.paydays.map((payday, index) => {
                    console.log("PAYDAY: " + JSON.stringify(payday))
                    return (
                        <div key={`payday-${index}`}>
                            <h3>{this.state.budget.payDays[0].name} Pay Day {payday.date.format("YYYY/MM/DD")}</h3>
                            <table style={{margin: "10px auto"}}>
                                <tbody>
                                    { payday.billsDue.map((billDue, index) => {
                                        let amount = `${billDue.amount > 0 ? '-' : '+'}$${Math.abs(billDue.amount)}`;
                                        return (
                                            <tr key={`bill-due-${index}`}>
                                                <td>{billDue.name} on the {ordinalSuffixOf(billDue.dayOfMonth)}</td><td>({amount})</td>
                                            </tr>
                                        ) 
                                    })}
                                    <tr><td style={{fontWeight: "bold"}}>Pay:</td><td>${payday.amount.toFixed(2)}</td></tr>
                                    <tr><td style={{fontWeight: "bold"}}>Total bills:</td><td>-${payday.totalBills.toFixed(2)}</td></tr>
                                    <tr><td style={{fontWeight: "bold"}}>Amount left:</td><td>${(payday.amount - payday.totalBills).toFixed(2)}</td></tr>
                                </tbody>
                            </table>
                        </div>
                    )
                })}
            </div>
        )
    }
}
