export function coordByProvince(province) {
    const data = geo.find(item => item.province === province);
    if (!data) return null;

    if (!data.citys[0] || !data.citys[0].districts[0]) return null;

    return data.citys[0].districts[0].data;
}

export function coordByCity(province, city) {
    const p = geo.find(item => item.province === province);
    if (!p) return null;

    const c = p.citys.find(item => item.city === city);
    if (!c) return null;

    if (!c.districts[0]) return null;

    return c.districts[0].data;
}

export function coordByDistrict(province, city, district) {
    const p = geo.find(item => item.province === province);
    if (!p) return null;

    const c = p.citys.find(item => item.city === city);
    if (!c) return null;

    const d = c.districts.find(item => item.district === district);
    if (!d) return null;

    return d.data;
}

export function coord(names) {
    if (!Array.isArray(names)) names = [names];

    for (let i = 0; i < names.length; i++) {
        const data = _coord(names[i]);
        if (data) return data;
    }
}

function _coord(name) {
    for (let i = 0; i < geo.length; i++) {
        const province = geo[i];
        if (province.province === name) {
            return province.citys[0].districts[0].data;
        }

        for (let j = 0; j < province.citys.length; j++) {
            const city = province.citys[j];
            if (city.city === name) {
                return city.districts[0].data;
            }

            for (let k = 0; k < city.districts.length; k++) {
                const district = city.districts[k];

                if (district.district === name) {
                    return district.data;
                }
            }
        }
    }
}


