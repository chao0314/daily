const React = require('react')
const Container = require('../com-components/container')

// exports = module.exports = function (props) {
//
//     return <Container
//         columns={props.columns}
//         filt={() => {
//         }}
//         sort={() => {
//         }}
//     />
//
// }

exports = module.exports = class App extends React.Component {

    constructor(props) {
        super(props);
    }

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