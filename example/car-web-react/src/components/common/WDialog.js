import React, {Component} from 'react';

export default class WDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: 'none'
        }
    }

    close() {
        this.setState({
            visible: "none"
        })

    }

    open() {

        this.setState({
            visible: 'block'
        })
    }

    render() {

        let {children, title = '对话框'} = this.props;
        let {visible} = this.state;
        return (
            <div style={{display: visible}}>
                <div className="dialog-shadow"></div>
                <div className="panel panel-default dialog-panel">
                    <div className="panel-heading">
                        <h2 className="panel-title">
                            {title}
                            <a href="javascript:;" className="glyphicon glyphicon-remove pull-right"
                               onClick={this.close.bind(this)}> </a>
                        </h2>
                    </div>
                    <div className="panel-body">
                        {children}
                    </div>
                </div>
            </div>
        );
    }

}

