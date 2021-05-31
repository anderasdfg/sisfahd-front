<template>
  <v-card>
    <h1 class="title-card">RESERVAR CITA</h1>
    <v-card-text>
      <v-autocomplete
        v-model="selectEspecialidad"
        :loading="loadingEspecialidad"
        :items="itemsEspecialidad"
        item-text="nombre"
        item-value="id"
        cache-items
        class="autocomplete-search"
        label="Selecciona la especialidad"
        @change="obtenerMedicoPorEspecialidad()"
      ></v-autocomplete>
      <v-autocomplete
        v-model="selectMedico"
        :loading="loadingMedico"
        :items="itemsMedico"        
        cache-items
        item-text="nombrecompleto"
        item-value="id"
        class="autocomplete-search"
        label="Selecciona un profesional"
      ></v-autocomplete>

      <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="selectDate"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="selectDate"
            label="Fecha de cita"
            prepend-icon="mdi-calendar"
            readonly
            class="autocomplete-search"
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="selectDate" scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="modal = false"> Cancelar </v-btn>
          <v-btn text color="primary" @click="$refs.dialog.save(selectDate)">
            OK
          </v-btn>
        </v-date-picker>
      </v-dialog>
      <button class="btn-buscar" @click="buscarCita">Buscar</button>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "ReservarCita",
  data() {
    return {
      dialog: false,
      loadingEspecialidad: false,
      loadingMedico: false,
      itemsEspecialidad: [],
      itemsMedico: [],
      searchEspecialidad: null,
      searchMedico: null,
      selectEspecialidad: null,
      selectMedico: null,      
      selectDate: new Date().toISOString().substr(0, 10),
      modal: false,
      turno : {

      }
    };
  },  
  async created() {
    this.selectEspecialidad = "";
    this.selectMedico = "";
    this.obtenerEspecialidades();
  },
  methods: {
    async obtenerEspecialidades() {
      this.loadingEspecialidad = true;
      await axios
        .get("/especialidad/all")
        .then((x) => {
          this.itemsEspecialidad = x.data;
          this.loadingEspecialidad = false;          
        })
        .catch((err) => console.log(err));
    },
    async obtenerMedicoPorEspecialidad() {
      this.selectMedico = "";
      this.loadingMedico = true;      
      await axios
        .get(`/medico/especialidad?idEspecialidad=${this.selectEspecialidad}`)
        .then((x) => {
          this.itemsMedico = x.data;
          this.loadingMedico = false;          
        })
        .catch((err) => console.log(err));
    },
    async buscarCita() {
      console.log(this.selectEspecialidad);
      console.log(this.selectMedico);
      console.log(this.selectDate);  
      this.$router.push(`cupos/${this.selectEspecialidad}/${this.selectDate}`)    
    },

  },
};
</script>

<style lang="scss" scoped>
.title-card {
  font-size: 25px;
  color: $blue;
  padding-top: 10%;
  text-align: center;
}
.v-dialog .v-card .v-card__title {
  font-size: 25px;
  font-weight: bold;
}
.autocomplete-search {
  margin: 2% 10% 7% 10%;
  label {
    color: $black;
    font-size: 20px;
  }
}
.btn-buscar {
  background: $blue;
  color: white;
  border-radius: 10px;
  width: 80%;
  height: 4vh;
  font-weight: bold;
  font-size: 20px;
  margin: 0 10% 10% 10%;
}
</style>