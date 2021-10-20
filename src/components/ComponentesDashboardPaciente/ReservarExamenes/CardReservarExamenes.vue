<template>
  <v-card elevation="3" class="card-home-prescripcion">
    <div class="header-logo">
      <img src="https://i.ibb.co/C1DWyrk/logo-s.png" alt="" />
      <h3>RESERVAR EXÁMENES</h3>
    </div>
    <button style="text-align: right;" @click="refresh()">
      <v-icon color="#4172F2">mdi-refresh</v-icon>
    </button>
    <div v-for="examen in listaExamenes" :key="examen.codigo">
      <CardItemExamen
        :examen="examen"
      />
      <div v-if="listaExamenes.length == 0">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="item-prescripcion"> </v-list-item-title>
            <v-list-item-subtitle class="item-prescripcion-subtitle">
              No se han ordenado exámenes para este
              diagnóstico</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </div>
    </div>
    <!-- <div v-for="item in listaDiagnosticos" :key="item.codigo_enfermedad">
      <div
        v-for="itemExamen in item.examenes_auxiliares"
        :key="itemExamen.codigo"
      >
        <CardItemExamen
          :nombre="itemExamen.nombre"
          :enfermedad="item.nombre_enfermedad"
          :codigoExamen="itemExamen.codigo"
        />
      </div>
      <div v-if="item.examenes_auxiliares.length == 0">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="item-prescripcion"> </v-list-item-title>
            <v-list-item-subtitle class="item-prescripcion-subtitle">
              No se han ordenado exámenes para este
              diagnóstico</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </div>
    </div> -->
    <div style="display: flex; justify-content:space-between; margin-top:3%;">
      <div style="display: flex; justify-content:flex-start" >
        <h3 class="campos"> Total: </h3>
        <h3 class="resultados">{{ "S/." + this.totalPrecio }}</h3>
      </div>
      <div style="display: flex; justify-content:flex-start; ">
        <button class="btn-pagar" block>Pagar</button>
      <div style="margin-left:4%"></div>
        <button class="btn-volver" block>Volver</button>
      </div>
    </div>
    <v-btn
      color="green darken-1"
      text
      @click="$emit('abiertoComprarExamenes', false)"
    >
      Aceptar
    </v-btn>
  </v-card>
</template>

<script>
import axios from "axios";
import CardItemExamen from "@/components/ComponentesDashboardPaciente/ReservarExamenes/CardItemExamen.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "CardReservarExamenes",
  props: ["cita"],

  components: {
    CardItemExamen,
  },
  data() {
    return {
      listaDiagnosticos: [],
      acto_medico: {},
      examen: {
        codigo: "",
        nombre: "",
        precio: "",
        precioTotal: 0,
      },
      listaExamenesReserva: [],
    };
  },
  async created() {
    await this.obtenerDiagnostico(this.cita.id_acto_medico);
    await this.setListaExamenesConPrecio();
    await this.setListaExamenes(this.listaExamenesReserva);    
  },
  async mounted() {
    await this.obtenerDiagnostico(this.cita.id_acto_medico);
  },
  methods: {
    ...mapActions(["setListaExamenes"]),
    async obtenerDiagnostico(idcita) {
      await axios
        .get("/ActoMedico/id?id=" + idcita)
        .then((x) => {
          this.acto_medico = x.data;
          console.log(this.acto_medico);
          this.listaDiagnosticos = this.acto_medico.diagnostico;
          console.log(this.listaDiagnosticos);
        })
        .catch((err) => console.log(err));
    },
    async setListaExamenesConPrecio() {
      this.listaExamenesReserva = [];
      for (var item in this.listaDiagnosticos) {
        this.examen = {};
        for (var i in this.listaDiagnosticos[item].examenes_auxiliares) {
          this.examen.codigo =
            this.listaDiagnosticos[item].examenes_auxiliares[i].codigo;
          this.examen.nombre =
            this.listaDiagnosticos[item].examenes_auxiliares[i].nombre;
          this.examen.enfermedad =
            this.listaDiagnosticos[item].nombre_enfermedad;
          await axios
            .get("/Examenes/id?id=" + this.examen.codigo)
            .then((x) => {
              this.examen.precio = x.data.precio;
            })
            .catch((err) => console.log(err));
        }
        this.listaExamenesReserva.push(this.examen);
      }
    },
    async refresh() {      
      this.$store.commit('setEmptyExamenes')     
      await this.setListaExamenesConPrecio();
      await this.setListaExamenes(this.listaExamenesReserva);
    }
  },

  computed: {  
    ...mapGetters(["listaExamenes"]),
    ...mapGetters(["totalPrecio"]),
  },
};
</script>

<style lang="scss" scoped>
.card-home-prescripcion {
  padding: 3%;
  border-radius: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.header-receta {
  margin: 2% 0;
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.content-diagnostico {
  display: flex;
  justify-content: space-between;
}
.single-line {
  background: #efefef;
}
.item-prescripcion {
  font-size: 16px !important;
}
.item-prescripcion-subtitle {
  font-size: 16px !important;
}
.text-span {
  font-size: 16px !important;
}
.header-logo {
  display: flex;
  margin: 2%;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  color: $blue !important;
}
.text-blue {
  color: $blue !important;
  margin-bottom: 1%;
}
</style>

