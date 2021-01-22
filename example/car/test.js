// let features = '上牌时间|2014年9月,表显里程|9.8万公里,本车排量|3.0L,变速箱|自动,排放标准|国Ⅳ,车辆性质|正常家用,车辆颜色|黄,维修保养|4S店维修保养,年检到期|2020年9月,商业险到期|无商业险,交强险到期|2019年9月,档位个数,驱动方式,综合油耗,车身结构,发动机缸数,最大功率,进气类型'
//
// console.log(features.split(',').map(entry => {
//
//     let [key, value] = entry.split('|');
//     return {key, value};
// }))

// let {root = 123, maxAge = 60 * 86400} = {};
//
// console.log(root,maxAge)
//
// let sort = 'name';
//
// let s = {[sort]:'hello'};
// console.log(s)
function hh(data){

    let res= [];
    let mid = Math.ceil(data.length / 2);
    for (let i = 0; i < mid; i++) {
        res.push([data[i], data[mid + i]]);

    }

    console.log(res);
}

let a1 =[1,2,3,4,5,6,7]
let a2 =[1,2,3,4,5,6]

hh(a1)
hh(a2)