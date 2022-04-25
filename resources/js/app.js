require('./bootstrap');
const axios = require('axios').default;

import {createApp, h} from 'vue';
import {createInertiaApp} from '@inertiajs/inertia-vue3';
import {InertiaProgress} from '@inertiajs/progress';
import VueCookies from 'vue-cookies';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => require(`./Pages/${name}.vue`),
    setup({el, app, props, plugin}) {
        return createApp({render: () => h(app, props)})
            .use(plugin)
            .use(VueCookies)
            .mixin({methods: {route}})
            .mount(el);
    },
});

InertiaProgress.init({color: '#4B5563'});

let token = $cookies.get('access_token') || null ;
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

if(!token){
    authorizeCiv();
}

function authorizeCiv() {
    let civTokenUrl = process.env.MIX_CIV_URL + '/oauth/token';

    let authData = {
        'username': process.env.MIX_CIV_LOGIN_EMAIL,
        'password': process.env.MIX_CIV_LOGIN_PASS,
        'client_id': process.env.MIX_CIV_CLIENT_ID,
        'client_secret': process.env.MIX_CIV_CLIENT_SECRET,
        'grant_type': 'password'
    };

    axios.post(civTokenUrl, authData)
        .then((res) => {
            $cookies.set('access_token', res.data.access_token, "1y");
        })
        .catch((err) => {
            console.log(err);
            console.log('Can Not Authorize on civ.ie')
        });
}
