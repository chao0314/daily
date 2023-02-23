export default {
    token: localStorage.getItem('token'),
    token_expires: localStorage.getItem('token_expires'),
    authority: JSON.parse(localStorage.getItem('authority'))
}