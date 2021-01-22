import React, {Component} from 'react';
import ReactDOM from "react-dom";

export  class $Alert extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: "none",
            message: "this is a  global alert"
        }
    }


    open(msg) {

        this.setState({
            visible: "block",
            message: msg
        })
    }

    close() {

        this.setState({
            visible: 'none'
        })
    }

    render() {


        return (

            <div className='alert' style={{display: this.state.visible}}>
                <p>{this.state.message}</p>
                <button type='button' onClick={this.close.bind(this)}>确认</button>
            </div>

        )
    }

}

let oDiv = document.createElement('div');
document.body.append(oDiv);
export default ReactDOM.render(<$Alert/>, oDiv);

