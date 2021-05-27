<template>
  <v-card>
    <h1 class="title-card">REGISTRAR TURNO</h1>
    <v-card-text>
      <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="date"
        persistent        
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Fecha del turno"
            prepend-icon="mdi-calendar"
            readonly
            class="campos"
            v-bind="attrs"            
            v-on="on"             
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="modal = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.dialog.save(date)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-dialog>
      <v-text-field
        label="Especialidad"
        class="campos"
        v-model="especialidad" 
        readonly
      ></v-text-field>
      <v-row class="filas">
        <v-col>
          <v-autocomplete
            v-model="horaInicio"
            :items="horasInicio"
            cache-items                            
            label="Hora Inicio"
            rows="1"      
          ></v-autocomplete>
        </v-col>
        <v-col>
          <v-autocomplete
            v-model="horaFin"
            :items="horasFin"
            cache-items
            rows="1"          
            label="Hora Fin"   
          ></v-autocomplete>
        </v-col>
      </v-row>
      <v-autocomplete
        v-model="ratio"
        :items="ratios"
        cache-items
        class="campos"                            
        label="Ratio del Turno"  
      ></v-autocomplete>
      <button class="btn-buscar">Registrar</button>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "RegistrarTurno",
  data() {
    return {
      dialog: false,
      date: new Date().toISOString().substr(0, 10),        
      modal: false,
      horasInicio: ['foo', 'bar'],
      horaInicio: null,
      horasFin: ['foo', 'bar'],
      horaFin: null,
      ratios: ['15 min', '30 min', '45 min'],
      ratio: null,
      //Esto sera reemplazado luego
      especialidad:"Traumatologia"        
    };
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  methods: {
    cerrarDialogo() {
      this.$emit("emit-close-dialog");
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
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
.campos {
  margin: 2% 10% 7% 10%;  
}
.filas{
  margin: 2% 8% 7% 8%;
}
.btn-buscar {  
  background: $green;
  color: white;
  border-radius: 10px;
  width: 80%;
  height: 4vh;
  font-weight: bold;
  font-size: 20px;
  margin: 0 10% 10% 10%;
}
</style>