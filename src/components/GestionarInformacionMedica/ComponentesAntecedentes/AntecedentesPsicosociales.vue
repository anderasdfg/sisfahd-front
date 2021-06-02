<template>
  <v-card elevation="0">
    <v-card-title>Antecedentes Psicosociales</v-card-title>
    <v-card-text>
      <v-expansion-panels flat>
        <v-expansion-panel class="borde-fino-expansion-panel margen-por-panel">
          <v-expansion-panel-header>Antecedentes Educacionales</v-expansion-panel-header>
          <v-expansion-panel-content>
            <TablaAntecedentesPsicosociales
              :lista_antecedentes_psicosociales="psicosociales.educacion"
              antecedente="antecedentes educacionales"
              antecedenteSing="antecedente educacional"
            ></TablaAntecedentesPsicosociales>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel class="borde-fino-expansion-panel margen-por-panel">
          <v-expansion-panel-header>Antecedentes Laborales</v-expansion-panel-header>
          <v-expansion-panel-content>
            <TablaAntecedentesPsicosociales
              :lista_antecedentes_psicosociales="psicosociales.laborales"
              antecedente="antecedentes laborales"
              antecedenteSing="antecedente laboral"
            ></TablaAntecedentesPsicosociales>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel class="borde-fino-expansion-panel margen-por-panel">
          <v-expansion-panel-header>Antecedentes Sociales</v-expansion-panel-header>
          <v-expansion-panel-content>
            <TablaAntecedentesPsicosociales
              :lista_antecedentes_psicosociales="psicosociales.sociales"
              antecedente="antecedentes sociales"
              antecedenteSing="antecedente social"
            ></TablaAntecedentesPsicosociales>
          </v-expansion-panel-content>
        </v-expansion-panel>    
        <v-expansion-panel class="borde-fino-expansion-panel margen-por-panel">
          <v-expansion-panel-header>Habitos Generales</v-expansion-panel-header>
          <v-expansion-panel-content>
            <TablaAntecedentesPsicosociales
              :lista_antecedentes_psicosociales="psicosociales.habitos_generales"
              antecedente="habitos generales"
              antecedenteSing="habito general"
            ></TablaAntecedentesPsicosociales>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel class="borde-fino-expansion-panel margen-por-panel">
          <v-expansion-panel-header>Habitos Nocivos</v-expansion-panel-header>
          <v-expansion-panel-content>
            <TablaAntecedentesPsicosociales
              :lista_antecedentes_psicosociales="psicosociales.habitos_nocivos"
              antecedente="habitos nocivos"
              antecedenteSing="habito nocivo"
            ></TablaAntecedentesPsicosociales>
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
          Continuar
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
import TablaAntecedentesPsicosociales from "@/components/GestionarInformacionMedica/ComponentesTablas/TablaAntecedentesPsicosociales"
export default {
  props:['psicosociales'],
  components:{
    TablaAntecedentesPsicosociales
  },
  data(){
    return{

    }
  },
  methods:{
    CerrarDialogo(){
      this.$emit("emit-close-dialog");
    }
  }
}
</script>

<style>

</style>