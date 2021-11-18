<template>
  <v-card elevation="0" class="px-5 py-2">
    <v-card-title class="">
      <span class="orden-detalle-titulo">PAGO DE LA RESERVA</span>
    </v-card-title>
    <v-card-text>
      <div style="margin-top: 10px">
        <h4 class="text-blue">DATOS DE LA RESERVA</h4>
        <div class="content-diagnostico">
          <p>
            <b style="font-weight: 700">Procedimiento: </b>
            <span> {{ ListTableElem.datos_examen.descripcion }}</span>
          </p>
        </div>
        <div class="content-diagnostico">
          <p>
            <b style="font-weight: 700">Fecha de Atención:</b>
            <span> {{ queryReserva.fecha }}</span>
          </p>
        </div>
        <div class="content-diagnostico">
          <p>
            <b style="font-weight: 700">Médico para la Atención: </b>
            <span>
              {{ InfoTurno.item2.datos.nombre }}
              {{ InfoTurno.item2.datos.apellido_paterno }}
              {{ InfoTurno.item2.datos.apellido_materno }}</span
            >
          </p>
        </div>
        <div class="content-diagnostico">
          <p>
            <b style="font-weight: 700">Precio: </b>
            <span> S/.{{ ListTableElem.datos_examen.precio }}</span>
          </p>
        </div>
      </div>
    </v-card-text>
    <v-card-actions class="px-5 py-5">
      <v-spacer></v-spacer>
       <BotonNiubiz :pago="this.pago" />
      <v-btn color="primary" dark > Pagar </v-btn>
      <v-btn color="blue darken-1" text @click="CloseDialog()"> Cerrar </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";
import BotonNiubiz from "@/components/GestionarCitas/ComponentesPagos/BotonNiubiz.vue";
import { mapGetters } from "vuex";
export default {
  name: "CardPagoReserva",
  props: ["ListTableElem","queryReserva","InfoTurno","query2","pago"],
  components: {
    BotonNiubiz
  },
  data() {
    return {
       
    };
  },
  created(){
    console.log("pago");
    console.log(this.pago);
  },
  methods: {
    CloseDialog() {
      this.$emit("emit-close-dialog");
    },
    mensaje(icono, titulo, texto, footer, valid) {
      this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
        footer: footer,
      }).then((res) => {
        if (valid) {
          this.$emit("modifier-complete");
        }
      });
    },
    async RealizarReserva_2() {
      console.log(this.queryReserva);
      await this.getPacienteByUsuario(this.queryReserva.idUsuario);
      await this.registrarPedido();
        
    },
    async registrarPedido() {
      console.log("pedidos");
      this.pedido.paciente.id_paciente = this.paciente.id;
      this.pedido.paciente.nombre = this.user.datos.nombre;
      this.pedido.paciente.apellido_paterno = this.user.datos.apellido_paterno;
      this.pedido.paciente.apellido_materno = this.user.datos.apellido_materno;
      this.pedido.id_acto_medico = this.query2.idActoMedico;

      this.producto.codigo = this.ListTableElem.datos_examen.id;
      this.producto.nombre = this.ListTableElem.datos_examen.descripcion;
      this.producto.precio = this.ListTableElem.datos_examen.precio;
      this.producto.cantidad = 1;
      this.itemsProductos.push(this.producto);
      this.pedido.productos = this.itemsProductos;
      this.pedido.precio_neto = this.ListTableElem.datos_examen.precio;

      this.totalPrecio = this.ListTableElem.datos_examen.precio;

      console.log(this.pedido);
      await axios
        .post("/Pedidos", this.pedido)
        .then(async (res) => {
          console.log(res.data);
          this.idPedido = res.data.id;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getPacienteByUsuario(idUsuario) {
      await axios
        .get(`/Paciente/usuario?idusuario=${idUsuario}`)
        .then((x) => {
          this.paciente = x.data;
        })
        .catch((err) => console.log(err));    
    },
    async generarPago(){
      this.pago.datos_paciente.datos.correo = this.user.usuario;
      this.pago.datos_paciente.datos.nombre_apellido_paciente =
        this.user.datos.nombre +
        " " +
        this.user.datos.apellido_paterno +
        " " +
        this.user.datos.apellido_materno;
      this.pago.datos_paciente.nombre_rol.nombre = "Paciente";
      this.pago.datos_paciente.usuario = this.user.id;
      this.pago.id = this.idPedido;
      this.pago.id_paciente = this.paciente.id;
      this.pago.precio_neto = this.ListTableElem.datos_examen.precio;
      this.pago.tipo_pago = "Niubiz";
      this.pago.fecha_pago = "";
    }
  },
  computed: {
    ...mapGetters(["user"]),
  },
};
</script>

<style lang="scss" scoped>
.content-diagnostico {
  display: flex;
  justify-content: space-between;
}
.orden-detalle-titulo {
  font-weight: 700;
  color: $blue !important;
}
.text-blue {
  color: $blue !important;
  margin-bottom: 1%;
}
</style>

