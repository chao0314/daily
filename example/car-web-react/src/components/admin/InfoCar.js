import React, {Component} from 'react';
import Table from "../common/Table";
import ComplexForm from "../common/ComplexForm";
import Pagination from "../common/Pagination";
import withNet from "../common/Net";


class InfoCar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cars: [{}],
            mode: "increase",
            showForm: false,
            fields: [{}],
            amount: 1
        }
        this.currentID = null;
        this.fields = [{
            type: "text",
            label: "名称",
            name: "title",
            value: "",
            placeholder: "请输入"
        }, {
            type: "text",
            label: "价格",
            name: "price",
            value: "",
            placeholder: "请输入"
        }, {
            type: "text",
            label: "特点",
            name: "features",
            value: [{key: "", value: ""}],
            placeholder: "请输入"
        },
            {
                type: "file",
                label: "图片",
                name: "images",
                value: "",
                placeholder: "请输入"
            }, {
                type: "textarea",
                label: "描述",
                name: "description",
                value: "",
                placeholder: "请输入"
            }]


    }

    componentDidMount() {
        this.getCars().then(([amount, cars]) => this.setState({
            ...this.state,
            amount,
            cars
        }))
    }


    componentWillUnmount() {
        this.setState = () => false;
    }

    async getCars(page = 1) {

        let batch = [this.props.get('/car/count'), this.props.get(`/car?page=${page}`)];
        let [{data: {count: amount}}, {data: cars}] = await Promise.all(batch);
        return [amount, cars.map((item, index) => (item.index = index, item))];


    }

    deleteOne(item) {

        if (confirm('确定删除？')) {

            this.props.delete(`/car?ID=${item.ID}`).then(({err}) => {
                if (err) alert('失败');
                else {
                    alert('成功');
                    this.getCars().then(([amount, cars]) => this.setState({
                        ...this.state,
                        amount,
                        cars
                    }))

                }
            })
        }

    }

    editOne(item) {
        this.currentID = item.ID;
        let fields = JSON.parse(JSON.stringify(this.fields));
        fields.forEach(field => {
            if (field.type !== 'file') field.value = item[field.name];
        })

        this.setState({
            ...this.state,
            showForm: true,
            mode: "edit",
            fields

        })


    }

    increase() {
        this.setState({
            ...this.state,
            showForm: true,
            mode: "increase",
            fields: this.fields
        })

    }

    submit(data) {

        if (this.state.mode === 'increase') {
            console.log('add------------')
            this.props.post('/car', data).then(({err}) => {
                if (err) alert('失败');
                else {
                    alert('成功');
                    this.getCars().then(([amount, cars]) => this.setState({
                        ...this.state,
                        amount,
                        cars,
                        showForm: false
                    }))

                }
            })
        } else {
            this.props.patch(`/car?ID=${this.currentID}`, data).then(({err}) => {
                if (err) alert('失败');
                else {
                    alert('成功');
                    this.getCars().then(([amount, cars]) => this.setState({
                        ...this.state,
                        amount,
                        cars,
                        showForm: false
                    }))

                }
            })

        }

    }

    cancel() {
        this.setState({
            ...this.state,
            showForm: false
        })
    }

    switchHandle(pageIndex) {

        this.getCars(pageIndex).then(([amount, cars]) => {
            this.setState({
                ...this.state,
                cars,
                amount
            })

        })

    }

    render() {
        let columns = [{label: "序号", name: "index"},
            {label: "名称", name: "title"},
            {label: "价格", name: "price"},

        ]

        let {cars, showForm, mode, fields, amount} = this.state;

        amount = Math.ceil(amount / 10);


        return (

            <div>
                <button className='btn btn-primary' onClick={this.increase.bind(this)}>添加</button>
                <Table columns={columns} data={cars} checkable={false} onDelete={this.deleteOne.bind(this)}
                       onEdit={this.editOne.bind(this)}/>
                <Pagination amount={amount} switchHandle={this.switchHandle.bind(this)}/>
                {showForm ?
                    <ComplexForm fields={fields} onSubmit={this.submit.bind(this)} onCancel={this.cancel.bind(this)}
                                 mode={mode} operable={true}/> : ""}
            </div>
        )
    }

}

export default withNet(InfoCar);
