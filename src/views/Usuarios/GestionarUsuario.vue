<template>
  <div>
    <v-card class="card" style="margin:80px auto 0;width:80%;">
      <v-card-title> Gestionar Usuarios </v-card-title>
      <v-data-table
        :headers="headers"
        :items="listaUsuario"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>

            <v-spacer></v-spacer>

            <v-btn
              color="success"
              elevation="2"
              outlined
              dark
              class="mb-2"
              @click="dialogoregistro = true"
            >
              <v-icon left>mdi-account-multiple-plus-outline</v-icon>
              <span>Registrar nuevo Usuario</span>
            </v-btn>
          </v-toolbar>
        </template>
        <!--Aqui van los botones -->
        <template v-slot:[`item.actions`]="{ item }">
          <v-row align="center" justify="space-around">
            <v-btn
              v-if="mostrarBtnModificarP(item.urol.nombre)" 
              color="success"
              small
              dark
            
              @click="abrirModificarDetalle(item.id)"

            >
              <v-icon left> mdi-file-eye </v-icon>
              <span>Modificar</span>
            </v-btn>

            <v-btn
              v-if="mostrarBtnModificarM(item.urol.nombre)" 
              color="success"
              small
              dark
            
              @click="abrirModificarDetalleMedico(item.id)"

            >
              <v-icon left> mdi-file-eye </v-icon>
              <span>Modificar</span>
            </v-btn>
            
            <v-btn
              v-if="mostrarBtnDetalleP(item.urol.nombre)" 
              color="info"
              small
              dark
            
              @click="abrirDetalleP(item.id)"

            >
              <v-icon left> mdi-file-eye </v-icon>
              <span>Ver detalles</span>
            </v-btn>
            <v-btn
              v-if="mostrarBtnDetalleM(item.urol.nombre)" 
              color="info"
              small
              dark
            
              @click="abrirDetalleM(item.id)"

            >
              <v-icon left> mdi-file-eye </v-icon>
              <span>Ver detalles</span>
            </v-btn> 
    
          </v-row>
        </template>
      </v-data-table>
      <!--Dialogo de Modificacion-->


       <v-dialog persistent v-model="dialogoactualizacion" max-width="880px">
        <ModificarUsuario
          v-if="dialogoactualizacion"
          :usuario="Usuario"
          @close-dialog-modificaru="closeDialogModificarU()"
        >
        </ModificarUsuario>
         </v-dialog>

        <v-dialog persistent v-model="dialogoactualizacionMedico" max-width="880px">
        <ModificarMedico
          v-if="dialogoactualizacionMedico"
          :usuario="Usuario"
          @close-dialog-modificarm="closeDialogModificarM()"
        >
        </ModificarMedico>

        
      </v-dialog>
      <!--Dialogo de Detalle-->
      <v-dialog persistent v-model="dialogoDetalleP" max-width="880px">
        <VisualizarUsuario
          v-if="dialogoDetalleP"
          :usuario="Usuario"
          @close-dialog-detalleP="closeDialogDetalleP()"
        >
        </VisualizarUsuario>
      </v-dialog>

      <v-dialog persistent v-model="dialogoDetalleM" max-width="880px">
        <VisualizarMedico
          v-if="dialogoDetalleM"
          :usuario="Usuario"
          @close-dialog-detalleM="closeDialogDetalleM()"
        >
        </VisualizarMedico>
      </v-dialog>

      <v-dialog v-model="dialogoregistro" idth="500">
        <v-card class="mx-auto" max-width="600" outlined>
          <v-card-title class="text-h5 grey lighten-2">
            <h3> Seleccion de rol </h3>
          </v-card-title>

          <v-card-text>
            Seleccione el rol del usuario a registrar

            <v-combobox
              solo
              :items="misItems"
              v-model="miRol"
              label="Rol del usuario"
            >
            </v-combobox>
          </v-card-text>

          <v-divider> </v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" text dark @click="dialogoregistro = false">
              Cerrar
            </v-btn>

            <v-btn color="success" dark class="mb-2" @click="rolSelecionado">
              <span>Registrar nuevo Usuario</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      

      <!--Aqui llamo a los componentes de vuetify-->
      <v-dialog max-width="800" v-model="dialogUsuarioRegistrar">
        <component
          :is="miRol.value"
          @cerrar-modal-registro-usuario="cerrarmodalregistrousuario()"
        >
        </component>
      </v-dialog>
    </v-card>
  </div>
</template>

<script>
import RegistrarMedico from "@/components/GestionarUsuario/RegistrarMedico.vue";
import RegistrarPaciente from "@/components/GestionarUsuario/RegistrarPaciente.vue";
import ModificarUsuario from "@/components/GestionarUsuario/ModificarUsuario.vue";
import ModificarMedico from "@/components/GestionarUsuario/ModificarMedico.vue";
import VisualizarUsuario from "@/components/GestionarUsuario/VisualizarUsuario.vue";
import VisualizarMedico from "@/components/GestionarUsuario/VisualizarMedico.vue";
import axios from "axios";
import { mapMutations, mapState } from "vuex";


