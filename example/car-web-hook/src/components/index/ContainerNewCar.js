import React, {} from 'react';
import ContainerSider from "./ContainerSider";
import ContainerNewList from "./ContainerNewList";


export default (props) => {

    return (
        <div className="wrap-box">{/*Start Box*/}
            <div className="zerogrid">
                <div className="header">
                    <h2>最新好车</h2>
                </div>
                <div className="row">
                    <ContainerNewList/>
                    <ContainerSider/>
                </div>
            </div>
        </div>
    );
}


