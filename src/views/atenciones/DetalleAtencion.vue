<template>
  <div style="margin-top: 40px;" class="home">
      <v-card elevation="3" class="card" style="width: 85%">
          <v-col>
            <v-row>
                <CardPaciente class="card-paciente"  style="margin: 0 auto; margin-top: 20px"/>
            </v-row>
            <v-row>
                <v-card elevation="3" class="card" style="width: 75%; margin: 0 auto; margin-top: 50px; margin-bottom: 50px; background-color: #CDCDCD;">
                    <v-col>
                        <v-row>
                            <h1 style="margin: auto; margin-top: 20px">DETALLE DE LA ATENCIÓN</h1>
                        </v-row>
                        <v-row>
                            <v-col>
                                <h2 style="margin: auto; margin-top: 20px;">Especialidad elegida:</h2>
                                <h3>{{especialidad}}</h3>
                            </v-col>
                            <v-col>
                                <h2 style="margin: auto; margin-top: 20px;">Fecha de la cita:</h2>
                                <h3>{{fechainicio}}</h3>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-card>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn
                        color="error"
                        elevation="2"
                        style="color: white"
                        @click="navegarto('/gestionarAtencion')"
                        >
                        <v-icon left>mdi-close-outline</v-icon>
                        Volver
                    </v-btn>
                </v-col>
                <v-col align="right">
                    <v-btn 
                        v-if="esAtencion"
                        color="success"
                        elevation="2"
                        style="color: white"
                        > <!--@click="sendtallerFormativoEcativo"-->
                        <v-icon left>mdi-check</v-icon>
                        Iniciar atención
                    </v-btn>
                </v-col>
            </v-row>
        </v-col>
      </v-card>
  </div>
</template>
<script>

import axios from "axios";
import CardPaciente from '@/components/CardPaciente.vue'
//import { mapState, mapMutations } from "vuex";

export default {
  name: "DetalleAtencion",
  data: () => ({
      especialidad: "",
      fechainicio: "",
      esAtencion: false,
  }),
  components : {
      CardPaciente
  },
  mounted () {
      
  },
  async created() {
    //console.log(this.$route.params.datitos);
    this.especialidad = this.$route.params.datitos.esp;
    this.fechainicio = this.$route.params.datitos.fi;

    var mifechai = new Date(this.fechainicio);
    var mifechaf = new Date(this.$route.params.datitos.fe);
    var fechaact = new Date();

    if( mifechai < fechaact && fechaact < mifechaf) {
        this.esAtencion = true;
    }
    else {
        this.esAtencion = false;
    }
  },
  methods: {
    navegarto(ruta){
      this.$router.push(ruta)
    }
  },
  computed: {

  },
  filters: {
    
  },
};
</script>

<style lang="scss">
    .home {
    margin: 1%;
    display: flex;
    justify-content: space-around;   
    }
    .card-paciente {
        max-width: 60%;
    }
    
</style>