module.exports = {
    username: [
        {required: true, message: '用户名必须填写'},
        {min: 4, message: '用户名最少4个字'},
        {max: 32, message: '用户名最长32个字'},
        {type: 'string', pattern: /^\w{4,32}$/, message: '用户名必须仅包含数字字母、下划线'}
    ],
    password: [
        {required: true, message: '密码必须填写'},
        {min: 6, message: '密码长度最少6'}
    ]

};