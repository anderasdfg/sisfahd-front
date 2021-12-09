<template>
  <v-card>
   
         <v-card-title class="justify-center">Lista Pedidos

            <v-text-field
          v-model="search"
          class="pt-0 mt-0"
          append-icon="mdi-magnify"
          label="Buscar Productos"
          style="margin-top:0px !important"
          single-line
          hide-details
        ></v-text-field>
         </v-card-title>

    <div class="container">
       <v-data-table 
         :headers="headers"
         :items="listaPedidos"
          :search="search">
              <v-card-text>                   
                   

             <template v-slot:no-data>
          <v-card-text class="mt-1">Lista vacía. Si cree que existe un error, por favor recargue la página</v-card-text>
        </template>   

                  <template v-slot:[`item.actions`]="{ item }">
              <v-row align="center" justify="space-around">
                   <div class="in-flex">
                  <v-btn
                    x-small
                    color="info"
                    dark
                    @click="eliminarPedido(item.pedidoid)"
                  >
                  <i class="bi bi-x-circle"></i>
                  </v-btn>
                </div>             
              </v-row>
            </template>         


        
            </v-card-text>
       </v-data-table>
             <v-row class="filas">
                <v-col align="right">
                  <button class="btn-volver" block @click="cerrarDialogo">
                    Volver
                  </button>
                </v-col>
              </v-row>
     
          <v-divider></v-divider>

       
         
    </div>
  </v-card>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import axios from "axios";
export default {
  name: "<VerListaPedido>",
  props: ["producto"],
  data() {
    return {
   search:'',
   headers: [
        {
          text: "Nombre",
          align: "start",
          sortable: false,
          value: "nombre",
        },
        { text: "Precio", value: "precio" },
        { text: "Cantidad", value: "cantidad" },

        { text: "", value: "actions", sortable: false },
      ],
Producto: {
        
        nombre: "",
        codigo: "",
        precio: 0,
        cantidad: 0,
      
      },      
    };
  },
  async created() {
    this.obtenerPedido();
  
  },


  methods: {
    ...mapMutations(["setlistaPedidos"]),
    cerrarDialogo() {
      this.$emit("close-dialog-detalle");
    },           
   async getinf(pedidoid) {
     
    await axios
          .post("/Pedidos", this.Pedido)
          .then((res) => {
             this.x=res.data;
            console.log(this.x.id);
            this.pedidoid = this.x.id;
            console.log(this.x.id);
            this.Pedido.id=this.pedidoid;
          })
          .catch((err) => console.log(err));
   },
       
    async obtenerPedido(pedidoid) {
        
            this.Producto.codigo = this.pedidoid;
         
      console.log("funcionamrda")  
      console.log(this.Producto);    
      var pedido = {};
      await axios      
      .get("/Pedidos/GetProductos?id=" + pedidoid)
        .then((x) => {     
          console.log(x);     
          Producto = x.data;
          console.log(this.Producto);        
         
        })
        .catch((err) => console.log(err));  
        console.log(pedido);
    },
   
  },
  computed: {
    ...mapState(["listaPedidos"]),
    ...mapGetters(["user"]),
   
  },

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

