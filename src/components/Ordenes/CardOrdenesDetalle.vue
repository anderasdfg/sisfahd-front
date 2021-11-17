<template>
  <v-card elevation="0" class="px-5 py-2">
    <v-card-title class="">
      <span class="orden-detalle-titulo">DETALLES DE LA ORDEN</span>
    </v-card-title>
    <v-card-text>
      <div style="margin-top: 10px;">
        <h4 class="text-blue">DATOS DE LA CITA</h4>
        <div class="content-diagnostico">
          <p>
            <b style="font-weight: 700;">Fecha de Atención:</b>
            <span> {{ListTableElem.datos_acto_medico.fecha_atencion}}</span> 
          </p>
        </div>
        <div class="content-diagnostico">
          <p>
            <b style="font-weight: 700;">Médico:</b>
            <span> {{ListTableElem.nombre_medico}} {{ListTableElem.apellido_medico}}</span> 
          </p>
        </div>
        <div class="content-diagnostico">
          <p>
            <b style="font-weight: 700;">Indicaciones:</b>
            <span> {{ListTableElem.datos_acto_medico.indicaciones}}</span> 
          </p>
        </div>
      </div>
      <div style="margin-top: 25px;">
        <h4 class="text-blue">PROCEDIMIENTOS</h4>
        <div>
          <v-card elevation="0" class="mt-0 mb-0 ">
              <CardTablaProcedimientos
                :ListTableElem="ListTableElem.procedimientos"
              ></CardTablaProcedimientos>
            </v-card>
        </div>
      </div>
    </v-card-text>
    <v-card-actions class="px-5 py-5">
      <v-spacer></v-spacer>
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
import CardTablaProcedimientos from "@/components/Ordenes/CardTablaProcedimientos";
export default {
  name: "CardOrdenesDetalle",
  props: ["ListTableElem"],
  components:{
    CardTablaProcedimientos
  },
  data() {
    return {
      prescripciones: [],
      listaDiagnosticos: [],
      acto_medico: {},
    };
  },
  async created() {
    //await this.obtenerDiagnostico(this.cita.id_acto_medico);
  },
  async mounted() {
    //await this.obtenerDiagnostico(this.cita.id_acto_medico);
  },
  methods: {
    CloseDialog(){
      this.$emit("emit-close-dialog");
    }
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

