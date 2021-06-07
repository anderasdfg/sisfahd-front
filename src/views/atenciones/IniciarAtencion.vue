<template>
  <div style="margin-top: 20px;" class="home">
      <v-card elevation="3" class="card" style="width: 95%">
        <v-col>
            <v-row>
                <iframe style="margin-left: 20px; margin-top: 20px;" height="400px" width="600px" allow="camera;microphone" :src="enlace_cita"></iframe>
            </v-row>
            <v-row style="margin: 0 auto; margin-top: 20px">
                <v-expansion-panels flat class="borde-fino-expansion-panel" >
                  <v-expansion-panel>
                    <v-expansion-panel-header>Anamnesis</v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <!--mi tabla-->
                      <h1>Hola</h1>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
                <v-expansion-panels flat class="borde-fino-expansion-panel" >
                  <v-expansion-panel>
                    <v-expansion-panel-header>Prescripción</v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <!--mi tabla-->
                      <h1>Hola</h1>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
                <v-expansion-panels flat class="borde-fino-expansion-panel" >
                  <v-expansion-panel>
                    <v-expansion-panel-header>Antecedentes</v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <!--mi tabla-->
                      <h1>Hola</h1>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
                <v-expansion-panels flat class="borde-fino-expansion-panel" >
                  <v-expansion-panel>
                    <v-expansion-panel-header>Signos vitales</v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <!--mi tabla-->
                      <h1>Hola</h1>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
                <v-expansion-panels flat class="borde-fino-expansion-panel" >
                  <v-expansion-panel>
                    <v-expansion-panel-header>Diagnóstico</v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <!--mi tabla-->
                      <h1>Hola</h1>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
                <v-expansion-panels flat class="borde-fino-expansion-panel" >
                  <v-expansion-panel>
                    <v-expansion-panel-header>Indicaciones</v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <!--mi tabla-->
                      <h1>Hola</h1>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
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
  name: "IniciarAtencion",
  data: () => ({
      enlace_cita: "",
  }),
  components : {
      
  },
  mounted () {
      
  },
  async created() {
    
    this.enlace_cita = this.$route.params.datitos.enlace_cita;
    
  },
  methods: {
    navegarto(ruta){
      this.$router.push(ruta)
    },
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
    
</style>