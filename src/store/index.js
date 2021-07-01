import Vue from "vue";
import Vuex from "vuex";

//Para el uso de rutas en las acciones
import router from '../router/index.js';
/* Uso del módulo de autenticación */
import authentication from "@/store/modules/authentication.js";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        barColor: "rgba(255, 255, 255, .8), rgba(255, 255, 255, .8)",
        barImage: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        drawer: null,
        listaPagos: [],
        listaEspecialidad: [],
        listaTarifa: [],
        listaUsuario: [],
        examenesAuxiliar:[]
    },
    mutations: {
        SET_BAR_IMAGE(state, payload) {
            state.barImage = payload;
        },
        SET_DRAWER(state, payload) {
            state.drawer = payload;
        },
        ///Lista de pagos
        setListaPagos(state, value) {
            state.listaPagos = value;
        },
        addListaPagos(state, value) {
            state.listaPagos.push(value);
        },
        replaceListaPagos(state, value) {
            var index = state.listaPagos.findIndex((x) => x.id == value.id);
            state.listaPagos.splice(index, 1, value);
        },
        ///Lista de Especialidades
        setListaEspecialidad(state, value) {
            state.listaEspecialidad = value;
        },
        addListaEspecialidad(state, value) {
            state.listaEspecialidad.push(value);
        },
        replaceListaEspecialidad(state, value) {
            var index = state.listaEspecialidad.findIndex((x) => x.id == value.id);
            state.listaEspecialidad.splice(index, 1, value);
        },
        ///Lista de usuarios
        setListUsuarios(state, value) {
            state.listaUsuario = value;
        },
        addListUsuarios(state, value) {
            state.listaUsuario.push(value);
        },
        replaceListaUsuarios(state, value) {
            var index = state.listaUsuario.findIndex((x) => x.id == value.id);
            state.listaUsuario.splice(index, 1, value);
        },
        ///Lista de tarifas
        setListaTarifa(state, value) {
            state.listaTarifa = value;
        },
        addListaTarifa(state, value) {
            state.listaTarifa.push(value);
        },
        replaceListaTarifa(state, value) {
            var index = state.listaTarifa.findIndex((x) => x.id == value.id);
            state.listaTarifa.splice(index, 1, value);
        },
        ///Lista de Visualizar Prescripcion
        setVisualizar(state, value) {
            state.examenesAuxiliar = value;
        },
       

    },
    modules: {
        authentication,
    },


});