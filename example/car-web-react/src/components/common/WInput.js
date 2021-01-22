import React, {Component} from 'react';

export default class WInput extends Component {


    inputHandler(ev) {
        let {onInput} = this.props;
        onInput instanceof Function && onInput(ev.target.value);
    }


    render() {

        let {className, type = 'text', id, name, value, placeholder} = this.props;

        className = ["form-control", className].join(' ')
        return (
            <input type={type}
                   className={className}
                   id={id}
                   name={name}
                   placeholder={placeholder}
                   defaultValue={value}
                   onInput={this.inputHandler.bind(this)}
            />
        )
    }
}

