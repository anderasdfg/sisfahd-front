import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import GestionAtenciones from '../views/atenciones/GestionarAtenciones.vue';
import DetalleAtencion from '../views/atenciones/DetalleAtencion.vue';
import IniciarAtencion from '../views/atenciones/IniciarAtencion.vue';
import GestionarMiCita from '../views/GestionarMiCita/GestionarMiCita.vue';
import GestionarTurnos from '../views/Turnos/GestionarTurnos.vue';
import GestionarEspecialidades from '../views/Especialidades/GestionarEspecialidades.vue';
import GestionarTarifas from '../views/Tarifas/GestionarTarifas.vue';
import Dashboard from '../views/Dashboard/Dashboard.vue'
import CuposDisponibles from '../views/GestionarCitas/CuposDisponibles.vue';
import ResponseNiubiz from '../views/ResponseNiubiz.vue';
import GestionarUsuario from '../views/Usuarios/GestionarUsuario.vue';
import VisualizarHCI from '../views/HistoriaClinicaInformatizada/VisualizarHCI.vue';
/* Importación del axios para la verificación del token */
import axios from '../store/index.js';

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Principal',
        component: () =>
            import ('../views/Layout/Principal.vue'),
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
                path: '/detalleAtencion',
                name: 'DetalleAtencion',
                component: DetalleAtencion,
                params: true
            },
            {
                path: '/iniciarAtencion',
                name: 'IniciarAtencion',
                component: IniciarAtencion,
                params: true
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
                path: '/gestionarUsuario',
                name: 'GestionarUsuario',
                component: GestionarUsuario
            },
            {
                path: '/gestionarTarifa',
                name: 'GestionarTarifas',
                component: GestionarTarifas
            },
            {
                path: '/visualizarHCI',
                name: 'VisualizarHCI',
                component: VisualizarHCI
            },
            {
                path: '/',
                name: 'Dashboard',
                component: Dashboard
            },
            {
                path: '/response/:purchaseNumber',
                name: 'ResponseNiubiz',
                component: ResponseNiubiz,
                params: true
            },
        ]
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/principal',
        name: 'Principal',
        component: () =>
            import ('../views/Principal.vue')
    },
    {
        path: '/cupos/:selectEspecialidad',
        name: 'CuposDisponibles',
        component: CuposDisponibles,
        params: true
    },
    {
    path: '/login',
    name: 'Login',
    component: () =>
        import ('../views/Login/Login.vue')
    },
    {
    path: '/InformacionMedica',
    name: 'InformacionMedica',
    component: () =>
        import ('../views/InformacionMedica/InformacionMedica.vue')
    },
] 

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {

    if (to.path == "/login") {

        if (axios.state.idToken || localStorage.getItem("token")) {
            return next("/");
        }
        return next();

    } else if (axios.state.idToken || localStorage.getItem("token")) {
        return next();
    } else {
        return next("/login");
    }

});

export default router