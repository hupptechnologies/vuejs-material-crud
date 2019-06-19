import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Players from '@/components/Players'
import Player from '@/components/Player'
import Teams from '@/components/Teams'
import Team from '@/components/Team'
import NotFound from '@/components/404'

Vue.use(Router);

const checkAuth = (to, from, next) => {
	if (window.$cookies.get('token')) {
	    next()
	    return
	}
	next({path:'/'});
}

const ifLoggedIn = (to, from, next) => {
	if (window.$cookies.get('token')) {
	    next('/players')
	    return
	}else{
		next();
	}
}

export default new Router({
	routes: [
		{
			path: '/',
	      	name: 'Login',
	      	component: Login,
	      	beforeEnter: ifLoggedIn
		},
		{
			path: '/register',
	      	name: 'Register',
	      	component: Register,
	      	beforeEnter: ifLoggedIn
		},
		{
			path: '/players',
	      	name: 'Players',
	      	component: Players,
	      	beforeEnter: checkAuth
		},
		{
			path: '/player',
	      	name: 'Player',
	      	component: Player,
	      	props: true,
	      	beforeEnter: checkAuth
		},
		{
			path: '/teams',
	      	name: 'Teams',
	      	component: Teams,
	      	beforeEnter: checkAuth
		},
		{
			path: '/team',
	      	name: 'Team',
	      	component: Team,
	      	props: true,
	      	beforeEnter: checkAuth
		},
		{
	      	path: '/help',
	      	name: 'HelloWorld',
	      	component: checkAuth
	    },
	    {
	      	path: '/404',
	      	name: 'NotFound',
	      	component: NotFound
	    },
	    { 
	      	path: '*', redirect: '/404'
	    }
	]
})