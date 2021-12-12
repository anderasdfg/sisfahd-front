<template>
  <v-card>
    <v-card-title class="justify-center"
      >Lista Pedidos

      <v-text-field
        v-model="search"
        class="pt-0 mt-0"
        append-icon="mdi-magnify"
        label="Buscar Productos"
        style="margin-top: 0px !important"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>



    <div class="container">
      <v-data-table :headers="headers" :items="listaPedidos" :search="search">
           <template v-slot:[`item.actions`]="{ item }">
            <v-row align="center" justify="space-around">
              <div class="in-flex">
                <v-btn
                  x-small
                  color="info"
                  dark
                  @click="eliminarPedido(item.id)"
                >
                  <v-icon center> mdi-close </v-icon>
                 
                </v-btn>
              </div>
            </v-row>
          </template>     
      </v-data-table>
      <v-row class="filas">
        <v-col align="right">
          <button class="btn-volver" block @click="cerrarDialogo">
            Volver
          </button>
        </v-col>
      </v-row>

      
    </div>
     <v-dialog persistent v-model="dialogoeliminar" max-width="880px">
          <EliminarPedido
            v-if="dialogoeliminar" 
            :pedidoEliminar="pedidoEliminar"        
                  
            @close-dialog-eliminar="closeDialogEliminar()"
             @emit-obtener-pedidos="obtenerPedido()"
             
          >
          </EliminarPedido>
    </v-dialog>
  </v-card>
</template>

<script>

import { mapState, mapGetters, mapMutations } from "vuex";
import axios from "axios";
import EliminarPedido from "./EliminarPedido.vue";
export default {
    name: "VerListaPedido",
    props: ["pedi2"],
    components: {   
   EliminarPedido,
   
  },
    data() {
        return {
          pedidoEliminar:{},
            search: "",
            paciente: {
                id_paciente: "",
                nombre: "",
                apellido_paterno: "",
                apellido_materno: "",
            },
            pedidoid: "",
            headers: [
                {
                    text: "Nombre",
                    align: "start",
                    sortable: false,
                    value: "nombre",
                },
                { text: "Precio", value: "precio",
                },
                { text: "Cantidad", value: "cantidad",
                },
                { text: "", value: "actions", sortable: false },
            ],
            dialogoeliminar: false,
        };
    },
    async created() {
        this.obtenerPedido(this.paciente.id_paciente);
    },
    methods: {
        cerrarDialogo() {
            this.$emit("close-dialog-detalle");
        },
        closeDialogEliminar() {
      this.dialogoeliminar = false;
    },
     async eliminarPedido(id) {
      this.pedidoEliminar = await this.loadPedidoById(id);
      this.dialogoeliminar= !this.dialogoeliminar;
    },     
        async obtenerPedido() {
            var pedido = {};
            //this.paciente = this.pedi2;
           // console.log("este es el paciente");
           // console.log(this.paciente);
            //console.log(this.paciente[0].paciente.id_paciente);
            await axios
                .get("/Pedidos/byCarritoPaciente?id_paciente=" + this.pedi2.paciente.id_paciente) //pedido hace referencia al pacienteid
                .then((res) => {
                let listaE = [];
                let listaP = [];
                this.listaE = res.data;
                this.listaP = this.listaE[0].productos;               
                console.log("esto es la lista P");
                console.log(this.listaP);
                console.log("esto es la lista E");
                console.log(this.listaE);
                console.log(this.pedi2);
                //console.log("aca va id_paciente");
                //console.log(this.paciente[0].paciente.id_paciente);
                this.setListaPedidos(this.listaP);
            })
                .catch((err) => console.log(err));
        },

        async loadPedidoById() {     
      await axios
       .get("/Pedidos/byCarritoPaciente?id_paciente=" + this.pedi2[0].paciente.id_paciente)
        .then((x) => {
          console.log(x);
          this.pedidoEliminar = x.data;
          console.log("esto es pedidoeliminar")
          console.log(this.pedidoEliminar);
        })
        .catch((err) => console.log(err));
      return this.pedidoEliminar;
    },

        ...mapMutations(["setListaPedidos"]),
    },
    computed: {
        ...mapState(["listaPedidos"]),
        ...mapGetters(["user"]),
    },
    components: { EliminarPedido }
};
</script>

<style lang="scss" scoped>
.title-card {
  font-size: 25px;
  color: $blue;
  padding-top: 7%;
  text-align: center;
}
.container-Medicamento {
  margin: 15px;
}
.v-dialog .v-card .v-card__title {
  font-size: 25px;
  font-weight: bold;
}
.campos {
  margin: 2% 10% 5% 10%;
}
.filas {
  margin: 2% 8% 5% 8%;
}
.btn-volver {
  margin-top: 4%;
  margin-bottom: 1%;
  margin-left: 5%;
  margin-right: 6%;
  background: $blue;
  color: white;
  border-radius: 10px;
  width: 90%;
  height: 5vh;
  font-weight: bold;
  font-size: 20px;
}
</style>

