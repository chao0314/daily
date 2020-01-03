import React, {Component} from 'react';
import {main} from '@/network';


export default class HeaderSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            suggest: []
        }
    }

    search(kw) {
        kw = kw.trim();
        if (kw) {
            main.get(`/complete/${kw}`).then(({data}) => {
                this.setState({
                    suggest: data
                })
            }).catch(e => {
                console.log(e);
                alert("网络错误");
            })
        }

    }

    render() {
        let {suggest} = this.state;
        return (
            <div className="header-search-module">
                <div className="header-search-block">
                    <input className="header-search-input" type="text" placeholder="搜索商家或地点"
                           onInput={(e) => {
                               this.search(e.target.value)
                           }}/>
                    <button className="header-search-btn">
            <span className="header-icon icon-search-new center">
              <img src="/images/search.png" alt=""/>
            </span>
                    </button>
                </div>
                {suggest.length > 0 ? (
                    <div className="header-search-suggest">
                        <div className="header-search-noinput">
                            {/*<div className="header-search-history">
                                <h6>最近搜索</h6>
                                <div className="header-search-clean">删除搜索历史</div>
                                <ul>
                                    <li><a href="#">亦庄</a></li>
                                </ul>
                                </div>*/}
                            <h6>热门搜索</h6>
                            <div className="header-search-hotword">
                                {suggest.map(({title}, index) => (
                                    <a href={`/list?kw=${title}`} target='_blank' key={index}>{title}</a>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : ''}
                <div className="header-search-hotword">
                    <a href="#">欢乐水魔方水上乐园</a>
                    <a href="#">古北水镇</a>
                    <a href="#">北京欢乐谷</a>
                    <a href="#">北京失恋博物展</a>
                    <a href="#">八达岭长城</a>
                </div>
            </div>
        );
    }
}


