import React, {Component} from 'react';

export default class Form extends Component {

    constructor(props) {
        super(props);
        this.formRef = React.createRef();
    }

    random() {
        return Math.floor(Math.random() * 1000000);

    }

    submit() {
        let formData = new FormData(this.formRef.current);
        let {onSubmit} = this.props;
        onSubmit instanceof Function && onSubmit(formData);


    }

    cancel() {
        let formData = new FormData(this.formRef.current);
        let {onCancel} = this.props;
        onCancel instanceof Function && onCancel(formData);
    }

    render() {

        let {
            fields = [{
                type: "text",
                label: "字段1",
                name: "name1",
                value: "value1",
                placeholder: "请输入"
            }], mode = 'increase'
        } = this.props;

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
                                            ) : (
                                                <input type={type} className="form-control" id={`${preID}${name}`}
                                                       name={name}
                                                       placeholder={placeholder} defaultValue={value}/>
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

