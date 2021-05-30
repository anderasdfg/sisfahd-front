<template>
<v-card>
    <v-card-title class="justify-center">Detalles de especilidad</v-card-title>
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step editable step="1">
          Datos Generales
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step editable step="2">
          Datos Especificos
        </v-stepper-step>

      </v-stepper-header>

      <v-stepper-items
        ><!--CONTIENE LOS STEPPERS CREADOS ARRIBA EN ESTE CASO SON dos-->
        <v-stepper-content step="1"
          ><!--CONTIENE EL STEPPERS 1 -->
          <div class="container-user">
            <form >
              <v-text-field
                v-model="cita.datos_paciente.datos.nombre_apellido_paciente"
                label="Codigo"
                outlined
                readonly
                color="#009900"
              ></v-text-field>
              <v-text-field
                v-model="cita.datos_turno.datos_medico.nombre_apellido_medico"
                label="Nombre"
                outlined
                readonly
                color="#009900"
              ></v-text-field>
               <v-text-field
                v-model="cita.datos_turno.especialidad.nombre"
                label="Descripcion"
                outlined
                readonly
                color="#009900"
              ></v-text-field>
            
              

               <!-- Botones de cada step-->
              <v-row>
                <v-col>
                  <v-btn block @click="step = 2" color="success">
                    <v-icon left>mdi-page-next-outline</v-icon>
                    <span>Continuar</span>
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn block @click="cerrarDialogo()" color="red">
                    <v-icon left>mdi-close-outline</v-icon>
                    <span>Cerrar</span>
                  </v-btn>
                </v-col>
              </v-row>
            </form>
          </div>
        </v-stepper-content>
        <v-stepper-content step="2"
          ><!--CONTIENE EL STEPPERS 2 -->
          <div class="container-user">
            <form>
              

               <!-- Botones de cada step-->
              <v-row>
                <v-col>
                  <v-btn block @click="step = 1" color="success">
                    <v-icon left>mdi-page-next-outline</v-icon>
                    <span>Continuar</span>
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn block @click="cerrarDialogo()" color="red">
                    <v-icon left >mdi-close-outline</v-icon>
                    <span>Cerrar</span>
                  </v-btn>
                </v-col>
              </v-row>
            </form>
          </div>
        </v-stepper-content>
      </v-stepper-items>
  </v-stepper> 
</v-card>
</template>

<script>
import axios from "axios";
export default {
  name: "Verdetalles",
  props: ["cita"],
  data(){
  return{
    step:1



    }
  },
  methods:{
      cerrarDialogo() {
            this.$emit("close-dialog-detalle");
      },

  }

}
</script>

<style>

</style>