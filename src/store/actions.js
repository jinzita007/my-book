import * as types from './mutation-types'

const actions = {
    userLogin({
       commit
   }, data) {
       commit(types.LOGIN, data)
   },
   delSession({
       commit
   }, data) {
       commit(types.DELSESSION, data)
   },
   Logout({
       commit
   }) {
       commit(types.LOGOUT)
   }
}

export default actions