import React, {Component} from 'react';

export default class WForm extends Component {

    constructor(props) {

        super(props);
        this.data = Object.assign({}, props.data);
    }

    change(name, value) {
        this.data[name] = value;
        console.log(this.data)
    }

    render() {

        let {data, children = []} = this.props;
        if (!Array.isArray(children)) children = [children];

        return (

            <form>
                {children.map((item, index) => <item.type {...item.props} data={data} key={index}
                                                          onChange={this.change.bind(this)}/>)}
            </form>


        )
    }


}

