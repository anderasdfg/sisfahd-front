<template>
  <v-card elevation="0" class="px-5 py-2">
    <v-card-title class="">
      <span class="orden-detalle-titulo">PAGO DE LA RESERVA</span>
    </v-card-title>
    <v-card-text>
      <div style="margin-top: 10px;">
        <h4 class="text-blue">DATOS DE LA RESERVA</h4>
        <div class="content-diagnostico">
          <p>
            <b style="font-weight: 700;">Procedimiento: </b>
            <span> {{ListTableElem.datos_examen.descripcion}}</span> 
          </p>
        </div>
        <div class="content-diagnostico">
          <p>
            <b style="font-weight: 700;">Fecha de Atención:</b>
            <span> {{queryReserva.fecha}}</span> 
          </p>
        </div>
        <div class="content-diagnostico">
          <p>
            <b style="font-weight: 700;">Médico para la Atención: </b>
            <span> {{InfoTurno.item2.datos.nombre}} {{InfoTurno.item2.datos.apellido_paterno}} {{InfoTurno.item2.datos.apellido_materno}}</span> 
          </p>
        </div>
        <div class="content-diagnostico">
          <p>
            <b style="font-weight: 700;">Precio: </b>
            <span> S/.{{ListTableElem.datos_examen.precio}}</span> 
          </p>
        </div>
      </div>
    </v-card-text>
    <v-card-actions class="px-5 py-5">
      <v-spacer></v-spacer>
      <v-btn color="primary" 
        dark
        @click="RealizarReserva()"
      > Pagar 
      </v-btn>
      <v-btn
        color="blue darken-1"
        text
        @click="CloseDialog()"
      >
        Cerrar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  name: "CardPagoReserva",
  props: ["ListTableElem","queryReserva","InfoTurno","query2"],
  data() {
    return {
      prescripciones: [],
      listaDiagnosticos: [],
      acto_medico: {},
      pago: {
        datos_paciente: {
          datos: {
            correo: "",
            nombre_apellido_paciente: "",
          },
          nombre_rol: {
            nombre: "",
          },
          usuario: "",
        },
        id: "",
        id_paciente: "",
        precio_neto: "",
        tipo_pago: "",
        fecha_pago: "",
        id_examen:""
      },
    };
  },
  methods: {
    CloseDialog(){
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

