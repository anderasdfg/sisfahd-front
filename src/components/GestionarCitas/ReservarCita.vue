<template>
  <v-card>
    <h1 class="title-card">RESERVAR CITA</h1>
    <v-card-text>
      <v-autocomplete
        v-model="selectEspecialidad"
        :loading="loadingEspecialidad"
        :items="itemsEspecialidad"
        :search-input.sync="searchEspecialidad"
        cache-items
        class="autocomplete-search"                                
        label="Selecciona la especialidad"      
      ></v-autocomplete>
       <v-autocomplete
        v-model="selectMedico"
        :loading="loadingMedico"
        :items="itemsMedico"
        :search-input.sync="searchMedico"
        cache-items
        class="autocomplete-search"          
        label="Selecciona un profesional"        
      ></v-autocomplete>

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
            label="Fecha de cita"
            prepend-icon="mdi-calendar"
            readonly
            class="autocomplete-search"
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

      <button class="btn-buscar">Buscar</button>
    </v-card-text>
  </v-card>
</template>

<script>
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
        especialidades: [
          'Médicina general',
          'Cardiología',
          'Psicología',
          'Geriatría',          
        ],
        medicos: [
          'Pedro Pariona',
          'Carlos Ramirez',
          'Lorem Ipsum',
          'Sun Goes Down',          
        ],    
        date: new Date().toISOString().substr(0, 10),        
        modal: false,        
    };
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    searchEspecialidad (val) {
        val && val !== this.selectEspecialidad && this.querySelectionsEspecialidad(val)
      },
     searchMedico (val) {
        val && val !== this.selectMedico && this.querySelectionsMedico(val)
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
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedIndex = -1;
      });
    },
    querySelectionsEspecialidad (v) {
        this.loadingEspecialidad = true
        // Simulated ajax query
        setTimeout(() => {
          this.itemsEspecialidad = this.especialidades.filter(e => {
            return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
          })
          this.loadingEspecialidad = false
        }, 500)
      },
    querySelectionsMedico (v) {
        this.loadingMedico = true
        // Simulated ajax query
        setTimeout(() => {
          this.itemsMedico = this.medicos.filter(e => {
            return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
          })
          this.loadingMedico = false
        }, 500)
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