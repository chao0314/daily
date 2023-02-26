const service_worker_version = `version_${7}`;
const cacheUrlList = [
    '/',
    '/index.html',
    '/main.js',
    '/index.css',
    '/api/list',
    '/manifest.json',
    '/icon.png'
]

//拦截 网络请求 ，只能用 fetch,ajax无效。
//此处采用的缓存策略是每次请求成功后 更新数据，请求失败 返回最后的数据。
self.addEventListener('fetch', (e) => {


    const req = e.request;

    if (req.url.includes('jpeg')) return;

    if (req.url.includes('/api')) {

        const cacheRes = fetchAndSave(req, service_worker_version).catch(e => {

            console.log(e)
            return caches.match(req);
        })

        console.log('api',cacheRes)
        e.respondWith(cacheRes);

    } else {
        // 普通文件
        const cacheRes = fetch(req).catch(e => {
            return caches.match(req);
        })
        console.log('--',cacheRes)
        e.respondWith(cacheRes);
    }


})

async function fetchAndSave(request, cacheName) {

    const res = await fetch(request);
    const clone = res.clone();
    const cache = await caches.open(cacheName);
    await cache.put(request, clone);

    return res;
}

//页面 navigator.serviceWorker.register('/serviceWorker.js') 请求注册会触发 install 事件
//service worker 安装时 需要初始化一个缓存空间，并且跳过手动等待，直接激活
self.addEventListener('install', (e) => {

    e.waitUntil(initCache(service_worker_version, cacheUrlList));

})

async function initCache(cacheName, cacheUrlList) {

    try {

        const cache = await caches.open(cacheName);
        await cache.addAll(cacheUrlList);
        await self.skipWaiting();

    } catch (e) {
        console.log(e)
    }

}


// service worker 安装完会触发 激活事件
//在激活事件中  需要清理之前版本失效的 service worker,同时主动授权页面缓存控制

self.addEventListener('activate', (e) => {

    e.waitUntil(Promise.all([clearInvalidCache(service_worker_version), self.clients.claim()]));


})


async function clearInvalidCache(cacheName) {

    let keys = await caches.keys();
    let invalidKeys = keys.filter(key => key !== cacheName);
    return Promise.all(invalidKeys.map(key => caches.delete(key)));

}


self.addEventListener('push', e => {
    console.log('service worker push data is', e.data.text());
    e.waitUntil(self.registration.showNotification(e.data.text()))
})



