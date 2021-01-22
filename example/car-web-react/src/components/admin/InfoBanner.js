import React, {Component} from 'react';
import Table from "../common/Table";
import Form from "../common/Form";
import withNet from "../common/Net";

class InfoBanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{}],
            showForm: false,
            mode: "increase",
            fields: [{}]
        }
        this.curretnID = null;
        this.fields = [{
            type: "text",
            label: "标题",
            name: "title",
            value: "",
            placeholder: "请输入"
        }, {
            type: "text",
            label: "子标题",
            name: "sub_title",
            value: "",
            placeholder: "请输入"
        }, {
            type: "file",
            label: "图片",
            name: "image",
            value: "",
            placeholder: "请输入"
        }]
    }

    componentDidMount() {
        this.getBanners().then(data => this.setState({
            ...this.state,
            data
        }))

    }


    async getBanners() {
        let {data} = await this.props.get("/banner");
        return data.map((item, index) => ({...item, index}));
    }

    increase() {
        this.setState({
            ...this.state,
            showForm: true,
            mode: 'increase',
            fields: this.fields


        })
    }

    submit(formData) {
        if (this.state.mode === 'increase') {
            this.props.post('/banner', formData).then(({err}) => {
                if (err) alert("失败");
                else {
                    alert('成功');
                    this.getBanners().then(data => {
                        this.setState({
                            ...this.state,
                            showForm: false,
                            data
                        })
                    })
                }
            });
        } else {
            this.props.patch(`/banner?ID=${this.curretnID}`, formData).then(({err}) => {
                if (err) alert("失败");
                else {
                    alert('成功');
                    this.getBanners().then(data => {
                        console.log(data);
                        this.setState({
                            ...this.state,
                            showForm: false,
                            data
                        })
                    })
                }
            });


        }

    }

    cancel() {
        this.setState({
            ...this.state,
            showForm: false
        })
    }

    deleteOne({ID}) {

        if (confirm('确定删除？')) {
            this.props.delete(`/banner?ID=${ID}`).then(({err}) => {
                if (err) alert('失败');
                else {
                    alert('成功');
                    this.getBanners().then(data => {
                        this.setState({
                            ...this.state, data
                        })

                    })
                }
            })
        }

    }

    editOne(item) {

        let fields = JSON.parse(JSON.stringify(this.fields)).map(field => {
            let {type, name} = field
            if (type !== 'file') field.value = item[name];
            return field;
        })

        this.curretnID = item.ID;
        this.setState({
            ...this.state,
            showForm: true,
            mode: "edit",
            fields
        })


    }

    render() {

        let columns = [{label: "序号", name: "index"},
            {label: "ID", name: "ID"},
            {label: "标题", name: "title"},
            {label: "子标题", name: "sub_title"},
            {label: "图片", name: "image"}

        ]


        let {data, showForm, fields, mode} = this.state;

        return (
            <div>
                <button className='btn btn-primary' onClick={this.increase.bind(this)}>添加</button>
                <Table columns={columns} data={data} checkable={false} onDelete={this.deleteOne.bind(this)}
                       onEdit={this.editOne.bind(this)}/>
                {showForm ?
                    <Form fields={fields} onSubmit={this.submit.bind(this)} onCancel={this.cancel.bind(this)}
                          mode={mode}/> : ""}
            </div>
        )
    }

}

export default withNet(InfoBanner);
