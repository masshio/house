import router from './router'
import store from './store'

router.beforeEach((to, from, next) => {
    if(to.matched[0]) {
        document.title = to.matched[0].meta.title
    } else {
        document.title = '房屋租赁平台'
    }
    const token = store.state.token;
    // const token = store.state.token || 2;
    const isAdmin = store.state.isAdmin;
    // const isAdmin = store.state.isAdmin || 3;
    if (to.name === 'Login' || to.name === 'Admin') {
        if(token && isAdmin) {
            next('/manage');
        } else if(token) {
            next('/home');
        } else {
            next();
        }
    } else if(to.name === 'Register') {
        next();
    } else if(to.name == 'ManageHouse') {
        if(isAdmin) {
            next();
        } else {
            next('/home');
        }
    } else {
        if (token) {
            next();
        } else {
            next('/')
        }
    }
    next();
})