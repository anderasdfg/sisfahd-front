<template>
  <v-card>
     <v-card-title class="justify-center">Lista Pedidos</v-card-title>

    <div class="container">
     
          <v-divider></v-divider>

            <v-card-text>
              <v-text-field
                v-model="Pedido.nombre"
                label="Nombre"
                readonly
              >
              <button>
                <i class="bi bi-x-circle"></i>
                </button>
              </v-text-field>

              <v-text-field
                v-model="Pedido.precio"
                label="Precio"
                readonly
              > <button>
                <i class="bi bi-x-circle"></i>
                </button>
                </v-text-field>

              <v-text-field
                v-model="Pedido.cantidad"
                label="Cantidad"
                readonly
              > <button>
                <i class="bi bi-x-circle"></i>
                </button></v-text-field>


              <v-row class="filas">
                <v-col align="right">
                  <button class="btn-volver" block @click="cerrarDialogo">
                    Volver
                  </button>
                </v-col>
              </v-row>
            </v-card-text>
         
    </div>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  name: "<VerListaPedido>",
  props: ["Pedido"],
  data() {
    return {
pedidos: {
        nombre: "",
        precio: "",
        cantidad: "",
      },
    };
  },


  methods: {
    cerrarDialogo() {
      this.$emit("close-dialog-detalle");
    },  
    async obtenerPedido(){
      var pedido = {};
      await axios
      .get("/Pedidos/Id?id=" + id)
      .then((res) => {
        console.log(res);
        pedido = res.data;
        console.log(pedido)
      })
      .catch((err) => console.log(err));
      console.log(pedido);
      return pedido;
    },
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

