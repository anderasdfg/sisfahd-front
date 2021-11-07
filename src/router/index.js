import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import GestionAtenciones from '../views/atenciones/GestionarAtenciones.vue';
import DetalleAtencion from '../views/atenciones/DetalleAtencion.vue';
import IniciarAtencion from '../views/atenciones/IniciarAtencion.vue';
import GestionarMiCita from '../views/GestionarMiCita/GestionarMiCita.vue';
import GestionarTurnos from '../views/Turnos/GestionarTurnos.vue';
import GestionarEspecialidades from '../views/Especialidades/GestionarEspecialidades.vue';
import GestionarServiciosAdicionales from '../views/ServiciosAdicionales/GestionarServiciosAdicionales.vue';
import GestionarTarifas from '../views/Tarifas/GestionarTarifas.vue';
import Dashboard from '../views/Dashboard/Dashboard.vue'
import CuposDisponibles from '../views/GestionarCitas/CuposDisponibles.vue';
import ResponseNiubiz from '../views/ResponseNiubiz.vue';
import GestionarUsuario from '../views/Usuarios/GestionarUsuario.vue';
import VisualizarHCI from '../views/HistoriaClinicaInformatizada/VisualizarHCI.vue';
import InformacionMedica from '../views/InformacionMedica/InformacionMedica.vue';
import VisualizarDiagnosticoMedico from '../views/HistoriaClinicaInformatizada/VisualizarDiagnosticoMedico.vue';
import ReservaEspecialidades from '../views/GestionarCitas/Especialidades.vue'
import ModificarPerfil from '../views/ModificarPerfil/ModificarPerfil.vue'
import VerCitas from '../views/GestionarMiCita/VerCitas.vue';
import Resultados from '../views/Resultados/VistaPrincipalResultados.vue';
import VisualizarPrescripcionMedica from '../views/VisualizarPrescripcionMedica/VisualizarPrescripcion.vue'
import Pedidos from '../views/Pedidos/VisualizarPedidos.vue';
import GestionarMedicamentos from '../views/GestionarMedicamentos/GestionarMedicamentos.vue';
import GestionarExamenesAux from '../views/ExamenesAux/GestionarExamenesAux.vue';
import Atencion from '../views/atenciones/Atencion.vue';
import Estadisticas from '../views/Estadisticas/EstadisticaPrueba.vue';
import GestionarEnfermedades from '../views/GestionarEnfermedades/GestionarEnfermedades.vue';
import GestionarPedidoMedicos from '../views/Pedidos/GestionarPedidoMedicos.vue';
import ExamenesPorPaciente from '../views/Pedidos/ExamenesPorPaciente.vue';
import Turno_Ordenes from '../views/GestionarTurnosOrdenes/TurnosOrdenes.vue';
/* Importación del axios para la verificación del token */
import axios from '../store/index.js';

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Dashboard',
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
                path: '/gestionarExamenesAux',
                name: 'GestionarExamenesAux',
                component: GestionarExamenesAux
            },
            {
                path: '/gestionarServicios',
                name: 'GestionarServicios',
                component: GestionarServiciosAdicionales
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
                path: '/modificarPerfil',
                name: 'ModificarPerfil',
                component: ModificarPerfil
            },
            {
                path: '/gestionarTarifa',
                name: 'GestionarTarifas',
                component: GestionarTarifas
            },
            {
                path: '/visualizarDiagnosticoMedico',
                name: 'VisualizarDiagnosticoMedico',
                component: VisualizarDiagnosticoMedico,
                props: true
            },
            {
                path: '/visualizarHCI',
                name: 'VisualizarHCI',
                component: VisualizarHCI,
                params: true
            },
            {
                path: '/informacionMedica',
                name: 'InformacionMedica',
                component: InformacionMedica,
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
            {
                path: '/especialidades',
                name: 'Especialidades',
                component: ReservaEspecialidades,
                params: true
            },
            {
                path: '/citas',
                name: 'VerCitas',
                component: VerCitas
            },
            {
                path: '/resultados',
                name: 'Resultados',
                component: Resultados
            },
            {
                path: '/pedidos',
                name: 'Pedidos',
                component: Pedidos
            },
            {
                path: '/gestionarpedidosmedico',
                name: 'GestionarPedidosMedico',
                component: GestionarPedidoMedicos
            },
            {
                path: '/visualizarPrescripcion',
                name: 'VisualizarPrescripcionMedica',
                component: VisualizarPrescripcionMedica,
                props: true
            },
            {
                path: '/atencion',
                name: 'Atencion',
                component: Atencion,                
            },
            {
                path: '/gestionarMedicamentos',
                name: 'GestionarMedicamentos',
                component: GestionarMedicamentos
            },
            {
                path: '/estadisticas',
                name: 'Estadisticas',
                component: Estadisticas
            },
            {
                path: '/gestionarEnfermedades',
                name: 'GestionarEnfermedades',
                component: GestionarEnfermedades
            },
            {
                path: '/gestionarTurno_Ordenes',
                name: 'GestionarTurno_Ordenes',
                component: Turno_Ordenes
            },
            {
                path: '/examenesPorPaciente',
                name: 'ExamenesPorPaciente',
                component: ExamenesPorPaciente,
                props: true
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
            import ('../views/About.vue')
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
        component: () =>
            import ('../views/GestionarCitas/CuposDisponibles.vue'),
        params: true
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ('../views/Login/Login.vue')
    },
    // {
    //     path: '/InformacionMedica',
    //     name: 'InformacionMedica',
    //     component: () =>
    //         import ('../views/InformacionMedica/InformacionMedica.vue')
    // },

    {
        path: '/pago',
        name: 'Pago',
        params: true,
        component: () =>
            import ('../views/GestionarCitas/Pago.vue')
    }
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