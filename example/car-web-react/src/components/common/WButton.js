import React, {Component} from 'react';

export default class WButton extends Component {


    render() {
        let {type, className, onClick, disabled, children} = this.props;
        className = ['btn', `btn-${type}`, className].join(' ');

        return (
            <button type='button'
                    className={className}
                    disabled={disabled}
                    onClick={onClick}

            >
                {children}
            </button>

        )
    }

}

