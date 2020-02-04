module.exports = {
    name: 'server 1',
    port: 8080,
    databases: {
        main: {
            host: '192.168.183.110',
            port: '3306',
            user: 'user',
            password: 'user',
            database: 'test'
        } ,
        read: {
            host: '192.168.183.110',
            port: '3307',
            user: 'user',
            password: 'user',
            database: 'test'
        }
    }
};