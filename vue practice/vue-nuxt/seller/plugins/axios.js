export default function ({$axios, redirect}) {

  $axios.onRequest(config => {
    config.headers.apikey = '299f648e53754c579bb5d142cbcbb115';
    config.headers.token = localStorage.getItem("token");
  })
}
