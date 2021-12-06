import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import * as Sentry from "@sentry/vue";
import { Integrations } from "@sentry/tracing";

const  app =  createApp(App);

Sentry.init({
    app,
    dsn: "http://61b833d585cc431ca49448e616a520f8@192.168.183.160:9000/3",
    integrations: [
        new Integrations.BrowserTracing({
            routingInstrumentation: Sentry.vueRouterInstrumentation(router),
            tracingOrigins: ["localhost", "my-site-url.com", /^\//],
        }),
    ],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
    release: 'v0.0.1'
});


app.use(store).use(router).mount('#app');
