import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import GestionAtenciones from '../views/atenciones/GestionarAtenciones.vue';
import GestionarMiCita from '../views/GestionarMiCita/GestionarMiCita.vue';
import GestionarTurnos from '../views/Turnos/GestionarTurnos.vue';
import GestionarEspecialidades from '../views/Especialidades/GestionarEspecialidades.vue';
import Dashboard from '../views/Dashboard/Dashboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Principal',
    component: () =>  import ('../views/Layout/Principal.vue'),
    children: [{
      path: 'home',
      component: Home
      },
      {
        path: '/gestionarAtencion',
        name: 'GestionarAtenciones',
        component: GestionAtenciones
      },      
      {
        path: '/gestionarMiCita',
        name: 'GestionarMiCita',
        component: GestionarMiCita
      },
      {
        path: '/gestionarEspecialidad',
        name: 'GestionarEspecialidades',
        component: GestionarEspecialidades
      },  
      {
        path: '/gestionarTurnos',
        name: 'GestionarTurnos',
        component: GestionarTurnos
      },
      {
        path: '/',
        name: 'Dashboard',
        component: Dashboard
      },
    ] 
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
