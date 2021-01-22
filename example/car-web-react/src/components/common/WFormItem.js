import React, {Component} from 'react';

export default class WFormItem extends Component {


    change(name, value) {
        let {onChange} = this.props;
        onChange instanceof Function && onChange(name, value)

    }

    render() {

        let {label, data, name, children} = this.props;
        let id = Math.floor(Math.random() * 10000);

        return (
            <div className="form-group">
                <label htmlFor={id}>{label}</label>
                {<children.type {...children.props} value={data[name]} id={id} onInput={this.change.bind(this, name)}/>}
            </div>
        )
    }
}