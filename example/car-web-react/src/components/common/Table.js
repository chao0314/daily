import React, {Component} from 'react';

export default class Table extends Component {

    constructor(props) {
        super(props);

        this.state = {
            checked: []
        }
        this.allChecked = React.createRef();

    }


    deleteOne(item) {
        let {onDelete, checkable, data} = this.props;
        if (this.allChecked.current && this.allChecked.current.checked) item = data;
        else if (checkable) {
            let checkList = this.state.checked.reduce((prev, checked, index) => {
                if (checked) prev.push(data[index])
                return prev;

            }, [])
            if (checkList.length !== 0) item = checkList;

        }
        onDelete instanceof Function && onDelete(item);
    }


    editOne(item) {
        let {onEdit} = this.props;
        onEdit instanceof Function && onEdit(item);

    }

    checkedHandle(index) {
        this.state.checked[index] = !this.state.checked[index];
        if (this.allChecked.current) this.allChecked.current.checked = false;
        this.setState({
            ...this.state

        })

    }

    checkAll() {


        this.setState({
            ...this.state,
            checked: new Array(this.props.data.length).fill(this.allChecked.current.checked)
        })


    }

    render() {

        let {
            columns = [{label: "字段1", name: "key1"}], checkable = true, data = [{
                name: "key",
                value: "value1"
            }], editable = true
        } = this.props;

        let {checked} = this.state;


        return (
            <table className="table">
                <thead>
                <tr>
                    <th>
                        {checkable ? (
                            <label><input type="checkbox" name=''
                                          ref={this.allChecked} onChange={this.checkAll.bind(this)}/>全选</label>) : ""}
                    </th>
                    {columns.map((col, index) => <th key={index}>{col.label}</th>)}
                </tr>
                </thead>
                <tbody>
                {
                    data.length > 0 ? data.map((item, index) =>
                        (<tr key={index}>
                            <td>
                                {checkable ? (<input type="checkbox" name='' checked={checked[index] || false}
                                                     onChange={this.checkedHandle.bind(this, index)}/>) : ""}
                            </td>
                            {columns.map(({name}, i) => <th key={i}>{item[name]}</th>)}
                            <td>
                                {editable ? <button type="button" className="btn btn-default"
                                                    onClick={this.editOne.bind(this, item)}>修改
                                </button> : ""}
                                <button type="button" className="btn btn-danger"
                                        onClick={this.deleteOne.bind(this, item)}>删除
                                </button>
                            </td>
                        </tr>)
                    ) : (<tr>
                        <td>无数据</td>
                    </tr>)

                }
                </tbody>
            </table>


        )
    }

}

