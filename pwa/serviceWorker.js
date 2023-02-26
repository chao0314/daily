// 对资源进行离线缓存  seriveWorker 可以自定义缓存的内容
//当 serviceworker 文件改变后，浏览器会重新注册，所以可以用一个版本号的常量来控制是否替换。
const CACHE_NAME = 'cache_v' + 6;
const CAHCE_LIST = [ // 列表越长 越容易出问题
    '/',
    '/index.html',
    '/main.js',
    '/index.css',
    '/api/list',
    '/manifest.json',
    '/icon.png'
];
// 当断网时 我需要拦截请求， 使用缓存的结果 

// 核心就是拦截请求
async function fetchAndSave(request) {
    let res = await fetch(request); // 数据流
    let cloneRes = res.clone(); // 为了保证不破坏原有的响应结果
    let cache = await caches.open(CACHE_NAME);
    await cache.put(request, cloneRes); // 用响应结果更新缓存
    return res;
}

self.addEventListener('fetch', (e) => {
    // 如果是静态资源 不做拦截
    let url = new URL(e.request.url);
    if (url.origin !== self.origin) {
        return
    }

    // 缓存策略， 如果接口是不停的变化的 我们希望将数据更新到缓存中
    if (e.request.url.includes('/api')) {
        return e.respondWith(
            fetchAndSave(e.request).catch(res => {
                return caches.match(e.request);
            })
        )
    }

    // serviceWorker中不支持ajax， 但是支持fetch

    // 如果断网了, 抛出异常
    e.respondWith(
        fetch(e.request).catch(res => {
            return caches.match(e.request);
        })
    )
});


// 当serviceWorker 安装时 需要跳过等待

async function preCache() {
    let cache = await caches.open(CACHE_NAME); // 创建一个缓存空间
    try {

        for (let url in CAHCE_LIST) {

            await cache.add(url);
        }

    } catch (e) {
        console.log(e)
    }
    await self.skipWaiting()
}

self.addEventListener('install', (e) => {
    // e.waitUtil表示等待promise执行完成
    // 预先将缓存列表的数据缓存起来
    e.waitUntil(preCache())
})

async function clearCache() {
    let keys = await caches.keys();
    return Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) {
            return caches.delete(key)
        }
    }))
}

// serviceWorker 不是立即生效，需要在下一次访问的时候才生效
self.addEventListener('activate', (e) => {
    e.waitUntil(Promise.all([clearCache(), self.clients.claim()])); // 激活后立刻让serviceWorker拥有控制权
})

// workbox ->workbox-webpack-plugin

self.addEventListener('push', function (e) {
    e.waitUntil(self.registration.showNotification(e.data.text()))
})