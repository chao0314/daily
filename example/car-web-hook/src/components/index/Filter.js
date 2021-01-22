import React, {} from 'react';


export default (props) => {

    return (
        <div className="bg-theme">
            <div className="filter zerogrid">
                <h2 className="t-center">轻松找好车</h2>
                <div className="row">
                    <div className="col-1-4">
                        <div className="wrap-col">
                            <span>品牌:</span><br />
                            <select>
                                <option>--ALL--</option>
                                <option>Honda</option>
                                <option>Infiniti</option>
                                <option>Jeep</option>
                                <option>Mercedes-Benz</option>
                                <option>Volvo</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-1-4">
                        <div className="wrap-col">
                            <span>型号:</span><br />
                            <select>
                                <option>--ALL--</option>
                                <option>Aston martin</option>
                                <option>Audi</option>
                                <option>Bentley</option>
                                <option>Bmw</option>
                                <option>Cadillac</option>
                                <option>Chevrolet</option>
                                <option>Citroen</option>
                                <option>Dacia</option>
                                <option>Dodge</option>
                                <option>Ferrari</option>
                                <option>Ford</option>
                                <option>Gmc</option>
                                <option>Hyundai</option>
                                <option>Jaguar</option>
                                <option>Lexus</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-1-4">
                        <div className="wrap-col">
                            <span>价格:</span><br />
                            <select>
                                <option>--ALL--</option>
                                <option>0-1000</option>
                                <option>1000-5000</option>
                                <option>5000-10000</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-1-4">
                        <div className="wrap-col">
                            <br />
                            <a href="#" className="button bt1">查找</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}


