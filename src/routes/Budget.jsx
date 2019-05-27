import React from 'react'

export default class Budget extends React.Component {
    render() {
        return (
            <div>
                <h1>{this.props.match.params.id}</h1>
            </div>
        )
    }
}