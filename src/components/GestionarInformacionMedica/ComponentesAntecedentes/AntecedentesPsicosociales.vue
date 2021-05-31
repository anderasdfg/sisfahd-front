<template>
  <v-card elevation="0">
    <v-card-title>Antecedentes Psicosociales</v-card-title>
    <v-card-text>
      <v-expansion-panels flat>
        <v-expansion-panel class="borde-fino-expansion-panel margen-por-panel">
          <v-expansion-panel-header>Antecedentes Personales</v-expansion-panel-header>
          <v-expansion-panel-content>
            <TablaEducacion
              :lista_educacion="lista_educacion"
            ></TablaEducacion>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel class="borde-fino-expansion-panel margen-por-panel">
          <v-expansion-panel-header>Antecedentes Familiares</v-expansion-panel-header>
          <v-expansion-panel-content>
            <TablaHabitosGenerales
              :lista_habitos_generales="lista_habitos_generales"
            ></TablaHabitosGenerales>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel class="borde-fino-expansion-panel margen-por-panel">
          <v-expansion-panel-header>Antecedentes Psicosociales</v-expansion-panel-header>
          <v-expansion-panel-content>
            <TablaHabitosNocivos
              :lista_habitos_nocivos="lista_habitos_nocivos"
            ></TablaHabitosNocivos>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel class="borde-fino-expansion-panel margen-por-panel">
          <v-expansion-panel-header>Antecedentes Sexuales</v-expansion-panel-header>
          <v-expansion-panel-content>
            <TablaLaborales
              :lista_laborales="lista_laborales"
            ></TablaLaborales>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel class="borde-fino-expansion-panel margen-por-panel">
          <v-expansion-panel-header>Problemas Cronicos</v-expansion-panel-header>
          <v-expansion-panel-content>
            <TablaMedicacionHabitual
              :lista_medicacion_habitual="lista_medicacion_habitual"
            ></TablaMedicacionHabitual>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel class="borde-fino-expansion-panel margen-por-panel">
          <v-expansion-panel-header>Problemas Cronicos</v-expansion-panel-header>
          <v-expansion-panel-content>
            <TablaSociales
              :lista_sociales="lista_sociales"
            ></TablaSociales>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-card-actions style="padding-left:0px !important">
        <v-btn
          class="boton-izquierda-stef"
          color="primary"
          dark
          outlined
          @click="CerrarDialogo()"
          >
            Cancelar
          <v-icon
            dark
            right
          >
            mdi-minus-circle
          </v-icon>
        </v-btn>
        <v-btn
          class="boton-izquierda-stef"
          color="primary"
          dark
          @click="CerrarDialogo()"
          >
            Guardar
          <v-icon
            dark
            right
          >
            mdi-checkbox-marked-circle
          </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script>
import TablaEducacion from "@/components/GestionarInformacionMedica/ComponentesTablas/SubtablasAntecedentesPsicosociales/TablaEducacion"
import TablaHabitosGenerales from "@/components/GestionarInformacionMedica/ComponentesTablas/SubtablasAntecedentesPsicosociales/TablaHabitosGenerales"
import TablaHabitosNocivos from "@/components/GestionarInformacionMedica/ComponentesTablas/SubtablasAntecedentesPsicosociales/TablaHabitosNocivos"
import TablaLaborales from "@/components/GestionarInformacionMedica/ComponentesTablas/SubtablasAntecedentesPsicosociales/TablaLaborales"
import TablaMedicacionHabitual from "@/components/GestionarInformacionMedica/ComponentesTablas/SubtablasAntecedentesPsicosociales/TablaMedicacionHabitual"
import TablaSociales from "@/components/GestionarInformacionMedica/ComponentesTablas/SubtablasAntecedentesPsicosociales/TablaSociales"
export default {
  components:{
    TablaEducacion,
    TablaHabitosGenerales,
    TablaHabitosNocivos,
    TablaLaborales,
    TablaMedicacionHabitual,
    TablaSociales
  },
  data(){
    return{
      lista_educacion:[],
      lista_laborales:[],
      lista_habitos_nocivos:[],
      lista_medicacion_habitual:[],
      lista_habitos_generales:[],
      lista_sociales:[],
    }
  },
  methods:{
    CerrarDialogo(){
      this.$emit("emit-close-dialog-a-psico");
    }
  }
}
</script>

<style>

</style>