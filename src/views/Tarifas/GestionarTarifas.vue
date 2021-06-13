<template>
  <div>
    <v-card class="card" style="margin:80px auto 0;width:80%;">
      <v-card-title> Tarifas </v-card-title>
      <v-data-table
        :headers="headers"
        :items="listaTarifa"
        
        class="elevation-1"
      >
      
        <template v-slot:top>                 
            
            <v-spacer></v-spacer>           
            <v-col cols="12" sm="6" md="4">                       

            </v-col>            
            <v-spacer></v-spacer>            
           <v-toolbar
          flat>
          <v-btn       
                       class="mr-4"
            color="white darken-1"
            @click="abrirDialogo">       
             <span>Agregar</span>
          </v-btn>
           </v-toolbar>
        </template>
 <!--Aqui va todo los botones -->
        <template v-slot:[`item.actions`]="{ item }">
          <v-row align="center" justify="space-around">
                               

            <v-btn color="success" dark @click="abrirModificarDetalle(item.idMedico)">
              <v-icon left>  Modificar </v-icon>
              <span>Modificar</span>
            </v-btn>

              <v-btn v-if="estadoActual(item.idMedico)" color="info" dark @click="abrirDialogoDetalle(item.idMedico)">
                <v-icon left> info </v-icon>
                <span>Ver detalles</span>
              </v-btn>

          </v-row>
        </template>
      </v-data-table> 
<!--Aqui llamo a los componentes de vuetify-->
    <v-dialog persistent v-model="dialogoRegistrar" max-width="880px">
          <RegistrarTarifa
            v-if="dialogoRegistrar"   
            :Tarifa="Tarifa"              
            @close-dialog-Registrar="closeDialogRegistrar()"
          >
          </RegistrarTarifa>
    </v-dialog>

    <v-dialog persistent v-model="dialogoactualizacion" max-width="880px">
          <ModificarTarifa
            v-if="dialogoactualizacion"   
            :Tarifa2="Tarifa2"              
            @close-dialog-Modificar="closeDialogModificar()"
          >
          </ModificarTarifa>
    </v-dialog>

     <v-dialog persistent v-model="dialogodetalle" max-width="880px">
          <VisualizarTarifa
            v-if="dialogodetalle" 
            :Tarifa3="Tarifa3"        
              @modifier-complete="modifierComplete"         
            @close-dialog-detalle="closeDialogDetalle()"
          >
          </VisualizarTarifa>
    </v-dialog>
    </v-card>
  </div>
</template>
<script>
import RegistrarTarifa from "@/components/Tarifas/RegistrarTarifa.vue";
import ModificarTarifa from "@/components/Tarifas/ModificarTarifa.vue";
import VisualizarTarifa from "@/components/Tarifas/VisualizarTarifa.vue"
import axios from "axios";
import { mapMutations, mapState } from "vuex";


export default {
  name: "GestionarTarifas",
  components: {
    RegistrarTarifa,
   ModificarTarifa,
   VisualizarTarifa
   
  },
  data() {
    return {
      
      Tarifa:{},
      Tarifa2:{},
       Tarifa3:{},
     

     headers: [

         {text:"Secuencia", align: "start", sortable: false, value:"secuencia"},
        { text: "Nombre", value: "codigo" },
        { text: "Precio", value: "precio" },
        
         { text: "", value: "actions", sortable: false },
      ],
      dialogoRegistrar: false,
      dialogoactualizacion: false,
      dialogodetalle: false,
     
             
    };

    
  },
  async created() {
    this.obtenerTarifa();
  
  },
  methods:{
     ...mapMutations(["setListaTarifa"]),
     //cerrar dialogo 
       closeDialogRegistrar() {
      this.dialogoRegistrar = false;
    },
     closeDialogDetalle() {
      this.dialogodetalle= false;
    },
     closeDialogModificar() {
      this.dialogoactualizacion = false;
    },
      estadoActual(array){
      if(array === 'listo'){
        return false
      }else{
        return true
      }
    },
     async abrirDialogo(id) {
      /*this.Especialidad = await this.loadUsuarioEspecialidad(id);*/
      this.dialogoRegistrar= !this.dialogoRegistrar;
    },
    async abrirDialogoDetalle(id) {
      this.Tarifa3 = await this.loadUsuarioEspecialidad(id);
      this.dialogodetalle= !this.dialogodetalle;
    },
    async abrirModificarDetalle(id) {
      this.Tarifa2 = await this.loadUsuarioEspecialidad(id);
      this.dialogoactualizacion= !this.dialogoactualizacion;
    },
 //obtener todos los pagos del usuario
    async obtenerTarifa() {
      await axios
        .get("/Tarifa/tarifasmedico/idMedico?id=")
        .then((x) => {
          let listaT=[];
          this.listaT = x.data;
          console.log(this.listaT);
          console.log(this.prueba)
           this.setListaTarifa(this.listaT);
        })
        .catch((err) => console.log(err));
    },
    async loadUsuarioTarifa(idMedico) {
      var user = {};
      await axios
        .get("/Tarifa/tarifasmedico/idMedico?id=" + idMedico)
        .then((res) => {
          console.log(res);
          user = res.data;
          console.log(user)

        })
        .catch((err) => console.log(err));
      console.log(user);     
      return user;
    },    
   
  },
 
  computed: {
    ...mapState(["listaTarifa"]),
  
  }
};
</script>
<style scoped>
.card {
  margin: 20px;
}
</style>