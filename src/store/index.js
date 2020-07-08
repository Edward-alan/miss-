import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        list:[],
        null:0
    },
    mutations:{
        getNull(state,payload){
            state.null++
            console.log(state,payload)
        }
    },
    actions:{

    },
    modules:{

    }
})