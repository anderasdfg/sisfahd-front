<template>
  <v-card>
    <v-card-title class="justify-center">Eliminar Pedido</v-card-title>

    <div class="container">
      <form>
       

        <!--Para archivos :3 -->

        <v-divider class="divider-custom"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="6" md="6">
            <v-btn block style="background-color: rgb(57, 100, 165);color:white; border-radius:15px;" elevation="2" @click="eliminarPedido">             
              <span>Eliminar Pedido</span>
            </v-btn>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-btn color="error"  style="background-color: rgb(57, 100, 165);color:white; border-radius:15px;" elevation="2" block @click="closeDialog">
              <v-icon left>mdi-close-outline</v-icon>
              Cerrar
            </v-btn>
          </v-col>
        </v-card-actions>
      </form>
    </div>
    <v-dialog width="450px" v-model="cargaRegistro" persistent>
      <v-card height="300px">
        <v-card-title class="justify-center">Eliminando el pedido</v-card-title>
        <div>
          <v-progress-circular
            style="display: block; margin: 40px auto"
            :size="90"
            :width="9"
            color="purple"
            indeterminate
          ></v-progress-circular>
        </div>
        <v-card-subtitle
          class="justify-center"
          style="font-weight: bold; text-align: center"
          >En unos momentos finalizaremos...</v-card-subtitle
        >
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
import axios from "axios";

import { mapMutations, mapState, mapGetters } from "vuex";
import { required, minLength, between } from "vuelidate/lib/validators";
export default {
  props: ["pedidoEliminar"],
  data() {
    return {
        idpedido:"",
        codigo:"",
      pedidoE: {},
      cargaRegistro: false,
    };
  },

  methods: {
    async eliminarPedido() {
      this.$v.$touch();
      if (this.$v.$valid) {
        this.mensaje(
          "error",
          "..Oops",
          "Se encontraron errores en el formulario",

          false
        );
      } else {
        console.log("esto es pedidoeliminar en eliminar" );
        console.log(this.pedidoEliminar);    
        
        this.idpedido = this.pedidoEliminar[0].id;
        console.log("idpedido");
        console.log(this.idpedido);
        
        this.codigo=this.pedidoEliminar[0].productos[0].codigo;
        console.log("esto es codigo");
        console.log(this.codigo);
              
        console.log("este es el codigo del producto")
        await axios 
          .delete("/Pedidos/BorrarProducto?id=" + this.idpedido + "&codigoproducto=" + this.codigo )
          .then((res) => {
            this.pedidoE = res.data;
            console.log("esto es pedidoE");
            console.log(this.pedidoE);
            if (this.codigo || this.idpedido !== "") {
              this.cargaRegistro = false;
              this.closeDialog();
              this.$emit("emit-obtener-pedidos");
              this.mensaje(
                "success",
                "Listo",
                "Pedido eliminado satisfactoriamente",
                "<strong>Se redirigirá a la Interfaz de Comprar Servicios<strong>",
                true
              );
            }
          })
          .catch((err) => console.log(err));
      }
    },

    mensaje(icono, titulo, texto, footer, valid) {
      this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
        footer: footer,
      }).then((res) => {
        if (valid) {
          this.$emit("modifier-Complete");
        }
      });
    },
    closeDialog() {
      this.$emit("close-dialog-eliminar");
    },
  },
  computed: {
    ...mapGetters(["user"]),
  },

  validations() {
    return {
      EspecialidadAux: {
        required,
      },
    };
  },
};
</script>

<style  scoped>
.container-EliminarTarifa {
  margin: 15px;
}

.subtitle {
  color: #314b5f;
}
.divider-custom {
  margin-top: 7px;
  margin-bottom: 7px;
}

.inputTextField {
  border-color: green;
}
.btn{
    color: white;
    background-color: blue;
}
</style>