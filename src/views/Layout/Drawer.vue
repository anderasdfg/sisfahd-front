<template>
  <v-navigation-drawer
    id="appDrawer"
    v-model="drawer"
    :expand-on-hover="expandOnHover"
    :right="$vuetify.rtl"
    mobile-breakpoint="960"
    app
    width="260"
    v-bind="$attrs"
    v-if="this.user"        
  >
    <v-divider class="mb-1" />

    <v-list dense nav>
      <v-list-item>
        <v-img src="../../../src/assets/logo-s.svg" />
      </v-list-item>
    </v-list>

    <v-divider class="mb-2" />

    <v-list dense expand v-if="this.user.rol == '607f37c1cb41a8de70be1df3'">
      <template v-for="item in menusPaciente">
        <v-list-item
          class="list-item"
          :to="item.href ? item.href : null"
          ripple="ripple"
          :disabled="item.disabled"
          :target="item.target"
          rel="noopener"
          :key="item.name"
        >
          <v-list-item-action v-if="item.icon">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              <span>
                {{ item.title }}
              </span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
    <v-list dense expand v-if="this.user.rol == '607f2beacb41a8de70be1dec'">
      <template v-for="item in menusMedico">
        <v-list-item
          class="list-item"
          :to="item.href ? item.href : null"
          ripple="ripple"
          :disabled="item.disabled"
          :target="item.target"
          rel="noopener"
          :key="item.name"
        >
          <v-list-item-action v-if="item.icon">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              <span>
                {{ item.title }}
              </span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
    <v-list dense expand v-if="this.user.rol == '60e796bd2a653433ee7ef853'">
      <template v-for="item in menusAdministrador">
        <v-list-item
          class="list-item"
          :to="item.href ? item.href : null"
          ripple="ripple"
          :disabled="item.disabled"
          :target="item.target"
          rel="noopener"
          :key="item.name"
        >
          <v-list-item-action v-if="item.icon">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              <span>
                {{ item.title }}
              </span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
     <div class="container-signout">
    <button @click="logOut()">Cerrar sesión</button>
  </div>
  </v-navigation-drawer>
 
</template>

<script>
// Utilities
import { mapActions,mapState,mapGetters } from "vuex";

export default {
  name: "AppDrawer",

  props: {
    expandOnHover: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({    
    menusPaciente: [
      {
        title: "Dashboard",
        icon: "dashboard",
        name: "Dashboard",
        href: "/",
      },
      {
        title: "Antecedentes",
        icon: "dashboard",
        name: "Antecedentes",
        href: "/",
      },
      {
        title: "Historia clínica",
        icon: "dashboard",
        name: "VisualizarHCI",
        href: "/visualizarHCI",
      },
      {
        title: "Perfil",
        icon: "dashboard",
        name: "Perfil",
<<<<<<< HEAD
        href: "/",
      },  
=======
        href: "/modificarPerfil",
      },
      // {
      //   title: "Mi Citas",
      //   icon: "dashboard",
      //   name: "GestionarMiCita",
      //   href: "/gestionarMiCita",
      // },   
>>>>>>> 3d090fd5dc894464416ed054fe4ad63709370f9a
      {
        title: "Mis Citas",
        icon: "dashboard",
        name: "Citas",
        href: "/citas",
      },     
    ],
    menusMedico: [
      {
        title: "Dashboard",
        icon: "dashboard",
        name: "Dashboard",
        href: "/",
      },
      {
        title: "Atenciones",
        icon: "dashboard",
        name: "GestionarAtenciones",
        href: "/gestionarAtencion",
      },
      {
        title: "Gestionar Turnos",
        icon: "dashboard",
        name: "GestionarTurnos",
        href: "/gestionarTurnos",
      },      
      {
        title: "Gestionar Tarifas",
        icon: "dashboard",
        name: "GestionarTarifas",
        href: "/gestionarTarifa",
      },
      {
        title: "Visualizar Prescrición Medica",
        icon: "dashboard",
        name: "VisualizarPrescripcionMedica",
        href: "/visualizarPrescripcion",
      },
      {
        title: "Perfil",
        icon: "dashboard",
        name: "Perfil",
        href: "/modificarPerfil",
      },
    ],
    menusAdministrador: [
      {
        title: "Dashboard",
        icon: "dashboard",
        name: "Dashboard",
        href: "/",
      },
      {
        title: "Gestionar Especialidades",
        icon: "dashboard",
        name: "GestionarEspecialidades",
        href: "/gestionarEspecialidad",
      },
       {
        title: "Gestionar Usuarios",
        icon: "dashboard",
        name: "GestionarUsuarios",
        href: "/gestionarUsuario",
      },      
    ],
  }),

  computed: {
    ...mapState(["barColor", "barImage"]),
    ...mapGetters(['user']),
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(val) {
        this.$store.commit("SET_DRAWER", val);
      },
    },
  },

  methods: {
      ...mapActions(['logOut', 'fetchUser']),      
  },
  async created() {
    this.fetchUser();      
  },  
};
</script>

<style scoped lang="scss">
.list-item {
  margin: 10px;
  color: #c4c4c4;
  background-color: white;
  span {
    font-weight: bold;
    font-size: 15px;
  }
}

.list-item:hover {
  border-left: 2px $blue solid;
  color: $blue;
}

.container-signout {

   display: flex;

  flex-flow: column-reverse;
 justify-content: flex-end;

  button{
    position: absolute;
    bottom: 0;
    width: 100%;
    margin-bottom: 30px;
    background-color: $red;
    width: 70%;
    color: white;        
    align-self: center;
    border-radius: 10px;  
    height: 6vh;
  }
}
</style>