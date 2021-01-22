import React, {} from 'react';
import ContainerGoodCar from "./ContainerGoodCar";
import ContainerNewCar from "./ContainerNewCar";

export default (props) => {

    return (
        <section className="container">
            <div className="wrap-container clearfix">
                <div className="main-content">
                    <ContainerGoodCar/>
                    <div className="wrap-box t-center"
                         style={{background: '#fff', boxShadow: '2px 2px 5px 0px rgba(0,0,0,0.3)'}}>{/*Start Box*/}
                        <div className="zerogrid">
                            <div className="header">
                                <h2>两亿元用户保障金</h2>
                            </div>
                            <strong>重大事故车投诉专线：拨打400-861-0500转6 专人接待</strong>
                            <p>
                                安全有保障：严格的检测把关，拒绝重大事故车，只为更安全<br/>
                                车源有保障：249项专业检测，精选放心车源，拒绝重大事故车、水泡车、火烧车<br/>
                                车源有保障：精选优质车源，从源头上把控质量
                            </p>
                        </div>
                    </div>
                    <ContainerNewCar/>
                </div>
            </div>
        </section>


    );
}


