import Vue from 'vue'
import VueRouter from 'vue-router'
import Person from "../views/Person";
import PersonEdit from "../views/PersonEdit";
import Keys from "../views/Keys";
import PersonSearch from "../views/PersonSearch";
import NowPerson from "../views/NowPerson";
import NowPersonEdit from "../views/NowPersonEdit";
import NowPersonSearch from "../views/NowPersonSearch";
import Rank from "../views/Rank";
import Account from "../views/Account";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Index',
        redirect: {name: 'Person'}
    },
    {
        path: '/person',
        name: 'Person',
        component: Person
    },
    {
        path: '/personsearch',
        name: 'PersonSearch',
        component: PersonSearch
    },
    {
        path: '/person/add',
        name: 'PersonAdd',
        component: PersonEdit
    },
    {
        path: '/person/:personId/edit',
        name: 'PersonEdit',
        component: PersonEdit
    },
    {
        path: '/keys',
        name: 'Keys',
        component: Keys
    },
    {
        path: '/nowperson',
        name: 'NowPerson',
        component: NowPerson,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/nowperson/add',
        name: 'NowPersonAdd',
        component: NowPersonEdit,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/nowperson/:nowpersonId/edit',
        name: 'NowPersonEdit',
        component: NowPersonEdit,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/nowpersonsearch',
        name: 'NowPersonSearch',
        component: NowPersonSearch,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/rank',
        name: 'Rank',
        component: Rank,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/account',
        name: 'Account',
        component: Account
    },
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router
