import * as types from './mutation-types'

export const mutations = {
    [types.LOGIN](state, data) {
        state.user.name = data.name
        localStorage.setItem('user', data.name)
    },
    [types.DELSESSION](state) {
        localStorage.removeItem('user')
    },
    [types.LOGOUT](state) {
        state.name = {},
        localStorage.removeItem('user')
    }
}

export default mutations