import React, {Component} from 'react';

export default class App extends Component {

    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div className="bd">
                <table>
                    <tbody>
                    <tr>
                        <th className="desc">项目</th>
                        <th className="unit-price">单价</th>
                        <th className="num">数量</th>
                        <th className="total-price">总价</th>
                    </tr>
                    <tr>
                        <td>
                            <a href="/meishi/d610077917.html">
                                必胜客: 3份必胜客A075 【儿童餐】小不点儿童餐
                            </a>
                        </td>
                        <td>99</td>
                        <td>
                            <div className="input-number">
                                <button className="minus-btn" type="button">-</button>
                                <input type="text" className="input" defaultValue={1} />
                                <button className="plus-btn" type="button">+</button>
                            </div>
                        </td>
                        <td data-reactid={21}>¥99</td>
                    </tr>
                    </tbody>
                </table>
                <div className="_row discount" />
                <div className="_row price">
          <span className="total-price">应付金额：
            <span data-reactid={28}>
              <i data-reactid={29}>¥</i>198
            </span>
          </span>
                </div>
                <div className="_row mobile-info">
                    将发送美团券密码至手机号：176****9151
                    <a href="https://passport.meituan.com/account/mobilerebind">绑定新手机号</a>
                </div>
                <div className="form-submit"><input type="button" className="btn" defaultValue="提交订单" /></div>
            </div>
        );
    }
}


