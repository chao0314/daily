import React, {Component} from 'react';
import {withRouter} from "react-router";

const baseURL = 'http://localhost:8088/admin';
const baseHeaders = {'Content-Type': 'application/json'}


export default function withNet(Comp) {

    class Net extends Component {

        async get(url, headers = {}) {
            url = `${baseURL}${url}`;
            headers = Object.assign({token: localStorage.getItem('token')}, baseHeaders, headers);
            try {
                let response = await fetch(url, {method: 'GET', headers});
                return this.responseInterceptor(response);
            } catch (e) {
                this.props.history.push('/error');
                await Promise.reject(e);

            }


        }

        async delete(url, headers = {}) {
            url = `${baseURL}${url}`;
            headers = Object.assign({token: localStorage.getItem('token')}, baseHeaders, headers);
            try {
                let response = await fetch(url, {method: 'DELETE', headers});
                return this.responseInterceptor(response);
            } catch (e) {
                this.props.history.push('/error');
                await Promise.reject(e);

            }


        }

        async post(url, body, headers = {}) {
            url = `${baseURL}${url}`;
            headers = Object.assign({token: localStorage.getItem('token')}, baseHeaders, headers);
            if (!(body instanceof FormData)) body = JSON.stringify(body);
            else delete headers['Content-Type'];
            try {
                let response = await fetch(url, {method: 'POST', headers, body});
                return this.responseInterceptor(response);
            } catch (e) {
                this.props.history.push('/error');
                await Promise.reject(e);


            }


        }

        async patch(url, body, headers = {}) {
            url = `${baseURL}${url}`;
            headers = Object.assign({token: localStorage.getItem('token')}, headers);
            if (!(body instanceof FormData)) body = JSON.stringify(body);
            else delete headers['Content-Type'];
            try {
                let response = await fetch(url, {method: 'PATCH', headers, body});
                return this.responseInterceptor(response);
            } catch (e) {
                this.props.history.push('/error');
                await Promise.reject(e);


            }


        }

        async responseInterceptor(response) {
            if (response.status === 401 || response.status === 403) this.props.history.push("/login");
            let data = await response.json();
            console.log('response data is ', data);
            return data;

        }

        render() {
            return (
                <Comp {...this.props} get={this.get.bind(this)} post={this.post.bind(this)}
                      patch={this.patch.bind(this)} delete={this.delete.bind(this)}/>
            )
        }

    }

    return withRouter(Net);

}




