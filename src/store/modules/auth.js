import axios from 'axios';
const state = {
    user: null,
    qrCodes: null,
};
const getters = {
    isAuthenticated: state => !!state.user,
    StateQrCodes: state => state.qrCodes,
    StateUser: state => state.user,
};
const actions = {
    async Register({dispatch}, form) {
        await axios.post('api/register', form)
        let UserForm = new FormData()
        UserForm.append('username', form.username)
        UserForm.append('password', form.password)
        await dispatch('LogIn', UserForm)
    },
    async LogIn({commit}, User) {
        const headers = {
            "Content-Type": "application/json",
        };
         await axios
            .post('/api/login_check',
                {
                    username: User.get('username'),
                    password: User.get('password')
                },
                {headers})
             .then(response => {
                 if (response.data.token) {
                     localStorage.setItem('user', JSON.stringify(response.data));
                 }
                 return response.data;
             })
             .catch(function (error){
                 console.log(error)
             });
        await commit('setUser', User.get('username'))
    },
    async CreateQrCode({dispatch}, post) {
        await axios.post('api/generate/qrCode', post)
        await dispatch('GetQrCodes')
    },
    async GetQrCodes({ commit }){
        let response = await axios.get('api/qrCode')
        commit('setQrCodes', response.data)
    },
    async LogOut({commit}){
        let user = null
        localStorage.removeItem('user')
        commit('LogOut', user)
    }
};
const mutations = {
    setUser(state, username){
        state.user = username
    },
    setQrCodes(state, posts){
        state.posts = posts
    },
    LogOut(state){
        state.user = null
        state.posts = null
    },
};

export default {
    state,
    getters,
    actions,
    mutations
};
