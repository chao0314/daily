export default {
    "salesBar": {
        "axis": ["南京", "深圳", "杭州", "上海", "北京", "全国"],
        "data1": [68203, 73489, 79034, 204970, 231744, 630230],
        "data2": [49325, 53438, 61000, 221594, 234141, 681807]
    },
    "saleLine": {
        "axis": ["00:00", "08:00", "16:00", "24:00"],
        "data1": [151, 532, 901, 344],
        "data2": [320, 1732, 501, 334],
        "data3": [900, 900, 900, 900]
    },
    "salePie": [{"name": "转化率", "total": "13%", "data": [1000, 130]}, {
        "name": "退单率",
        "total": "5%",
        "data": [1000, 50]
    }, {"name": "跳失率", "total": "43%", "data": [1000, 430]}],
    "salesSun": [{
        "name": "小食",
        "itemStyle": {"color": "rgb(0,123,255)"},
        "children": [{
            "name": "奶茶",
            "children": [{"name": "5☆", "children": [{"name": "港式奶茶"}, {"name": "珍珠奶茶"}]}]
        }, {
            "name": "串串",
            "children": [{"name": "5☆", "children": [{"name": "羊肉串"}]}, {
                "name": "4☆",
                "children": [{"name": "牛肉串"}, {"name": "猪肉串"}]
            }, {"name": "3☆", "children": [{"name": "其他"}]}]
        }]
    }, {
        "name": "主食",
        "itemStyle": {"color": "rgb(0,218,234)"},
        "children": [{
            "name": "米饭",
            "children": [{"name": "5☆", "children": [{"name": "王者炒饭"}]}, {
                "name": "4☆",
                "children": [{"name": "套餐"}, {"name": "轻食"}]
            }]
        }, {
            "name": "粥",
            "children": [{"name": "5☆", "children": [{"name": "牛肉粥"}]}, {
                "name": "4☆",
                "children": [{"name": "白米粥"}, {"name": "红豆粥"}]
            }]
        }, {
            "name": "西餐",
            "children": [{"name": "5☆", "children": [{"name": "汉堡"}]}, {
                "name": "4☆",
                "children": [{"name": "薯条"}, {"name": "薯饼"}]
            }]
        }]
    }],
    "salesRadar": {
        "indicator": [{"name": "订单量", "max": 6500}, {"name": "骑手量", "max": 16000}, {
            "name": "访问量",
            "max": 30000
        }, {"name": "客服", "max": 38000}, {"name": "配送", "max": 52000}, {"name": "热度", "max": 25000}],
        "data": [{
            "value": [4300, 10000, 28000, 35000, 50000, 19000],
            "name": "预期"
        }, {"value": [5000, 14000, 28000, 31000, 42000, 21000], "name": "实际"}]
    }
}