export default {
  name: "GestionarUsuario",
  components: {
    RegistrarMedico,
    ModificarUsuario,
    ModificarMedico,
    VisualizarUsuario,
    RegistrarPaciente,
    VisualizarMedico,
  },
  data() {
    return{
      search: "",
      usuario: {},
      headers: [
        {
          text: "Rol ",
          align: "start",
          sortable: false,
          value: "urol.nombre",
        },
        { text: "Nombre y Apellidos", value: "datos.nombresyapellidos" },
        { text: "Tipo Doc", value: "datos.tipo_documento" },
        { text: "N° Doc", value: "datos.numero_documento" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      misItems: [
        {
          text: "Medico",
          value: "RegistrarMedico",
        },
        {
          text: "Paciente",
          value: "RegistrarPaciente",
        },
      ],
      miRol: {
        text: "",
        value: "",
      },
      
        
      dialogoactualizacionMedico: false,
      dialogoregistro: false,
      dialogoactualizacion: false,
      dialogodetalle: false,
      dialogUsuarioRegistrar: false,
      dialogoDetalleP:false,
      dialogoDetalleM:false,
    };
  },
  async created() {
    this.obtenerUsuarios();
  },
  methods: {
    ...mapMutations(["setListUsuarios"]),

    rolSelecionado() {
      //console.log(this.miRol.value)
      this.dialogoregistro = false;
      this.dialogUsuarioRegistrar = true;
    },

    cerrarmodalregistrousuario() {
      this.dialogUsuarioRegistrar = false;
    },

    // cerrarmodalmodificarusuario() {
    //   this.dialogoactualizacion = false;
    // },



    //cerrar dialogo
    closeDialogRegistrar() {
      this.dialogoRegistrar = false;
    },
    closeDialogDetalleM() {
      this.dialogoDetalleM = false;
    },
    closeDialogDetalleP() {
      this.dialogoDetalleP = false;
    },
    closeDialogModificarU() {
      this.dialogoactualizacion = false;
    },

     closeDialogModificarM() {
      this.dialogoactualizacionMedico = false;
    },

    closeDialogRegistrarMedico(){
      this.dialogUsuarioRegistrar = false;
    },


    // estadoActual(array) {
    //   if (array === "listo") {
    //     return false;
    //   } else {
    //     return true;
    //   }
    // },

    mostrarBtnModificarP(array){
      if(array === 'Paciente'){
        return true
      }else{
        return false
      }
    },

    mostrarBtnModificarM(array){
      if(array === 'Medico'){
        return true
      }else{
        return false
      }
    },

    mostrarBtnDetalleP(array){
      if(array === 'Paciente'){
        return true
      }else{
        return false
      }
    },

    mostrarBtnDetalleM(array){
      if(array === 'Medico'){
        return true
      }else{
        return false
      }
    },
    async abrirDialogo(id) {
      this.Usuario = await this.loadUsuario(id);
      this.dialogoRegistrar = !this.dialogoRegistrar;
    },
    async abrirDialogoDetalle(id) {
      this.Usuario = await this.loadUsuario(id);
      this.dialogodetalle = !this.dialogodetalle;
    },
    async abrirModificarDetalle(id) {
      
      this.Usuario = await this.loadUsuario(id);
      console.log("usuario consultado")
      console.log(this.Usuario)
      this.dialogoactualizacion = true;
    },

    async abrirModificarDetalleMedico(id) {
      
      this.Usuario = await this.loadUsuarioMedico(id);
      console.log("usuario consultado")
      console.log(this.Usuario)
      console.log("abrete sesamo")
      this.dialogoactualizacionMedico= true;
    },

    async abrirDetalleP(id) {
      
      this.Usuario = await this.loadUsuario(id);
      console.log("usuario consultado")
      console.log(this.Usuario)
      this.dialogoDetalleP = true;
    },

    async abrirDetalleM(id) {
      
      this.Usuario = await this.loadUsuarioMedico(id);
      console.log("usuario consultado")
      console.log(this.Usuario)
      this.dialogoDetalleM= true;
    },
    

    ///////////////////Consumo de  apis
    async obtenerUsuarios() {
      await axios
        .get("/MiUsuario/all")
        .then((x) => {
          this.setListUsuarios(x.data);
          console.log(x.data);
        })
        .catch((err) => console.log(err));
    },

    async loadUsuario(id) {
      var user = {};
      await axios
        .get("/MiUsuario/usuarioId?id=" + id)
        .then((res) => {
          
          user = res.data;
         
        })
        .catch((err) => console.log(err));
      return user;
    },

    async loadUsuarioMedico(id) {
      var user = {};
      await axios
        .get("/MiUsuario/usuarioIdMedico?id=" + id)
        .then((res) => { 
          user = res.data;
        })
        .catch((err) => console.log(err));
      return user;
    },
  },
  //

  computed: {
    ...mapState(["listaUsuario"]),
  },
};
</script>

<style></style>
