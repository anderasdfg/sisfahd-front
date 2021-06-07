import 
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
                v-model="Especialidad3.nombre"
                label="Nombre"
                outlined
              
                color="#009900"
              ></v-text-field>
              <v-text-field
                v-model="Especialidad3.codigo"
                label="Codigo"
                outlined
                
                color="#009900"
              ></v-text-field>
               <v-text-field
                v-model="Especialidad3.descripcion"
                label="Descripcion"
                outlined
               
                color="#009900"
              ></v-text-field>
            
              

               <!-- Botones de cada step-->
              <v-row>
                <v-col>
                  <v-btn block @click="step = 2" color="success">
                    <v-icon left>mdi-page-next-outline</v-icon>
                    <span>Modificar</span>
                  </v-btn>
                </v-col>
              <v-col>
                  <v-btn text color="primary" @click="modal = false"> Cancelar 
                    <v-icon left>mdi-close-outline</v-icon>
                    <span>Salir</span>
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
  name: "ModificarEspecialidad",
  props: ["Especialidad3"],
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