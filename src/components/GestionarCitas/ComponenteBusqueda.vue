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
      <v-menu
            v-model="menu2"
            :close-on-content-click="true"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="selectDate"                
                readonly
                v-bind="attrs"
                v-on="on"
                class="text-calendar"
              ></v-text-field>
            </template>
            <v-date-picker
              locale="es-es"
              v-model="selectDate"   
              @input="$emit('getFecha', selectDate)"           
            ></v-date-picker>
          </v-menu>
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
      menu2: false,
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
  },
 
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
    margin-bottom: 0;
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
        margin-top: 3%;
        padding-left: 3%;
        font-size: 1.2em;
    }
  }
}
.v-sheet.v-card:not(.v-sheet--outlined) {
  box-shadow: none;
}


</style>