// import { defineStore } from 'pinia'

import { defineStore } from '../../../pinia'

export const useCounterOptionsStore = defineStore('counterOptions', {

    state() {
        return {
            count: 0
        }
    },
    actions: {
        increment() {

            this.count++;

        }
    },
    getters: {
        doubleCount() {

            return this.count * 2;
        }
    }


})
