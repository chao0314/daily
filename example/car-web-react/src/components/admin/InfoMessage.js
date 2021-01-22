import React, {Component} from 'react';
import Table from "../common/Table";
import Pagination from "../common/Pagination";
import withNet from "../common/Net";

class InfoMessage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            amount: 1,
            message: [{}]
        }
    }


    componentDidMount() {

        this.getMessage().then(([amount, message]) => this.setState({
            ...this.state,
            amount,
            message
        }))


    }

    async getMessage(page = 1) {

        let batch = [this.props.get('/message/count'), this.props.get(`/message?page=${page}`)];
        let [{data: {count: amount}}, {data: message}] = await Promise.all(batch);
        console.log('get message', amount, message);
        return [amount, message.map((item, index) => (item.index = index, item))];


    }

    deleteItem(item) {
        let ID
        if (Array.isArray(item)) ID = item.map(item => item.ID).join(",");
        else ID = item.ID
        if (confirm('确定删除？')) {

            this.props.delete(`/message?ID=${ID}`).then(({err}) => {
                if (err) alert('失败');
                else {
                    this.getMessage().then(([amount, message]) => this.setState({
                        ...this.state,
                        amount,
                        message
                    }))
                }
            })
        }

    }


    switchHandle(pageIndex) {
        this.getMessage(pageIndex).then(([amount, message]) => this.setState({
            ...this.state,
            amount,
            message
        }))

    }

    componentWillUnmount() {
        this.state = () => false;
    }


    render() {

        let columns = [{label: "姓名", name: "name"},
            {label: "邮箱", name: "email"},
            {label: "标题", name: "title"},
            {label: "内容", name: "content"},
            {label: "日期", name: "date"}

        ]

        let {message, amount} = this.state;
        amount = Math.ceil(amount / 10);

        return (
            <div>
                <Table columns={columns} data={message} checkable={true} onDelete={this.deleteItem.bind(this)}
                       editable={false}/>
                <Pagination amount={amount} switchHandle={this.switchHandle.bind(this)}/>
            </div>

        )
    }

}


export default withNet(InfoMessage);
