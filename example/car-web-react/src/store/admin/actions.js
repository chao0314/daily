export const SET_TOKEN = 'set_token';
export const setToken = payload => {

    let token_expires = Date.now() + 1000 * 60 * 60;
    let token = payload.token;
    localStorage.setItem('token_expires', token_expires);
    localStorage.setItem('token', token);
    payload = {token, token_expires};
    return {
        type: SET_TOKEN, payload
    }
};