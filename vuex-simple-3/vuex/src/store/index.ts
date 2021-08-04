import {createStore} from '../../vuex-simple';
import Store from "../../vuex-simple/Store";

type State = { [key: string]: any };


function customPlugin(store: Store) {
    let local = localStorage.getItem('VUEX:STATE');
    if (local) {
        console.log("replace---local",local)
        store.replaceState(JSON.parse(local))
    }
    store.subscribe((mutation: object, state: object) => { // 每当状态发生变化 （调用了mutation的时候 就会执行此回调）
        localStorage.setItem('VUEX:STATE', JSON.stringify(state))
    })
}


const store = createStore({
    plugins: [ // 会按照注册的顺序依次执行插件,执行的时候会把store传递给你
        customPlugin
    ],
    strict: true, // 开启严格模式， 不允许用户非法操作状态 （只能在mutation中修改状态，否则就会发生异常）
    state: { // 组件中的data
        count: 0
    },
    getters: { // 计算属性 vuex4 他并没有实现计算属性的功能
        double(state: State) {
            return state.count * 2
        }
    },
    mutations: { // 可以更改状态 必须是同步更改的
        add(state: State, payload: any) {
            state.count += payload
        }
    },
    actions: { // 可以调用其他action，或者调用mutation
        asyncAdd({commit}: Store, payload: any) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    commit('add', payload);
                    resolve(void 0);
                }, 1000)
            })
        }
    },
    modules: { // 子模块 实现逻辑的拆分
        aCount: {
            namespace: true,
            state: {count: 0},
            mutations: {
                add(state: State, payload: any) { // aCount/add
                    state.count += payload
                }
            },
            // modules: {
            //     cCount: {
            //         namespaced:true,
            //         state: { count: 0 },
            //         mutations: {
            //             add(state, payload) { // aCount/cCount
            //                 state.count += payload
            //             }
            //         },
            //     }
            // }
        },
        bCount: {
            state: {count: 0},
            namespace: true,
            mutations: {
                add(state: State, payload: any) {
                    state.count += payload
                }
            },
        }

    }
})

// 严格模式
// dispatch(action) => commit(mutation) => 修改状态


// 有一个功能 在a页面需要调用一个接口 影响的可能是a数据    b页面也需要调用同一个接口 改的是b数据


store.registerModule(['aCount', 'cCount'], {
    namespace: true,
    state: {
        count: 100,
    },
    mutations: {
        add(state: State, payload: any) {
            state.count += payload
        }
    },
})


export default store;