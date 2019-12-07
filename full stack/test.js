const http = require('http');

let service = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain;chartset=utf-8'});
    res.end('响应内容');
});

service.listen(8080, () => console.log("port  is  8080"));

`SELECT coalesce(shopName,'sum') as name ,count(*) as num FROM meituan.meishi_shop_table where shopName like '%火%' group by shopName with rollup limit 5;`

