export default {
    token: localStorage.getItem('token'),
    token_expires: localStorage.getItem('token_xpires'),
    authority: JSON.parse(localStorage.getItem('authority'))
}