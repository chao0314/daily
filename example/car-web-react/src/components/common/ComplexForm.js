import React, {Component} from 'react';
import Form from "./Form";

export default class ComplexForm extends Form {
    constructor(props) {
        super(props);

        let {fields = [{}]} = this.props;

        let localField = {}
        fields.forEach(field => {
            let {name, value} = field;
            if (Array.isArray(value) && typeof value[0] === 'object') {
                localField[name] = JSON.parse(JSON.stringify(field));
                localField[name].value.forEach(v => v.ID = this.random());
            }

        })


        this.state = {
            localField
        }

    }

    add(name, index) {
        let {localField} = this.state;
        let value = JSON.parse(JSON.stringify(localField[name].value))
        value.splice(index + 1, 0, {key: "", value: "", ID: this.random()});
        localField[name].value = value
        this.setState({
            ...this.state,
            localField
        })

    }


    remove(name, index) {
        let {localField} = this.state;
        let value = JSON.parse(JSON.stringify(localField[name].value))
        value.splice(index, 1);
        localField[name].value = value
        this.setState({
            ...this.state,
            localField
        })
    }

    render() {

        console.log('render');
        let {
            mode = 'increase', operable = false, fields = [{
                type: "text",
                label: "字段1",
                name: "name1",
                value: "value1",
                placeholder: "请输入"
            }]
        } = this.props;

        let {localField} = this.state;


        return (

            <div>
                <div className="dialog-shadow"/>
                <div className="panel panel-default dialog-panel">
                    <div className="panel-heading">
                        <h2 className="panel-title">
                            {mode === 'increase' ? "添加" : "编辑"}
                        </h2>
                    </div>
                    <div className="panel-body">
                        <form ref={this.formRef}>
                            {
                                fields.map(({type, label, name, value, placeholder}, index) => {

                                    let preID = this.random();
                                    return (
                                        <div className="form-group" key={index}>
                                            <label htmlFor={`${preID}${name}`}>{label}</label>
                                            {type === "textarea" ? (
                                                <textarea name={name} id={`${preID}${name}`} cols="10" rows="5"
                                                          placeholder={placeholder} defaultValue={value}/>
                                            ) : Array.isArray(value) && typeof value[0] === 'object' ? (
                                                localField[name].value.map((item, i) => (
                                                    <div className="feature" key={item.ID}>
                                                        <input type={type} className="form-control"
                                                               id={i === 0 ? `${preID}${name}` : ""}
                                                               name="featureKey"
                                                               placeholder={placeholder}
                                                               defaultValue={item.key}/>
                                                        <input type={type} className="form-control"
                                                               name="featureValue"
                                                               placeholder={placeholder}
                                                               defaultValue={item.value}/>
                                                        {operable ? (
                                                            <div><span
                                                                onClick={this.add.bind(this, name, i)}>+</span><span
                                                                onClick={this.remove.bind(this, name, i)}>-</span>
                                                            </div>
                                                        ) : ""}
                                                    </div>)
                                                )
                                            ) : (
                                                <input type={type} className="form-control" id={`${preID}${name}`}
                                                       name={name}
                                                       placeholder={placeholder}
                                                       defaultValue={value}
                                                       multiple={type === 'file'}/>
                                            )}

                                        </div>
                                    )
                                })
                            }
                            <div className="form-group">
                                <button type="button" className="btn btn-primary" onClick={this.submit.bind(this)}>提交
                                </button>
                                <button type="button" className="btn btn-default" onClick={this.cancel.bind(this)}>取消
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        )
    }

}

