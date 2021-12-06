const SentryCliPlugin = require('@sentry/webpack-plugin');
module.exports = function override(config, env) {
    config.devtool = 'source-map';
    config.plugins.push(
        new SentryCliPlugin({
            release: '0.0.1',
            authToken: '5b9a9b86a2dc4366bf7a5c824b493882abec8d17524c43e38acabf7eb908e495',
            url: 'http://192.168.183.160:9000',
            org: 'sentry',
            project: 'react-test',
            urlPrefix: '~/',
            include: './build',
            ignore: ['node_modules'],
        })
    );
    return config;
}