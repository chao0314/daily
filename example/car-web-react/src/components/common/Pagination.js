import React, {Component} from 'react';

export default class Pagination extends Component {

    constructor(props) {
        super(props);
        this.state = {
            curIndex: 1
        }
    }

    forward() {

        let {curIndex} = this.state;
        if (curIndex > 1) {
            this.setState({
                ...this.state,
                curIndex: curIndex - 1
            })
            const {switchHandle} = this.props;
            switchHandle instanceof Function && switchHandle(curIndex - 1);
        }

    }

    next() {

        let {curIndex} = this.state;
        let {amount} = this.props;
        if (curIndex < amount) {
            this.setState({
                ...this.state,
                curIndex: curIndex + 1
            })

            const {switchHandle} = this.props;
            switchHandle instanceof Function && switchHandle(curIndex + 1);
        }


    }

    switch(index) {
        if (index !== this.state.curIndex) {
            this.setState(
                {
                    ...this.state,
                    curIndex: index
                }
            )

            const {switchHandle} = this.props;
            switchHandle instanceof Function && switchHandle(index);

        }

    }

    render() {

        const {amount = 1} = this.props;
        const {curIndex} = this.state;


        return (
            <ul className="pagination">
                <li onClick={this.forward.bind(this)}>
                    <a href="#">
                        <span>&laquo;</span>
                    </a>
                </li>
                {new Array(amount).fill(1).map((v, i) => (
                    <li key={i} className={curIndex === i + 1 ? 'active' : ''} onClick={this.switch.bind(this, i + 1)}>
                        <a
                            href="#">{i + 1}</a></li>))}
                <li onClick={this.next.bind(this)}>
                    <a href="#">
                        <span>&raquo;</span>
                    </a>
                </li>
            </ul>

        )
    }

}