const geo = [{
    "province": "北京市",
    "citys": [{
        "city": "北京市",
        "districts": [{"district": "北京市", "data": [116.4, 39.9]}, {
            "district": "天安门",
            "data": [116.38, 39.9]
        }, {"district": "东城区", "data": [116.42, 39.93]}, {
            "district": "西城区",
            "data": [116.37, 39.92]
        }, {"district": "崇文区", "data": [116.43, 39.88]}, {
            "district": "宣武区",
            "data": [116.35, 39.87]
        }, {"district": "朝阳区", "data": [116.43, 39.92]}, {
            "district": "丰台区",
            "data": [116.28, 39.85]
        }, {"district": "石景山区", "data": [116.22, 39.9]}, {
            "district": "海淀区",
            "data": [116.3, 39.95]
        }, {"district": "门头沟区", "data": [116.1, 39.93]}, {
            "district": "房山区",
            "data": [116.13, 39.75]
        }, {"district": "通州区", "data": [116.65, 39.92]}, {
            "district": "顺义区",
            "data": [116.65, 40.13]
        }, {"district": "昌平区", "data": [116.23, 40.22]}, {
            "district": "大兴区",
            "data": [116.33, 39.73]
        }, {"district": "怀柔区", "data": [116.63, 40.32]}, {
            "district": "平谷区",
            "data": [117.12, 40.13]
        }, {"district": "密云县", "data": [116.83, 40.37]}, {"district": "延庆县", "data": [115.97, 40.45]}]
    }]
}, {
    "province": "天津市",
    "citys": [{
        "city": "天津市",
        "districts": [{"district": "天津市", "data": [117.2, 39.12]}, {
            "district": "和平区",
            "data": [117.2, 39.12]
        }, {"district": "河东区", "data": [117.22, 39.12]}, {
            "district": "河西区",
            "data": [117.22, 39.12]
        }, {"district": "南开区", "data": [117.15, 39.13]}, {
            "district": "河北区",
            "data": [117.18, 39.15]
        }, {"district": "红桥区", "data": [117.15, 39.17]}, {
            "district": "塘沽区",
            "data": [117.65, 39.02]
        }, {"district": "汉沽区", "data": [117.8, 39.25]}, {
            "district": "大港区",
            "data": [117.45, 38.83]
        }, {"district": "东丽区", "data": [117.3, 39.08]}, {"district": "西青区", "data": [117, 39.13]}, {
            "district": "津南区",
            "data": [117.38, 38.98]
        }, {"district": "北辰区", "data": [117.13, 39.22]}, {
            "district": "武清区",
            "data": [117.03, 39.38]
        }, {"district": "宝坻区", "data": [117.3, 39.72]}, {
            "district": "滨海新区",
            "data": [117.68, 39.03]
        }, {"district": "宁河县", "data": [117.82, 39.33]}, {
            "district": "静海县",
            "data": [116.92, 38.93]
        }, {"district": "蓟县", "data": [117.4, 40.05]}]
    }]
}, {
    "province": "河北省", "citys": [{
        "city": "石家庄市",
        "districts": [{"district": "石家庄市", "data": [114.52, 38.05]}, {
            "district": "长安区",
            "data": [114.52, 38.05]
        }, {"district": "桥东区", "data": [114.5, 38.05]}, {
            "district": "桥西区",
            "data": [114.47, 37.05]
        }, {"district": "新华区", "data": [114.47, 38.05]}, {
            "district": "井陉矿区",
            "data": [114.05, 38.08]
        }, {"district": "裕华区", "data": [114.52, 38.02]}, {
            "district": "井陉县",
            "data": [114.13, 38.03]
        }, {"district": "正定县", "data": [114.57, 38.15]}, {
            "district": "栾城县",
            "data": [114.65, 37.88]
        }, {"district": "行唐县", "data": [114.55, 38.43]}, {
            "district": "灵寿县",
            "data": [114.37, 38.3]
        }, {"district": "高邑县", "data": [114.6, 37.6]}, {"district": "深泽县", "data": [115.2, 38.18]}, {
            "district": "赞皇县",
            "data": [114.38, 37.67]
        }, {"district": "无极县", "data": [114.97, 38.18]}, {
            "district": "平山县",
            "data": [114.2, 38.25]
        }, {"district": "元氏县", "data": [114.52, 37.75]}, {
            "district": "赵县",
            "data": [114.77, 37.75]
        }, {"district": "辛集市", "data": [115.22, 37.92]}, {
            "district": "藁城市",
            "data": [114.83, 38.03]
        }, {"district": "晋州市", "data": [115.03, 38.03]}, {
            "district": "新乐市",
            "data": [114.68, 38.35]
        }, {"district": "鹿泉市", "data": [114.3, 38.08]}]
    }, {
        "city": "唐山市",
        "districts": [{"district": "唐山市", "data": [118.2, 39.63]}, {
            "district": "路南区",
            "data": [118.17, 39.63]
        }, {"district": "路北区", "data": [118.22, 39.63]}, {
            "district": "古冶区",
            "data": [118.42, 39.73]
        }, {"district": "开平区", "data": [118.27, 39.68]}, {
            "district": "丰南区",
            "data": [118.1, 39.57]
        }, {"district": "丰润区", "data": [118.17, 39.83]}, {"district": "滦县", "data": [118.7, 39.75]}, {
            "district": "滦南县",
            "data": [118.68, 39.5]
        }, {"district": "乐亭县", "data": [118.9, 39.42]}, {
            "district": "迁西县",
            "data": [118.32, 40.15]
        }, {"district": "玉田县", "data": [117.73, 39.88]}, {
            "district": "唐海县",
            "data": [118.45, 39.27]
        }, {"district": "遵化市", "data": [117.95, 40.18]}, {"district": "迁安市", "data": [118.7, 40.02]}]
    }, {
        "city": "秦皇岛市",
        "districts": [{"district": "秦皇岛市", "data": [119.6, 39.93]}, {
            "district": "海港区",
            "data": [119.6, 39.93]
        }, {"district": "山海关区", "data": [119.77, 40]}, {
            "district": "北戴河区",
            "data": [119.48, 39.83]
        }, {"district": "青龙满族自治县", "data": [118.95, 40.4]}, {
            "district": "昌黎县",
            "data": [119.17, 39.7]
        }, {"district": "抚宁县", "data": [119.23, 39.88]}, {"district": "卢龙县", "data": [118.87, 39.88]}]
    }, {
        "city": "邯郸市",
        "districts": [{"district": "邯郸市", "data": [114.48, 36.62]}, {
            "district": "邯山区",
            "data": [114.48, 36.6]
        }, {"district": "丛台区", "data": [114.48, 36.63]}, {
            "district": "复兴区",
            "data": [114.45, 36.63]
        }, {"district": "峰峰矿区", "data": [114.2, 36.42]}, {
            "district": "邯郸县",
            "data": [114.53, 36.6]
        }, {"district": "临漳县", "data": [114.62, 36.35]}, {
            "district": "成安县",
            "data": [114.68, 36.43]
        }, {"district": "大名县", "data": [115.15, 36.28]}, {"district": "涉县", "data": [113.67, 36.57]}, {
            "district": "磁县",
            "data": [114.37, 36.35]
        }, {"district": "肥乡县", "data": [114.8, 36.55]}, {"district": "永年县", "data": [114.48, 36.78]}, {
            "district": "邱县",
            "data": [115.17, 36.82]
        }, {"district": "鸡泽县", "data": [114.87, 36.92]}, {
            "district": "广平县",
            "data": [114.93, 36.48]
        }, {"district": "馆陶县", "data": [115.3, 36.53]}, {"district": "魏县", "data": [114.93, 36.37]}, {
            "district": "曲周县",
            "data": [114.95, 36.78]
        }, {"district": "武安市", "data": [114.2, 36.7]}]
    }, {
        "city": "邢台市",
        "districts": [{"district": "邢台市", "data": [114.48, 37.07]}, {
            "district": "桥东区",
            "data": [114.5, 38.05]
        }, {"district": "桥西区", "data": [114.87, 40.83]}, {
            "district": "邢台县",
            "data": [114.5, 37.08]
        }, {"district": "临城县", "data": [114.5, 37.43]}, {"district": "内丘县", "data": [114.52, 37.3]}, {
            "district": "柏乡县",
            "data": [114.68, 37.5]
        }, {"district": "隆尧县", "data": [114.77, 37.35]}, {
            "district": "任县",
            "data": [114.68, 37.13]
        }, {"district": "南和县", "data": [114.68, 37]}, {"district": "宁晋县", "data": [114.92, 37.62]}, {
            "district": "巨鹿县",
            "data": [115.03, 37.22]
        }, {"district": "新河县", "data": [115.25, 37.53]}, {
            "district": "广宗县",
            "data": [115.15, 37.07]
        }, {"district": "平乡县", "data": [115.03, 37.07]}, {
            "district": "威县",
            "data": [115.25, 36.98]
        }, {"district": "清河县", "data": [115.67, 37.07]}, {
            "district": "临西县",
            "data": [115.5, 36.85]
        }, {"district": "南宫市", "data": [115.38, 37.35]}, {"district": "沙河市", "data": [114.5, 36.85]}]
    }, {
        "city": "保定市",
        "districts": [{"district": "保定市", "data": [115.47, 38.87]}, {
            "district": "新市区",
            "data": [115.45, 38.87]
        }, {"district": "北市区", "data": [115.48, 38.87]}, {
            "district": "南市区",
            "data": [115.5, 38.85]
        }, {"district": "满城县", "data": [115.32, 38.95]}, {
            "district": "清苑县",
            "data": [115.48, 38.77]
        }, {"district": "涞水县", "data": [115.72, 39.4]}, {
            "district": "阜平县",
            "data": [114.18, 38.85]
        }, {"district": "徐水县", "data": [115.65, 39.02]}, {
            "district": "定兴县",
            "data": [115.77, 39.27]
        }, {"district": "唐县", "data": [114.98, 38.75]}, {
            "district": "高阳县",
            "data": [115.78, 38.68]
        }, {"district": "容城县", "data": [115.87, 39.05]}, {
            "district": "涞源县",
            "data": [114.68, 39.35]
        }, {"district": "望都县", "data": [115.15, 38.72]}, {
            "district": "安新县",
            "data": [115.93, 38.92]
        }, {"district": "易县", "data": [115.5, 39.35]}, {"district": "曲阳县", "data": [114.7, 38.62]}, {
            "district": "蠡县",
            "data": [115.57, 38.48]
        }, {"district": "顺平县", "data": [115.13, 38.83]}, {
            "district": "博野县",
            "data": [115.47, 38.45]
        }, {"district": "雄县", "data": [116.1, 38.98]}, {"district": "涿州市", "data": [115.97, 39.48]}, {
            "district": "定州市",
            "data": [114.97, 38.52]
        }, {"district": "安国市", "data": [115.32, 38.42]}, {"district": "高碑店市", "data": [115.85, 39.33]}]
    }, {
        "city": "张家口市",
        "districts": [{"district": "张家口市", "data": [114.88, 40.82]}, {
            "district": "桥东区",
            "data": [114.5, 38.05]
        }, {"district": "桥西区", "data": [114.87, 40.83]}, {
            "district": "宣化区",
            "data": [115.05, 40.6]
        }, {"district": "下花园区", "data": [115.27, 40.48]}, {
            "district": "宣化县",
            "data": [115.02, 40.55]
        }, {"district": "张北县", "data": [114.7, 41.15]}, {
            "district": "康保县",
            "data": [114.62, 41.85]
        }, {"district": "沽源县", "data": [115.7, 41.67]}, {"district": "尚义县", "data": [113.97, 41.08]}, {
            "district": "蔚县",
            "data": [114.57, 39.85]
        }, {"district": "阳原县", "data": [114.17, 40.12]}, {
            "district": "怀安县",
            "data": [114.42, 40.67]
        }, {"district": "万全县", "data": [114.72, 40.75]}, {
            "district": "怀来县",
            "data": [115.52, 40.4]
        }, {"district": "涿鹿县", "data": [115.22, 40.38]}, {
            "district": "赤城县",
            "data": [115.83, 40.92]
        }, {"district": "崇礼县", "data": [115.27, 40.97]}]
    }, {
        "city": "承德市",
        "districts": [{"district": "承德市", "data": [117.93, 40.97]}, {
            "district": "双桥区",
            "data": [117.93, 40.97]
        }, {"district": "双滦区", "data": [117.78, 40.95]}, {
            "district": "鹰手营子矿区",
            "data": [117.65, 40.55]
        }, {"district": "承德县", "data": [118.17, 40.77]}, {
            "district": "兴隆县",
            "data": [117.52, 40.43]
        }, {"district": "平泉县", "data": [118.68, 41]}, {"district": "滦平县", "data": [117.33, 40.93]}, {
            "district": "隆化县",
            "data": [117.72, 41.32]
        }, {"district": "丰宁满族自治县", "data": [116.65, 41.2]}, {
            "district": "宽城满族自治县",
            "data": [118.48, 40.6]
        }, {"district": "围场满族蒙古族自治县", "data": [117.75, 41.93]}]
    }, {
        "city": "沧州市",
        "districts": [{"district": "沧州市", "data": [116.83, 38.3]}, {
            "district": "新华区",
            "data": [114.47, 38.05]
        }, {"district": "运河区", "data": [116.85, 38.32]}, {"district": "沧县", "data": [116.87, 38.3]}, {
            "district": "青县",
            "data": [116.82, 38.58]
        }, {"district": "东光县", "data": [116.53, 37.88]}, {
            "district": "海兴县",
            "data": [117.48, 38.13]
        }, {"district": "盐山县", "data": [117.22, 38.05]}, {
            "district": "肃宁县",
            "data": [115.83, 38.43]
        }, {"district": "南皮县", "data": [116.7, 38.03]}, {"district": "吴桥县", "data": [116.38, 37.62]}, {
            "district": "献县",
            "data": [116.12, 38.18]
        }, {"district": "孟村回族自治县", "data": [117.1, 38.07]}, {
            "district": "泊头市",
            "data": [116.57, 38.07]
        }, {"district": "任丘市", "data": [116.1, 38.72]}, {
            "district": "黄骅市",
            "data": [117.35, 38.37]
        }, {"district": "河间市", "data": [116.08, 38.43]}]
    }, {
        "city": "廊坊市",
        "districts": [{"district": "廊坊市", "data": [116.7, 39.52]}, {
            "district": "安次区",
            "data": [116.68, 39.52]
        }, {"district": "广阳区", "data": [116.72, 39.53]}, {
            "district": "固安县",
            "data": [116.3, 39.43]
        }, {"district": "永清县", "data": [116.5, 39.32]}, {"district": "香河县", "data": [117, 39.77]}, {
            "district": "大城县",
            "data": [116.63, 38.7]
        }, {"district": "文安县", "data": [116.47, 38.87]}, {
            "district": "大厂回族自治县",
            "data": [116.98, 39.88]
        }, {"district": "霸州市", "data": [116.4, 39.1]}, {"district": "三河市", "data": [117.07, 39.98]}]
    }, {
        "city": "衡水市",
        "districts": [{"district": "衡水市", "data": [115.68, 37.73]}, {
            "district": "桃城区",
            "data": [115.68, 37.73]
        }, {"district": "枣强县", "data": [115.72, 37.52]}, {
            "district": "武邑县",
            "data": [115.88, 37.82]
        }, {"district": "武强县", "data": [115.98, 38.03]}, {
            "district": "饶阳县",
            "data": [115.73, 38.23]
        }, {"district": "安平县", "data": [115.52, 38.23]}, {
            "district": "故城县",
            "data": [115.97, 37.35]
        }, {"district": "景县", "data": [116.27, 37.7]}, {"district": "阜城县", "data": [116.15, 37.87]}, {
            "district": "冀州市",
            "data": [115.57, 37.57]
        }, {"district": "深州市", "data": [115.55, 38.02]}]
    }]
}, {
    "province": "山西省",
    "citys": [{
        "city": "太原市",
        "districts": [{"district": "太原市", "data": [112.55, 37.87]}, {
            "district": "小店区",
            "data": [112.57, 37.73]
        }, {"district": "迎泽区", "data": [112.57, 37.87]}, {
            "district": "杏花岭区",
            "data": [112.57, 37.88]
        }, {"district": "尖草坪区", "data": [112.48, 37.93]}, {
            "district": "万柏林区",
            "data": [112.52, 37.87]
        }, {"district": "晋源区", "data": [112.48, 37.73]}, {
            "district": "清徐县",
            "data": [112.35, 37.6]
        }, {"district": "阳曲县", "data": [112.67, 38.07]}, {
            "district": "娄烦县",
            "data": [111.78, 38.07]
        }, {"district": "古交市", "data": [112.17, 37.92]}]
    }, {
        "city": "大同市",
        "districts": [{"district": "大同市", "data": [113.3, 40.08]}, {
            "district": "城区",
            "data": [113.28, 40.08]
        }, {"district": "矿区", "data": [113.17, 40.03]}, {"district": "南郊区", "data": [113.13, 40]}, {
            "district": "新荣区",
            "data": [113.15, 40.27]
        }, {"district": "阳高县", "data": [113.75, 40.37]}, {
            "district": "天镇县",
            "data": [114.08, 40.42]
        }, {"district": "广灵县", "data": [114.28, 39.77]}, {
            "district": "灵丘县",
            "data": [114.23, 39.43]
        }, {"district": "浑源县", "data": [113.68, 39.7]}, {"district": "左云县", "data": [112.7, 40]}, {
            "district": "大同县",
            "data": [113.6, 40.03]
        }]
    }, {
        "city": "阳泉市",
        "districts": [{"district": "阳泉市", "data": [113.57, 37.85]}, {
            "district": "城区",
            "data": [113.28, 40.08]
        }, {"district": "矿区", "data": [113.17, 40.03]}, {"district": "郊区", "data": [113.58, 37.93]}, {
            "district": "平定县",
            "data": [113.62, 37.8]
        }, {"district": "盂县", "data": [113.4, 38.08]}]
    }, {
        "city": "长治市",
        "districts": [{"district": "长治市", "data": [113.12, 36.2]}, {
            "district": "城区",
            "data": [113.28, 40.08]
        }, {"district": "郊区", "data": [113.58, 37.93]}, {
            "district": "长治县",
            "data": [113.03, 36.05]
        }, {"district": "襄垣县", "data": [113.05, 36.53]}, {
            "district": "屯留县",
            "data": [112.88, 36.32]
        }, {"district": "平顺县", "data": [113.43, 36.2]}, {"district": "黎城县", "data": [113.38, 36.5]}, {
            "district": "壶关县",
            "data": [113.2, 36.12]
        }, {"district": "长子县", "data": [112.87, 36.12]}, {
            "district": "武乡县",
            "data": [112.85, 36.83]
        }, {"district": "沁县", "data": [112.7, 36.75]}, {"district": "沁源县", "data": [112.33, 36.5]}, {
            "district": "潞城市",
            "data": [113.22, 36.33]
        }]
    }, {
        "city": "晋城市",
        "districts": [{"district": "晋城市", "data": [112.83, 35.5]}, {
            "district": "城区",
            "data": [113.28, 40.08]
        }, {"district": "沁水县", "data": [112.18, 35.68]}, {
            "district": "阳城县",
            "data": [112.42, 35.48]
        }, {"district": "陵川县", "data": [113.27, 35.78]}, {
            "district": "泽州县",
            "data": [112.83, 35.5]
        }, {"district": "高平市", "data": [112.92, 35.8]}]
    }, {
        "city": "朔州市",
        "districts": [{"district": "朔州市", "data": [112.43, 39.33]}, {
            "district": "朔城区",
            "data": [112.43, 39.33]
        }, {"district": "山阴县", "data": [112.82, 39.52]}, {
            "district": "应县",
            "data": [113.18, 39.55]
        }, {"district": "右玉县", "data": [112.47, 39.98]}, {"district": "怀仁县", "data": [113.08, 39.83]}]
    }, {
        "city": "晋中市",
        "districts": [{"district": "晋中市", "data": [112.75, 37.68]}, {
            "district": "榆次区",
            "data": [112.75, 37.68]
        }, {"district": "榆社县", "data": [112.97, 37.07]}, {
            "district": "左权县",
            "data": [113.37, 37.07]
        }, {"district": "和顺县", "data": [113.57, 37.33]}, {
            "district": "昔阳县",
            "data": [113.7, 37.62]
        }, {"district": "寿阳县", "data": [113.18, 37.88]}, {
            "district": "太谷县",
            "data": [112.55, 37.42]
        }, {"district": "祁县", "data": [112.33, 37.35]}, {
            "district": "平遥县",
            "data": [112.17, 37.18]
        }, {"district": "灵石县", "data": [111.77, 36.85]}, {"district": "介休市", "data": [111.92, 37.03]}]
    }, {
        "city": "运城市",
        "districts": [{"district": "运城市", "data": [110.98, 35.02]}, {
            "district": "盐湖区",
            "data": [110.98, 35.02]
        }, {"district": "临猗县", "data": [110.77, 35.15]}, {
            "district": "万荣县",
            "data": [110.83, 35.42]
        }, {"district": "闻喜县", "data": [111.22, 35.35]}, {
            "district": "稷山县",
            "data": [110.97, 35.6]
        }, {"district": "新绛县", "data": [111.22, 35.62]}, {
            "district": "绛县",
            "data": [111.57, 35.48]
        }, {"district": "垣曲县", "data": [111.67, 35.3]}, {"district": "夏县", "data": [111.22, 35.15]}, {
            "district": "平陆县",
            "data": [111.22, 34.83]
        }, {"district": "芮城县", "data": [110.68, 34.7]}, {"district": "河津市", "data": [110.7, 35.6]}]
    }, {
        "city": "忻州市",
        "districts": [{"district": "忻州市", "data": [112.73, 38.42]}, {
            "district": "忻府区",
            "data": [112.73, 38.42]
        }, {"district": "定襄县", "data": [112.95, 38.48]}, {
            "district": "五台县",
            "data": [113.25, 38.73]
        }, {"district": "代县", "data": [112.95, 39.07]}, {
            "district": "繁峙县",
            "data": [113.25, 39.18]
        }, {"district": "宁武县", "data": [112.3, 39]}, {"district": "静乐县", "data": [111.93, 38.37]}, {
            "district": "神池县",
            "data": [112.2, 39.08]
        }, {"district": "五寨县", "data": [111.85, 38.9]}, {"district": "岢岚县", "data": [111.57, 38.7]}, {
            "district": "河曲县",
            "data": [111.13, 39.38]
        }, {"district": "偏关县", "data": [111.5, 39.43]}, {"district": "原平市", "data": [112.7, 38.73]}]
    }, {
        "city": "临汾市",
        "districts": [{"district": "临汾市", "data": [111.52, 36.08]}, {
            "district": "尧都区",
            "data": [111.52, 36.08]
        }, {"district": "曲沃县", "data": [111.47, 35.63]}, {
            "district": "翼城县",
            "data": [111.72, 35.73]
        }, {"district": "襄汾县", "data": [111.43, 35.88]}, {
            "district": "洪洞县",
            "data": [111.67, 36.25]
        }, {"district": "古县", "data": [111.92, 36.27]}, {
            "district": "安泽县",
            "data": [112.25, 36.15]
        }, {"district": "浮山县", "data": [111.83, 35.97]}, {"district": "吉县", "data": [110.68, 36.1]}, {
            "district": "乡宁县",
            "data": [110.83, 35.97]
        }, {"district": "大宁县", "data": [110.75, 36.47]}, {"district": "隰县", "data": [110.93, 36.7]}, {
            "district": "永和县",
            "data": [110.63, 36.77]
        }, {"district": "蒲县", "data": [111.08, 36.42]}, {
            "district": "汾西县",
            "data": [111.57, 36.65]
        }, {"district": "侯马市", "data": [111.35, 35.62]}, {"district": "霍州市", "data": [111.72, 36.57]}]
    }, {
        "city": "吕梁市",
        "districts": [{"district": "吕梁市", "data": [111.13, 37.52]}, {
            "district": "离石区",
            "data": [111.13, 37.52]
        }, {"district": "文水县", "data": [112.02, 37.43]}, {
            "district": "交城县",
            "data": [112.15, 37.55]
        }, {"district": "兴县", "data": [111.12, 38.47]}, {"district": "临县", "data": [110.98, 37.95]}, {
            "district": "柳林县",
            "data": [110.9, 37.43]
        }, {"district": "石楼县", "data": [110.83, 37]}, {"district": "岚县", "data": [111.67, 38.28]}, {
            "district": "方山县",
            "data": [111.23, 37.88]
        }, {"district": "中阳县", "data": [111.18, 37.33]}, {
            "district": "交口县",
            "data": [111.2, 36.97]
        }, {"district": "孝义市", "data": [111.77, 37.15]}, {"district": "汾阳市", "data": [111.78, 37.27]}]
    }]
}, {
    "province": "内蒙古自治区",
    "citys": [{
        "city": "呼和浩特市",
        "districts": [{"district": "呼和浩特市", "data": [111.73, 40.83]}, {
            "district": "新城区",
            "data": [111.65, 40.87]
        }, {"district": "回民区", "data": [111.6, 40.8]}, {"district": "玉泉区", "data": [111.67, 40.75]}, {
            "district": "赛罕区",
            "data": [111.68, 40.8]
        }, {"district": "土默特左旗", "data": [111.13, 40.72]}, {
            "district": "托克托县",
            "data": [111.18, 40.27]
        }, {"district": "和林格尔县", "data": [111.82, 40.38]}, {
            "district": "清水河县",
            "data": [111.68, 39.92]
        }, {"district": "武川县", "data": [111.45, 41.08]}]
    }, {
        "city": "包头市",
        "districts": [{"district": "包头市", "data": [109.83, 40.65]}, {
            "district": "东河区",
            "data": [110.02, 40.58]
        }, {"district": "昆都仑区", "data": [109.83, 40.63]}, {
            "district": "青山区",
            "data": [109.9, 40.65]
        }, {"district": "石拐区", "data": [110.27, 40.68]}, {
            "district": "九原区",
            "data": [109.97, 40.6]
        }, {"district": "土默特右旗", "data": [110.52, 40.57]}, {
            "district": "固阳县",
            "data": [110.05, 41.03]
        }, {"district": "达尔罕茂明安联合旗", "data": [110.43, 41.7]}]
    }, {
        "city": "乌海市",
        "districts": [{"district": "乌海市", "data": [106.82, 39.67]}, {
            "district": "海勃湾区",
            "data": [106.83, 39.7]
        }, {"district": "海南区", "data": [106.88, 39.43]}, {"district": "乌达区", "data": [106.7, 39.5]}]
    }, {
        "city": "赤峰市",
        "districts": [{"district": "赤峰市", "data": [118.92, 42.27]}, {
            "district": "红山区",
            "data": [118.97, 42.28]
        }, {"district": "元宝山区", "data": [119.28, 42.03]}, {
            "district": "松山区",
            "data": [118.92, 42.28]
        }, {"district": "阿鲁科尔沁旗", "data": [120.08, 43.88]}, {
            "district": "巴林左旗",
            "data": [119.38, 43.98]
        }, {"district": "巴林右旗", "data": [118.67, 43.52]}, {
            "district": "林西县",
            "data": [118.05, 43.6]
        }, {"district": "克什克腾旗", "data": [117.53, 43.25]}, {
            "district": "翁牛特旗",
            "data": [119.02, 42.93]
        }, {"district": "喀喇沁旗", "data": [118.7, 41.93]}, {
            "district": "宁城县",
            "data": [119.33, 41.6]
        }, {"district": "敖汉旗", "data": [119.9, 42.28]}]
    }, {
        "city": "通辽市",
        "districts": [{"district": "通辽市", "data": [122.27, 43.62]}, {
            "district": "科尔沁区",
            "data": [122.27, 43.62]
        }, {"district": "科尔沁左翼中旗", "data": [123.32, 44.13]}, {
            "district": "科尔沁左翼后旗",
            "data": [122.35, 42.95]
        }, {"district": "开鲁县", "data": [121.3, 43.6]}, {"district": "库伦旗", "data": [121.77, 42.73]}, {
            "district": "奈曼旗",
            "data": [120.65, 42.85]
        }, {"district": "扎鲁特旗", "data": [120.92, 44.55]}, {"district": "霍林郭勒市", "data": [119.65, 45.53]}]
    }, {
        "city": "鄂尔多斯市",
        "districts": [{"district": "鄂尔多斯市", "data": [109.8, 39.62]}, {
            "district": "东胜区",
            "data": [110, 39.82]
        }, {"district": "达拉特旗", "data": [110.03, 40.4]}, {
            "district": "准格尔旗",
            "data": [111.23, 39.87]
        }, {"district": "鄂托克前旗", "data": [107.48, 38.18]}, {
            "district": "鄂托克旗",
            "data": [107.98, 39.1]
        }, {"district": "杭锦旗", "data": [108.72, 39.83]}, {
            "district": "乌审旗",
            "data": [108.85, 38.6]
        }, {"district": "伊金霍洛旗", "data": [109.73, 39.57]}]
    }, {
        "city": "呼伦贝尔市",
        "districts": [{"district": "呼伦贝尔市", "data": [119.77, 49.22]}, {
            "district": "海拉尔区",
            "data": [119.77, 49.22]
        }, {"district": "阿荣旗", "data": [123.47, 48.13]}, {
            "district": "鄂伦春自治旗",
            "data": [123.72, 50.58]
        }, {"district": "鄂温克族自治旗", "data": [119.75, 49.13]}, {
            "district": "陈巴尔虎旗",
            "data": [119.43, 49.32]
        }, {"district": "新巴尔虎左旗", "data": [118.27, 48.22]}, {
            "district": "新巴尔虎右旗",
            "data": [116.82, 48.67]
        }, {"district": "满洲里市", "data": [117.45, 49.58]}, {
            "district": "牙克石市",
            "data": [120.73, 49.28]
        }, {"district": "扎兰屯市", "data": [122.75, 47.98]}, {
            "district": "额尔古纳市",
            "data": [120.18, 50.23]
        }, {"district": "根河市", "data": [121.52, 50.78]}]
    }, {
        "city": "巴彦淖尔市",
        "districts": [{"district": "巴彦淖尔市", "data": [107.42, 40.75]}, {
            "district": "临河区",
            "data": [107.4, 40.75]
        }, {"district": "五原县", "data": [108.27, 41.1]}, {
            "district": "磴口县",
            "data": [107.02, 40.33]
        }, {"district": "乌拉特前旗", "data": [108.65, 40.72]}, {
            "district": "乌拉特中旗",
            "data": [108.52, 41.57]
        }, {"district": "乌拉特后旗", "data": [107.07, 41.1]}, {"district": "杭锦后旗", "data": [107.15, 40.88]}]
    }, {
        "city": "乌兰察布市",
        "districts": [{"district": "乌兰察布市", "data": [113.12, 40.98]}, {
            "district": "集宁区",
            "data": [113.1, 41.03]
        }, {"district": "卓资县", "data": [112.57, 40.9]}, {"district": "化德县", "data": [114, 41.9]}, {
            "district": "商都县",
            "data": [113.53, 41.55]
        }, {"district": "兴和县", "data": [113.88, 40.88]}, {
            "district": "凉城县",
            "data": [112.48, 40.53]
        }, {"district": "察哈尔右翼前旗", "data": [113.22, 40.78]}, {
            "district": "察哈尔右翼中旗",
            "data": [112.63, 41.27]
        }, {"district": "察哈尔右翼后旗", "data": [113.18, 41.45]}, {
            "district": "四子王旗",
            "data": [111.7, 41.52]
        }, {"district": "丰镇市", "data": [113.15, 40.43]}]
    }, {
        "city": "兴安盟",
        "districts": [{"district": "兴安盟", "data": [122.05, 46.08]}, {
            "district": "乌兰浩特市",
            "data": [122.05, 46.08]
        }, {"district": "阿尔山市", "data": [119.93, 47.18]}, {
            "district": "科尔沁右翼前旗",
            "data": [121.92, 46.07]
        }, {"district": "科尔沁右翼中旗", "data": [121.47, 45.05]}, {
            "district": "扎赉特旗",
            "data": [122.9, 46.73]
        }, {"district": "突泉县", "data": [121.57, 45.38]}]
    }, {
        "city": "锡林郭勒盟",
        "districts": [{"district": "锡林郭勒盟", "data": [116.07, 43.95]}, {
            "district": "二连浩特市",
            "data": [111.98, 43.65]
        }, {"district": "锡林浩特市", "data": [116.07, 43.93]}, {
            "district": "阿巴嘎旗",
            "data": [114.97, 44.02]
        }, {"district": "苏尼特左旗", "data": [113.63, 43.85]}, {
            "district": "苏尼特右旗",
            "data": [112.65, 42.75]
        }, {"district": "东乌珠穆沁旗", "data": [116.97, 45.52]}, {
            "district": "西乌珠穆沁旗",
            "data": [117.6, 44.58]
        }, {"district": "太仆寺旗", "data": [115.28, 41.9]}, {
            "district": "镶黄旗",
            "data": [113.83, 42.23]
        }, {"district": "正镶白旗", "data": [115, 42.3]}, {"district": "正蓝旗", "data": [116, 42.25]}, {
            "district": "多伦县",
            "data": [116.47, 42.18]
        }]
    }, {
        "city": "阿拉善盟",
        "districts": [{"district": "阿拉善盟", "data": [105.67, 38.83]}, {
            "district": "阿拉善左旗",
            "data": [105.67, 38.83]
        }, {"district": "阿拉善右旗", "data": [101.68, 39.2]}, {"district": "额济纳旗", "data": [101.07, 41.97]}]
    }]
}, {
    "province": "辽宁省",
    "citys": [{
        "city": "沈阳市",
        "districts": [{"district": "沈阳市", "data": [123.43, 41.8]}, {
            "district": "和平区",
            "data": [123.4, 41.78]
        }, {"district": "沈河区", "data": [123.45, 41.8]}, {"district": "大东区", "data": [123.47, 41.8]}, {
            "district": "皇姑区",
            "data": [123.42, 41.82]
        }, {"district": "铁西区", "data": [122.95, 41.12]}, {
            "district": "苏家屯区",
            "data": [123.33, 41.67]
        }, {"district": "东陵区", "data": [123.47, 41.77]}, {
            "district": "新城子区",
            "data": [123.52, 42.05]
        }, {"district": "于洪区", "data": [123.3, 41.78]}, {
            "district": "辽中县",
            "data": [122.72, 41.52]
        }, {"district": "康平县", "data": [123.35, 42.75]}, {"district": "法库县", "data": [123.4, 42.5]}, {
            "district": "新民市",
            "data": [122.82, 42]
        }]
    }, {
        "city": "大连市",
        "districts": [{"district": "大连市", "data": [121.62, 38.92]}, {
            "district": "中山区",
            "data": [121.63, 38.92]
        }, {"district": "西岗区", "data": [121.6, 38.92]}, {
            "district": "沙河口区",
            "data": [121.58, 38.9]
        }, {"district": "甘井子区", "data": [121.57, 38.95]}, {
            "district": "旅顺口区",
            "data": [121.27, 38.82]
        }, {"district": "金州区", "data": [121.7, 39.1]}, {
            "district": "长海县",
            "data": [122.58, 39.27]
        }, {"district": "瓦房店市", "data": [122, 39.62]}, {"district": "普兰店市", "data": [121.95, 39.4]}, {
            "district": "庄河市",
            "data": [122.98, 39.7]
        }]
    }, {
        "city": "鞍山市",
        "districts": [{"district": "鞍山市", "data": [122.98, 41.1]}, {
            "district": "铁东区",
            "data": [122.98, 41.1]
        }, {"district": "铁西区", "data": [122.95, 41.12]}, {"district": "立山区", "data": [123, 41.15]}, {
            "district": "千山区",
            "data": [122.97, 41.07]
        }, {"district": "台安县", "data": [122.42, 41.38]}, {
            "district": "岫岩满族自治县",
            "data": [123.28, 40.28]
        }, {"district": "海城市", "data": [122.7, 40.88]}]
    }, {
        "city": "抚顺市",
        "districts": [{"district": "抚顺市", "data": [123.98, 41.88]}, {
            "district": "新抚区",
            "data": [123.88, 41.87]
        }, {"district": "东洲区", "data": [124.02, 41.85]}, {
            "district": "望花区",
            "data": [123.78, 41.85]
        }, {"district": "顺城区", "data": [123.93, 41.88]}, {
            "district": "抚顺县",
            "data": [123.9, 41.88]
        }, {"district": "新宾满族自治县", "data": [125.03, 41.73]}, {"district": "清原满族自治县", "data": [124.92, 42.1]}]
    }, {
        "city": "本溪市",
        "districts": [{"district": "本溪市", "data": [123.77, 41.3]}, {
            "district": "平山区",
            "data": [123.77, 41.3]
        }, {"district": "溪湖区", "data": [123.77, 41.33]}, {
            "district": "明山区",
            "data": [123.82, 41.3]
        }, {"district": "南芬区", "data": [123.73, 41.1]}, {
            "district": "本溪满族自治县",
            "data": [124.12, 41.3]
        }, {"district": "桓仁满族自治县", "data": [125.35, 41.27]}]
    }, {
        "city": "丹东市",
        "districts": [{"district": "丹东市", "data": [124.38, 40.13]}, {
            "district": "元宝区",
            "data": [124.38, 40.13]
        }, {"district": "振兴区", "data": [124.35, 40.08]}, {
            "district": "振安区",
            "data": [124.42, 40.17]
        }, {"district": "宽甸满族自治县", "data": [124.78, 40.73]}, {
            "district": "东港市",
            "data": [124.15, 39.87]
        }, {"district": "凤城市", "data": [124.07, 40.45]}]
    }, {
        "city": "锦州市",
        "districts": [{"district": "锦州市", "data": [121.13, 41.1]}, {
            "district": "古塔区",
            "data": [121.12, 41.13]
        }, {"district": "凌河区", "data": [121.15, 41.12]}, {"district": "太和区", "data": [121.1, 41.1]}, {
            "district": "黑山县",
            "data": [122.12, 41.7]
        }, {"district": "义县", "data": [121.23, 41.53]}, {"district": "凌海市", "data": [121.35, 41.17]}]
    }, {
        "city": "营口市",
        "districts": [{"district": "营口市", "data": [122.23, 40.67]}, {
            "district": "站前区",
            "data": [122.27, 40.68]
        }, {"district": "西市区", "data": [122.22, 40.67]}, {
            "district": "鲅鱼圈区",
            "data": [122.12, 40.27]
        }, {"district": "老边区", "data": [122.37, 40.67]}, {
            "district": "盖州市",
            "data": [122.35, 40.4]
        }, {"district": "大石桥市", "data": [122.5, 40.65]}]
    }, {
        "city": "阜新市",
        "districts": [{"district": "阜新市", "data": [121.67, 42.02]}, {
            "district": "海州区",
            "data": [121.65, 42.02]
        }, {"district": "太平区", "data": [121.67, 42.02]}, {
            "district": "清河门区",
            "data": [121.42, 41.75]
        }, {"district": "细河区", "data": [121.68, 42.03]}, {
            "district": "阜新蒙古族自治县",
            "data": [121.75, 42.07]
        }, {"district": "彰武县", "data": [122.53, 42.38]}]
    }, {
        "city": "辽阳市",
        "districts": [{"district": "辽阳市", "data": [123.17, 41.27]}, {
            "district": "白塔区",
            "data": [123.17, 41.27]
        }, {"district": "文圣区", "data": [123.18, 41.27]}, {
            "district": "宏伟区",
            "data": [123.2, 41.2]
        }, {"district": "弓长岭区", "data": [123.45, 41.13]}, {
            "district": "太子河区",
            "data": [123.18, 41.25]
        }, {"district": "辽阳县", "data": [123.07, 41.22]}, {"district": "灯塔市", "data": [123.33, 41.42]}]
    }, {
        "city": "盘锦市",
        "districts": [{"district": "盘锦市", "data": [122.07, 41.12]}, {
            "district": "双台子区",
            "data": [122.05, 41.2]
        }, {"district": "兴隆台区", "data": [122.07, 41.12]}, {
            "district": "大洼县",
            "data": [122.07, 40.98]
        }, {"district": "盘山县", "data": [122.02, 41.25]}]
    }, {
        "city": "铁岭市",
        "districts": [{"district": "铁岭市", "data": [123.83, 42.28]}, {
            "district": "银州区",
            "data": [123.85, 42.28]
        }, {"district": "清河区", "data": [124.15, 42.53]}, {
            "district": "铁岭县",
            "data": [123.83, 42.3]
        }, {"district": "西丰县", "data": [124.72, 42.73]}, {
            "district": "昌图县",
            "data": [124.1, 42.78]
        }, {"district": "调兵山市", "data": [123.55, 42.47]}, {"district": "开原市", "data": [124.03, 42.55]}]
    }, {
        "city": "朝阳市",
        "districts": [{"district": "朝阳市", "data": [120.45, 41.57]}, {
            "district": "双塔区",
            "data": [120.45, 41.57]
        }, {"district": "龙城区", "data": [120.43, 41.6]}, {
            "district": "朝阳县",
            "data": [120.47, 41.58]
        }, {"district": "建平县", "data": [119.63, 41.4]}, {"district": "北票市", "data": [120.77, 41.8]}, {
            "district": "凌源市",
            "data": [119.4, 41.25]
        }]
    }, {
        "city": "葫芦岛市",
        "districts": [{"district": "葫芦岛市", "data": [120.83, 40.72]}, {
            "district": "连山区",
            "data": [120.87, 40.77]
        }, {"district": "龙港区", "data": [120.93, 40.72]}, {
            "district": "南票区",
            "data": [120.75, 41.1]
        }, {"district": "绥中县", "data": [120.33, 40.32]}, {
            "district": "建昌县",
            "data": [119.8, 40.82]
        }, {"district": "兴城市", "data": [120.72, 40.62]}]
    }]
}, {
    "province": "吉林省",
    "citys": [{
        "city": "长春市",
        "districts": [{"district": "长春市", "data": [125.32, 43.9]}, {
            "district": "南关区",
            "data": [125.33, 43.87]
        }, {"district": "宽城区", "data": [125.32, 43.92]}, {
            "district": "朝阳区",
            "data": [125.28, 43.83]
        }, {"district": "二道区", "data": [125.37, 43.87]}, {
            "district": "绿园区",
            "data": [125.25, 43.88]
        }, {"district": "双阳区", "data": [125.67, 43.52]}, {
            "district": "农安县",
            "data": [125.18, 44.43]
        }, {"district": "九台市", "data": [125.83, 44.15]}, {
            "district": "榆树市",
            "data": [126.55, 44.82]
        }, {"district": "德惠市", "data": [125.7, 44.53]}]
    }, {
        "city": "吉林市",
        "districts": [{"district": "吉林市", "data": [126.55, 43.83]}, {
            "district": "昌邑区",
            "data": [126.57, 43.88]
        }, {"district": "龙潭区", "data": [126.57, 43.92]}, {
            "district": "船营区",
            "data": [126.53, 43.83]
        }, {"district": "丰满区", "data": [126.57, 43.82]}, {
            "district": "永吉县",
            "data": [126.5, 43.67]
        }, {"district": "蛟河市", "data": [127.33, 43.72]}, {
            "district": "桦甸市",
            "data": [126.73, 42.97]
        }, {"district": "舒兰市", "data": [126.95, 44.42]}, {"district": "磐石市", "data": [126.05, 42.95]}]
    }, {
        "city": "四平市",
        "districts": [{"district": "四平市", "data": [124.35, 43.17]}, {
            "district": "铁西区",
            "data": [124.35, 43.15]
        }, {"district": "铁东区", "data": [124.38, 43.17]}, {
            "district": "梨树县",
            "data": [124.33, 43.32]
        }, {"district": "伊通满族自治县", "data": [125.3, 43.35]}, {
            "district": "公主岭市",
            "data": [124.82, 43.5]
        }, {"district": "双辽市", "data": [123.5, 43.52]}]
    }, {
        "city": "辽源市",
        "districts": [{"district": "辽源市", "data": [125.13, 42.88]}, {
            "district": "龙山区",
            "data": [125.12, 42.9]
        }, {"district": "西安区", "data": [125.15, 42.92]}, {
            "district": "东丰县",
            "data": [125.53, 42.68]
        }, {"district": "东辽县", "data": [125, 42.92]}]
    }, {
        "city": "通化市",
        "districts": [{"district": "通化市", "data": [125.93, 41.73]}, {
            "district": "东昌区",
            "data": [125.95, 41.73]
        }, {"district": "二道江区", "data": [126.03, 41.77]}, {
            "district": "通化县",
            "data": [125.75, 41.68]
        }, {"district": "辉南县", "data": [126.03, 42.68]}, {
            "district": "柳河县",
            "data": [125.73, 42.28]
        }, {"district": "梅河口市", "data": [125.68, 42.53]}, {"district": "集安市", "data": [126.18, 41.12]}]
    }, {
        "city": "白山市",
        "districts": [{"district": "白山市", "data": [126.42, 41.93]}, {
            "district": "八道江区",
            "data": [126.4, 41.93]
        }, {"district": "抚松县", "data": [127.28, 42.33]}, {
            "district": "靖宇县",
            "data": [126.8, 42.4]
        }, {"district": "长白朝鲜族自治县", "data": [128.2, 41.42]}, {"district": "临江市", "data": [126.9, 41.8]}]
    }, {
        "city": "松原市",
        "districts": [{"district": "松原市", "data": [124.82, 45.13]}, {
            "district": "宁江区",
            "data": [124.8, 45.17]
        }, {"district": "长岭县", "data": [123.98, 44.28]}, {
            "district": "乾安县",
            "data": [124.02, 45.02]
        }, {"district": "扶余县", "data": [126.02, 44.98]}]
    }, {
        "city": "白城市",
        "districts": [{"district": "白城市", "data": [122.83, 45.62]}, {
            "district": "洮北区",
            "data": [122.85, 45.62]
        }, {"district": "镇赉县", "data": [123.2, 45.85]}, {
            "district": "通榆县",
            "data": [123.08, 44.82]
        }, {"district": "洮南市", "data": [122.78, 45.33]}, {"district": "大安市", "data": [124.28, 45.5]}]
    }, {
        "city": "延边朝鲜族自治州",
        "districts": [{"district": "延边朝鲜族自治州", "data": [129.5, 42.88]}, {
            "district": "延吉市",
            "data": [129.5, 42.88]
        }, {"district": "图们市", "data": [129.83, 42.97]}, {
            "district": "敦化市",
            "data": [128.23, 43.37]
        }, {"district": "珲春市", "data": [130.37, 42.87]}, {
            "district": "龙井市",
            "data": [129.42, 42.77]
        }, {"district": "和龙市", "data": [129, 42.53]}, {"district": "汪清县", "data": [129.75, 43.32]}, {
            "district": "安图县",
            "data": [128.9, 43.12]
        }]
    }]
}, {
    "province": "黑龙江省",
    "citys": [{
        "city": "哈尔滨市",
        "districts": [{"district": "哈尔滨市", "data": [126.53, 45.8]}, {
            "district": "道里区",
            "data": [126.62, 45.77]
        }, {"district": "南岗区", "data": [126.68, 45.77]}, {
            "district": "道外区",
            "data": [126.65, 45.78]
        }, {"district": "香坊区", "data": [126.68, 45.72]}, {
            "district": "平房区",
            "data": [126.62, 45.62]
        }, {"district": "松北区", "data": [126.55, 45.8]}, {"district": "呼兰区", "data": [126.58, 45.9]}, {
            "district": "依兰县",
            "data": [129.55, 46.32]
        }, {"district": "方正县", "data": [128.83, 45.83]}, {
            "district": "宾县",
            "data": [127.48, 45.75]
        }, {"district": "巴彦县", "data": [127.4, 46.08]}, {
            "district": "木兰县",
            "data": [128.03, 45.95]
        }, {"district": "通河县", "data": [128.75, 45.97]}, {
            "district": "延寿县",
            "data": [128.33, 45.45]
        }, {"district": "双城市", "data": [126.32, 45.37]}, {
            "district": "尚志市",
            "data": [127.95, 45.22]
        }, {"district": "五常市", "data": [127.15, 44.92]}]
    }, {
        "city": "齐齐哈尔市",
        "districts": [{"district": "齐齐哈尔市", "data": [123.95, 47.33]}, {
            "district": "龙沙区",
            "data": [123.95, 47.32]
        }, {"district": "建华区", "data": [123.95, 47.35]}, {
            "district": "铁锋区",
            "data": [123.98, 47.35]
        }, {"district": "昂昂溪区", "data": [123.8, 47.15]}, {
            "district": "富拉尔基区",
            "data": [123.62, 47.2]
        }, {"district": "龙江县", "data": [123.18, 47.33]}, {
            "district": "依安县",
            "data": [125.3, 47.88]
        }, {"district": "泰来县", "data": [123.42, 46.4]}, {"district": "甘南县", "data": [123.5, 47.92]}, {
            "district": "富裕县",
            "data": [124.47, 47.82]
        }, {"district": "克山县", "data": [125.87, 48.03]}, {
            "district": "克东县",
            "data": [126.25, 48.03]
        }, {"district": "拜泉县", "data": [126.08, 47.6]}, {"district": "讷河市", "data": [124.87, 48.48]}]
    }, {
        "city": "鸡西市",
        "districts": [{"district": "鸡西市", "data": [130.97, 45.3]}, {
            "district": "鸡冠区",
            "data": [130.97, 45.3]
        }, {"district": "恒山区", "data": [130.93, 45.2]}, {
            "district": "滴道区",
            "data": [130.78, 45.37]
        }, {"district": "梨树区", "data": [130.68, 45.08]}, {"district": "城子河区", "data": [131, 45.33]}, {
            "district": "麻山区",
            "data": [130.52, 45.2]
        }, {"district": "鸡东县", "data": [131.13, 45.25]}, {
            "district": "虎林市",
            "data": [132.98, 45.77]
        }, {"district": "密山市", "data": [131.87, 45.55]}]
    }, {
        "city": "鹤岗市",
        "districts": [{"district": "鹤岗市", "data": [130.27, 47.33]}, {
            "district": "向阳区",
            "data": [130.28, 47.33]
        }, {"district": "工农区", "data": [130.25, 47.32]}, {
            "district": "南山区",
            "data": [130.28, 47.3]
        }, {"district": "兴安区", "data": [130.22, 47.27]}, {
            "district": "东山区",
            "data": [130.32, 47.33]
        }, {"district": "兴山区", "data": [130.3, 47.37]}, {
            "district": "萝北县",
            "data": [130.83, 47.58]
        }, {"district": "绥滨县", "data": [131.85, 47.28]}]
    }, {
        "city": "双鸭山市",
        "districts": [{"district": "双鸭山市", "data": [131.15, 46.63]}, {
            "district": "尖山区",
            "data": [131.17, 46.63]
        }, {"district": "岭东区", "data": [131.13, 46.57]}, {
            "district": "四方台区",
            "data": [131.33, 46.58]
        }, {"district": "宝山区", "data": [131.4, 46.57]}, {
            "district": "集贤县",
            "data": [131.13, 46.72]
        }, {"district": "友谊县", "data": [131.8, 46.78]}, {"district": "宝清县", "data": [132.2, 46.32]}, {
            "district": "饶河县",
            "data": [134.02, 46.8]
        }]
    }, {
        "city": "大庆市",
        "districts": [{"district": "大庆市", "data": [125.03, 46.58]}, {
            "district": "萨尔图区",
            "data": [125.02, 46.6]
        }, {"district": "龙凤区", "data": [125.1, 46.53]}, {
            "district": "让胡路区",
            "data": [124.85, 46.65]
        }, {"district": "红岗区", "data": [124.88, 46.4]}, {
            "district": "大同区",
            "data": [124.82, 46.03]
        }, {"district": "肇州县", "data": [125.27, 45.7]}, {
            "district": "肇源县",
            "data": [125.08, 45.52]
        }, {"district": "林甸县", "data": [124.87, 47.18]}, {"district": "杜尔伯特蒙古族自治县", "data": [124.45, 46.87]}]
    }, {
        "city": "伊春市",
        "districts": [{"district": "伊春市", "data": [128.9, 47.73]}, {
            "district": "南岔区",
            "data": [129.28, 47.13]
        }, {"district": "友好区", "data": [128.82, 47.85]}, {
            "district": "西林区",
            "data": [129.28, 47.48]
        }, {"district": "翠峦区", "data": [128.65, 47.72]}, {
            "district": "新青区",
            "data": [129.53, 48.28]
        }, {"district": "美溪区", "data": [129.13, 47.63]}, {
            "district": "金山屯区",
            "data": [129.43, 47.42]
        }, {"district": "五营区", "data": [129.25, 48.12]}, {
            "district": "乌马河区",
            "data": [128.78, 47.72]
        }, {"district": "汤旺河区", "data": [129.57, 48.45]}, {
            "district": "带岭区",
            "data": [129.02, 47.02]
        }, {"district": "乌伊岭区", "data": [129.42, 48.6]}, {
            "district": "红星区",
            "data": [129.38, 48.23]
        }, {"district": "上甘岭区", "data": [129.02, 47.97]}, {
            "district": "嘉荫县",
            "data": [130.38, 48.88]
        }, {"district": "铁力市", "data": [128.02, 46.98]}]
    }, {
        "city": "佳木斯市",
        "districts": [{"district": "佳木斯市", "data": [130.37, 46.82]}, {
            "district": "向阳区",
            "data": [130.28, 47.33]
        }, {"district": "前进区", "data": [130.37, 46.82]}, {"district": "东风区", "data": [130.4, 46.82]}, {
            "district": "郊区",
            "data": [130.32, 46.8]
        }, {"district": "桦南县", "data": [130.57, 46.23]}, {
            "district": "桦川县",
            "data": [130.72, 47.02]
        }, {"district": "汤原县", "data": [129.9, 46.73]}, {
            "district": "抚远县",
            "data": [134.28, 48.37]
        }, {"district": "同江市", "data": [132.52, 47.65]}, {"district": "富锦市", "data": [132.03, 47.25]}]
    }, {
        "city": "七台河市",
        "districts": [{"district": "七台河市", "data": [130.95, 45.78]}, {
            "district": "新兴区",
            "data": [130.83, 45.8]
        }, {"district": "桃山区", "data": [130.97, 45.77]}, {
            "district": "茄子河区",
            "data": [131.07, 45.77]
        }, {"district": "勃利县", "data": [130.57, 45.75]}]
    }, {
        "city": "牡丹江市",
        "districts": [{"district": "牡丹江市", "data": [129.6, 44.58]}, {
            "district": "东安区",
            "data": [129.62, 44.58]
        }, {"district": "阳明区", "data": [129.63, 44.6]}, {
            "district": "爱民区",
            "data": [129.58, 44.58]
        }, {"district": "西安区", "data": [129.62, 44.57]}, {
            "district": "东宁县",
            "data": [131.12, 44.07]
        }, {"district": "林口县", "data": [130.27, 45.3]}, {
            "district": "绥芬河市",
            "data": [131.15, 44.42]
        }, {"district": "海林市", "data": [129.38, 44.57]}, {
            "district": "宁安市",
            "data": [129.47, 44.35]
        }, {"district": "穆棱市", "data": [130.52, 44.92]}]
    }, {
        "city": "黑河市",
        "districts": [{"district": "黑河市", "data": [127.48, 50.25]}, {
            "district": "爱辉区",
            "data": [127.48, 50.25]
        }, {"district": "逊克县", "data": [128.47, 49.58]}, {
            "district": "孙吴县",
            "data": [127.32, 49.42]
        }, {"district": "北安市", "data": [126.52, 48.23]}, {"district": "五大连池市", "data": [126.2, 48.52]}]
    }, {
        "city": "绥化市",
        "districts": [{"district": "绥化市", "data": [126.98, 46.63]}, {
            "district": "北林区",
            "data": [126.98, 46.63]
        }, {"district": "望奎县", "data": [126.48, 46.83]}, {
            "district": "兰西县",
            "data": [126.28, 46.27]
        }, {"district": "青冈县", "data": [126.1, 46.68]}, {
            "district": "庆安县",
            "data": [127.52, 46.88]
        }, {"district": "明水县", "data": [125.9, 47.18]}, {"district": "绥棱县", "data": [127.1, 47.25]}, {
            "district": "安达市",
            "data": [125.33, 46.4]
        }, {"district": "肇东市", "data": [125.98, 46.07]}, {"district": "海伦市", "data": [126.97, 47.47]}]
    }, {
        "city": "大兴安岭地区",
        "districts": [{"district": "大兴安岭地区", "data": [124.12, 50.42]}, {
            "district": "呼玛县",
            "data": [126.65, 51.73]
        }, {"district": "塔河县", "data": [124.7, 52.32]}, {"district": "漠河县", "data": [122.53, 52.97]}]
    }]
}, {
    "province": "上海市",
    "citys": [{
        "city": "上海市",
        "districts": [{"district": "上海市", "data": [121.47, 31.23]}, {
            "district": "黄浦区",
            "data": [121.48, 31.23]
        }, {"district": "卢湾区", "data": [121.47, 31.22]}, {
            "district": "徐汇区",
            "data": [121.43, 31.18]
        }, {"district": "长宁区", "data": [121.42, 31.22]}, {
            "district": "静安区",
            "data": [121.45, 31.23]
        }, {"district": "普陀区", "data": [121.4, 31.25]}, {
            "district": "闸北区",
            "data": [121.45, 31.25]
        }, {"district": "虹口区", "data": [121.5, 31.27]}, {
            "district": "杨浦区",
            "data": [121.52, 31.27]
        }, {"district": "闵行区", "data": [121.38, 31.12]}, {
            "district": "宝山区",
            "data": [121.48, 31.4]
        }, {"district": "嘉定区", "data": [121.27, 31.38]}, {
            "district": "浦东新区",
            "data": [121.53, 31.22]
        }, {"district": "金山区", "data": [121.33, 30.75]}, {
            "district": "松江区",
            "data": [121.22, 31.03]
        }, {"district": "青浦区", "data": [121.12, 31.15]}, {
            "district": "南汇区",
            "data": [121.75, 31.05]
        }, {"district": "奉贤区", "data": [121.47, 30.92]}, {"district": "崇明县", "data": [121.4, 31.62]}]
    }]
}, {
    "province": "江苏省",
    "citys": [{
        "city": "南京市",
        "districts": [{"district": "南京市", "data": [118.78, 32.07]}, {
            "district": "玄武区",
            "data": [118.8, 32.05]
        }, {"district": "白下区", "data": [118.78, 32.03]}, {
            "district": "秦淮区",
            "data": [118.8, 32.02]
        }, {"district": "建邺区", "data": [118.75, 32.03]}, {
            "district": "鼓楼区",
            "data": [117.18, 34.28]
        }, {"district": "下关区", "data": [118.73, 32.08]}, {
            "district": "浦口区",
            "data": [118.62, 32.05]
        }, {"district": "栖霞区", "data": [118.88, 32.12]}, {"district": "雨花台区", "data": [118.77, 32]}, {
            "district": "江宁区",
            "data": [118.85, 31.95]
        }, {"district": "六合区", "data": [118.83, 32.35]}, {
            "district": "溧水县",
            "data": [119.02, 31.65]
        }, {"district": "高淳县", "data": [118.88, 31.33]}]
    }, {
        "city": "无锡市",
        "districts": [{"district": "无锡市", "data": [120.3, 31.57]}, {
            "district": "崇安区",
            "data": [120.3, 31.58]
        }, {"district": "南长区", "data": [120.3, 31.57]}, {
            "district": "北塘区",
            "data": [120.28, 31.58]
        }, {"district": "锡山区", "data": [120.35, 31.6]}, {
            "district": "惠山区",
            "data": [120.28, 31.68]
        }, {"district": "滨湖区", "data": [120.27, 31.57]}, {
            "district": "江阴市",
            "data": [120.27, 31.9]
        }, {"district": "宜兴市", "data": [119.82, 31.35]}]
    }, {
        "city": "徐州市",
        "districts": [{"district": "徐州市", "data": [117.18, 34.27]}, {
            "district": "鼓楼区",
            "data": [117.18, 34.28]
        }, {"district": "云龙区", "data": [117.22, 34.25]}, {
            "district": "九里区",
            "data": [117.13, 34.3]
        }, {"district": "贾汪区", "data": [117.45, 34.45]}, {
            "district": "泉山区",
            "data": [117.18, 34.25]
        }, {"district": "丰县", "data": [116.6, 34.7]}, {"district": "沛县", "data": [116.93, 34.73]}, {
            "district": "铜山县",
            "data": [117.17, 34.18]
        }, {"district": "睢宁县", "data": [117.95, 33.9]}, {
            "district": "新沂市",
            "data": [118.35, 34.38]
        }, {"district": "邳州市", "data": [117.95, 34.32]}]
    }, {
        "city": "常州市",
        "districts": [{"district": "常州市", "data": [119.95, 31.78]}, {
            "district": "天宁区",
            "data": [119.93, 31.75]
        }, {"district": "钟楼区", "data": [119.93, 31.78]}, {
            "district": "戚墅堰区",
            "data": [120.05, 31.73]
        }, {"district": "新北区", "data": [119.97, 31.83]}, {
            "district": "武进区",
            "data": [119.93, 31.72]
        }, {"district": "溧阳市", "data": [119.48, 31.42]}, {"district": "金坛市", "data": [119.57, 31.75]}]
    }, {
        "city": "苏州市",
        "districts": [{"district": "苏州市", "data": [120.58, 31.3]}, {
            "district": "沧浪区",
            "data": [120.63, 31.3]
        }, {"district": "平江区", "data": [120.63, 31.32]}, {
            "district": "金阊区",
            "data": [120.6, 31.32]
        }, {"district": "虎丘区", "data": [120.57, 31.3]}, {
            "district": "吴中区",
            "data": [120.63, 31.27]
        }, {"district": "相城区", "data": [120.63, 31.37]}, {
            "district": "常熟市",
            "data": [120.75, 31.65]
        }, {"district": "张家港市", "data": [120.55, 31.87]}, {
            "district": "昆山市",
            "data": [120.98, 31.38]
        }, {"district": "吴江市", "data": [120.63, 31.17]}, {"district": "太仓市", "data": [121.1, 31.45]}]
    }, {
        "city": "南通市",
        "districts": [{"district": "南通市", "data": [120.88, 31.98]}, {
            "district": "崇川区",
            "data": [120.85, 32]
        }, {"district": "港闸区", "data": [120.8, 32.03]}, {
            "district": "海安县",
            "data": [120.45, 32.55]
        }, {"district": "如东县", "data": [121.18, 32.32]}, {
            "district": "启东市",
            "data": [121.65, 31.82]
        }, {"district": "如皋市", "data": [120.57, 32.4]}, {
            "district": "通州市",
            "data": [121.07, 32.08]
        }, {"district": "海门市", "data": [121.17, 31.9]}]
    }, {
        "city": "连云港市",
        "districts": [{"district": "连云港市", "data": [119.22, 34.6]}, {
            "district": "连云区",
            "data": [119.37, 34.75]
        }, {"district": "新浦区", "data": [119.17, 34.6]}, {
            "district": "海州区",
            "data": [119.12, 34.57]
        }, {"district": "赣榆县", "data": [119.12, 34.83]}, {
            "district": "东海县",
            "data": [118.77, 34.53]
        }, {"district": "灌云县", "data": [119.25, 34.3]}, {"district": "灌南县", "data": [119.35, 34.08]}]
    }, {
        "city": "淮安市",
        "districts": [{"district": "淮安市", "data": [119.02, 33.62]}, {
            "district": "清河区",
            "data": [119.02, 33.6]
        }, {"district": "楚州区", "data": [119.13, 33.5]}, {
            "district": "淮阴区",
            "data": [119.03, 33.63]
        }, {"district": "清浦区", "data": [119.03, 33.58]}, {
            "district": "涟水县",
            "data": [119.27, 33.78]
        }, {"district": "洪泽县", "data": [118.83, 33.3]}, {"district": "盱眙县", "data": [118.48, 33]}, {
            "district": "金湖县",
            "data": [119.02, 33.02]
        }]
    }, {
        "city": "盐城市",
        "districts": [{"district": "盐城市", "data": [120.15, 33.35]}, {
            "district": "亭湖区",
            "data": [120.13, 33.4]
        }, {"district": "盐都区", "data": [120.15, 33.33]}, {
            "district": "响水县",
            "data": [119.57, 34.2]
        }, {"district": "滨海县", "data": [119.83, 33.98]}, {
            "district": "阜宁县",
            "data": [119.8, 33.78]
        }, {"district": "射阳县", "data": [120.25, 33.78]}, {
            "district": "建湖县",
            "data": [119.8, 33.47]
        }, {"district": "东台市", "data": [120.3, 32.85]}, {"district": "大丰市", "data": [120.47, 33.2]}]
    }, {
        "city": "扬州市",
        "districts": [{"district": "扬州市", "data": [119.4, 32.4]}, {
            "district": "广陵区",
            "data": [119.43, 32.38]
        }, {"district": "邗江区", "data": [119.4, 32.38]}, {"district": "维扬区", "data": [119.4, 32.42]}, {
            "district": "宝应县",
            "data": [119.3, 33.23]
        }, {"district": "仪征市", "data": [119.18, 32.27]}, {
            "district": "高邮市",
            "data": [119.43, 32.78]
        }, {"district": "江都市", "data": [119.55, 32.43]}]
    }, {
        "city": "镇江市",
        "districts": [{"district": "镇江市", "data": [119.45, 32.2]}, {
            "district": "京口区",
            "data": [119.47, 32.2]
        }, {"district": "润州区", "data": [119.4, 32.2]}, {"district": "丹徒区", "data": [119.45, 32.13]}, {
            "district": "丹阳市",
            "data": [119.57, 32]
        }, {"district": "扬中市", "data": [119.82, 32.23]}, {"district": "句容市", "data": [119.17, 31.95]}]
    }, {
        "city": "泰州市",
        "districts": [{"district": "泰州市", "data": [119.92, 32.45]}, {
            "district": "兴化市",
            "data": [119.85, 32.92]
        }, {"district": "靖江市", "data": [120.27, 32.02]}, {
            "district": "泰兴市",
            "data": [120.02, 32.17]
        }, {"district": "姜堰市", "data": [120.15, 32.52]}]
    }, {
        "city": "宿迁市",
        "districts": [{"district": "宿迁市", "data": [118.28, 33.97]}, {
            "district": "宿城区",
            "data": [118.25, 33.97]
        }, {"district": "宿豫区", "data": [118.32, 33.95]}, {
            "district": "沭阳县",
            "data": [118.77, 34.13]
        }, {"district": "泗阳县", "data": [118.68, 33.72]}, {"district": "泗洪县", "data": [118.22, 33.47]}]
    }]
}, {
    "province": "浙江省",
    "citys": [{
        "city": "杭州市",
        "districts": [{"district": "杭州市", "data": [120.15, 30.28]}, {
            "district": "上城区",
            "data": [120.17, 30.25]
        }, {"district": "下城区", "data": [120.17, 30.28]}, {
            "district": "江干区",
            "data": [120.2, 30.27]
        }, {"district": "拱墅区", "data": [120.13, 30.32]}, {
            "district": "西湖区",
            "data": [120.13, 30.27]
        }, {"district": "滨江区", "data": [120.2, 30.2]}, {"district": "萧山区", "data": [120.27, 30.17]}, {
            "district": "余杭区",
            "data": [120.3, 30.42]
        }, {"district": "桐庐县", "data": [119.67, 29.8]}, {"district": "淳安县", "data": [119.03, 29.6]}, {
            "district": "建德市",
            "data": [119.28, 29.48]
        }, {"district": "富阳市", "data": [119.95, 30.05]}, {"district": "临安市", "data": [119.72, 30.23]}]
    }, {
        "city": "宁波市",
        "districts": [{"district": "宁波市", "data": [121.55, 29.88]}, {
            "district": "海曙区",
            "data": [121.55, 29.87]
        }, {"district": "江东区", "data": [121.57, 29.87]}, {
            "district": "江北区",
            "data": [121.55, 29.88]
        }, {"district": "北仑区", "data": [121.85, 29.93]}, {
            "district": "镇海区",
            "data": [121.72, 29.95]
        }, {"district": "鄞州区", "data": [121.53, 29.83]}, {
            "district": "象山县",
            "data": [121.87, 29.48]
        }, {"district": "宁海县", "data": [121.43, 29.28]}, {
            "district": "余姚市",
            "data": [121.15, 30.03]
        }, {"district": "慈溪市", "data": [121.23, 30.17]}, {"district": "奉化市", "data": [121.4, 29.65]}]
    }, {
        "city": "温州市",
        "districts": [{"district": "温州市", "data": [120.7, 28]}, {
            "district": "鹿城区",
            "data": [120.65, 28.02]
        }, {"district": "龙湾区", "data": [120.82, 27.93]}, {
            "district": "洞头县",
            "data": [121.15, 27.83]
        }, {"district": "永嘉县", "data": [120.68, 28.15]}, {
            "district": "平阳县",
            "data": [120.57, 27.67]
        }, {"district": "苍南县", "data": [120.4, 27.5]}, {"district": "文成县", "data": [120.08, 27.78]}, {
            "district": "泰顺县",
            "data": [119.72, 27.57]
        }, {"district": "瑞安市", "data": [120.63, 27.78]}, {"district": "乐清市", "data": [120.95, 28.13]}]
    }, {
        "city": "嘉兴市",
        "districts": [{"district": "嘉兴市", "data": [120.75, 30.75]}, {
            "district": "秀洲区",
            "data": [120.7, 30.77]
        }, {"district": "嘉善县", "data": [120.92, 30.85]}, {
            "district": "海盐县",
            "data": [120.95, 30.53]
        }, {"district": "海宁市", "data": [120.68, 30.53]}, {
            "district": "平湖市",
            "data": [121.02, 30.7]
        }, {"district": "桐乡市", "data": [120.57, 30.63]}]
    }, {
        "city": "湖州市",
        "districts": [{"district": "湖州市", "data": [120.08, 30.9]}, {
            "district": "吴兴区",
            "data": [120.12, 30.87]
        }, {"district": "南浔区", "data": [120.43, 30.88]}, {
            "district": "德清县",
            "data": [119.97, 30.53]
        }, {"district": "长兴县", "data": [119.9, 31.02]}, {"district": "安吉县", "data": [119.68, 30.63]}]
    }, {
        "city": "绍兴市",
        "districts": [{"district": "绍兴市", "data": [120.57, 30]}, {
            "district": "越城区",
            "data": [120.57, 30]
        }, {"district": "绍兴县", "data": [120.47, 30.08]}, {"district": "新昌县", "data": [120.9, 29.5]}, {
            "district": "诸暨市",
            "data": [120.23, 29.72]
        }, {"district": "上虞市", "data": [120.87, 30.03]}, {"district": "嵊州市", "data": [120.82, 29.58]}]
    }, {
        "city": "金华市",
        "districts": [{"district": "金华市", "data": [119.65, 29.08]}, {
            "district": "婺城区",
            "data": [119.65, 29.08]
        }, {"district": "金东区", "data": [119.7, 29.08]}, {"district": "武义县", "data": [119.82, 28.9]}, {
            "district": "浦江县",
            "data": [119.88, 29.45]
        }, {"district": "磐安县", "data": [120.43, 29.05]}, {
            "district": "兰溪市",
            "data": [119.45, 29.22]
        }, {"district": "义乌市", "data": [120.07, 29.3]}, {
            "district": "东阳市",
            "data": [120.23, 29.28]
        }, {"district": "永康市", "data": [120.03, 28.9]}]
    }, {
        "city": "衢州市",
        "districts": [{"district": "衢州市", "data": [118.87, 28.93]}, {
            "district": "柯城区",
            "data": [118.87, 28.93]
        }, {"district": "衢江区", "data": [118.93, 28.98]}, {
            "district": "常山县",
            "data": [118.52, 28.9]
        }, {"district": "开化县", "data": [118.42, 29.13]}, {
            "district": "龙游县",
            "data": [119.17, 29.03]
        }, {"district": "江山市", "data": [118.62, 28.75]}]
    }, {
        "city": "舟山市",
        "districts": [{"district": "舟山市", "data": [122.2, 30]}, {
            "district": "定海区",
            "data": [122.1, 30.02]
        }, {"district": "普陀区", "data": [122.3, 29.95]}, {"district": "岱山县", "data": [122.2, 30.25]}, {
            "district": "嵊泗县",
            "data": [122.45, 30.73]
        }]
    }, {
        "city": "台州市",
        "districts": [{"district": "台州市", "data": [121.43, 28.68]}, {
            "district": "椒江区",
            "data": [121.43, 28.68]
        }, {"district": "黄岩区", "data": [121.27, 28.65]}, {
            "district": "路桥区",
            "data": [121.38, 28.58]
        }, {"district": "玉环县", "data": [121.23, 28.13]}, {
            "district": "三门县",
            "data": [121.38, 29.12]
        }, {"district": "天台县", "data": [121.03, 29.13]}, {
            "district": "仙居县",
            "data": [120.73, 28.87]
        }, {"district": "温岭市", "data": [121.37, 28.37]}, {"district": "临海市", "data": [121.12, 28.85]}]
    }, {
        "city": "丽水市",
        "districts": [{"district": "丽水市", "data": [119.92, 28.45]}, {
            "district": "莲都区",
            "data": [119.92, 28.45]
        }, {"district": "青田县", "data": [120.28, 28.15]}, {
            "district": "缙云县",
            "data": [120.07, 28.65]
        }, {"district": "遂昌县", "data": [119.27, 28.6]}, {
            "district": "松阳县",
            "data": [119.48, 28.45]
        }, {"district": "云和县", "data": [119.57, 28.12]}, {
            "district": "庆元县",
            "data": [119.05, 27.62]
        }, {"district": "景宁畲族自治县", "data": [119.63, 27.98]}, {"district": "龙泉市", "data": [119.13, 28.08]}]
    }]
}, {
    "province": "安徽省",
    "citys": [{
        "city": "合肥市",
        "districts": [{"district": "合肥市", "data": [117.25, 31.83]}, {
            "district": "瑶海区",
            "data": [117.3, 31.87]
        }, {"district": "庐阳区", "data": [117.25, 31.88]}, {
            "district": "蜀山区",
            "data": [117.27, 31.85]
        }, {"district": "包河区", "data": [117.3, 31.8]}, {"district": "长丰县", "data": [117.17, 32.48]}, {
            "district": "肥东县",
            "data": [117.47, 31.88]
        }, {"district": "肥西县", "data": [117.17, 31.72]}]
    }, {
        "city": "芜湖市",
        "districts": [{"district": "芜湖市", "data": [118.38, 31.33]}, {
            "district": "镜湖区",
            "data": [118.37, 31.35]
        }, {"district": "鸠江区", "data": [118.38, 31.37]}, {
            "district": "芜湖县",
            "data": [118.57, 31.15]
        }, {"district": "繁昌县", "data": [118.2, 31.08]}, {"district": "南陵县", "data": [118.33, 30.92]}]
    }, {
        "city": "蚌埠市",
        "districts": [{"district": "蚌埠市", "data": [117.38, 32.92]}, {
            "district": "龙子湖区",
            "data": [117.38, 32.95]
        }, {"district": "蚌山区", "data": [117.35, 32.95]}, {
            "district": "禹会区",
            "data": [117.33, 32.93]
        }, {"district": "淮上区", "data": [117.35, 32.97]}, {
            "district": "怀远县",
            "data": [117.18, 32.97]
        }, {"district": "五河县", "data": [117.88, 33.15]}, {"district": "固镇县", "data": [117.32, 33.32]}]
    }, {
        "city": "淮南市",
        "districts": [{"district": "淮南市", "data": [117, 32.63]}, {
            "district": "大通区",
            "data": [117.05, 32.63]
        }, {"district": "田家庵区", "data": [117, 32.67]}, {
            "district": "谢家集区",
            "data": [116.85, 32.6]
        }, {"district": "八公山区", "data": [116.83, 32.63]}, {
            "district": "潘集区",
            "data": [116.82, 32.78]
        }, {"district": "凤台县", "data": [116.72, 32.7]}]
    }, {
        "city": "马鞍山市",
        "districts": [{"district": "马鞍山市", "data": [118.5, 31.7]}, {
            "district": "金家庄区",
            "data": [118.48, 31.73]
        }, {"district": "花山区", "data": [118.5, 31.72]}, {
            "district": "雨山区",
            "data": [118.48, 31.68]
        }, {"district": "当涂县", "data": [118.48, 31.55]}]
    }, {
        "city": "淮北市",
        "districts": [{"district": "淮北市", "data": [116.8, 33.95]}, {
            "district": "杜集区",
            "data": [116.82, 34]
        }, {"district": "相山区", "data": [116.8, 33.95]}, {"district": "烈山区", "data": [116.8, 33.9]}, {
            "district": "濉溪县",
            "data": [116.77, 33.92]
        }]
    }, {
        "city": "铜陵市",
        "districts": [{"district": "铜陵市", "data": [117.82, 30.93]}, {
            "district": "铜官山区",
            "data": [117.82, 30.93]
        }, {"district": "狮子山区", "data": [117.85, 30.95]}, {
            "district": "郊区",
            "data": [117.78, 30.92]
        }, {"district": "铜陵县", "data": [117.78, 30.95]}]
    }, {
        "city": "安庆市",
        "districts": [{"district": "安庆市", "data": [117.05, 30.53]}, {
            "district": "迎江区",
            "data": [117.05, 30.5]
        }, {"district": "大观区", "data": [117.03, 30.52]}, {
            "district": "郊区",
            "data": [117.78, 30.92]
        }, {"district": "怀宁县", "data": [116.83, 30.72]}, {"district": "枞阳县", "data": [117.2, 30.7]}, {
            "district": "潜山县",
            "data": [116.57, 30.63]
        }, {"district": "太湖县", "data": [116.27, 30.43]}, {
            "district": "宿松县",
            "data": [116.12, 30.15]
        }, {"district": "望江县", "data": [116.68, 30.13]}, {
            "district": "岳西县",
            "data": [116.35, 30.85]
        }, {"district": "桐城市", "data": [116.95, 31.05]}]
    }, {
        "city": "黄山市",
        "districts": [{"district": "黄山市", "data": [118.33, 29.72]}, {
            "district": "屯溪区",
            "data": [118.33, 29.72]
        }, {"district": "黄山区", "data": [118.13, 30.3]}, {"district": "徽州区", "data": [118.33, 29.82]}, {
            "district": "歙县",
            "data": [118.43, 29.87]
        }, {"district": "休宁县", "data": [118.18, 29.78]}, {
            "district": "黟县",
            "data": [117.93, 29.93]
        }, {"district": "祁门县", "data": [117.72, 29.87]}]
    }, {
        "city": "滁州市",
        "districts": [{"district": "滁州市", "data": [118.32, 32.3]}, {
            "district": "琅琊区",
            "data": [118.3, 32.3]
        }, {"district": "南谯区", "data": [118.3, 32.32]}, {
            "district": "来安县",
            "data": [118.43, 32.45]
        }, {"district": "全椒县", "data": [118.27, 32.1]}, {
            "district": "定远县",
            "data": [117.67, 32.53]
        }, {"district": "凤阳县", "data": [117.57, 32.87]}, {"district": "天长市", "data": [119, 32.7]}, {
            "district": "明光市",
            "data": [117.98, 32.78]
        }]
    }, {
        "city": "阜阳市",
        "districts": [{"district": "阜阳市", "data": [115.82, 32.9]}, {
            "district": "颍州区",
            "data": [115.8, 32.88]
        }, {"district": "颍东区", "data": [115.85, 32.92]}, {
            "district": "颍泉区",
            "data": [115.8, 32.93]
        }, {"district": "临泉县", "data": [115.25, 33.07]}, {
            "district": "太和县",
            "data": [115.62, 33.17]
        }, {"district": "阜南县", "data": [115.58, 32.63]}, {"district": "颍上县", "data": [116.27, 32.63]}]
    }, {
        "city": "宿州市",
        "districts": [{"district": "宿州市", "data": [116.98, 33.63]}, {
            "district": "埇桥区",
            "data": [116.97, 33.63]
        }, {"district": "砀山县", "data": [116.35, 34.42]}, {
            "district": "萧县",
            "data": [116.93, 34.18]
        }, {"district": "灵璧县", "data": [117.55, 33.55]}, {"district": "泗县", "data": [117.88, 33.48]}]
    }, {
        "city": "巢湖市",
        "districts": [{"district": "巢湖市", "data": [117.87, 31.6]}, {
            "district": "居巢区",
            "data": [117.85, 31.6]
        }, {"district": "庐江县", "data": [117.28, 31.25]}, {
            "district": "无为县",
            "data": [117.92, 31.3]
        }, {"district": "含山县", "data": [118.1, 31.72]}, {"district": "和县", "data": [118.37, 31.72]}]
    }, {
        "city": "六安市",
        "districts": [{"district": "六安市", "data": [116.5, 31.77]}, {
            "district": "金安区",
            "data": [116.5, 31.77]
        }, {"district": "裕安区", "data": [116.48, 31.77]}, {
            "district": "寿县",
            "data": [116.78, 32.58]
        }, {"district": "霍邱县", "data": [116.27, 32.33]}, {
            "district": "舒城县",
            "data": [116.93, 31.47]
        }, {"district": "金寨县", "data": [115.92, 31.72]}, {"district": "霍山县", "data": [116.33, 31.4]}]
    }, {
        "city": "亳州市",
        "districts": [{"district": "亳州市", "data": [115.78, 33.85]}, {
            "district": "谯城区",
            "data": [115.77, 33.88]
        }, {"district": "涡阳县", "data": [116.22, 33.52]}, {
            "district": "蒙城县",
            "data": [116.57, 33.27]
        }, {"district": "利辛县", "data": [116.2, 33.15]}]
    }, {
        "city": "池州市",
        "districts": [{"district": "池州市", "data": [117.48, 30.67]}, {
            "district": "贵池区",
            "data": [117.48, 30.65]
        }, {"district": "东至县", "data": [117.02, 30.1]}, {
            "district": "石台县",
            "data": [117.48, 30.22]
        }, {"district": "青阳县", "data": [117.85, 30.65]}]
    }, {
        "city": "宣城市",
        "districts": [{"district": "宣城市", "data": [118.75, 30.95]}, {
            "district": "宣州区",
            "data": [118.75, 30.95]
        }, {"district": "郎溪县", "data": [119.17, 31.13]}, {"district": "广德县", "data": [119.42, 30.9]}, {
            "district": "泾县",
            "data": [118.4, 30.7]
        }, {"district": "绩溪县", "data": [118.6, 30.07]}, {
            "district": "旌德县",
            "data": [118.53, 30.28]
        }, {"district": "宁国市", "data": [118.98, 30.63]}]
    }]
}, {
    "province": "福建省",
    "citys": [{
        "city": "福州市",
        "districts": [{"district": "福州市", "data": [119.3, 26.08]}, {
            "district": "鼓楼区",
            "data": [119.3, 26.08]
        }, {"district": "台江区", "data": [119.3, 26.07]}, {
            "district": "仓山区",
            "data": [119.32, 26.05]
        }, {"district": "马尾区", "data": [119.45, 26]}, {"district": "晋安区", "data": [119.32, 26.08]}, {
            "district": "闽侯县",
            "data": [119.13, 26.15]
        }, {"district": "连江县", "data": [119.53, 26.2]}, {
            "district": "罗源县",
            "data": [119.55, 26.48]
        }, {"district": "闽清县", "data": [118.85, 26.22]}, {
            "district": "永泰县",
            "data": [118.93, 25.87]
        }, {"district": "平潭县", "data": [119.78, 25.52]}, {
            "district": "福清市",
            "data": [119.38, 25.72]
        }, {"district": "长乐市", "data": [119.52, 25.97]}]
    }, {
        "city": "厦门市",
        "districts": [{"district": "厦门市", "data": [118.08, 24.48]}, {
            "district": "思明区",
            "data": [118.08, 24.45]
        }, {"district": "海沧区", "data": [117.98, 24.47]}, {
            "district": "湖里区",
            "data": [118.08, 24.52]
        }, {"district": "集美区", "data": [118.1, 24.57]}, {
            "district": "同安区",
            "data": [118.15, 24.73]
        }, {"district": "翔安区", "data": [118.23, 24.62]}]
    }, {
        "city": "莆田市",
        "districts": [{"district": "莆田市", "data": [119, 25.43]}, {
            "district": "城厢区",
            "data": [119, 25.43]
        }, {"district": "涵江区", "data": [119.1, 25.45]}, {
            "district": "荔城区",
            "data": [119.02, 25.43]
        }, {"district": "秀屿区", "data": [119.08, 25.32]}, {"district": "仙游县", "data": [118.68, 25.37]}]
    }, {
        "city": "三明市",
        "districts": [{"district": "三明市", "data": [117.62, 26.27]}, {
            "district": "梅列区",
            "data": [117.63, 26.27]
        }, {"district": "三元区", "data": [117.6, 26.23]}, {"district": "明溪县", "data": [117.2, 26.37]}, {
            "district": "清流县",
            "data": [116.82, 26.18]
        }, {"district": "宁化县", "data": [116.65, 26.27]}, {
            "district": "大田县",
            "data": [117.85, 25.7]
        }, {"district": "尤溪县", "data": [118.18, 26.17]}, {"district": "沙县", "data": [117.78, 26.4]}, {
            "district": "将乐县",
            "data": [117.47, 26.73]
        }, {"district": "泰宁县", "data": [117.17, 26.9]}, {
            "district": "建宁县",
            "data": [116.83, 26.83]
        }, {"district": "永安市", "data": [117.37, 25.98]}]
    }, {
        "city": "泉州市",
        "districts": [{"district": "泉州市", "data": [118.67, 24.88]}, {
            "district": "鲤城区",
            "data": [118.6, 24.92]
        }, {"district": "丰泽区", "data": [118.6, 24.92]}, {
            "district": "洛江区",
            "data": [118.67, 24.95]
        }, {"district": "泉港区", "data": [118.88, 25.12]}, {
            "district": "惠安县",
            "data": [118.8, 25.03]
        }, {"district": "安溪县", "data": [118.18, 25.07]}, {
            "district": "永春县",
            "data": [118.3, 25.32]
        }, {"district": "德化县", "data": [118.23, 25.5]}, {
            "district": "金门县",
            "data": [118.32, 24.43]
        }, {"district": "石狮市", "data": [118.65, 24.73]}, {
            "district": "晋江市",
            "data": [118.58, 24.82]
        }, {"district": "南安市", "data": [118.38, 24.97]}]
    }, {
        "city": "漳州市",
        "districts": [{"district": "漳州市", "data": [117.65, 24.52]}, {
            "district": "芗城区",
            "data": [117.65, 24.52]
        }, {"district": "龙文区", "data": [117.72, 24.52]}, {
            "district": "云霄县",
            "data": [117.33, 23.95]
        }, {"district": "漳浦县", "data": [117.62, 24.13]}, {
            "district": "诏安县",
            "data": [117.18, 23.72]
        }, {"district": "长泰县", "data": [117.75, 24.62]}, {
            "district": "东山县",
            "data": [117.43, 23.7]
        }, {"district": "南靖县", "data": [117.37, 24.52]}, {
            "district": "平和县",
            "data": [117.3, 24.37]
        }, {"district": "华安县", "data": [117.53, 25.02]}, {"district": "龙海市", "data": [117.82, 24.45]}]
    }, {
        "city": "南平市",
        "districts": [{"district": "南平市", "data": [118.17, 26.65]}, {
            "district": "延平区",
            "data": [118.17, 26.65]
        }, {"district": "顺昌县", "data": [117.8, 26.8]}, {"district": "浦城县", "data": [118.53, 27.92]}, {
            "district": "光泽县",
            "data": [117.33, 27.55]
        }, {"district": "松溪县", "data": [118.78, 27.53]}, {
            "district": "政和县",
            "data": [118.85, 27.37]
        }, {"district": "邵武市", "data": [117.48, 27.37]}, {
            "district": "武夷山市",
            "data": [118.03, 27.77]
        }, {"district": "建瓯市", "data": [118.32, 27.03]}, {"district": "建阳市", "data": [118.12, 27.33]}]
    }, {
        "city": "龙岩市",
        "districts": [{"district": "龙岩市", "data": [117.03, 25.1]}, {
            "district": "新罗区",
            "data": [117.03, 25.1]
        }, {"district": "长汀县", "data": [116.35, 25.83]}, {
            "district": "永定县",
            "data": [116.73, 24.72]
        }, {"district": "上杭县", "data": [116.42, 25.05]}, {"district": "武平县", "data": [116.1, 25.1]}, {
            "district": "连城县",
            "data": [116.75, 25.72]
        }, {"district": "漳平市", "data": [117.42, 25.3]}]
    }, {
        "city": "宁德市",
        "districts": [{"district": "宁德市", "data": [119.52, 26.67]}, {
            "district": "蕉城区",
            "data": [119.52, 26.67]
        }, {"district": "霞浦县", "data": [120, 26.88]}, {"district": "古田县", "data": [118.75, 26.58]}, {
            "district": "屏南县",
            "data": [118.98, 26.92]
        }, {"district": "寿宁县", "data": [119.5, 27.47]}, {
            "district": "周宁县",
            "data": [119.33, 27.12]
        }, {"district": "柘荣县", "data": [119.9, 27.23]}, {
            "district": "福安市",
            "data": [119.65, 27.08]
        }, {"district": "福鼎市", "data": [120.22, 27.33]}]
    }]
}, {
    "province": "江西省",
    "citys": [{
        "city": "南昌市",
        "districts": [{"district": "南昌市", "data": [115.85, 28.68]}, {
            "district": "东湖区",
            "data": [115.9, 28.68]
        }, {"district": "西湖区", "data": [115.87, 28.67]}, {
            "district": "青云谱区",
            "data": [115.92, 28.63]
        }, {"district": "湾里区", "data": [115.73, 28.72]}, {
            "district": "青山湖区",
            "data": [115.95, 28.68]
        }, {"district": "南昌县", "data": [115.93, 28.55]}, {
            "district": "新建县",
            "data": [115.82, 28.7]
        }, {"district": "安义县", "data": [115.55, 28.85]}, {"district": "进贤县", "data": [116.27, 28.37]}]
    }, {
        "city": "景德镇市",
        "districts": [{"district": "景德镇市", "data": [117.17, 29.27]}, {
            "district": "昌江区",
            "data": [117.17, 29.27]
        }, {"district": "珠山区", "data": [117.2, 29.3]}, {"district": "浮梁县", "data": [117.25, 29.37]}, {
            "district": "乐平市",
            "data": [117.12, 28.97]
        }]
    }, {
        "city": "萍乡市",
        "districts": [{"district": "萍乡市", "data": [113.85, 27.63]}, {
            "district": "安源区",
            "data": [113.87, 27.65]
        }, {"district": "湘东区", "data": [113.73, 27.65]}, {
            "district": "莲花县",
            "data": [113.95, 27.13]
        }, {"district": "上栗县", "data": [113.8, 27.88]}, {"district": "芦溪县", "data": [114.03, 27.63]}]
    }, {
        "city": "九江市",
        "districts": [{"district": "九江市", "data": [116, 29.7]}, {
            "district": "庐山区",
            "data": [115.98, 29.68]
        }, {"district": "浔阳区", "data": [115.98, 29.73]}, {
            "district": "九江县",
            "data": [115.88, 29.62]
        }, {"district": "武宁县", "data": [115.1, 29.27]}, {
            "district": "修水县",
            "data": [114.57, 29.03]
        }, {"district": "永修县", "data": [115.8, 29.03]}, {
            "district": "德安县",
            "data": [115.77, 29.33]
        }, {"district": "星子县", "data": [116.03, 29.45]}, {
            "district": "都昌县",
            "data": [116.18, 29.27]
        }, {"district": "湖口县", "data": [116.22, 29.73]}, {
            "district": "彭泽县",
            "data": [116.55, 29.9]
        }, {"district": "瑞昌市", "data": [115.67, 29.68]}]
    }, {
        "city": "新余市",
        "districts": [{"district": "新余市", "data": [114.92, 27.82]}, {
            "district": "渝水区",
            "data": [114.93, 27.8]
        }, {"district": "分宜县", "data": [114.67, 27.82]}]
    }, {
        "city": "鹰潭市",
        "districts": [{"district": "鹰潭市", "data": [117.07, 28.27]}, {
            "district": "月湖区",
            "data": [117.05, 28.23]
        }, {"district": "余江县", "data": [116.82, 28.2]}, {"district": "贵溪市", "data": [117.22, 28.28]}]
    }, {
        "city": "赣州市",
        "districts": [{"district": "赣州市", "data": [114.93, 25.83]}, {
            "district": "章贡区",
            "data": [114.93, 25.87]
        }, {"district": "赣县", "data": [115, 25.87]}, {"district": "信丰县", "data": [114.93, 25.38]}, {
            "district": "大余县",
            "data": [114.35, 25.4]
        }, {"district": "上犹县", "data": [114.53, 25.8]}, {"district": "崇义县", "data": [114.3, 25.7]}, {
            "district": "安远县",
            "data": [115.38, 25.13]
        }, {"district": "龙南县", "data": [114.78, 24.92]}, {
            "district": "定南县",
            "data": [115.03, 24.78]
        }, {"district": "全南县", "data": [114.52, 24.75]}, {
            "district": "宁都县",
            "data": [116.02, 26.48]
        }, {"district": "于都县", "data": [115.42, 25.95]}, {
            "district": "兴国县",
            "data": [115.35, 26.33]
        }, {"district": "会昌县", "data": [115.78, 25.6]}, {
            "district": "寻乌县",
            "data": [115.65, 24.95]
        }, {"district": "石城县", "data": [116.33, 26.33]}, {
            "district": "瑞金市",
            "data": [116.03, 25.88]
        }, {"district": "南康市", "data": [114.75, 25.65]}]
    }, {
        "city": "吉安市",
        "districts": [{"district": "吉安市", "data": [114.98, 27.12]}, {
            "district": "吉州区",
            "data": [114.98, 27.12]
        }, {"district": "青原区", "data": [115, 27.1]}, {"district": "吉安县", "data": [114.9, 27.05]}, {
            "district": "吉水县",
            "data": [115.13, 27.22]
        }, {"district": "峡江县", "data": [115.33, 27.62]}, {
            "district": "新干县",
            "data": [115.4, 27.77]
        }, {"district": "永丰县", "data": [115.43, 27.32]}, {
            "district": "泰和县",
            "data": [114.88, 26.8]
        }, {"district": "遂川县", "data": [114.52, 26.33]}, {
            "district": "万安县",
            "data": [114.78, 26.47]
        }, {"district": "永新县", "data": [114.23, 26.95]}, {"district": "井冈山市", "data": [114.27, 26.72]}]
    }, {"city": "吉安???", "districts": [{"district": "安福县", "data": [114.62, 27.38]}]}, {
        "city": "宜春市",
        "districts": [{"district": "宜春市", "data": [114.38, 27.8]}, {
            "district": "袁州区",
            "data": [114.38, 27.8]
        }, {"district": "奉新县", "data": [115.38, 28.7]}, {
            "district": "万载县",
            "data": [114.43, 28.12]
        }, {"district": "上高县", "data": [114.92, 28.23]}, {
            "district": "宜丰县",
            "data": [114.78, 28.38]
        }, {"district": "靖安县", "data": [115.35, 28.87]}, {
            "district": "铜鼓县",
            "data": [114.37, 28.53]
        }, {"district": "丰城市", "data": [115.78, 28.2]}, {
            "district": "樟树市",
            "data": [115.53, 28.07]
        }, {"district": "高安市", "data": [115.37, 28.42]}]
    }, {
        "city": "抚州市",
        "districts": [{"district": "抚州市", "data": [116.35, 28]}, {
            "district": "临川区",
            "data": [116.35, 27.98]
        }, {"district": "南城县", "data": [116.63, 27.55]}, {
            "district": "黎川县",
            "data": [116.92, 27.3]
        }, {"district": "南丰县", "data": [116.53, 27.22]}, {
            "district": "崇仁县",
            "data": [116.05, 27.77]
        }, {"district": "乐安县", "data": [115.83, 27.43]}, {
            "district": "宜黄县",
            "data": [116.22, 27.55]
        }, {"district": "金溪县", "data": [116.77, 27.92]}, {
            "district": "资溪县",
            "data": [117.07, 27.7]
        }, {"district": "东乡县", "data": [116.62, 28.23]}, {"district": "广昌县", "data": [116.32, 26.83]}]
    }, {
        "city": "上饶市",
        "districts": [{"district": "上饶市", "data": [117.97, 28.45]}, {
            "district": "信州区",
            "data": [117.95, 28.43]
        }, {"district": "上饶县", "data": [117.92, 28.43]}, {
            "district": "广丰县",
            "data": [118.18, 28.43]
        }, {"district": "玉山县", "data": [118.25, 28.68]}, {
            "district": "铅山县",
            "data": [117.7, 28.32]
        }, {"district": "横峰县", "data": [117.6, 28.42]}, {"district": "弋阳县", "data": [117.43, 28.4]}, {
            "district": "余干县",
            "data": [116.68, 28.7]
        }, {"district": "鄱阳县", "data": [116.67, 29]}, {"district": "万年县", "data": [117.07, 28.7]}, {
            "district": "婺源县",
            "data": [117.85, 29.25]
        }, {"district": "德兴市", "data": [117.57, 28.95]}]
    }]
}, {
    "province": "山东省",
    "citys": [{
        "city": "济南市",
        "districts": [{"district": "济南市", "data": [116.98, 36.67]}, {
            "district": "历下区",
            "data": [117.08, 36.67]
        }, {"district": "市中区", "data": [117, 36.65]}, {"district": "槐荫区", "data": [116.93, 36.65]}, {
            "district": "天桥区",
            "data": [116.98, 36.68]
        }, {"district": "历城区", "data": [117.07, 36.68]}, {
            "district": "长清区",
            "data": [116.73, 36.55]
        }, {"district": "平阴县", "data": [116.45, 36.28]}, {
            "district": "济阳县",
            "data": [117.22, 36.98]
        }, {"district": "商河县", "data": [117.15, 37.32]}, {"district": "章丘市", "data": [117.53, 36.72]}]
    }, {
        "city": "青岛市",
        "districts": [{"district": "青岛市", "data": [120.38, 36.07]}, {
            "district": "市南区",
            "data": [120.38, 36.07]
        }, {"district": "市北区", "data": [120.38, 36.08]}, {
            "district": "四方区",
            "data": [120.35, 36.1]
        }, {"district": "黄岛区", "data": [120.18, 35.97]}, {
            "district": "崂山区",
            "data": [120.47, 36.1]
        }, {"district": "李沧区", "data": [120.43, 36.15]}, {
            "district": "城阳区",
            "data": [120.37, 36.3]
        }, {"district": "胶州市", "data": [120.03, 36.27]}, {
            "district": "即墨市",
            "data": [120.45, 36.38]
        }, {"district": "平度市", "data": [119.95, 36.78]}, {
            "district": "胶南市",
            "data": [120.03, 35.87]
        }, {"district": "莱西市", "data": [120.5, 36.87]}]
    }, {
        "city": "淄博市",
        "districts": [{"district": "淄博市", "data": [118.05, 36.82]}, {
            "district": "张店区",
            "data": [118.03, 36.82]
        }, {"district": "博山区", "data": [117.85, 36.5]}, {"district": "临淄区", "data": [118.3, 36.82]}, {
            "district": "周村区",
            "data": [117.87, 36.8]
        }, {"district": "桓台县", "data": [118.08, 36.97]}, {
            "district": "高青县",
            "data": [117.82, 37.17]
        }, {"district": "沂源县", "data": [118.17, 36.18]}]
    }, {
        "city": "枣庄市",
        "districts": [{"district": "枣庄市", "data": [117.32, 34.82]}, {
            "district": "市中区",
            "data": [117, 36.65]
        }, {"district": "薛城区", "data": [117.25, 34.8]}, {
            "district": "峄城区",
            "data": [117.58, 34.77]
        }, {"district": "台儿庄区", "data": [117.73, 34.57]}, {
            "district": "山亭区",
            "data": [117.45, 35.08]
        }, {"district": "滕州市", "data": [117.15, 35.08]}]
    }, {
        "city": "东营市",
        "districts": [{"district": "东营市", "data": [118.67, 37.43]}, {
            "district": "东营区",
            "data": [118.5, 37.47]
        }, {"district": "河口区", "data": [118.53, 37.88]}, {
            "district": "垦利县",
            "data": [118.55, 37.58]
        }, {"district": "利津县", "data": [118.25, 37.48]}, {"district": "广饶县", "data": [118.4, 37.07]}]
    }, {
        "city": "烟台市",
        "districts": [{"district": "烟台市", "data": [121.43, 37.45]}, {
            "district": "芝罘区",
            "data": [121.38, 37.53]
        }, {"district": "福山区", "data": [121.25, 37.5]}, {"district": "牟平区", "data": [121.6, 37.38]}, {
            "district": "莱山区",
            "data": [121.43, 37.5]
        }, {"district": "长岛县", "data": [120.73, 37.92]}, {
            "district": "龙口市",
            "data": [120.52, 37.65]
        }, {"district": "莱阳市", "data": [120.7, 36.98]}, {
            "district": "莱州市",
            "data": [119.93, 37.18]
        }, {"district": "蓬莱市", "data": [120.75, 37.82]}, {
            "district": "招远市",
            "data": [120.4, 37.37]
        }, {"district": "栖霞市", "data": [120.83, 37.3]}, {"district": "海阳市", "data": [121.15, 36.78]}]
    }, {
        "city": "潍坊市",
        "districts": [{"district": "潍坊市", "data": [119.15, 36.7]}, {
            "district": "潍城区",
            "data": [119.1, 36.72]
        }, {"district": "寒亭区", "data": [119.22, 36.77]}, {
            "district": "坊子区",
            "data": [119.17, 36.67]
        }, {"district": "奎文区", "data": [119.12, 36.72]}, {
            "district": "临朐县",
            "data": [118.53, 36.52]
        }, {"district": "昌乐县", "data": [118.82, 36.7]}, {
            "district": "青州市",
            "data": [118.47, 36.68]
        }, {"district": "诸城市", "data": [119.4, 36]}, {"district": "寿光市", "data": [118.73, 36.88]}, {
            "district": "安丘市",
            "data": [119.2, 36.43]
        }, {"district": "高密市", "data": [119.75, 36.38]}, {"district": "昌邑市", "data": [119.4, 36.87]}]
    }, {
        "city": "济宁市",
        "districts": [{"district": "济宁市", "data": [116.58, 35.42]}, {
            "district": "市中区",
            "data": [117, 36.65]
        }, {"district": "任城区", "data": [116.58, 35.42]}, {
            "district": "微山县",
            "data": [117.13, 34.82]
        }, {"district": "鱼台县", "data": [116.65, 35]}, {"district": "金乡县", "data": [116.3, 35.07]}, {
            "district": "嘉祥县",
            "data": [116.33, 35.42]
        }, {"district": "汶上县", "data": [116.48, 35.73]}, {
            "district": "泗水县",
            "data": [117.27, 35.67]
        }, {"district": "梁山县", "data": [116.08, 35.8]}, {
            "district": "曲阜市",
            "data": [116.98, 35.58]
        }, {"district": "兖州市", "data": [116.83, 35.55]}, {"district": "邹城市", "data": [116.97, 35.4]}]
    }, {
        "city": "泰安市",
        "districts": [{"district": "泰安市", "data": [117.08, 36.2]}, {
            "district": "泰山区",
            "data": [117.13, 36.18]
        }, {"district": "岱岳区", "data": [117, 36.18]}, {"district": "宁阳县", "data": [116.8, 35.77]}, {
            "district": "东平县",
            "data": [116.47, 35.93]
        }, {"district": "新泰市", "data": [117.77, 35.92]}, {"district": "肥城市", "data": [116.77, 36.18]}]
    }, {
        "city": "威海市",
        "districts": [{"district": "威海市", "data": [122.12, 37.52]}, {
            "district": "环翠区",
            "data": [122.12, 37.5]
        }, {"district": "文登市", "data": [122.05, 37.2]}, {
            "district": "荣成市",
            "data": [122.42, 37.17]
        }, {"district": "乳山市", "data": [121.53, 36.92]}]
    }, {
        "city": "日照市",
        "districts": [{"district": "日照市", "data": [119.52, 35.42]}, {
            "district": "东港区",
            "data": [119.45, 35.42]
        }, {"district": "岚山区", "data": [119.33, 35.1]}, {"district": "五莲县", "data": [119.2, 35.75]}, {
            "district": "莒县",
            "data": [118.83, 35.58]
        }]
    }, {
        "city": "莱芜市",
        "districts": [{"district": "莱芜市", "data": [117.67, 36.22]}, {
            "district": "莱城区",
            "data": [117.65, 36.2]
        }, {"district": "钢城区", "data": [117.8, 36.07]}]
    }, {
        "city": "临沂市",
        "districts": [{"district": "临沂市", "data": [118.35, 35.05]}, {
            "district": "兰山区",
            "data": [118.33, 35.07]
        }, {"district": "罗庄区", "data": [118.28, 34.98]}, {
            "district": "河东区",
            "data": [118.4, 35.08]
        }, {"district": "沂南县", "data": [118.47, 35.55]}, {
            "district": "郯城县",
            "data": [118.35, 34.62]
        }, {"district": "沂水县", "data": [118.62, 35.78]}, {
            "district": "苍山县",
            "data": [118.05, 34.85]
        }, {"district": "费县", "data": [117.97, 35.27]}, {"district": "平邑县", "data": [117.63, 35.5]}, {
            "district": "莒南县",
            "data": [118.83, 35.18]
        }, {"district": "蒙阴县", "data": [117.93, 35.72]}, {"district": "临沭县", "data": [118.65, 34.92]}]
    }, {
        "city": "德州市",
        "districts": [{"district": "德州市", "data": [116.3, 37.45]}, {
            "district": "德城区",
            "data": [116.3, 37.45]
        }, {"district": "陵县", "data": [116.57, 37.33]}, {
            "district": "宁津县",
            "data": [116.78, 37.65]
        }, {"district": "庆云县", "data": [117.38, 37.78]}, {
            "district": "临邑县",
            "data": [116.87, 37.18]
        }, {"district": "齐河县", "data": [116.75, 36.8]}, {
            "district": "平原县",
            "data": [116.43, 37.17]
        }, {"district": "夏津县", "data": [116, 36.95]}, {"district": "武城县", "data": [116.07, 37.22]}, {
            "district": "乐陵市",
            "data": [117.23, 37.73]
        }, {"district": "禹城市", "data": [116.63, 36.93]}]
    }, {
        "city": "聊城市",
        "districts": [{"district": "聊城市", "data": [115.98, 36.45]}, {
            "district": "东昌府区",
            "data": [115.98, 36.45]
        }, {"district": "阳谷县", "data": [115.78, 36.12]}, {
            "district": "莘县",
            "data": [115.67, 36.23]
        }, {"district": "茌平县", "data": [116.25, 36.58]}, {
            "district": "东阿县",
            "data": [116.25, 36.33]
        }, {"district": "冠县", "data": [115.43, 36.48]}, {
            "district": "高唐县",
            "data": [116.23, 36.87]
        }, {"district": "临清市", "data": [115.7, 36.85]}]
    }, {
        "city": "滨州市",
        "districts": [{"district": "滨州市", "data": [117.97, 37.38]}, {
            "district": "滨城区",
            "data": [118, 37.38]
        }, {"district": "惠民县", "data": [117.5, 37.48]}, {
            "district": "阳信县",
            "data": [117.58, 37.63]
        }, {"district": "无棣县", "data": [117.6, 37.73]}, {"district": "沾化县", "data": [118.13, 37.7]}, {
            "district": "博兴县",
            "data": [118.13, 37.15]
        }, {"district": "邹平县", "data": [117.73, 36.88]}]
    }, {
        "city": "牡丹区",
        "districts": [{"district": "牡丹区", "data": [115.43, 35.25]}, {
            "district": "曹县",
            "data": [115.53, 34.83]
        }, {"district": "单县", "data": [116.08, 34.8]}, {"district": "成武县", "data": [115.88, 34.95]}, {
            "district": "巨野县",
            "data": [116.08, 35.4]
        }, {"district": "郓城县", "data": [115.93, 35.6]}, {"district": "鄄城县", "data": [115.5, 35.57]}, {
            "district": "定陶县",
            "data": [115.57, 35.07]
        }, {"district": "东明县", "data": [115.08, 35.28]}]
    }]
}, {
    "province": "河南省",
    "citys": [{
        "city": "郑州市",
        "districts": [{"district": "郑州市", "data": [113.62, 34.75]}, {
            "district": "中原区",
            "data": [113.6, 34.75]
        }, {"district": "二七区", "data": [113.65, 34.73]}, {
            "district": "管城回族区",
            "data": [113.67, 34.75]
        }, {"district": "金水区", "data": [113.65, 34.78]}, {
            "district": "上街区",
            "data": [113.28, 34.82]
        }, {"district": "惠济区", "data": [113.6, 34.87]}, {
            "district": "中牟县",
            "data": [113.97, 34.72]
        }, {"district": "巩义市", "data": [112.98, 34.77]}, {
            "district": "荥阳市",
            "data": [113.4, 34.78]
        }, {"district": "新密市", "data": [113.38, 34.53]}, {
            "district": "新郑市",
            "data": [113.73, 34.4]
        }, {"district": "登封市", "data": [113.03, 34.47]}]
    }, {
        "city": "开封市",
        "districts": [{"district": "开封市", "data": [114.3, 34.8]}, {
            "district": "龙亭区",
            "data": [114.35, 34.8]
        }, {"district": "顺河回族区", "data": [114.35, 34.8]}, {
            "district": "鼓楼区",
            "data": [114.35, 34.78]
        }, {"district": "杞县", "data": [114.78, 34.55]}, {
            "district": "通许县",
            "data": [114.47, 34.48]
        }, {"district": "尉氏县", "data": [114.18, 34.42]}, {
            "district": "开封县",
            "data": [114.43, 34.77]
        }, {"district": "兰考县", "data": [114.82, 34.82]}]
    }, {
        "city": "洛阳市",
        "districts": [{"district": "洛阳市", "data": [112.45, 34.62]}, {
            "district": "老城区",
            "data": [112.47, 34.68]
        }, {"district": "西工区", "data": [112.43, 34.67]}, {
            "district": "涧西区",
            "data": [112.4, 34.67]
        }, {"district": "吉利区", "data": [112.58, 34.9]}, {
            "district": "洛龙区",
            "data": [112.45, 34.62]
        }, {"district": "孟津县", "data": [112.43, 34.83]}, {
            "district": "新安县",
            "data": [112.15, 34.72]
        }, {"district": "栾川县", "data": [111.62, 33.78]}, {"district": "嵩县", "data": [112.1, 34.15]}, {
            "district": "汝阳县",
            "data": [112.47, 34.15]
        }, {"district": "宜阳县", "data": [112.17, 34.52]}, {
            "district": "洛宁县",
            "data": [111.65, 34.38]
        }, {"district": "伊川县", "data": [112.42, 34.42]}, {"district": "偃师市", "data": [112.78, 34.73]}]
    }, {
        "city": "平顶山市",
        "districts": [{"district": "平顶山市", "data": [113.18, 33.77]}, {
            "district": "新华区",
            "data": [113.3, 33.73]
        }, {"district": "卫东区", "data": [113.33, 33.73]}, {
            "district": "石龙区",
            "data": [112.88, 33.9]
        }, {"district": "湛河区", "data": [113.28, 33.73]}, {
            "district": "宝丰县",
            "data": [113.07, 33.88]
        }, {"district": "叶县", "data": [113.35, 33.62]}, {"district": "鲁山县", "data": [112.9, 33.73]}, {
            "district": "郏县",
            "data": [113.22, 33.97]
        }, {"district": "舞钢市", "data": [113.52, 33.3]}, {"district": "汝州市", "data": [112.83, 34.17]}]
    }, {
        "city": "安阳市",
        "districts": [{"district": "安阳市", "data": [114.38, 36.1]}, {
            "district": "文峰区",
            "data": [114.35, 36.08]
        }, {"district": "北关区", "data": [114.35, 36.12]}, {
            "district": "殷都区",
            "data": [114.3, 36.12]
        }, {"district": "龙安区", "data": [114.32, 36.1]}, {"district": "安阳县", "data": [114.35, 36.1]}, {
            "district": "汤阴县",
            "data": [114.35, 35.92]
        }, {"district": "滑县", "data": [114.52, 35.58]}, {"district": "内黄县", "data": [114.9, 35.95]}, {
            "district": "林州市",
            "data": [113.82, 36.07]
        }]
    }, {
        "city": "鹤壁市",
        "districts": [{"district": "鹤壁市", "data": [114.28, 35.75]}, {
            "district": "鹤山区",
            "data": [114.15, 35.95]
        }, {"district": "山城区", "data": [114.18, 35.9]}, {"district": "淇滨区", "data": [114.3, 35.73]}, {
            "district": "浚县",
            "data": [114.55, 35.67]
        }, {"district": "淇县", "data": [114.2, 35.6]}]
    }, {
        "city": "新乡市",
        "districts": [{"district": "新乡市", "data": [113.9, 35.3]}, {
            "district": "红旗区",
            "data": [113.87, 35.3]
        }, {"district": "卫滨区", "data": [113.85, 35.3]}, {
            "district": "凤泉区",
            "data": [113.92, 35.38]
        }, {"district": "牧野区", "data": [113.9, 35.32]}, {"district": "新乡县", "data": [113.8, 35.2]}, {
            "district": "获嘉县",
            "data": [113.65, 35.27]
        }, {"district": "原阳县", "data": [113.97, 35.05]}, {
            "district": "延津县",
            "data": [114.2, 35.15]
        }, {"district": "封丘县", "data": [114.42, 35.05]}, {
            "district": "长垣县",
            "data": [114.68, 35.2]
        }, {"district": "卫辉市", "data": [114.07, 35.4]}, {"district": "辉县市", "data": [113.8, 35.47]}]
    }, {
        "city": "焦作市",
        "districts": [{"district": "焦作市", "data": [113.25, 35.22]}, {
            "district": "解放区",
            "data": [113.22, 35.25]
        }, {"district": "中站区", "data": [113.17, 35.23]}, {
            "district": "马村区",
            "data": [113.32, 35.27]
        }, {"district": "山阳区", "data": [113.25, 35.22]}, {
            "district": "修武县",
            "data": [113.43, 35.23]
        }, {"district": "博爱县", "data": [113.07, 35.17]}, {"district": "武陟县", "data": [113.38, 35.1]}, {
            "district": "温县",
            "data": [113.08, 34.93]
        }, {"district": "济源市", "data": [112.58, 35.07]}, {
            "district": "沁阳市",
            "data": [112.93, 35.08]
        }, {"district": "孟州市", "data": [112.78, 34.9]}]
    }, {
        "city": "濮阳市",
        "districts": [{"district": "濮阳市", "data": [115.03, 35.77]}, {
            "district": "华龙区",
            "data": [115.07, 35.78]
        }, {"district": "清丰县", "data": [115.12, 35.9]}, {"district": "南乐县", "data": [115.2, 36.08]}, {
            "district": "范县",
            "data": [115.5, 35.87]
        }, {"district": "台前县", "data": [115.85, 36]}, {"district": "濮阳县", "data": [115.02, 35.7]}]
    }, {
        "city": "许昌市",
        "districts": [{"district": "许昌市", "data": [113.85, 34.03]}, {
            "district": "魏都区",
            "data": [113.82, 34.03]
        }, {"district": "许昌县", "data": [113.83, 34]}, {"district": "鄢陵县", "data": [114.2, 34.1]}, {
            "district": "襄城县",
            "data": [113.48, 33.85]
        }, {"district": "禹州市", "data": [113.47, 34.17]}, {"district": "长葛市", "data": [113.77, 34.22]}]
    }, {
        "city": "漯河市",
        "districts": [{"district": "漯河市", "data": [114.02, 33.58]}, {
            "district": "郾城区",
            "data": [114, 33.58]
        }, {"district": "召陵区", "data": [114.07, 33.57]}, {
            "district": "舞阳县",
            "data": [113.6, 33.43]
        }, {"district": "临颍县", "data": [113.93, 33.82]}]
    }, {
        "city": "三门峡市",
        "districts": [{"district": "三门峡市", "data": [111.2, 34.78]}, {
            "district": "湖滨区",
            "data": [111.2, 34.78]
        }, {"district": "渑池县", "data": [111.75, 34.77]}, {"district": "陕县", "data": [111.08, 34.7]}, {
            "district": "卢氏县",
            "data": [111.05, 34.05]
        }, {"district": "义马市", "data": [111.87, 34.75]}, {"district": "灵宝市", "data": [110.87, 34.52]}]
    }, {
        "city": "南阳市",
        "districts": [{"district": "南阳市", "data": [112.52, 33]}, {
            "district": "宛城区",
            "data": [112.55, 33.02]
        }, {"district": "卧龙区", "data": [112.53, 32.98]}, {
            "district": "南召县",
            "data": [112.43, 33.5]
        }, {"district": "方城县", "data": [113, 33.27]}, {"district": "西峡县", "data": [111.48, 33.28]}, {
            "district": "镇平县",
            "data": [112.23, 33.03]
        }, {"district": "内乡县", "data": [111.85, 33.05]}, {
            "district": "淅川县",
            "data": [111.48, 33.13]
        }, {"district": "社旗县", "data": [112.93, 33.05]}, {
            "district": "唐河县",
            "data": [112.83, 32.7]
        }, {"district": "新野县", "data": [112.35, 32.52]}, {
            "district": "桐柏县",
            "data": [113.4, 32.37]
        }, {"district": "邓州市", "data": [112.08, 32.68]}]
    }, {
        "city": "商丘市",
        "districts": [{"district": "商丘市", "data": [115.65, 34.45]}, {
            "district": "梁园区",
            "data": [115.63, 34.45]
        }, {"district": "睢阳区", "data": [115.63, 34.38]}, {
            "district": "民权县",
            "data": [115.13, 34.65]
        }, {"district": "睢县", "data": [115.07, 34.45]}, {
            "district": "宁陵县",
            "data": [115.32, 34.45]
        }, {"district": "柘城县", "data": [115.3, 34.07]}, {"district": "虞城县", "data": [115.85, 34.4]}, {
            "district": "夏邑县",
            "data": [116.13, 34.23]
        }, {"district": "永城市", "data": [116.43, 33.92]}]
    }, {
        "city": "信阳市",
        "districts": [{"district": "信阳市", "data": [114.07, 32.13]}, {
            "district": "浉河区",
            "data": [114.05, 32.12]
        }, {"district": "平桥区", "data": [114.12, 32.1]}, {"district": "罗山县", "data": [114.53, 32.2]}, {
            "district": "光山县",
            "data": [114.9, 32.02]
        }, {"district": "新县", "data": [114.87, 31.63]}, {"district": "商城县", "data": [115.4, 31.8]}, {
            "district": "固始县",
            "data": [115.68, 32.18]
        }, {"district": "潢川县", "data": [115.03, 32.13]}, {"district": "淮滨县", "data": [115.4, 32.43]}, {
            "district": "息县",
            "data": [114.73, 32.35]
        }]
    }, {
        "city": "周口市",
        "districts": [{"district": "周口市", "data": [114.65, 33.62]}, {
            "district": "扶沟县",
            "data": [114.38, 34.07]
        }, {"district": "西华县", "data": [114.53, 33.8]}, {"district": "商水县", "data": [114.6, 33.53]}, {
            "district": "沈丘县",
            "data": [115.07, 33.4]
        }, {"district": "郸城县", "data": [115.2, 33.65]}, {
            "district": "淮阳县",
            "data": [114.88, 33.73]
        }, {"district": "太康县", "data": [114.85, 34.07]}, {
            "district": "鹿邑县",
            "data": [115.48, 33.87]
        }, {"district": "项城市", "data": [114.9, 33.45]}]
    }, {
        "city": "驻马店市",
        "districts": [{"district": "驻马店市", "data": [114.02, 32.98]}, {
            "district": "驿城区",
            "data": [114.05, 32.97]
        }, {"district": "西平县", "data": [114.02, 33.38]}, {
            "district": "上蔡县",
            "data": [114.27, 33.27]
        }, {"district": "平舆县", "data": [114.63, 32.97]}, {
            "district": "正阳县",
            "data": [114.38, 32.6]
        }, {"district": "确山县", "data": [114.02, 32.8]}, {
            "district": "泌阳县",
            "data": [113.32, 32.72]
        }, {"district": "汝南县", "data": [114.35, 33]}, {"district": "遂平县", "data": [114, 33.15]}, {
            "district": "新蔡县",
            "data": [114.98, 32.75]
        }]
    }]
}, {
    "province": "湖北省",
    "citys": [{
        "city": "武汉市",
        "districts": [{"district": "武汉市", "data": [114.3, 30.6]}, {
            "district": "江岸区",
            "data": [114.3, 30.6]
        }, {"district": "江汉区", "data": [114.27, 30.6]}, {
            "district": "硚口区",
            "data": [114.27, 30.57]
        }, {"district": "汉阳区", "data": [114.27, 30.55]}, {
            "district": "武昌区",
            "data": [114.3, 30.57]
        }, {"district": "青山区", "data": [114.38, 30.63]}, {
            "district": "洪山区",
            "data": [114.33, 30.5]
        }, {"district": "东西湖区", "data": [114.13, 30.62]}, {
            "district": "汉南区",
            "data": [114.08, 30.32]
        }, {"district": "蔡甸区", "data": [114.03, 30.58]}, {
            "district": "江夏区",
            "data": [114.32, 30.35]
        }, {"district": "黄陂区", "data": [114.37, 30.87]}, {"district": "新洲区", "data": [114.8, 30.85]}]
    }, {
        "city": "黄石市",
        "districts": [{"district": "黄石市", "data": [115.03, 30.2]}, {
            "district": "黄石港区",
            "data": [115.07, 30.23]
        }, {"district": "西塞山区", "data": [115.12, 30.2]}, {
            "district": "下陆区",
            "data": [114.97, 30.18]
        }, {"district": "铁山区", "data": [114.9, 30.2]}, {"district": "阳新县", "data": [115.2, 29.85]}, {
            "district": "大冶市",
            "data": [114.97, 30.1]
        }]
    }, {
        "city": "十堰市",
        "districts": [{"district": "十堰市", "data": [110.78, 32.65]}, {
            "district": "茅箭区",
            "data": [110.82, 32.6]
        }, {"district": "张湾区", "data": [110.78, 32.65]}, {
            "district": "郧县",
            "data": [110.82, 32.83]
        }, {"district": "郧西县", "data": [110.42, 33]}, {"district": "竹山县", "data": [110.23, 32.23]}, {
            "district": "竹溪县",
            "data": [109.72, 32.32]
        }, {"district": "房县", "data": [110.73, 32.07]}, {"district": "丹江口市", "data": [111.52, 32.55]}]
    }, {
        "city": "宜昌市",
        "districts": [{"district": "宜昌市", "data": [111.28, 30.7]}, {
            "district": "西陵区",
            "data": [111.27, 30.7]
        }, {"district": "伍家岗区", "data": [111.35, 30.65]}, {
            "district": "点军区",
            "data": [111.27, 30.7]
        }, {"district": "猇亭区", "data": [111.42, 30.53]}, {
            "district": "夷陵区",
            "data": [111.32, 30.77]
        }, {"district": "远安县", "data": [111.63, 31.07]}, {
            "district": "兴山县",
            "data": [110.75, 31.35]
        }, {"district": "秭归县", "data": [110.98, 30.83]}, {
            "district": "长阳土家族自治县",
            "data": [111.18, 30.47]
        }, {"district": "五峰土家族自治县", "data": [110.67, 30.2]}, {
            "district": "宜都市",
            "data": [111.45, 30.4]
        }, {"district": "当阳市", "data": [111.78, 30.82]}, {"district": "枝江市", "data": [111.77, 30.43]}]
    }, {
        "city": "襄樊市",
        "districts": [{"district": "襄樊市", "data": [112.15, 32.02]}, {
            "district": "襄城区",
            "data": [112.15, 32.02]
        }, {"district": "樊城区", "data": [112.13, 32.03]}, {
            "district": "襄阳区",
            "data": [112.2, 32.08]
        }, {"district": "南漳县", "data": [111.83, 31.78]}, {
            "district": "谷城县",
            "data": [111.65, 32.27]
        }, {"district": "保康县", "data": [111.25, 31.88]}, {
            "district": "老河口市",
            "data": [111.67, 32.38]
        }, {"district": "枣阳市", "data": [112.75, 32.13]}, {"district": "宜城市", "data": [112.25, 31.72]}]
    }, {
        "city": "鄂州市",
        "districts": [{"district": "鄂州市", "data": [114.88, 30.4]}, {
            "district": "梁子湖区",
            "data": [114.67, 30.08]
        }, {"district": "华容区", "data": [114.73, 30.53]}, {"district": "鄂城区", "data": [114.88, 30.4]}]
    }, {
        "city": "荆门市",
        "districts": [{"district": "荆门市", "data": [112.2, 31.03]}, {
            "district": "东宝区",
            "data": [112.2, 31.05]
        }, {"district": "掇刀区", "data": [112.2, 30.98]}, {"district": "京山县", "data": [113.1, 31.02]}, {
            "district": "沙洋县",
            "data": [112.58, 30.7]
        }, {"district": "钟祥市", "data": [112.58, 31.17]}]
    }, {
        "city": "孝感市",
        "districts": [{"district": "孝感市", "data": [113.92, 30.93]}, {
            "district": "孝南区",
            "data": [113.92, 30.92]
        }, {"district": "孝昌县", "data": [113.97, 31.25]}, {
            "district": "大悟县",
            "data": [114.12, 31.57]
        }, {"district": "云梦县", "data": [113.75, 31.02]}, {
            "district": "应城市",
            "data": [113.57, 30.95]
        }, {"district": "安陆市", "data": [113.68, 31.27]}, {"district": "汉川市", "data": [113.83, 30.65]}]
    }, {
        "city": "荆州市",
        "districts": [{"district": "荆州市", "data": [112.23, 30.33]}, {
            "district": "沙市区",
            "data": [112.25, 30.32]
        }, {"district": "荆州区", "data": [112.18, 30.35]}, {
            "district": "公安县",
            "data": [112.23, 30.07]
        }, {"district": "监利县", "data": [112.88, 29.82]}, {
            "district": "江陵县",
            "data": [112.42, 30.03]
        }, {"district": "石首市", "data": [112.4, 29.73]}, {"district": "洪湖市", "data": [113.45, 29.8]}, {
            "district": "松滋市",
            "data": [111.77, 30.18]
        }]
    }, {
        "city": "黄冈市",
        "districts": [{"district": "黄冈市", "data": [114.87, 30.45]}, {
            "district": "黄州区",
            "data": [114.88, 30.43]
        }, {"district": "团风县", "data": [114.87, 30.63]}, {
            "district": "红安县",
            "data": [114.62, 31.28]
        }, {"district": "罗田县", "data": [115.4, 30.78]}, {
            "district": "英山县",
            "data": [115.67, 30.75]
        }, {"district": "浠水县", "data": [115.27, 30.45]}, {
            "district": "蕲春县",
            "data": [115.43, 30.23]
        }, {"district": "黄梅县", "data": [115.93, 30.08]}, {
            "district": "麻城市",
            "data": [115.03, 31.18]
        }, {"district": "武穴市", "data": [115.55, 29.85]}]
    }, {
        "city": "咸宁市",
        "districts": [{"district": "咸宁市", "data": [114.32, 29.85]}, {
            "district": "咸安区",
            "data": [114.3, 29.87]
        }, {"district": "嘉鱼县", "data": [113.9, 29.98]}, {
            "district": "通城县",
            "data": [113.82, 29.25]
        }, {"district": "崇阳县", "data": [114.03, 29.55]}, {
            "district": "通山县",
            "data": [114.52, 29.6]
        }, {"district": "赤壁市", "data": [113.88, 29.72]}]
    }, {
        "city": "随州市",
        "districts": [{"district": "随州市", "data": [113.37, 31.72]}, {
            "district": "曾都区",
            "data": [113.37, 31.72]
        }, {"district": "广水市", "data": [113.82, 31.62]}]
    }, {
        "city": "恩施土家族苗族自治州",
        "districts": [{"district": "恩施土家族苗族自治州", "data": [109.47, 30.3]}, {
            "district": "恩施市",
            "data": [109.47, 30.3]
        }, {"district": "利川市", "data": [108.93, 30.3]}, {"district": "建始县", "data": [109.73, 30.6]}, {
            "district": "巴东县",
            "data": [110.33, 31.05]
        }, {"district": "宣恩县", "data": [109.48, 29.98]}, {
            "district": "咸丰县",
            "data": [109.15, 29.68]
        }, {"district": "来凤县", "data": [109.4, 29.52]}, {"district": "鹤峰县", "data": [110.03, 29.9]}]
    }, {
        "city": "仙桃市",
        "districts": [{"district": "仙桃市", "data": [113.45, 30.37]}, {
            "district": "潜江市",
            "data": [112.88, 30.42]
        }, {"district": "天门市", "data": [113.17, 30.67]}, {"district": "神农架林区", "data": [110.67, 31.75]}]
    }]
}, {
    "province": "湖南省",
    "citys": [{
        "city": "长沙市",
        "districts": [{"district": "长沙市", "data": [112.93, 28.23]}, {
            "district": "芙蓉区",
            "data": [113.03, 28.18]
        }, {"district": "天心区", "data": [112.98, 28.12]}, {
            "district": "岳麓区",
            "data": [112.93, 28.23]
        }, {"district": "开福区", "data": [112.98, 28.25]}, {
            "district": "雨花区",
            "data": [113.03, 28.13]
        }, {"district": "长沙县", "data": [113.07, 28.25]}, {
            "district": "望城县",
            "data": [112.82, 28.37]
        }, {"district": "宁乡县", "data": [112.55, 28.25]}, {"district": "浏阳市", "data": [113.63, 28.15]}]
    }, {
        "city": "株洲市",
        "districts": [{"district": "株洲市", "data": [113.13, 27.83]}, {
            "district": "荷塘区",
            "data": [113.17, 27.87]
        }, {"district": "芦淞区", "data": [113.15, 27.83]}, {
            "district": "石峰区",
            "data": [113.1, 27.87]
        }, {"district": "天元区", "data": [113.12, 27.83]}, {
            "district": "株洲县",
            "data": [113.13, 27.72]
        }, {"district": "攸县", "data": [113.33, 27]}, {"district": "茶陵县", "data": [113.53, 26.8]}, {
            "district": "炎陵县",
            "data": [113.77, 26.48]
        }, {"district": "醴陵市", "data": [113.48, 27.67]}]
    }, {
        "city": "湘潭市",
        "districts": [{"district": "湘潭市", "data": [112.93, 27.83]}, {
            "district": "雨湖区",
            "data": [112.9, 27.87]
        }, {"district": "岳塘区", "data": [112.95, 27.87]}, {
            "district": "湘潭县",
            "data": [112.95, 27.78]
        }, {"district": "湘乡市", "data": [112.53, 27.73]}, {"district": "韶山市", "data": [112.52, 27.93]}]
    }, {
        "city": "衡阳市",
        "districts": [{"district": "衡阳市", "data": [112.57, 26.9]}, {
            "district": "珠晖区",
            "data": [112.62, 26.9]
        }, {"district": "雁峰区", "data": [112.6, 26.88]}, {"district": "石鼓区", "data": [112.6, 26.9]}, {
            "district": "蒸湘区",
            "data": [112.6, 26.9]
        }, {"district": "南岳区", "data": [112.73, 27.25]}, {
            "district": "衡阳县",
            "data": [112.37, 26.97]
        }, {"district": "衡南县", "data": [112.67, 26.73]}, {
            "district": "衡山县",
            "data": [112.87, 27.23]
        }, {"district": "衡东县", "data": [112.95, 27.08]}, {
            "district": "祁东县",
            "data": [112.12, 26.78]
        }, {"district": "耒阳市", "data": [112.85, 26.42]}, {"district": "常宁市", "data": [112.38, 26.42]}]
    }, {
        "city": "邵阳市",
        "districts": [{"district": "邵阳市", "data": [111.47, 27.25]}, {
            "district": "双清区",
            "data": [111.47, 27.23]
        }, {"district": "大祥区", "data": [111.45, 27.23]}, {
            "district": "北塔区",
            "data": [111.45, 27.25]
        }, {"district": "邵东县", "data": [111.75, 27.25]}, {
            "district": "新邵县",
            "data": [111.45, 27.32]
        }, {"district": "邵阳县", "data": [111.27, 27]}, {"district": "隆回县", "data": [111.03, 27.12]}, {
            "district": "洞口县",
            "data": [110.57, 27.05]
        }, {"district": "绥宁县", "data": [110.15, 26.58]}, {
            "district": "新宁县",
            "data": [110.85, 26.43]
        }, {"district": "城步苗族自治县", "data": [110.32, 26.37]}, {"district": "武冈市", "data": [110.63, 26.73]}]
    }, {
        "city": "岳阳市",
        "districts": [{"district": "岳阳市", "data": [113.12, 29.37]}, {
            "district": "岳阳楼区",
            "data": [113.1, 29.37]
        }, {"district": "云溪区", "data": [113.3, 29.47]}, {"district": "君山区", "data": [113, 29.43]}, {
            "district": "岳阳县",
            "data": [113.12, 29.15]
        }, {"district": "华容县", "data": [112.57, 29.52]}, {
            "district": "湘阴县",
            "data": [112.88, 28.68]
        }, {"district": "平江县", "data": [113.58, 28.72]}, {
            "district": "汨罗市",
            "data": [113.08, 28.8]
        }, {"district": "临湘市", "data": [113.47, 29.48]}]
    }, {
        "city": "常德市",
        "districts": [{"district": "常德市", "data": [111.68, 29.05]}, {
            "district": "武陵区",
            "data": [111.68, 29.03]
        }, {"district": "鼎城区", "data": [111.68, 29.02]}, {
            "district": "安乡县",
            "data": [112.17, 29.42]
        }, {"district": "汉寿县", "data": [111.97, 28.9]}, {"district": "澧县", "data": [111.75, 29.63]}, {
            "district": "临澧县",
            "data": [111.65, 29.45]
        }, {"district": "桃源县", "data": [111.48, 28.9]}, {
            "district": "石门县",
            "data": [111.38, 29.58]
        }, {"district": "津市市", "data": [111.88, 29.62]}]
    }, {
        "city": "张家界市",
        "districts": [{"district": "张家界市", "data": [110.47, 29.13]}, {
            "district": "永定区",
            "data": [110.48, 29.13]
        }, {"district": "武陵源区", "data": [110.53, 29.35]}, {
            "district": "慈利县",
            "data": [111.12, 29.42]
        }, {"district": "桑植县", "data": [110.15, 29.4]}]
    }, {
        "city": "益阳市",
        "districts": [{"district": "益阳市", "data": [112.32, 28.6]}, {
            "district": "资阳区",
            "data": [112.32, 28.6]
        }, {"district": "赫山区", "data": [112.37, 28.6]}, {"district": "南县", "data": [112.4, 29.38]}, {
            "district": "桃江县",
            "data": [112.12, 28.53]
        }, {"district": "安化县", "data": [111.22, 28.38]}, {"district": "沅江市", "data": [112.38, 28.85]}]
    }, {
        "city": "郴州市",
        "districts": [{"district": "郴州市", "data": [113.02, 25.78]}, {
            "district": "北湖区",
            "data": [113.02, 25.8]
        }, {"district": "苏仙区", "data": [113.03, 25.8]}, {
            "district": "桂阳县",
            "data": [112.73, 25.73]
        }, {"district": "宜章县", "data": [112.95, 25.4]}, {"district": "永兴县", "data": [113.1, 26.13]}, {
            "district": "嘉禾县",
            "data": [112.37, 25.58]
        }, {"district": "临武县", "data": [112.55, 25.28]}, {
            "district": "汝城县",
            "data": [113.68, 25.55]
        }, {"district": "桂东县", "data": [113.93, 26.08]}, {
            "district": "安仁县",
            "data": [113.27, 26.7]
        }, {"district": "资兴市", "data": [113.23, 25.98]}]
    }, {
        "city": "永州市",
        "districts": [{"district": "永州市", "data": [111.62, 26.43]}, {
            "district": "冷水滩区",
            "data": [111.6, 26.43]
        }, {"district": "祁阳县", "data": [111.85, 26.58]}, {
            "district": "东安县",
            "data": [111.28, 26.4]
        }, {"district": "双牌县", "data": [111.65, 25.97]}, {
            "district": "道县",
            "data": [111.58, 25.53]
        }, {"district": "江永县", "data": [111.33, 25.28]}, {
            "district": "宁远县",
            "data": [111.93, 25.6]
        }, {"district": "蓝山县", "data": [112.18, 25.37]}, {
            "district": "新田县",
            "data": [112.22, 25.92]
        }, {"district": "江华瑶族自治县", "data": [111.58, 25.18]}]
    }, {
        "city": "怀化市",
        "districts": [{"district": "怀化市", "data": [110, 27.57]}, {
            "district": "鹤城区",
            "data": [109.95, 27.55]
        }, {"district": "中方县", "data": [109.93, 27.4]}, {
            "district": "沅陵县",
            "data": [110.38, 28.47]
        }, {"district": "辰溪县", "data": [110.18, 28]}, {"district": "溆浦县", "data": [110.58, 27.92]}, {
            "district": "会同县",
            "data": [109.72, 26.87]
        }, {"district": "麻阳苗族自治县", "data": [109.8, 27.87]}, {
            "district": "新晃侗族自治县",
            "data": [109.17, 27.37]
        }, {"district": "芷江侗族自治县", "data": [109.68, 27.45]}, {
            "district": "靖州苗族侗族自治县",
            "data": [109.68, 26.58]
        }, {"district": "通道侗族自治县", "data": [109.78, 26.17]}, {"district": "洪江市", "data": [109.82, 27.2]}]
    }, {
        "city": "娄底市",
        "districts": [{"district": "娄底市", "data": [112, 27.73]}, {
            "district": "娄星区",
            "data": [112, 27.73]
        }, {"district": "双峰县", "data": [112.2, 27.45]}, {
            "district": "新化县",
            "data": [111.3, 27.75]
        }, {"district": "冷水江市", "data": [111.43, 27.68]}, {"district": "涟源市", "data": [111.67, 27.7]}]
    }, {
        "city": "湘西土家族苗族自治州",
        "districts": [{"district": "湘西土家族苗族自治州", "data": [109.73, 28.32]}, {
            "district": "吉首市",
            "data": [109.73, 28.32]
        }, {"district": "泸溪县", "data": [110.22, 28.22]}, {
            "district": "凤凰县",
            "data": [109.6, 27.95]
        }, {"district": "花垣县", "data": [109.48, 28.58]}, {
            "district": "保靖县",
            "data": [109.65, 28.72]
        }, {"district": "古丈县", "data": [109.95, 28.62]}, {"district": "永顺县", "data": [109.85, 29]}, {
            "district": "龙山县",
            "data": [109.43, 29.47]
        }]
    }]
}, {
    "province": "广东省",
    "citys": [{
        "city": "广州市",
        "districts": [{"district": "广州市", "data": [113.27, 23.13]}, {
            "district": "荔湾区",
            "data": [113.23, 23.13]
        }, {"district": "越秀区", "data": [113.27, 23.13]}, {
            "district": "海珠区",
            "data": [113.25, 23.1]
        }, {"district": "天河区", "data": [113.35, 23.12]}, {
            "district": "白云区",
            "data": [113.27, 23.17]
        }, {"district": "黄埔区", "data": [113.45, 23.1]}, {
            "district": "番禺区",
            "data": [113.35, 22.95]
        }, {"district": "花都区", "data": [113.22, 23.4]}, {"district": "增城市", "data": [113.83, 23.3]}, {
            "district": "从化市",
            "data": [113.58, 23.55]
        }]
    }, {
        "city": "韶关市",
        "districts": [{"district": "韶关市", "data": [113.6, 24.82]}, {
            "district": "武江区",
            "data": [113.57, 24.8]
        }, {"district": "浈江区", "data": [113.6, 24.8]}, {"district": "曲江区", "data": [113.6, 24.68]}, {
            "district": "始兴县",
            "data": [114.07, 24.95]
        }, {"district": "仁化县", "data": [113.75, 25.08]}, {
            "district": "翁源县",
            "data": [114.13, 24.35]
        }, {"district": "乳源瑶族自治县", "data": [113.27, 24.78]}, {
            "district": "新丰县",
            "data": [114.2, 24.07]
        }, {"district": "乐昌市", "data": [113.35, 25.13]}, {"district": "南雄市", "data": [114.3, 25.12]}]
    }, {
        "city": "深圳市",
        "districts": [{"district": "深圳市", "data": [114.05, 22.55]}, {
            "district": "罗湖区",
            "data": [114.12, 22.55]
        }, {"district": "福田区", "data": [114.05, 22.53]}, {
            "district": "南山区",
            "data": [113.92, 22.52]
        }, {"district": "宝安区", "data": [113.9, 22.57]}, {
            "district": "龙岗区",
            "data": [114.27, 22.73]
        }, {"district": "盐田区", "data": [114.22, 22.55]}]
    }, {
        "city": "珠海市",
        "districts": [{"district": "珠海市", "data": [113.57, 22.27]}, {
            "district": "香洲区",
            "data": [113.55, 22.27]
        }, {"district": "斗门区", "data": [113.28, 22.22]}, {"district": "金湾区", "data": [113.4, 22.07]}]
    }, {
        "city": "汕头市",
        "districts": [{"district": "汕头市", "data": [116.68, 23.35]}, {
            "district": "龙湖区",
            "data": [116.72, 23.37]
        }, {"district": "金平区", "data": [116.7, 23.37]}, {"district": "潮阳区", "data": [116.6, 23.27]}, {
            "district": "潮南区",
            "data": [116.43, 23.25]
        }, {"district": "澄海区", "data": [116.77, 23.48]}, {"district": "南澳县", "data": [117.02, 23.42]}]
    }, {
        "city": "佛山市",
        "districts": [{"district": "佛山市", "data": [113.12, 23.02]}, {
            "district": "南海区",
            "data": [113.15, 23.03]
        }, {"district": "顺德区", "data": [113.3, 22.8]}, {"district": "三水区", "data": [112.87, 23.17]}, {
            "district": "高明区",
            "data": [112.88, 22.9]
        }]
    }, {
        "city": "江门市",
        "districts": [{"district": "江门市", "data": [113.08, 22.58]}, {
            "district": "新会区",
            "data": [113.03, 22.47]
        }, {"district": "台山市", "data": [112.78, 22.25]}, {
            "district": "开平市",
            "data": [112.67, 22.38]
        }, {"district": "鹤山市", "data": [112.97, 22.77]}, {"district": "恩平市", "data": [112.3, 22.18]}]
    }, {
        "city": "湛江市",
        "districts": [{"district": "湛江市", "data": [110.35, 21.27]}, {
            "district": "赤坎区",
            "data": [110.37, 21.27]
        }, {"district": "霞山区", "data": [110.4, 21.2]}, {"district": "坡头区", "data": [110.47, 21.23]}, {
            "district": "麻章区",
            "data": [110.32, 21.27]
        }, {"district": "遂溪县", "data": [110.25, 21.38]}, {
            "district": "徐闻县",
            "data": [110.17, 20.33]
        }, {"district": "廉江市", "data": [110.27, 21.62]}, {
            "district": "雷州市",
            "data": [110.08, 20.92]
        }, {"district": "吴川市", "data": [110.77, 21.43]}]
    }, {
        "city": "茂名市",
        "districts": [{"district": "茂名市", "data": [110.92, 21.67]}, {
            "district": "茂南区",
            "data": [110.92, 21.63]
        }, {"district": "茂港区", "data": [111.02, 21.47]}, {"district": "电白县", "data": [111, 21.5]}, {
            "district": "高州市",
            "data": [110.85, 21.92]
        }, {"district": "化州市", "data": [110.63, 21.67]}, {"district": "信宜市", "data": [110.95, 22.35]}]
    }, {
        "city": "肇庆市",
        "districts": [{"district": "肇庆市", "data": [112.47, 23.05]}, {
            "district": "端州区",
            "data": [112.48, 23.05]
        }, {"district": "鼎湖区", "data": [112.57, 23.17]}, {
            "district": "广宁县",
            "data": [112.43, 23.63]
        }, {"district": "怀集县", "data": [112.18, 23.92]}, {
            "district": "封开县",
            "data": [111.5, 23.43]
        }, {"district": "德庆县", "data": [111.77, 23.15]}, {
            "district": "高要市",
            "data": [112.45, 23.03]
        }, {"district": "四会市", "data": [112.68, 23.33]}]
    }, {
        "city": "惠州市",
        "districts": [{"district": "惠州市", "data": [114.42, 23.12]}, {
            "district": "惠城区",
            "data": [114.4, 23.08]
        }, {"district": "惠阳区", "data": [114.47, 22.8]}, {
            "district": "博罗县",
            "data": [114.28, 23.18]
        }, {"district": "惠东县", "data": [114.72, 22.98]}, {"district": "龙门县", "data": [114.25, 23.73]}]
    }, {
        "city": "梅州市",
        "districts": [{"district": "梅州市", "data": [116.12, 24.28]}, {
            "district": "梅江区",
            "data": [116.12, 24.32]
        }, {"district": "梅县", "data": [116.05, 24.28]}, {"district": "大埔县", "data": [116.7, 24.35]}, {
            "district": "丰顺县",
            "data": [116.18, 23.77]
        }, {"district": "五华县", "data": [115.77, 23.93]}, {
            "district": "平远县",
            "data": [115.88, 24.57]
        }, {"district": "蕉岭县", "data": [116.17, 24.67]}, {"district": "兴宁市", "data": [115.73, 24.15]}]
    }, {
        "city": "汕尾市",
        "districts": [{"district": "汕尾市", "data": [115.37, 22.78]}, {
            "district": "海丰县",
            "data": [115.33, 22.97]
        }, {"district": "陆河县", "data": [115.65, 23.3]}, {"district": "陆丰市", "data": [115.65, 22.95]}]
    }, {
        "city": "河源市",
        "districts": [{"district": "河源市", "data": [114.7, 23.73]}, {
            "district": "源城区",
            "data": [114.7, 23.73]
        }, {"district": "紫金县", "data": [115.18, 23.63]}, {
            "district": "龙川县",
            "data": [115.25, 24.1]
        }, {"district": "连平县", "data": [114.48, 24.37]}, {
            "district": "和平县",
            "data": [114.93, 24.45]
        }, {"district": "东源县", "data": [114.77, 23.82]}]
    }, {
        "city": "阳江市",
        "districts": [{"district": "阳江市", "data": [111.98, 21.87]}, {
            "district": "江城区",
            "data": [111.95, 21.87]
        }, {"district": "阳西县", "data": [111.62, 21.75]}, {
            "district": "阳东县",
            "data": [112.02, 21.88]
        }, {"district": "阳春市", "data": [111.78, 22.18]}]
    }, {
        "city": "清远市",
        "districts": [{"district": "清远市", "data": [113.03, 23.7]}, {
            "district": "清城区",
            "data": [113.02, 23.7]
        }, {"district": "佛冈县", "data": [113.53, 23.88]}, {
            "district": "阳山县",
            "data": [112.63, 24.48]
        }, {"district": "连山壮族瑶族自治县", "data": [112.08, 24.57]}, {
            "district": "连南瑶族自治县",
            "data": [112.28, 24.72]
        }, {"district": "清新县", "data": [112.98, 23.73]}, {
            "district": "英德市",
            "data": [113.4, 24.18]
        }, {"district": "连州市", "data": [112.38, 24.78]}]
    }, {"city": "东莞市", "districts": [{"district": "东莞市", "data": [113.75, 23.05]}]}, {
        "city": "中山市",
        "districts": [{"district": "中山市", "data": [113.38, 22.52]}]
    }, {
        "city": "潮州市",
        "districts": [{"district": "潮州市", "data": [116.62, 23.67]}, {
            "district": "湘桥区",
            "data": [116.63, 23.68]
        }, {"district": "潮安县", "data": [116.68, 23.45]}, {"district": "饶平县", "data": [117, 23.67]}]
    }, {
        "city": "揭阳市",
        "districts": [{"district": "揭阳市", "data": [116.37, 23.55]}, {
            "district": "揭东县",
            "data": [116.42, 23.57]
        }, {"district": "揭西县", "data": [115.83, 23.43]}, {
            "district": "惠来县",
            "data": [116.28, 23.03]
        }, {"district": "普宁市", "data": [116.18, 23.3]}]
    }, {
        "city": "云浮市",
        "districts": [{"district": "云浮市", "data": [112.03, 22.92]}, {
            "district": "云城区",
            "data": [112.03, 22.93]
        }, {"district": "新兴县", "data": [112.23, 22.7]}, {
            "district": "郁南县",
            "data": [111.53, 23.23]
        }, {"district": "云安县", "data": [112, 23.08]}, {"district": "罗定市", "data": [111.57, 22.77]}]
    }]
}, {
    "province": "广西壮族自治区",
    "citys": [{
        "city": "南宁市",
        "districts": [{"district": "南宁市", "data": [108.37, 22.82]}, {
            "district": "兴宁区",
            "data": [108.38, 22.87]
        }, {"district": "江南区", "data": [108.28, 22.78]}, {
            "district": "西乡塘区",
            "data": [108.3, 22.83]
        }, {"district": "良庆区", "data": [108.32, 22.77]}, {
            "district": "邕宁区",
            "data": [108.48, 22.75]
        }, {"district": "武鸣县", "data": [108.27, 23.17]}, {
            "district": "隆安县",
            "data": [107.68, 23.18]
        }, {"district": "马山县", "data": [108.17, 23.72]}, {
            "district": "上林县",
            "data": [108.6, 23.43]
        }, {"district": "宾阳县", "data": [108.8, 23.22]}, {"district": "横县", "data": [109.27, 22.68]}]
    }, {
        "city": "柳州市",
        "districts": [{"district": "柳州市", "data": [109.42, 24.33]}, {
            "district": "柳南区",
            "data": [109.38, 24.35]
        }, {"district": "柳江县", "data": [109.33, 24.27]}, {
            "district": "柳城县",
            "data": [109.23, 24.65]
        }, {"district": "鹿寨县", "data": [109.73, 24.48]}, {
            "district": "融安县",
            "data": [109.4, 25.23]
        }, {"district": "融水苗族自治县", "data": [109.25, 25.07]}, {"district": "三江侗族自治县", "data": [109.6, 25.78]}]
    }, {
        "city": "桂林市",
        "districts": [{"district": "桂林市", "data": [110.28, 25.28]}, {
            "district": "阳朔县",
            "data": [110.48, 24.78]
        }, {"district": "临桂县", "data": [110.2, 25.23]}, {
            "district": "灵川县",
            "data": [110.32, 25.42]
        }, {"district": "全州县", "data": [111.07, 25.93]}, {
            "district": "兴安县",
            "data": [110.67, 25.62]
        }, {"district": "永福县", "data": [109.98, 24.98]}, {
            "district": "灌阳县",
            "data": [111.15, 25.48]
        }, {"district": "龙胜各族自治县", "data": [110, 25.8]}, {
            "district": "资源县",
            "data": [110.63, 26.03]
        }, {"district": "平乐县", "data": [110.63, 24.63]}, {"district": "恭城瑶族自治县", "data": [110.83, 24.83]}]
    }, {
        "city": "梧州市",
        "districts": [{"district": "梧州市", "data": [111.27, 23.48]}, {
            "district": "苍梧县",
            "data": [111.23, 23.42]
        }, {"district": "藤县", "data": [110.92, 23.38]}, {"district": "蒙山县", "data": [110.52, 24.2]}, {
            "district": "岑溪市",
            "data": [110.98, 22.92]
        }]
    }, {
        "city": "北海市",
        "districts": [{"district": "北海市", "data": [109.12, 21.48]}, {
            "district": "铁山港区",
            "data": [109.43, 21.53]
        }, {"district": "合浦县", "data": [109.2, 21.67]}]
    }, {
        "city": "防城港市",
        "districts": [{"district": "防城港市", "data": [108.35, 21.7]}, {
            "district": "港口区",
            "data": [108.37, 21.65]
        }, {"district": "防城区", "data": [108.35, 21.77]}, {
            "district": "上思县",
            "data": [107.98, 22.15]
        }, {"district": "东兴市", "data": [107.97, 21.53]}]
    }, {
        "city": "钦州市",
        "districts": [{"district": "钦州市", "data": [108.62, 21.95]}, {
            "district": "钦北区",
            "data": [108.63, 21.98]
        }, {"district": "灵山县", "data": [109.3, 22.43]}, {"district": "浦北县", "data": [109.55, 22.27]}]
    }, {
        "city": "贵港市",
        "districts": [{"district": "贵港市", "data": [109.6, 23.1]}, {
            "district": "覃塘区",
            "data": [109.42, 23.13]
        }, {"district": "平南县", "data": [110.38, 23.55]}, {"district": "桂平市", "data": [110.08, 23.4]}]
    }, {
        "city": "玉林市",
        "districts": [{"district": "玉林市", "data": [110.17, 22.63]}, {
            "district": "容县",
            "data": [110.55, 22.87]
        }, {"district": "陆川县", "data": [110.27, 22.33]}, {
            "district": "博白县",
            "data": [109.97, 22.28]
        }, {"district": "兴业县", "data": [109.87, 22.75]}, {"district": "北流市", "data": [110.35, 22.72]}]
    }, {
        "city": "百色市",
        "districts": [{"district": "百色市", "data": [106.62, 23.9]}, {
            "district": "田阳县",
            "data": [106.92, 23.73]
        }, {"district": "田东县", "data": [107.12, 23.6]}, {
            "district": "平果县",
            "data": [107.58, 23.32]
        }, {"district": "德保县", "data": [106.62, 23.33]}, {
            "district": "靖西县",
            "data": [106.42, 23.13]
        }, {"district": "那坡县", "data": [105.83, 23.42]}, {
            "district": "凌云县",
            "data": [106.57, 24.35]
        }, {"district": "乐业县", "data": [106.55, 24.78]}, {
            "district": "田林县",
            "data": [106.23, 24.3]
        }, {"district": "西林县", "data": [105.1, 24.5]}, {"district": "隆林各族自治县", "data": [105.33, 24.77]}]
    }, {
        "city": "贺州市",
        "districts": [{"district": "贺州市", "data": [111.55, 24.42]}, {
            "district": "昭平县",
            "data": [110.8, 24.17]
        }, {"district": "钟山县", "data": [111.3, 24.53]}, {"district": "富川瑶族自治县", "data": [111.27, 24.83]}]
    }, {
        "city": "河池市",
        "districts": [{"district": "河池市", "data": [108.07, 24.7]}, {
            "district": "金城江区",
            "data": [108.05, 24.7]
        }, {"district": "南丹县", "data": [107.53, 24.98]}, {"district": "天峨县", "data": [107.17, 25]}, {
            "district": "凤山县",
            "data": [107.05, 24.55]
        }, {"district": "东兰县", "data": [107.37, 24.52]}, {
            "district": "罗城仫佬族自治县",
            "data": [108.9, 24.78]
        }, {"district": "环江毛南族自治县", "data": [108.25, 24.83]}, {
            "district": "巴马瑶族自治县",
            "data": [107.25, 24.15]
        }, {"district": "都安瑶族自治县", "data": [108.1, 23.93]}, {
            "district": "大化瑶族自治县",
            "data": [107.98, 23.73]
        }, {"district": "宜州市", "data": [108.67, 24.5]}]
    }, {
        "city": "来宾市",
        "districts": [{"district": "来宾市", "data": [109.23, 23.73]}, {
            "district": "忻城县",
            "data": [108.67, 24.07]
        }, {"district": "象州县", "data": [109.68, 23.97]}, {
            "district": "武宣县",
            "data": [109.67, 23.6]
        }, {"district": "金秀瑶族自治县", "data": [110.18, 24.13]}, {"district": "合山市", "data": [108.87, 23.82]}]
    }, {
        "city": "崇左市",
        "districts": [{"district": "崇左市", "data": [107.37, 22.4]}, {
            "district": "扶绥县",
            "data": [107.9, 22.63]
        }, {"district": "宁明县", "data": [107.07, 22.13]}, {
            "district": "龙州县",
            "data": [106.85, 22.35]
        }, {"district": "大新县", "data": [107.2, 22.83]}, {
            "district": "天等县",
            "data": [107.13, 23.08]
        }, {"district": "凭祥市", "data": [106.75, 22.12]}]
    }]
}, {
    "province": "海南省",
    "citys": [{
        "city": "海口市",
        "districts": [{"district": "海口市", "data": [110.32, 20.03]}, {
            "district": "秀英区",
            "data": [110.28, 20.02]
        }, {"district": "龙华区", "data": [110.3, 20.03]}, {"district": "琼山区", "data": [110.35, 20]}, {
            "district": "美兰区",
            "data": [110.37, 20.03]
        }]
    }, {"city": "三亚市", "districts": [{"district": "三亚市", "data": [109.5, 18.25]}]}, {
        "city": "五指山市",
        "districts": [{"district": "五指山市", "data": [109.52, 18.78]}, {
            "district": "琼海市",
            "data": [110.47, 19.25]
        }, {"district": "儋州市", "data": [109.57, 19.52]}, {
            "district": "文昌市",
            "data": [110.8, 19.55]
        }, {"district": "万宁市", "data": [110.4, 18.8]}, {"district": "东方市", "data": [108.63, 19.1]}, {
            "district": "定安县",
            "data": [110.32, 19.7]
        }, {"district": "屯昌县", "data": [110.1, 19.37]}, {"district": "澄迈县", "data": [110, 19.73]}, {
            "district": "临高县",
            "data": [109.68, 19.92]
        }, {"district": "白沙黎族自治县", "data": [109.45, 19.23]}, {
            "district": "昌江黎族自治县",
            "data": [109.05, 19.25]
        }, {"district": "乐东黎族自治县", "data": [109.17, 18.75]}, {
            "district": "陵水黎族自治县",
            "data": [110.03, 18.5]
        }, {"district": "保亭黎族苗族自治县", "data": [109.7, 18.63]}, {"district": "琼中黎族苗族自治县", "data": [109.83, 19.03]}]
    }]
}, {
    "province": "重庆市", "citys": [{
        "city": "重庆市",
        "districts": [{"district": "重庆市", "data": [106.55, 29.57]}, {
            "district": "万州区",
            "data": [108.4, 30.82]
        }, {"district": "涪陵区", "data": [107.4, 29.72]}, {
            "district": "渝中区",
            "data": [106.57, 29.55]
        }, {"district": "大渡口区", "data": [106.48, 29.48]}, {
            "district": "江北区",
            "data": [106.57, 29.6]
        }, {"district": "沙坪坝区", "data": [106.45, 29.53]}, {
            "district": "九龙坡区",
            "data": [106.5, 29.5]
        }, {"district": "南岸区", "data": [106.57, 29.52]}, {"district": "北碚区", "data": [106.4, 29.8]}, {
            "district": "万盛区",
            "data": [106.92, 28.97]
        }, {"district": "双桥区", "data": [105.78, 29.48]}, {
            "district": "渝北区",
            "data": [106.63, 29.72]
        }, {"district": "巴南区", "data": [106.52, 29.38]}, {
            "district": "黔江区",
            "data": [108.77, 29.53]
        }, {"district": "长寿区", "data": [107.08, 29.87]}, {
            "district": "綦江县",
            "data": [106.65, 29.03]
        }, {"district": "潼南县", "data": [105.83, 30.18]}, {
            "district": "铜梁县",
            "data": [106.05, 29.85]
        }, {"district": "大足县", "data": [105.72, 29.7]}, {"district": "荣昌县", "data": [105.58, 29.4]}, {
            "district": "璧山县",
            "data": [106.22, 29.6]
        }, {"district": "梁平县", "data": [107.8, 30.68]}, {
            "district": "城口县",
            "data": [108.67, 31.95]
        }, {"district": "丰都县", "data": [107.73, 29.87]}, {
            "district": "垫江县",
            "data": [107.35, 30.33]
        }, {"district": "武隆县", "data": [107.75, 29.33]}, {"district": "忠县", "data": [108.02, 30.3]}, {
            "district": "开县",
            "data": [108.42, 31.18]
        }, {"district": "云阳县", "data": [108.67, 30.95]}, {
            "district": "奉节县",
            "data": [109.47, 31.02]
        }, {"district": "巫山县", "data": [109.88, 31.08]}, {
            "district": "巫溪县",
            "data": [109.63, 31.4]
        }, {"district": "石柱土家族自治县", "data": [108.12, 30]}, {
            "district": "秀山土家族苗族自治县",
            "data": [108.98, 28.45]
        }, {"district": "酉阳土家族苗族自治县", "data": [108.77, 28.85]}, {"district": "彭水苗族土家族自治县", "data": [108.17, 29.3]}]
    }]
}, {
    "province": "四川省",
    "citys": [{
        "city": "成都市",
        "districts": [{"district": "成都市", "data": [104.07, 30.67]}, {
            "district": "锦江区",
            "data": [104.08, 30.67]
        }, {"district": "青羊区", "data": [104.05, 30.68]}, {
            "district": "金牛区",
            "data": [104.05, 30.7]
        }, {"district": "武侯区", "data": [104.05, 30.65]}, {
            "district": "成华区",
            "data": [104.1, 30.67]
        }, {"district": "龙泉驿区", "data": [104.27, 30.57]}, {
            "district": "青白江区",
            "data": [104.23, 30.88]
        }, {"district": "新都区", "data": [104.15, 30.83]}, {
            "district": "温江区",
            "data": [103.83, 30.7]
        }, {"district": "金堂县", "data": [104.43, 30.85]}, {
            "district": "双流县",
            "data": [103.92, 30.58]
        }, {"district": "郫县", "data": [103.88, 30.82]}, {
            "district": "大邑县",
            "data": [103.52, 30.58]
        }, {"district": "蒲江县", "data": [103.5, 30.2]}, {
            "district": "新津县",
            "data": [103.82, 30.42]
        }, {"district": "都江堰市", "data": [103.62, 31]}, {"district": "彭州市", "data": [103.93, 30.98]}, {
            "district": "邛崃市",
            "data": [103.47, 30.42]
        }, {"district": "崇州市", "data": [103.67, 30.63]}]
    }, {
        "city": "自贡市",
        "districts": [{"district": "自贡市", "data": [104.78, 29.35]}, {
            "district": "自流井区",
            "data": [104.77, 29.35]
        }, {"district": "贡井区", "data": [104.72, 29.35]}, {
            "district": "大安区",
            "data": [104.77, 29.37]
        }, {"district": "沿滩区", "data": [104.87, 29.27]}, {
            "district": "荣县",
            "data": [104.42, 29.47]
        }, {"district": "富顺县", "data": [104.98, 29.18]}]
    }, {
        "city": "攀枝花市",
        "districts": [{"district": "攀枝花市", "data": [101.72, 26.58]}, {
            "district": "东区",
            "data": [101.7, 26.55]
        }, {"district": "西区", "data": [101.6, 26.6]}, {"district": "仁和区", "data": [101.73, 26.5]}, {
            "district": "米易县",
            "data": [102.12, 26.88]
        }, {"district": "盐边县", "data": [101.85, 26.7]}]
    }, {
        "city": "泸州市",
        "districts": [{"district": "泸州市", "data": [105.43, 28.87]}, {
            "district": "江阳区",
            "data": [105.45, 28.88]
        }, {"district": "纳溪区", "data": [105.37, 28.77]}, {
            "district": "龙马潭区",
            "data": [105.43, 28.9]
        }, {"district": "泸县", "data": [105.38, 29.15]}, {
            "district": "合江县",
            "data": [105.83, 28.82]
        }, {"district": "叙永县", "data": [105.43, 28.17]}, {"district": "古蔺县", "data": [105.82, 28.05]}]
    }, {
        "city": "德阳市",
        "districts": [{"district": "德阳市", "data": [104.38, 31.13]}, {
            "district": "旌阳区",
            "data": [104.38, 31.13]
        }, {"district": "中江县", "data": [104.68, 31.03]}, {
            "district": "罗江县",
            "data": [104.5, 31.32]
        }, {"district": "广汉市", "data": [104.28, 30.98]}, {
            "district": "什邡市",
            "data": [104.17, 31.13]
        }, {"district": "绵竹市", "data": [104.2, 31.35]}]
    }, {
        "city": "绵阳市",
        "districts": [{"district": "绵阳市", "data": [104.73, 31.47]}, {
            "district": "涪城区",
            "data": [104.73, 31.47]
        }, {"district": "游仙区", "data": [104.75, 31.47]}, {
            "district": "三台县",
            "data": [105.08, 31.1]
        }, {"district": "盐亭县", "data": [105.38, 31.22]}, {
            "district": "安县",
            "data": [104.57, 31.53]
        }, {"district": "梓潼县", "data": [105.17, 31.63]}, {
            "district": "北川羌族自治县",
            "data": [104.45, 31.82]
        }, {"district": "平武县", "data": [104.53, 32.42]}, {"district": "江油市", "data": [104.75, 31.78]}]
    }, {
        "city": "广元市",
        "districts": [{"district": "广元市", "data": [105.83, 32.43]}, {
            "district": "市中区",
            "data": [105.05, 29.58]
        }, {"district": "元坝区", "data": [105.97, 32.32]}, {
            "district": "朝天区",
            "data": [105.88, 32.65]
        }, {"district": "旺苍县", "data": [106.28, 32.23]}, {
            "district": "青川县",
            "data": [105.23, 32.58]
        }, {"district": "剑阁县", "data": [105.52, 32.28]}, {"district": "苍溪县", "data": [105.93, 31.73]}]
    }, {
        "city": "遂宁市",
        "districts": [{"district": "遂宁市", "data": [105.57, 30.52]}, {
            "district": "船山区",
            "data": [105.57, 30.52]
        }, {"district": "安居区", "data": [105.45, 30.35]}, {
            "district": "蓬溪县",
            "data": [105.72, 30.78]
        }, {"district": "射洪县", "data": [105.38, 30.87]}, {"district": "大英县", "data": [105.25, 30.58]}]
    }, {
        "city": "内江市",
        "districts": [{"district": "内江市", "data": [105.05, 29.58]}, {
            "district": "市中区",
            "data": [105.05, 29.58]
        }, {"district": "东兴区", "data": [105.07, 29.6]}, {
            "district": "威远县",
            "data": [104.67, 29.53]
        }, {"district": "资中县", "data": [104.85, 29.78]}, {"district": "隆??县", "data": [105.28, 29.35]}]
    }, {
        "city": "乐山市",
        "districts": [{"district": "乐山市", "data": [103.77, 29.57]}, {
            "district": "市中区",
            "data": [105.05, 29.58]
        }, {"district": "沙湾区", "data": [103.55, 29.42]}, {
            "district": "五通桥区",
            "data": [103.82, 29.4]
        }, {"district": "金口河区", "data": [103.08, 29.25]}, {
            "district": "犍为县",
            "data": [103.95, 29.22]
        }, {"district": "井研县", "data": [104.07, 29.65]}, {
            "district": "夹江县",
            "data": [103.57, 29.73]
        }, {"district": "沐川县", "data": [103.9, 28.97]}, {
            "district": "峨边彝族自治县",
            "data": [103.27, 29.23]
        }, {"district": "马边彝族自治县", "data": [103.55, 28.83]}, {"district": "峨眉山市", "data": [103.48, 29.6]}]
    }, {
        "city": "南充市",
        "districts": [{"district": "南充市", "data": [106.08, 30.78]}, {
            "district": "顺庆区",
            "data": [106.08, 30.78]
        }, {"district": "高坪区", "data": [106.1, 30.77]}, {
            "district": "嘉陵区",
            "data": [106.05, 30.77]
        }, {"district": "南部县", "data": [106.07, 31.35]}, {
            "district": "营山县",
            "data": [106.57, 31.08]
        }, {"district": "蓬安县", "data": [106.42, 31.03]}, {
            "district": "仪陇县",
            "data": [106.28, 31.27]
        }, {"district": "西充县", "data": [105.88, 31]}, {"district": "阆中市", "data": [106, 31.55]}]
    }, {
        "city": "眉山市",
        "districts": [{"district": "眉山市", "data": [103.83, 30.05]}, {
            "district": "东坡区",
            "data": [103.83, 30.05]
        }, {"district": "仁寿县", "data": [104.15, 30]}, {"district": "彭山县", "data": [103.87, 30.2]}, {
            "district": "洪雅县",
            "data": [103.37, 29.92]
        }, {"district": "丹棱县", "data": [103.52, 30.02]}, {"district": "青神县", "data": [103.85, 29.83]}]
    }, {
        "city": "宜宾市",
        "districts": [{"district": "宜宾市", "data": [104.62, 28.77]}, {
            "district": "翠屏区",
            "data": [104.62, 28.77]
        }, {"district": "宜宾县", "data": [104.55, 28.7]}, {
            "district": "南溪县",
            "data": [104.98, 28.85]
        }, {"district": "江安县", "data": [105.07, 28.73]}, {
            "district": "长宁县",
            "data": [104.92, 28.58]
        }, {"district": "高县", "data": [104.52, 28.43]}, {"district": "珙县", "data": [104.72, 28.45]}, {
            "district": "筠连县",
            "data": [104.52, 28.17]
        }, {"district": "兴文县", "data": [105.23, 28.3]}, {"district": "屏山县", "data": [104.33, 28.83]}]
    }, {
        "city": "广安市",
        "districts": [{"district": "广安市", "data": [106.63, 30.47]}, {
            "district": "岳池县",
            "data": [106.43, 30.55]
        }, {"district": "武胜县", "data": [106.28, 30.35]}, {
            "district": "邻水县",
            "data": [106.93, 30.33]
        }, {"district": "华蓥市", "data": [106.77, 30.38]}]
    }, {
        "city": "达州市",
        "districts": [{"district": "达州市", "data": [107.5, 31.22]}, {
            "district": "通川区",
            "data": [107.48, 31.22]
        }, {"district": "达县", "data": [107.5, 31.2]}, {"district": "宣汉县", "data": [107.72, 31.35]}, {
            "district": "开江县",
            "data": [107.87, 31.08]
        }, {"district": "大竹县", "data": [107.2, 30.73]}, {"district": "渠县", "data": [106.97, 30.83]}, {
            "district": "万源市",
            "data": [108.03, 32.07]
        }]
    }, {
        "city": "雅安市",
        "districts": [{"district": "雅安市", "data": [103, 29.98]}, {
            "district": "雨城区",
            "data": [103, 29.98]
        }, {"district": "名山县", "data": [103.12, 30.08]}, {
            "district": "荥经县",
            "data": [102.85, 29.8]
        }, {"district": "汉源县", "data": [102.65, 29.35]}, {
            "district": "石棉县",
            "data": [102.37, 29.23]
        }, {"district": "天全县", "data": [102.75, 30.07]}, {
            "district": "芦山县",
            "data": [102.92, 30.15]
        }, {"district": "宝兴县", "data": [102.82, 30.37]}]
    }, {
        "city": "巴中市",
        "districts": [{"district": "巴中市", "data": [106.77, 31.85]}, {
            "district": "巴州区",
            "data": [106.77, 31.85]
        }, {"district": "通江县", "data": [107.23, 31.92]}, {
            "district": "南江县",
            "data": [106.83, 32.35]
        }, {"district": "平昌县", "data": [107.1, 31.57]}]
    }, {
        "city": "资阳市",
        "districts": [{"district": "资阳市", "data": [104.65, 30.12]}, {
            "district": "雁江区",
            "data": [104.65, 30.12]
        }, {"district": "安岳县", "data": [105.33, 30.1]}, {
            "district": "乐至县",
            "data": [105.02, 30.28]
        }, {"district": "简阳市", "data": [104.55, 30.4]}]
    }, {
        "city": "阿坝藏族羌族自治州",
        "districts": [{"district": "阿坝藏族羌族自治州", "data": [102.22, 31.9]}, {
            "district": "汶川县",
            "data": [103.58, 31.48]
        }, {"district": "理县", "data": [103.17, 31.43]}, {"district": "茂县", "data": [103.85, 31.68]}, {
            "district": "松潘县",
            "data": [103.6, 32.63]
        }, {"district": "九寨沟县", "data": [104.23, 33.27]}, {
            "district": "金川县",
            "data": [102.07, 31.48]
        }, {"district": "小金县", "data": [102.37, 31]}, {"district": "黑水县", "data": [102.98, 32.07]}, {
            "district": "马尔康县",
            "data": [102.22, 31.9]
        }, {"district": "壤塘县", "data": [100.98, 32.27]}, {
            "district": "阿坝县",
            "data": [101.7, 32.9]
        }, {"district": "若尔盖县", "data": [102.95, 33.58]}, {"district": "红原县", "data": [102.55, 32.8]}]
    }, {
        "city": "甘孜藏族自治州",
        "districts": [{"district": "甘孜藏族自治州", "data": [101.97, 30.05]}, {
            "district": "康定县",
            "data": [101.97, 30.05]
        }, {"district": "泸定县", "data": [102.23, 29.92]}, {
            "district": "丹巴县",
            "data": [101.88, 30.88]
        }, {"district": "九龙县", "data": [101.5, 29]}, {"district": "雅江县", "data": [101.02, 30.03]}, {
            "district": "道孚县",
            "data": [101.12, 30.98]
        }, {"district": "炉霍县", "data": [100.68, 31.4]}, {"district": "甘孜县", "data": [99.98, 31.62]}, {
            "district": "新龙县",
            "data": [100.32, 30.95]
        }, {"district": "德格县", "data": [98.58, 31.82]}, {"district": "白玉县", "data": [98.83, 31.22]}, {
            "district": "石渠县",
            "data": [98.1, 32.98]
        }, {"district": "色达县", "data": [100.33, 32.27]}, {"district": "理塘县", "data": [100.27, 30]}, {
            "district": "巴塘县",
            "data": [99.1, 30]
        }, {"district": "乡城县", "data": [99.8, 28.93]}, {"district": "稻城县", "data": [100.3, 29.03]}, {
            "district": "得荣县",
            "data": [99.28, 28.72]
        }]
    }, {
        "city": "凉山彝族自治州",
        "districts": [{"district": "凉山彝族自治州", "data": [102.27, 27.9]}, {
            "district": "西昌市",
            "data": [102.27, 27.9]
        }, {"district": "木里藏族自治县", "data": [101.28, 27.93]}, {
            "district": "盐源县",
            "data": [101.5, 27.43]
        }, {"district": "德昌县", "data": [102.18, 27.4]}, {
            "district": "会理县",
            "data": [102.25, 26.67]
        }, {"district": "会东县", "data": [102.58, 26.63]}, {
            "district": "宁南县",
            "data": [102.77, 27.07]
        }, {"district": "普格县", "data": [102.53, 27.38]}, {
            "district": "布拖县",
            "data": [102.82, 27.72]
        }, {"district": "金阳县", "data": [103.25, 27.7]}, {
            "district": "昭觉县",
            "data": [102.85, 28.02]
        }, {"district": "喜德县", "data": [102.42, 28.32]}, {
            "district": "冕宁县",
            "data": [102.17, 28.55]
        }, {"district": "越西县", "data": [102.52, 28.65]}, {
            "district": "甘洛县",
            "data": [102.77, 28.97]
        }, {"district": "美姑县", "data": [103.13, 28.33]}, {"district": "雷波县", "data": [103.57, 28.27]}]
    }]
}, {
    "province": "贵州省",
    "citys": [{
        "city": "贵阳市",
        "districts": [{"district": "贵阳市", "data": [106.63, 26.65]}, {
            "district": "南明区",
            "data": [106.72, 26.57]
        }, {"district": "云岩区", "data": [106.72, 26.62]}, {
            "district": "乌当区",
            "data": [106.75, 26.63]
        }, {"district": "白云区", "data": [106.65, 26.68]}, {
            "district": "小河区",
            "data": [106.7, 26.53]
        }, {"district": "开阳县", "data": [106.97, 27.07]}, {
            "district": "息烽县",
            "data": [106.73, 27.1]
        }, {"district": "修文县", "data": [106.58, 26.83]}, {"district": "清镇市", "data": [106.47, 26.55]}]
    }, {
        "city": "六盘水市",
        "districts": [{"district": "六盘水市", "data": [104.83, 26.6]}, {
            "district": "钟山区",
            "data": [104.83, 26.6]
        }, {"district": "六枝特区", "data": [105.48, 26.22]}, {
            "district": "水城县",
            "data": [104.95, 26.55]
        }, {"district": "盘县", "data": [104.47, 25.72]}]
    }, {
        "city": "遵义市",
        "districts": [{"district": "遵义市", "data": [106.92, 27.73]}, {
            "district": "红花岗区",
            "data": [106.92, 27.65]
        }, {"district": "汇川区", "data": [106.92, 27.73]}, {
            "district": "遵义县",
            "data": [106.83, 27.53]
        }, {"district": "桐梓县", "data": [106.82, 28.13]}, {
            "district": "绥阳县",
            "data": [107.18, 27.95]
        }, {"district": "正安县", "data": [107.43, 28.55]}, {
            "district": "道真仡佬族苗族自治县",
            "data": [107.6, 28.88]
        }, {"district": "务川仡佬族苗族自治县", "data": [107.88, 28.53]}, {
            "district": "凤冈县",
            "data": [107.72, 27.97]
        }, {"district": "湄潭县", "data": [107.48, 27.77]}, {
            "district": "余庆县",
            "data": [107.88, 27.22]
        }, {"district": "习水县", "data": [106.22, 28.32]}, {
            "district": "赤水市",
            "data": [105.7, 28.58]
        }, {"district": "仁怀市", "data": [106.42, 27.82]}]
    }, {
        "city": "安顺市",
        "districts": [{"district": "安顺市", "data": [105.95, 26.25]}, {
            "district": "西秀区",
            "data": [105.92, 26.25]
        }, {"district": "平坝县", "data": [106.25, 26.42]}, {
            "district": "普定县",
            "data": [105.75, 26.32]
        }, {"district": "镇宁布依族苗族自治县", "data": [105.77, 26.07]}, {
            "district": "关岭布依族苗族自治县",
            "data": [105.62, 25.95]
        }, {"district": "紫云苗族布依族自治县", "data": [106.08, 25.75]}]
    }, {
        "city": "铜仁地区",
        "districts": [{"district": "铜仁地区", "data": [109.18, 27.72]}, {
            "district": "铜仁市",
            "data": [109.18, 27.72]
        }, {"district": "江口县", "data": [108.85, 27.7]}, {
            "district": "玉屏侗族自治县",
            "data": [108.92, 27.23]
        }, {"district": "石阡县", "data": [108.23, 27.52]}, {
            "district": "思南县",
            "data": [108.25, 27.93]
        }, {"district": "印江土家族苗族自治县", "data": [108.4, 28]}, {
            "district": "德江县",
            "data": [108.12, 28.27]
        }, {"district": "沿河土家族自治县", "data": [108.5, 28.57]}, {
            "district": "松桃苗族自治县",
            "data": [109.2, 28.17]
        }, {"district": "万山特区", "data": [109.2, 27.52]}]
    }, {
        "city": "兴义市",
        "districts": [{"district": "兴义市", "data": [104.9, 25.08]}, {
            "district": "兴仁县",
            "data": [105.18, 25.43]
        }, {"district": "普安县", "data": [104.95, 25.78]}, {
            "district": "晴隆县",
            "data": [105.22, 25.83]
        }, {"district": "贞丰县", "data": [105.65, 25.38]}, {
            "district": "望谟县",
            "data": [106.1, 25.17]
        }, {"district": "册亨县", "data": [105.82, 24.98]}, {"district": "安龙县", "data": [105.47, 25.12]}]
    }, {
        "city": "毕节地区",
        "districts": [{"district": "毕节地区", "data": [105.28, 27.3]}, {
            "district": "毕节市",
            "data": [105.28, 27.3]
        }, {"district": "大方县", "data": [105.6, 27.15]}, {
            "district": "黔西县",
            "data": [106.03, 27.03]
        }, {"district": "金沙县", "data": [106.22, 27.47]}, {
            "district": "织金县",
            "data": [105.77, 26.67]
        }, {"district": "纳雍县", "data": [105.38, 26.78]}, {"district": "赫章县", "data": [104.72, 27.13]}]
    }, {
        "city": "黔东南苗族侗族自治州",
        "districts": [{"district": "黔东南苗族侗族自治州", "data": [107.97, 26.58]}, {
            "district": "凯里市",
            "data": [107.97, 26.58]
        }, {"district": "黄平县", "data": [107.9, 26.9]}, {"district": "施秉县", "data": [108.12, 27.03]}, {
            "district": "三穗县",
            "data": [108.68, 26.97]
        }, {"district": "镇远县", "data": [108.42, 27.05]}, {
            "district": "岑巩县",
            "data": [108.82, 27.18]
        }, {"district": "天柱县", "data": [109.2, 26.92]}, {"district": "锦屏县", "data": [109.2, 26.68]}, {
            "district": "剑河县",
            "data": [108.45, 26.73]
        }, {"district": "台江县", "data": [108.32, 26.67]}, {
            "district": "黎平县",
            "data": [109.13, 26.23]
        }, {"district": "榕江县", "data": [108.52, 25.93]}, {
            "district": "从江县",
            "data": [108.9, 25.75]
        }, {"district": "雷山县", "data": [108.07, 26.38]}, {
            "district": "麻江县",
            "data": [107.58, 26.5]
        }, {"district": "丹寨县", "data": [107.8, 26.2]}]
    }, {
        "city": "黔南布依族苗族自治州",
        "districts": [{"district": "黔南布依族苗族自治州", "data": [107.52, 26.27]}, {
            "district": "都匀市",
            "data": [107.52, 26.27]
        }, {"district": "福泉市", "data": [107.5, 26.7]}, {"district": "荔波县", "data": [107.88, 25.42]}, {
            "district": "贵定县",
            "data": [107.23, 26.58]
        }, {"district": "瓮安县", "data": [107.47, 27.07]}, {
            "district": "独山县",
            "data": [107.53, 25.83]
        }, {"district": "平塘县", "data": [107.32, 25.83]}, {
            "district": "罗甸县",
            "data": [106.75, 25.43]
        }, {"district": "长顺县", "data": [106.45, 26.03]}, {
            "district": "龙里县",
            "data": [106.97, 26.45]
        }, {"district": "惠水县", "data": [106.65, 26.13]}, {"district": "三都水族自治县", "data": [107.87, 25.98]}]
    }]
}, {
    "province": "云南省",
    "citys": [{
        "city": "昆明市",
        "districts": [{"district": "昆明市", "data": [102.72, 25.05]}, {
            "district": "五华区",
            "data": [102.7, 25.05]
        }, {"district": "盘龙区", "data": [102.72, 25.03]}, {
            "district": "官渡区",
            "data": [102.75, 25.02]
        }, {"district": "西山区", "data": [102.67, 25.03]}, {
            "district": "东川区",
            "data": [103.18, 26.08]
        }, {"district": "呈贡县", "data": [102.8, 24.88]}, {"district": "晋宁县", "data": [102.6, 24.67]}, {
            "district": "富民县",
            "data": [102.5, 25.22]
        }, {"district": "宜良县", "data": [103.15, 24.92]}, {
            "district": "石林彝族自治县",
            "data": [103.27, 24.77]
        }, {"district": "嵩明县", "data": [103.03, 25.35]}, {
            "district": "禄劝彝族苗族自治县",
            "data": [102.47, 25.55]
        }, {"district": "寻甸回族彝族自治县", "data": [103.25, 25.57]}, {"district": "安宁市", "data": [102.48, 24.92]}]
    }, {
        "city": "曲靖市",
        "districts": [{"district": "曲靖市", "data": [103.8, 25.5]}, {
            "district": "麒麟区",
            "data": [103.8, 25.5]
        }, {"district": "马龙县", "data": [103.58, 25.43]}, {
            "district": "陆良县",
            "data": [103.67, 25.03]
        }, {"district": "师宗县", "data": [103.98, 24.83]}, {
            "district": "罗平县",
            "data": [104.3, 24.88]
        }, {"district": "富源县", "data": [104.25, 25.67]}, {
            "district": "会泽县",
            "data": [103.3, 26.42]
        }, {"district": "沾益县", "data": [103.82, 25.62]}, {"district": "宣威市", "data": [104.1, 26.22]}]
    }, {
        "city": "玉溪市",
        "districts": [{"district": "玉溪市", "data": [102.55, 24.35]}, {
            "district": "江川县",
            "data": [102.75, 24.28]
        }, {"district": "澄江县", "data": [102.92, 24.67]}, {
            "district": "通海县",
            "data": [102.75, 24.12]
        }, {"district": "华宁县", "data": [102.93, 24.2]}, {
            "district": "易门县",
            "data": [102.17, 24.67]
        }, {"district": "峨山彝族自治县", "data": [102.4, 24.18]}, {"district": "新平彝族傣族自治县", "data": [101.98, 24.07]}]
    }, {
        "city": "保山市",
        "districts": [{"district": "保山市", "data": [99.17, 25.12]}, {
            "district": "隆阳区",
            "data": [99.17, 25.12]
        }, {"district": "施甸县", "data": [99.18, 24.73]}, {"district": "腾冲县", "data": [98.5, 25.03]}, {
            "district": "龙陵县",
            "data": [98.68, 24.58]
        }, {"district": "昌宁县", "data": [99.6, 24.83]}]
    }, {
        "city": "昭通市",
        "districts": [{"district": "昭通市", "data": [103.72, 27.33]}, {
            "district": "昭阳区",
            "data": [103.72, 27.33]
        }, {"district": "鲁甸县", "data": [103.55, 27.2]}, {
            "district": "巧家县",
            "data": [102.92, 26.92]
        }, {"district": "盐津县", "data": [104.23, 28.12]}, {
            "district": "大关县",
            "data": [103.88, 27.75]
        }, {"district": "永善县", "data": [103.63, 28.23]}, {
            "district": "绥江县",
            "data": [103.95, 28.6]
        }, {"district": "镇雄县", "data": [104.87, 27.45]}, {
            "district": "彝良县",
            "data": [104.05, 27.63]
        }, {"district": "威信县", "data": [105.05, 27.85]}, {"district": "水富县", "data": [104.4, 28.63]}]
    }, {
        "city": "丽江市",
        "districts": [{"district": "丽江市", "data": [100.23, 26.88]}, {
            "district": "古城区",
            "data": [100.23, 26.88]
        }, {"district": "玉龙纳西族自治县", "data": [100.23, 26.82]}, {
            "district": "永胜县",
            "data": [100.75, 26.68]
        }, {"district": "华坪县", "data": [101.27, 26.63]}, {"district": "宁蒗彝族自治县", "data": [100.85, 27.28]}]
    }, {
        "city": "墨江哈尼族自治县",
        "districts": [{"district": "墨江哈尼族自治县", "data": [101.68, 23.43]}, {
            "district": "景东彝族自治县",
            "data": [100.83, 24.45]
        }, {"district": "景谷傣族彝族自治县", "data": [100.7, 23.5]}, {
            "district": "江城哈尼族彝族自治县",
            "data": [101.85, 22.58]
        }, {"district": "澜沧拉祜族自治县", "data": [99.93, 22.55]}, {"district": "西盟佤族自治县", "data": [99.62, 22.63]}]
    }, {
        "city": "临沧市",
        "districts": [{"district": "临沧市", "data": [100.08, 23.88]}, {
            "district": "临翔区",
            "data": [100.08, 23.88]
        }, {"district": "凤庆县", "data": [99.92, 24.6]}, {"district": "云县", "data": [100.13, 24.45]}, {
            "district": "永德县",
            "data": [99.25, 24.03]
        }, {"district": "镇康县", "data": [98.83, 23.78]}, {
            "district": "耿马傣族佤族自治县",
            "data": [99.4, 23.55]
        }, {"district": "沧源佤族自治县", "data": [99.25, 23.15]}]
    }, {
        "city": "楚雄彝族自治州",
        "districts": [{"district": "楚雄彝族自治州", "data": [101.55, 25.03]}, {
            "district": "楚雄市",
            "data": [101.55, 25.03]
        }, {"district": "双柏县", "data": [101.63, 24.7]}, {
            "district": "牟定县",
            "data": [101.53, 25.32]
        }, {"district": "南华县", "data": [101.27, 25.2]}, {"district": "姚安县", "data": [101.23, 25.5]}, {
            "district": "大姚县",
            "data": [101.32, 25.73]
        }, {"district": "永仁县", "data": [101.67, 26.07]}, {
            "district": "元谋县",
            "data": [101.88, 25.7]
        }, {"district": "武定县", "data": [102.4, 25.53]}, {"district": "禄丰县", "data": [102.08, 25.15]}]
    }, {
        "city": "红河哈尼族彝族自治州",
        "districts": [{"district": "红河哈尼族彝族自治州", "data": [103.4, 23.37]}, {
            "district": "个旧市",
            "data": [103.15, 23.37]
        }, {"district": "开远市", "data": [103.27, 23.72]}, {
            "district": "蒙自县",
            "data": [103.4, 23.37]
        }, {"district": "屏边苗族自治县", "data": [103.68, 22.98]}, {
            "district": "建水县",
            "data": [102.83, 23.62]
        }, {"district": "石屏县", "data": [102.5, 23.72]}, {"district": "弥勒县", "data": [103.43, 24.4]}, {
            "district": "泸西县",
            "data": [103.77, 24.53]
        }, {"district": "元阳县", "data": [102.83, 23.23]}, {
            "district": "红河县",
            "data": [102.42, 23.37]
        }, {"district": "绿春县", "data": [102.4, 23]}, {"district": "河口瑶族自治县", "data": [103.97, 22.52]}]
    }, {
        "city": "文山壮族苗族自治州",
        "districts": [{"district": "文山壮族苗族自治州", "data": [104.25, 23.37]}, {
            "district": "文山县",
            "data": [104.25, 23.37]
        }, {"district": "砚山县", "data": [104.33, 23.62]}, {
            "district": "西畴县",
            "data": [104.67, 23.45]
        }, {"district": "麻栗坡县", "data": [104.7, 23.12]}, {
            "district": "马关县",
            "data": [104.4, 23.02]
        }, {"district": "丘北县", "data": [104.18, 24.05]}, {
            "district": "广南县",
            "data": [105.07, 24.05]
        }, {"district": "富宁县", "data": [105.62, 23.63]}]
    }, {
        "city": "西双版纳傣族自治州",
        "districts": [{"district": "西双版纳傣族自治州", "data": [100.8, 22.02]}, {
            "district": "景洪市",
            "data": [100.8, 22.02]
        }, {"district": "勐海县", "data": [100.45, 21.97]}, {"district": "勐腊县", "data": [101.57, 21.48]}]
    }, {
        "city": "大理白族自治州",
        "districts": [{"district": "大理白族自治州", "data": [100.23, 25.6]}, {
            "district": "大理市",
            "data": [100.23, 25.6]
        }, {"district": "漾濞彝族自治县", "data": [99.95, 25.67]}, {
            "district": "祥云县",
            "data": [100.55, 25.48]
        }, {"district": "宾川县", "data": [100.58, 25.83]}, {
            "district": "弥渡县",
            "data": [100.48, 25.35]
        }, {"district": "南涧彝族自治县", "data": [100.52, 25.05]}, {
            "district": "巍山彝族回族自治县",
            "data": [100.3, 25.23]
        }, {"district": "永平县", "data": [99.53, 25.47]}, {"district": "云龙县", "data": [99.37, 25.88]}, {
            "district": "洱源县",
            "data": [99.95, 26.12]
        }, {"district": "剑川县", "data": [99.9, 26.53]}, {"district": "鹤庆县", "data": [100.18, 26.57]}]
    }, {
        "city": "德宏傣族景颇族自治州",
        "districts": [{"district": "德宏傣族景颇族自治州", "data": [98.58, 24.43]}, {
            "district": "瑞丽市",
            "data": [97.85, 24.02]
        }, {"district": "潞西市", "data": [98.58, 24.43]}, {"district": "梁河县", "data": [98.3, 24.82]}, {
            "district": "盈江县",
            "data": [97.93, 24.72]
        }, {"district": "陇川县", "data": [97.8, 24.2]}]
    }, {
        "city": "怒江傈僳族自治州",
        "districts": [{"district": "怒江傈僳族自治州", "data": [98.85, 25.85]}, {
            "district": "泸水县",
            "data": [98.85, 25.85]
        }, {"district": "福贡县", "data": [98.87, 26.9]}, {
            "district": "贡山独龙族怒族自治县",
            "data": [98.67, 27.73]
        }, {"district": "兰坪白族普米族自治县", "data": [99.42, 26.45]}]
    }, {
        "city": "迪庆藏族自治州",
        "districts": [{"district": "迪庆藏族自治州", "data": [99.7, 27.83]}, {
            "district": "香格里拉县",
            "data": [99.7, 27.83]
        }, {"district": "德钦县", "data": [98.92, 28.48]}, {"district": "维西傈僳族自治县", "data": [99.28, 27.18]}]
    }]
}, {
    "province": "西藏自治区",
    "citys": [{
        "city": "拉萨市",
        "districts": [{"district": "拉萨市", "data": [91.13, 29.65]}, {
            "district": "城关区",
            "data": [91.13, 29.65]
        }, {"district": "林周县", "data": [91.25, 29.9]}, {"district": "当雄县", "data": [91.1, 30.48]}, {
            "district": "尼木县",
            "data": [90.15, 29.45]
        }, {"district": "曲水县", "data": [90.73, 29.37]}, {"district": "堆龙德庆县", "data": [91, 29.65]}, {
            "district": "达孜县",
            "data": [91.35, 29.68]
        }, {"district": "墨竹工卡县", "data": [91.73, 29.83]}]
    }, {
        "city": "昌都地区",
        "districts": [{"district": "昌都地区", "data": [97.18, 31.13]}, {
            "district": "昌都县",
            "data": [97.18, 31.13]
        }, {"district": "江达县", "data": [98.22, 31.5]}, {"district": "贡觉县", "data": [98.27, 30.87]}, {
            "district": "类乌齐县",
            "data": [96.6, 31.22]
        }, {"district": "丁青县", "data": [95.6, 31.42]}, {"district": "察雅县", "data": [97.57, 30.65]}, {
            "district": "八宿县",
            "data": [96.92, 30.05]
        }, {"district": "左贡县", "data": [97.85, 29.67]}, {"district": "芒康县", "data": [98.6, 29.68]}, {
            "district": "洛隆县",
            "data": [95.83, 30.75]
        }, {"district": "边坝县", "data": [94.7, 30.93]}]
    }, {
        "city": "山南地区",
        "districts": [{"district": "山南地区", "data": [91.77, 29.23]}, {
            "district": "乃东县",
            "data": [91.77, 29.23]
        }, {"district": "扎囊县", "data": [91.33, 29.25]}, {"district": "贡嘎县", "data": [90.98, 29.3]}, {
            "district": "桑日县",
            "data": [92.02, 29.27]
        }, {"district": "琼结县", "data": [91.68, 29.03]}, {"district": "曲松县", "data": [92.2, 29.07]}, {
            "district": "措美县",
            "data": [91.43, 28.43]
        }, {"district": "洛扎县", "data": [90.87, 28.38]}, {"district": "加查县", "data": [92.58, 29.15]}, {
            "district": "隆子县",
            "data": [92.47, 28.42]
        }, {"district": "错那县", "data": [91.95, 28]}, {"district": "浪卡子县", "data": [90.4, 28.97]}]
    }, {
        "city": "日喀则地区",
        "districts": [{"district": "日喀则地区", "data": [88.88, 29.27]}, {
            "district": "日喀则市",
            "data": [88.88, 29.27]
        }, {"district": "南木林县", "data": [89.1, 29.68]}, {"district": "江孜县", "data": [89.6, 28.92]}, {
            "district": "定日县",
            "data": [87.12, 28.67]
        }, {"district": "萨迦县", "data": [88.02, 28.9]}, {"district": "拉孜县", "data": [87.63, 29.08]}, {
            "district": "昂仁县",
            "data": [87.23, 29.3]
        }, {"district": "谢通门县", "data": [88.27, 29.43]}, {
            "district": "白朗县",
            "data": [89.27, 29.12]
        }, {"district": "仁布县", "data": [89.83, 29.23]}, {"district": "康马县", "data": [89.68, 28.57]}, {
            "district": "定结县",
            "data": [87.77, 28.37]
        }, {"district": "仲巴县", "data": [84.03, 29.77]}, {"district": "亚东县", "data": [88.9, 27.48]}, {
            "district": "吉隆县",
            "data": [85.3, 28.85]
        }, {"district": "聂拉木县", "data": [85.98, 28.17]}, {
            "district": "萨嘎县",
            "data": [85.23, 29.33]
        }, {"district": "岗巴县", "data": [88.52, 28.28]}]
    }, {
        "city": "那曲地区",
        "districts": [{"district": "那曲地区", "data": [92.07, 31.48]}, {
            "district": "那曲县",
            "data": [92.07, 31.48]
        }, {"district": "嘉黎县", "data": [93.25, 30.65]}, {"district": "比如县", "data": [93.68, 31.48]}, {
            "district": "聂荣县",
            "data": [92.3, 32.12]
        }, {"district": "安多县", "data": [91.68, 32.27]}, {"district": "申扎县", "data": [88.7, 30.93]}, {
            "district": "索县",
            "data": [93.78, 31.88]
        }, {"district": "班戈县", "data": [90.02, 31.37]}, {"district": "巴青县", "data": [94.03, 31.93]}, {
            "district": "尼玛县",
            "data": [87.23, 31.78]
        }]
    }, {
        "city": "阿里地区",
        "districts": [{"district": "阿里地区", "data": [80.1, 32.5]}, {
            "district": "普兰县",
            "data": [81.17, 30.3]
        }, {"district": "札达县", "data": [79.8, 31.48]}, {"district": "噶尔县", "data": [80.1, 32.5]}, {
            "district": "日土县",
            "data": [79.72, 33.38]
        }, {"district": "革吉县", "data": [81.12, 32.4]}, {"district": "改则县", "data": [84.07, 32.3]}, {
            "district": "措勤县",
            "data": [85.17, 31.02]
        }]
    }, {
        "city": "林芝地区",
        "districts": [{"district": "林芝地区", "data": [94.37, 29.68]}, {
            "district": "林芝县",
            "data": [94.37, 29.68]
        }, {"district": "工布江达县", "data": [93.25, 29.88]}, {
            "district": "米林县",
            "data": [94.22, 29.22]
        }, {"district": "墨脱县", "data": [95.33, 29.33]}, {"district": "波密县", "data": [95.77, 29.87]}, {
            "district": "察隅县",
            "data": [97.47, 28.67]
        }, {"district": "朗县", "data": [93.07, 29.05]}]
    }]
}, {
    "province": "陕西省",
    "citys": [{
        "city": "西安市",
        "districts": [{"district": "西安市", "data": [108.93, 34.27]}, {
            "district": "新城区",
            "data": [108.95, 34.27]
        }, {"district": "碑林区", "data": [108.93, 34.23]}, {
            "district": "莲湖区",
            "data": [108.93, 34.27]
        }, {"district": "灞桥区", "data": [109.07, 34.27]}, {
            "district": "未央区",
            "data": [108.93, 34.28]
        }, {"district": "雁塔区", "data": [108.95, 34.22]}, {
            "district": "阎良区",
            "data": [109.23, 34.65]
        }, {"district": "临潼区", "data": [109.22, 34.37]}, {
            "district": "长安区",
            "data": [108.93, 34.17]
        }, {"district": "蓝田县", "data": [109.32, 34.15]}, {"district": "周至县", "data": [108.2, 34.17]}, {
            "district": "户县",
            "data": [108.6, 34.1]
        }, {"district": "高陵县", "data": [109.08, 34.53]}]
    }, {
        "city": "铜川市",
        "districts": [{"district": "铜川市", "data": [108.93, 34.9]}, {
            "district": "王益区",
            "data": [109.07, 35.07]
        }, {"district": "印台区", "data": [109.1, 35.1]}, {"district": "耀州区", "data": [108.98, 34.92]}, {
            "district": "宜君县",
            "data": [109.12, 35.4]
        }]
    }, {
        "city": "宝鸡市",
        "districts": [{"district": "宝鸡市", "data": [107.13, 34.37]}, {
            "district": "渭滨区",
            "data": [107.15, 34.37]
        }, {"district": "金台区", "data": [107.13, 34.38]}, {
            "district": "陈仓区",
            "data": [107.37, 34.37]
        }, {"district": "凤翔县", "data": [107.38, 34.52]}, {
            "district": "岐山县",
            "data": [107.62, 34.45]
        }, {"district": "扶风县", "data": [107.87, 34.37]}, {"district": "眉县", "data": [107.75, 34.28]}, {
            "district": "陇县",
            "data": [106.85, 34.9]
        }, {"district": "千阳县", "data": [107.13, 34.65]}, {
            "district": "麟游县",
            "data": [107.78, 34.68]
        }, {"district": "凤县", "data": [106.52, 33.92]}, {"district": "太白县", "data": [107.32, 34.07]}]
    }, {
        "city": "咸阳市",
        "districts": [{"district": "咸阳市", "data": [108.7, 34.33]}, {
            "district": "秦都区",
            "data": [108.72, 34.35]
        }, {"district": "杨凌区", "data": [108.07, 34.28]}, {
            "district": "渭城区",
            "data": [108.73, 34.33]
        }, {"district": "三原县", "data": [108.93, 34.62]}, {
            "district": "泾阳县",
            "data": [108.83, 34.53]
        }, {"district": "乾县", "data": [108.23, 34.53]}, {
            "district": "礼泉县",
            "data": [108.42, 34.48]
        }, {"district": "永寿县", "data": [108.13, 34.7]}, {"district": "彬县", "data": [108.08, 35.03]}, {
            "district": "长武县",
            "data": [107.78, 35.2]
        }, {"district": "旬邑县", "data": [108.33, 35.12]}, {
            "district": "淳化县",
            "data": [108.58, 34.78]
        }, {"district": "武功县", "data": [108.2, 34.27]}, {"district": "兴平市", "data": [108.48, 34.3]}]
    }, {
        "city": "渭南市",
        "districts": [{"district": "渭南市", "data": [109.5, 34.5]}, {
            "district": "临渭区",
            "data": [109.48, 34.5]
        }, {"district": "华县", "data": [109.77, 34.52]}, {
            "district": "潼关县",
            "data": [110.23, 34.55]
        }, {"district": "大荔县", "data": [109.93, 34.8]}, {
            "district": "合阳县",
            "data": [110.15, 35.23]
        }, {"district": "澄城县", "data": [109.93, 35.18]}, {
            "district": "蒲城县",
            "data": [109.58, 34.95]
        }, {"district": "白水县", "data": [109.58, 35.18]}, {
            "district": "富平县",
            "data": [109.18, 34.75]
        }, {"district": "韩城市", "data": [110.43, 35.48]}, {"district": "华阴市", "data": [110.08, 34.57]}]
    }, {
        "city": "延安市",
        "districts": [{"district": "延安市", "data": [109.48, 36.6]}, {
            "district": "宝塔区",
            "data": [109.48, 36.6]
        }, {"district": "延长县", "data": [110, 36.58]}, {"district": "延川县", "data": [110.18, 36.88]}, {
            "district": "子长县",
            "data": [109.67, 37.13]
        }, {"district": "安塞县", "data": [109.32, 36.87]}, {
            "district": "志丹县",
            "data": [108.77, 36.82]
        }, {"district": "甘泉县", "data": [109.35, 36.28]}, {
            "district": "富县",
            "data": [109.37, 35.98]
        }, {"district": "洛川县", "data": [109.43, 35.77]}, {
            "district": "宜川县",
            "data": [110.17, 36.05]
        }, {"district": "黄龙县", "data": [109.83, 35.58]}, {"district": "黄陵县", "data": [109.25, 35.58]}]
    }, {
        "city": "汉中市",
        "districts": [{"district": "汉中市", "data": [107.02, 33.07]}, {
            "district": "汉台区",
            "data": [107.03, 33.07]
        }, {"district": "南郑县", "data": [106.93, 33]}, {"district": "城固县", "data": [107.33, 33.15]}, {
            "district": "洋县",
            "data": [107.55, 33.22]
        }, {"district": "西乡县", "data": [107.77, 32.98]}, {
            "district": "勉县",
            "data": [106.67, 33.15]
        }, {"district": "宁强县", "data": [106.25, 32.83]}, {
            "district": "略阳县",
            "data": [106.15, 33.33]
        }, {"district": "镇巴县", "data": [107.9, 32.53]}, {
            "district": "留坝县",
            "data": [106.92, 33.62]
        }, {"district": "佛坪县", "data": [107.98, 33.53]}]
    }, {
        "city": "榆林市",
        "districts": [{"district": "榆林市", "data": [109.73, 38.28]}, {
            "district": "榆阳区",
            "data": [109.75, 38.28]
        }, {"district": "神木县", "data": [110.5, 38.83]}, {
            "district": "府谷县",
            "data": [111.07, 39.03]
        }, {"district": "横山县", "data": [109.28, 37.95]}, {"district": "靖边县", "data": [108.8, 37.6]}, {
            "district": "定边县",
            "data": [107.6, 37.58]
        }, {"district": "绥德县", "data": [110.25, 37.5]}, {"district": "米脂县", "data": [110.18, 37.75]}, {
            "district": "佳县",
            "data": [110.48, 38.02]
        }, {"district": "吴堡县", "data": [110.73, 37.45]}, {
            "district": "清涧县",
            "data": [110.12, 37.08]
        }, {"district": "子洲县", "data": [110.03, 37.62]}]
    }, {
        "city": "安康市",
        "districts": [{"district": "安康市", "data": [109.02, 32.68]}, {
            "district": "汉滨区",
            "data": [109.02, 32.68]
        }, {"district": "汉阴县", "data": [108.5, 32.9]}, {"district": "石泉县", "data": [108.25, 33.05]}, {
            "district": "宁陕县",
            "data": [108.32, 33.32]
        }, {"district": "紫阳县", "data": [108.53, 32.52]}, {
            "district": "岚皋县",
            "data": [108.9, 32.32]
        }, {"district": "平利县", "data": [109.35, 32.4]}, {
            "district": "镇坪县",
            "data": [109.52, 31.88]
        }, {"district": "旬阳县", "data": [109.38, 32.83]}, {"district": "白河县", "data": [110.1, 32.82]}]
    }, {
        "city": "商洛市",
        "districts": [{"district": "商洛市", "data": [109.93, 33.87]}, {
            "district": "商州区",
            "data": [109.93, 33.87]
        }, {"district": "洛南县", "data": [110.13, 34.08]}, {
            "district": "丹凤县",
            "data": [110.33, 33.7]
        }, {"district": "商南县", "data": [110.88, 33.53]}, {
            "district": "山阳县",
            "data": [109.88, 33.53]
        }, {"district": "镇安县", "data": [109.15, 33.43]}, {"district": "柞水县", "data": [109.1, 33.68]}]
    }]
}, {
    "province": "甘肃省",
    "citys": [{
        "city": "兰州市",
        "districts": [{"district": "兰州市", "data": [103.82, 36.07]}, {
            "district": "城关区",
            "data": [103.83, 36.05]
        }, {"district": "西固区", "data": [103.62, 36.1]}, {
            "district": "红古区",
            "data": [102.87, 36.33]
        }, {"district": "永登县", "data": [103.27, 36.73]}, {
            "district": "皋兰县",
            "data": [103.95, 36.33]
        }, {"district": "榆中县", "data": [104.12, 35.85]}]
    }, {"city": "嘉峪关市", "districts": [{"district": "嘉峪关市", "data": [98.27, 39.8]}]}, {
        "city": "金昌市",
        "districts": [{"district": "金昌市", "data": [102.18, 38.5]}, {
            "district": "金川区",
            "data": [102.18, 38.5]
        }, {"district": "永昌县", "data": [101.97, 38.25]}]
    }, {
        "city": "白银市",
        "districts": [{"district": "白银市", "data": [104.18, 36.55]}, {
            "district": "白银区",
            "data": [104.18, 36.55]
        }, {"district": "平川区", "data": [104.83, 36.73]}, {
            "district": "靖远县",
            "data": [104.68, 36.57]
        }, {"district": "会宁县", "data": [105.05, 35.7]}, {"district": "景泰县", "data": [104.07, 37.15]}]
    }, {
        "city": "天水市",
        "districts": [{"district": "天水市", "data": [105.72, 34.58]}, {
            "district": "清水县",
            "data": [106.13, 34.75]
        }, {"district": "秦安县", "data": [105.67, 34.87]}, {
            "district": "甘谷县",
            "data": [105.33, 34.73]
        }, {"district": "武山县", "data": [104.88, 34.72]}, {"district": "张家川回族自治县", "data": [106.22, 35]}]
    }, {
        "city": "武威市",
        "districts": [{"district": "武威市", "data": [102.63, 37.93]}, {
            "district": "凉州区",
            "data": [102.63, 37.93]
        }, {"district": "民勤县", "data": [103.08, 38.62]}, {
            "district": "古浪县",
            "data": [102.88, 37.47]
        }, {"district": "天祝藏族自治县", "data": [103.13, 36.98]}]
    }, {
        "city": "张掖市",
        "districts": [{"district": "张掖市", "data": [100.45, 38.93]}, {
            "district": "甘州区",
            "data": [100.45, 38.93]
        }, {"district": "肃南裕固族自治县", "data": [99.62, 38.83]}, {
            "district": "民乐县",
            "data": [100.82, 38.43]
        }, {"district": "临泽县", "data": [100.17, 39.13]}, {
            "district": "高台县",
            "data": [99.82, 39.38]
        }, {"district": "山丹县", "data": [101.08, 38.78]}]
    }, {
        "city": "平凉市",
        "districts": [{"district": "平凉市", "data": [106.67, 35.55]}, {
            "district": "崆峒区",
            "data": [106.67, 35.55]
        }, {"district": "泾川县", "data": [107.37, 35.33]}, {
            "district": "灵台县",
            "data": [107.62, 35.07]
        }, {"district": "崇信县", "data": [107.03, 35.3]}, {
            "district": "华亭县",
            "data": [106.65, 35.22]
        }, {"district": "庄浪县", "data": [106.05, 35.2]}, {"district": "静宁县", "data": [105.72, 35.52]}]
    }, {
        "city": "酒泉市",
        "districts": [{"district": "酒泉市", "data": [98.52, 39.75]}, {
            "district": "肃州区",
            "data": [98.52, 39.75]
        }, {"district": "金塔县", "data": [98.9, 39.98]}, {
            "district": "肃北蒙古族自治县",
            "data": [94.88, 39.52]
        }, {"district": "阿克塞哈萨克族自治县", "data": [94.33, 39.63]}, {
            "district": "玉门市",
            "data": [97.05, 40.28]
        }, {"district": "敦煌市", "data": [94.67, 40.13]}]
    }, {
        "city": "庆阳市",
        "districts": [{"district": "庆阳市", "data": [107.63, 35.73]}, {
            "district": "西峰区",
            "data": [107.63, 35.73]
        }, {"district": "庆城县", "data": [107.88, 36]}, {"district": "环县", "data": [107.3, 36.58]}, {
            "district": "华池县",
            "data": [107.98, 36.47]
        }, {"district": "合水县", "data": [108.02, 35.82]}, {"district": "正宁县", "data": [108.37, 35.5]}, {
            "district": "宁县",
            "data": [107.92, 35.5]
        }, {"district": "镇原县", "data": [107.2, 35.68]}]
    }, {
        "city": "定西市",
        "districts": [{"district": "定西市", "data": [104.62, 35.58]}, {
            "district": "安定区",
            "data": [104.62, 35.58]
        }, {"district": "通渭县", "data": [105.25, 35.2]}, {"district": "陇西县", "data": [104.63, 35]}, {
            "district": "渭源县",
            "data": [104.22, 35.13]
        }, {"district": "临洮县", "data": [103.87, 35.38]}, {"district": "漳县", "data": [104.47, 34.85]}, {
            "district": "岷县",
            "data": [104.03, 34.43]
        }]
    }, {
        "city": "陇南市",
        "districts": [{"district": "陇南市", "data": [104.92, 33.4]}, {
            "district": "武都区",
            "data": [104.92, 33.4]
        }, {"district": "成县", "data": [105.72, 33.73]}, {"district": "文县", "data": [104.68, 32.95]}, {
            "district": "宕昌县",
            "data": [104.38, 34.05]
        }, {"district": "康县", "data": [105.6, 33.33]}, {"district": "西和县", "data": [105.3, 34.02]}, {
            "district": "礼县",
            "data": [105.17, 34.18]
        }, {"district": "徽县", "data": [106.08, 33.77]}, {"district": "两当县", "data": [106.3, 33.92]}]
    }, {
        "city": "临夏回族自治州",
        "districts": [{"district": "临夏回族自治州", "data": [103.22, 35.6]}, {
            "district": "临夏市",
            "data": [103.22, 35.6]
        }, {"district": "临夏县", "data": [103, 35.5]}, {"district": "康乐县", "data": [103.72, 35.37]}, {
            "district": "永靖县",
            "data": [103.32, 35.93]
        }, {"district": "广河县", "data": [103.58, 35.48]}, {
            "district": "和政县",
            "data": [103.35, 35.43]
        }, {"district": "东乡族自治县", "data": [103.4, 35.67]}]
    }, {
        "city": "甘南藏族自治州",
        "districts": [{"district": "甘南藏族自治州", "data": [102.92, 34.98]}, {
            "district": "合作市",
            "data": [102.92, 34.98]
        }, {"district": "临潭县", "data": [103.35, 34.7]}, {"district": "卓尼县", "data": [103.5, 34.58]}, {
            "district": "舟曲县",
            "data": [104.37, 33.78]
        }, {"district": "迭部县", "data": [103.22, 34.05]}, {"district": "玛曲县", "data": [102.07, 34]}, {
            "district": "碌曲县",
            "data": [102.48, 34.58]
        }, {"district": "夏河县", "data": [102.52, 35.2]}]
    }]
}, {
    "province": "青海省",
    "citys": [{
        "city": "西宁市",
        "districts": [{"district": "西宁市", "data": [101.78, 36.62]}, {
            "district": "城东区",
            "data": [101.8, 36.62]
        }, {"district": "城中区", "data": [101.78, 36.62]}, {
            "district": "城西区",
            "data": [101.77, 36.62]
        }, {"district": "城北区", "data": [101.77, 36.67]}, {
            "district": "大通回族土族自治县",
            "data": [101.68, 36.93]
        }, {"district": "湟中县", "data": [101.57, 36.5]}, {"district": "湟源县", "data": [101.27, 36.68]}]
    }, {
        "city": "海东地区",
        "districts": [{"district": "海东地区", "data": [102.12, 36.5]}, {
            "district": "平安县",
            "data": [102.12, 36.5]
        }, {"district": "民和回族土族自治县", "data": [102.8, 36.33]}, {
            "district": "乐都县",
            "data": [102.4, 36.48]
        }, {"district": "互助土族自治县", "data": [101.95, 36.83]}, {
            "district": "化隆回族自治县",
            "data": [102.27, 36.1]
        }, {"district": "循化撒拉族自治县", "data": [102.48, 35.85]}]
    }, {
        "city": "海北藏族自治州",
        "districts": [{"district": "海北藏族自治州", "data": [100.9, 36.97]}, {
            "district": "门源回族自治县",
            "data": [101.62, 37.38]
        }, {"district": "祁连县", "data": [100.25, 38.18]}, {
            "district": "海晏县",
            "data": [100.98, 36.9]
        }, {"district": "刚察县", "data": [100.13, 37.33]}]
    }, {
        "city": "黄南藏族自治州",
        "districts": [{"district": "黄南藏族自治州", "data": [102.02, 35.52]}, {
            "district": "同仁县",
            "data": [102.02, 35.52]
        }, {"district": "尖扎县", "data": [102.03, 35.93]}, {
            "district": "泽库县",
            "data": [101.47, 35.03]
        }, {"district": "河南蒙古族自治县", "data": [101.6, 34.73]}]
    }, {
        "city": "海南藏族自治州",
        "districts": [{"district": "海南藏族自治州", "data": [100.62, 36.28]}, {
            "district": "共和县",
            "data": [100.62, 36.28]
        }, {"district": "同德县", "data": [100.57, 35.25]}, {
            "district": "贵德县",
            "data": [101.43, 36.05]
        }, {"district": "兴海县", "data": [99.98, 35.58]}, {"district": "贵南县", "data": [100.75, 35.58]}]
    }, {
        "city": "果洛藏族自治州",
        "districts": [{"district": "果洛藏族自治州", "data": [100.23, 34.48]}, {
            "district": "玛沁县",
            "data": [100.23, 34.48]
        }, {"district": "班玛县", "data": [100.73, 32.93]}, {"district": "甘德县", "data": [99.9, 33.97]}, {
            "district": "达日县",
            "data": [99.65, 33.75]
        }, {"district": "久治县", "data": [101.48, 33.43]}, {"district": "玛多县", "data": [98.18, 34.92]}]
    }, {
        "city": "玉树藏族自治州",
        "districts": [{"district": "玉树藏族自治州", "data": [97.02, 33]}, {
            "district": "玉树县",
            "data": [97.02, 33]
        }, {"district": "杂多县", "data": [95.3, 32.9]}, {"district": "称多县", "data": [97.1, 33.37]}, {
            "district": "治多县",
            "data": [95.62, 33.85]
        }, {"district": "囊谦县", "data": [96.48, 32.2]}, {"district": "曲麻莱县", "data": [95.8, 34.13]}]
    }, {
        "city": "海西蒙古族藏族自治州",
        "districts": [{"district": "海西蒙古族藏族自治州", "data": [97.37, 37.37]}, {
            "district": "格尔木市",
            "data": [94.9, 36.42]
        }, {"district": "德令哈市", "data": [97.37, 37.37]}, {
            "district": "乌兰县",
            "data": [98.48, 36.93]
        }, {"district": "都兰县", "data": [98.08, 36.3]}, {"district": "天峻县", "data": [99.02, 37.3]}]
    }]
}, {
    "province": "宁夏回族自治区",
    "citys": [{
        "city": "银川市",
        "districts": [{"district": "银川市", "data": [106.28, 38.47]}, {
            "district": "兴庆区",
            "data": [106.28, 38.48]
        }, {"district": "西夏区", "data": [106.18, 38.48]}, {
            "district": "金凤区",
            "data": [106.25, 38.47]
        }, {"district": "永宁县", "data": [106.25, 38.28]}, {
            "district": "贺兰县",
            "data": [106.35, 38.55]
        }, {"district": "灵武市", "data": [106.33, 38.1]}]
    }, {
        "city": "石嘴山市",
        "districts": [{"district": "石嘴山市", "data": [106.38, 39.02]}, {
            "district": "大武口区",
            "data": [106.38, 39.02]
        }, {"district": "惠农区", "data": [106.78, 39.25]}, {"district": "平罗县", "data": [106.53, 38.9]}]
    }, {
        "city": "吴忠市",
        "districts": [{"district": "吴忠市", "data": [106.2, 37.98]}, {
            "district": "利通区",
            "data": [106.2, 37.98]
        }, {"district": "盐池县", "data": [107.4, 37.78]}, {
            "district": "同心县",
            "data": [105.92, 36.98]
        }, {"district": "青铜峡市", "data": [106.07, 38.02]}]
    }, {
        "city": "固原市",
        "districts": [{"district": "固原市", "data": [106.28, 36]}, {
            "district": "原州区",
            "data": [106.28, 36]
        }, {"district": "西吉县", "data": [105.73, 35.97]}, {
            "district": "隆德县",
            "data": [106.12, 35.62]
        }, {"district": "泾源县", "data": [106.33, 35.48]}, {"district": "彭阳县", "data": [106.63, 35.85]}]
    }, {
        "city": "中卫市",
        "districts": [{"district": "中卫市", "data": [105.18, 37.52]}, {
            "district": "沙坡头区",
            "data": [105.18, 37.52]
        }, {"district": "中宁县", "data": [105.67, 37.48]}, {"district": "海原县", "data": [105.65, 36.57]}]
    }]
}, {
    "province": "新疆维吾尔自治区",
    "citys": [{
        "city": "乌鲁木齐市",
        "districts": [{"district": "乌鲁木齐市", "data": [87.62, 43.82]}, {
            "district": "天山区",
            "data": [87.65, 43.78]
        }, {"district": "沙依巴克区", "data": [87.6, 43.78]}, {
            "district": "新市区",
            "data": [87.6, 43.85]
        }, {"district": "水磨沟区", "data": [87.63, 43.83]}, {
            "district": "头屯河区",
            "data": [87.42, 43.87]
        }, {"district": "达坂城区", "data": [88.3, 43.35]}, {
            "district": "东山区",
            "data": [87.68, 43.95]
        }, {"district": "乌鲁木齐县", "data": [87.6, 43.8]}]
    }, {
        "city": "克拉玛依市",
        "districts": [{"district": "克拉玛依市", "data": [84.87, 45.6]}, {
            "district": "独山子区",
            "data": [84.85, 44.32]
        }, {"district": "克拉玛依区", "data": [84.87, 45.6]}, {
            "district": "白碱滩区",
            "data": [85.13, 45.7]
        }, {"district": "乌尔禾区", "data": [85.68, 46.08]}]
    }, {
        "city": "吐鲁番地区",
        "districts": [{"district": "吐鲁番地区", "data": [89.17, 42.95]}, {
            "district": "吐鲁番市",
            "data": [89.17, 42.95]
        }, {"district": "鄯善县", "data": [90.22, 42.87]}, {"district": "托克逊县", "data": [88.65, 42.78]}]
    }, {
        "city": "哈密地区",
        "districts": [{"district": "哈密地区", "data": [93.52, 42.83]}, {
            "district": "哈密市",
            "data": [93.52, 42.83]
        }, {"district": "伊吾县", "data": [94.7, 43.25]}]
    }, {
        "city": "昌吉回族自治州",
        "districts": [{"district": "昌吉回族自治州", "data": [87.3, 44.02]}, {
            "district": "昌吉市",
            "data": [87.3, 44.02]
        }, {"district": "阜康市", "data": [87.98, 44.15]}, {
            "district": "米泉市",
            "data": [87.65, 43.97]
        }, {"district": "呼图壁县", "data": [86.9, 44.18]}, {"district": "玛纳斯县", "data": [86.22, 44.3]}, {
            "district": "奇台县",
            "data": [89.58, 44.02]
        }, {"district": "吉木萨尔县", "data": [89.18, 44]}, {"district": "木垒哈萨克自治县", "data": [90.28, 43.83]}]
    }, {
        "city": "博尔塔拉蒙古自治州",
        "districts": [{"district": "博尔塔拉蒙古自治州", "data": [82.07, 44.9]}, {
            "district": "博乐市",
            "data": [82.07, 44.9]
        }, {"district": "精河县", "data": [82.88, 44.6]}, {"district": "温泉县", "data": [81.03, 44.97]}]
    }, {
        "city": "巴音郭楞蒙古自治州",
        "districts": [{"district": "巴音郭楞蒙古自治州", "data": [86.15, 41.77]}, {
            "district": "库尔勒市",
            "data": [86.15, 41.77]
        }, {"district": "轮台县", "data": [84.27, 41.78]}, {"district": "尉犁县", "data": [86.25, 41.33]}, {
            "district": "若羌县",
            "data": [88.17, 39.02]
        }, {"district": "且末县", "data": [85.53, 38.13]}, {
            "district": "焉耆回族自治县",
            "data": [86.57, 42.07]
        }, {"district": "和静县", "data": [86.4, 42.32]}, {"district": "和硕县", "data": [86.87, 42.27]}, {
            "district": "博湖县",
            "data": [86.63, 41.98]
        }]
    }, {
        "city": "阿克苏地区",
        "districts": [{"district": "阿克苏地区", "data": [80.27, 41.17]}, {
            "district": "阿克苏市",
            "data": [80.27, 41.17]
        }, {"district": "温宿县", "data": [80.23, 41.28]}, {"district": "库车县", "data": [82.97, 41.72]}, {
            "district": "沙雅县",
            "data": [82.78, 41.22]
        }, {"district": "新和县", "data": [82.6, 41.55]}, {"district": "拜城县", "data": [81.87, 41.8]}, {
            "district": "乌什县",
            "data": [79.23, 41.22]
        }, {"district": "阿瓦提县", "data": [80.38, 40.63]}, {"district": "柯坪县", "data": [79.05, 40.5]}]
    }, {
        "city": "阿图什市",
        "districts": [{"district": "阿图什市", "data": [76.17, 39.72]}, {
            "district": "阿克陶县",
            "data": [75.95, 39.15]
        }, {"district": "阿合奇县", "data": [78.45, 40.93]}, {"district": "乌恰县", "data": [75.25, 39.72]}]
    }, {
        "city": "喀什地区",
        "districts": [{"district": "喀什地区", "data": [75.98, 39.47]}, {
            "district": "喀什市",
            "data": [75.98, 39.47]
        }, {"district": "疏附县", "data": [75.85, 39.38]}, {"district": "疏勒县", "data": [76.05, 39.4]}, {
            "district": "英吉沙县",
            "data": [76.17, 38.93]
        }, {"district": "泽普县", "data": [77.27, 38.18]}, {"district": "莎车县", "data": [77.23, 38.42]}, {
            "district": "叶城县",
            "data": [77.42, 37.88]
        }, {"district": "麦盖提县", "data": [77.65, 38.9]}, {
            "district": "岳普湖县",
            "data": [76.77, 39.23]
        }, {"district": "伽师县", "data": [76.73, 39.5]}, {"district": "巴楚县", "data": [78.55, 39.78]}]
    }, {
        "city": "和田地区",
        "districts": [{"district": "和田地区", "data": [79.92, 37.12]}, {
            "district": "和田市",
            "data": [79.92, 37.12]
        }, {"district": "和田县", "data": [79.93, 37.1]}, {"district": "墨玉县", "data": [79.73, 37.27]}, {
            "district": "皮山县",
            "data": [78.28, 37.62]
        }, {"district": "洛浦县", "data": [80.18, 37.07]}, {"district": "策勒县", "data": [80.8, 37]}, {
            "district": "于田县",
            "data": [81.67, 36.85]
        }, {"district": "民丰县", "data": [82.68, 37.07]}]
    }, {
        "city": "伊犁哈萨克自治州",
        "districts": [{"district": "伊犁哈萨克自治州", "data": [81.32, 43.92]}, {
            "district": "伊宁市",
            "data": [81.32, 43.92]
        }, {"district": "奎屯市", "data": [84.9, 44.42]}, {
            "district": "伊宁县",
            "data": [81.52, 43.98]
        }, {"district": "察布查尔锡伯自治县", "data": [81.15, 43.83]}, {
            "district": "霍城县",
            "data": [80.88, 44.05]
        }, {"district": "巩留县", "data": [82.23, 43.48]}, {"district": "新源县", "data": [83.25, 43.43]}, {
            "district": "昭苏县",
            "data": [81.13, 43.15]
        }, {"district": "特克斯县", "data": [81.83, 43.22]}, {"district": "尼勒克县", "data": [82.5, 43.78]}]
    }, {
        "city": "塔城地区",
        "districts": [{"district": "塔城地区", "data": [82.98, 46.75]}, {
            "district": "塔城市",
            "data": [82.98, 46.75]
        }, {"district": "乌苏市", "data": [84.68, 44.43]}, {"district": "额敏县", "data": [83.63, 46.53]}, {
            "district": "沙湾县",
            "data": [85.62, 44.33]
        }, {"district": "托里县", "data": [83.6, 45.93]}, {
            "district": "裕民县",
            "data": [82.98, 46.2]
        }, {"district": "和布克赛尔蒙古自治县", "data": [85.72, 46.8]}]
    }, {
        "city": "阿勒泰地区",
        "districts": [{"district": "阿勒泰地区", "data": [88.13, 47.85]}, {
            "district": "阿勒泰市",
            "data": [88.13, 47.85]
        }, {"district": "布尔津县", "data": [86.85, 47.7]}, {"district": "富蕴县", "data": [89.52, 47]}, {
            "district": "福海县",
            "data": [87.5, 47.12]
        }, {"district": "哈巴河县", "data": [86.42, 48.07]}, {
            "district": "青河县",
            "data": [90.38, 46.67]
        }, {"district": "吉木乃县", "data": [85.88, 47.43]}]
    }, {
        "city": "石河子市",
        "districts": [{"district": "石河子市", "data": [86.03, 44.3]}, {
            "district": "阿拉尔市",
            "data": [81.28, 40.55]
        }, {"district": "图木舒克市", "data": [79.13, 39.85]}, {"district": "五家渠市", "data": [87.53, 44.17]}]
    }]
}, {
    "province": "香港",
    "citys": [{"city": "香港", "districts": [{"district": "香港", "data": [114.08, 22.2]}]}]
}, {"province": "澳门", "citys": [{"city": "澳门", "districts": [{"district": "澳门", "data": [113.33, 22.13]}]}]}, {
    "province": "台湾", "citys": [{
        "city": "台湾",
        "districts": [{"district": "台北市", "data": [121.5, 25.03]}, {
            "district": "高雄市",
            "data": [120.28, 22.62]
        }, {"district": "基隆市", "data": [121.73, 25.13]}, {
            "district": "台中市",
            "data": [120.67, 24.15]
        }, {"district": "台南市", "data": [120.2, 23]}, {"district": "新竹市", "data": [120.95, 24.82]}, {
            "district": "嘉义市",
            "data": [120.43, 23.48]
        }, {"district": "台北县", "data": [121.47, 25.02]}, {
            "district": "宜兰县",
            "data": [121.75, 24.77]
        }, {"district": "桃园县", "data": [121.3, 24.97]}, {"district": "苗栗县", "data": [120.8, 24.53]}, {
            "district": "台中县",
            "data": [120.72, 24.25]
        }, {"district": "彰化县", "data": [120.53, 24.08]}, {
            "district": "南投县",
            "data": [120.67, 23.92]
        }, {"district": "云林县", "data": [120.53, 23.72]}, {
            "district": "台南县",
            "data": [120.32, 23.32]
        }, {"district": "高雄县", "data": [120.37, 22.63]}, {
            "district": "屏东县",
            "data": [120.48, 22.67]
        }, {"district": "台东县", "data": [121.15, 22.75]}, {
            "district": "花莲县",
            "data": [121.6, 23.98]
        }, {"district": "澎湖县", "data": [119.58, 23.58]}]
    }]
}];