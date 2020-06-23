const React = require('react')
const Container = require('../com-components/container')

module.exports = class App extends React.Component {
    render() {
        return <Container
            columns={this.props.columns}
            filt={() => {
            }}
            sort={() => {
            }}
        />
    }
}