<template>
<v-card>
    <v-card-title class="justify-center">Detalles de Mi Cita</v-card-title>
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
                label="Nombre del paciente"
                outlined
                readonly
                color="#009900"
              ></v-text-field>
              <v-text-field
                v-model="cita.datos_turno.datos_medico.nombre_apellido_medico"
                label="Medico encargado"
                outlined
                readonly
                color="#009900"
              ></v-text-field>
               <v-text-field
                v-model="cita.datos_turno.especialidad.nombre"
                label="Especialidad"
                outlined
                readonly
                color="#009900"
              ></v-text-field>
              <v-text-field
                v-model="cita.estado_atencion"
                label="Estado cita"
                outlined
                readonly
                color="#009900"
              ></v-text-field>
              <v-text-field
                v-model="cita.estado_pago"
                label="Estado de pago"
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
               <v-text-field
                v-model="cita.fecha_cita"
                label="Fecha de cita"
                outlined
                readonly
                color="#009900"
              ></v-text-field>
              <v-text-field
                v-model="cita.fecha_pago"
                label="Fecha de pago"
                outlined
                readonly
                color="#009900"
              ></v-text-field>
              <v-text-field
                v-model="cita.precio_neto"
                label="Precio"
                outlined
                readonly
                color="#009900"
              ></v-text-field>
              <v-text-field
                v-model="cita.tipo_pago"
                label="Tipo de pago"
                outlined
                readonly
                color="#009900"
              ></v-text-field>

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
  name: "MiCita",
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