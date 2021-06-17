<template>
  <v-card class="content">
    <div class="especialidad">
      <img src="https://i.ibb.co/QCnH4bR/Group.png" alt="Especialidad" />
      <h1>Especialidad</h1>
      <p>{{nombreEspecialidad}}</p>
    </div>
    <div class="fecha">
      <img src="https://i.ibb.co/Vm8ZPHS/calendar.png" alt="" />
      <h1>Fecha</h1>
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
            readonly
            class="text-calendar"
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="selectDate" scrollable locale="es-es">
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="modal = false"> Cancelar </v-btn>
          <v-btn text color="primary" @click="$refs.dialog.save(selectDate)">
            OK
          </v-btn>
        </v-date-picker>
      </v-dialog>
    </div>
  </v-card>
</template>

<script>
import axios from 'axios';
export default {
  name: "ComponenteBusqueda",  
  data() {
    return {
      selectDate: new Date().toISOString().substr(0, 10),
      modal: false,
      dialog: false,
      nombreEspecialidad : "",
      idEspecialidad : "",
    };
  },
  async created() {
    this.obtenerEspecialidad();
  },
  methods: {
    async obtenerEspecialidad() {
      this.idEspecialidad = this.$route.params.selectEspecialidad;      
      await axios
        .get(
          `/Especialidad/Id?id=${this.idEspecialidad}`
        )
        .then((x) => {
           this.nombreEspecialidad = x.data.nombre;
        })
        .catch((err) => console.log(err));
    },
  }
};
</script>

<style lang="scss" scoped>
.content {
  border-radius: 1.2rem;  
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  height: 6rem;
  margin: 0;
  
  h1 {
    padding-left: 1.5%;
    font-size: 1.4em;
  }
  p {
    padding-left: 1%;
    font-size: 1.4em;
  }
  img {
    width: 1.4rem;
  }
  .especialidad {
    width: 45%;
    margin: 0 0 0 5%;
    display: flex;
    align-items: center;
  }
  .fecha {
    width: 20%;
    display: flex;
    align-items: center;
    .text-calendar {
        padding-left: 3%;
        font-size: 1.2em;
    }
  }
}
.v-sheet.v-card:not(.v-sheet--outlined) {
  box-shadow: none;
}
</style>