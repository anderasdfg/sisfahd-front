<template>
  <v-card>
    <h1 class="title-card">Detalles de Mi Cita</h1>
    <div class="estilo-stepper">
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
    <v-stepper-items>
    <v-stepper-content step="1">
    <v-card-text>
      <v-text-field
          v-model="cita.datos_paciente.datos.nombre_apellido_paciente"
          label="Nombre del paciente"
          class="campos"
          outlined
          readonly
               
      ></v-text-field>
      <v-text-field
          v-model="cita.datos_turno.datos_medico.nombre_apellido_medico"
          label="Medico encargado"
          class="campos"
          outlined
          readonly
              
      ></v-text-field>
      <v-text-field
           v-model="cita.datos_turno.especialidad.nombre"
           label="Especialidad"
           class="campos"
           outlined
           readonly
       ></v-text-field>
        <v-text-field
            v-model="cita.estado_atencion"
            label="Estado cita"
            class="campos"
            outlined
            readonly 
        ></v-text-field>
         <v-text-field
             v-model="cita.estado_pago"
             label="Estado de pago"
             class="campos"
             outlined
             readonly  
           ></v-text-field>
              
      <v-row class="filas">
       
        <v-col align="right">
          <button class="btn-volver" block @click="cerrarDialogo">Volver</button>
        </v-col>
      </v-row>
    </v-card-text>
      </v-stepper-content>
     <v-stepper-content step="2"
          ><!--CONTIENE EL STEPPERS 2 -->
        <v-card-text>
            <form>
               <v-text-field
                v-model="cita.fecha_cita"
                label="Fecha de cita"
                class="campos"
                outlined
                readonly
               
              ></v-text-field>
              <v-text-field
                v-model="cita.fecha_pago"
                label="Fecha de pago"
                class="campos"
                outlined
                readonly
            
              ></v-text-field>
              <v-text-field
                v-model="cita.precio_neto"
                label="Precio"
                outlined
                readonly
                
              ></v-text-field>
              <v-text-field
                v-model="cita.tipo_pago"
                label="Tipo de pago"
                outlined
                readonly
              
              ></v-text-field>

               <!-- Botones de cada step-->
              <v-row>
                <v-col>
                  <v-btn block class="btn-siguiente " @click="step = 1" color="success">
                    <v-icon left>mdi-page-next-outline</v-icon>
                    <span>Continuar</span>
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn block class="btn-siguiente " @click="cerrarDialogo()" color="red">
                    <v-icon left >mdi-close-outline</v-icon>
                    <span>Cerrar</span>
                  </v-btn>
                </v-col>
              </v-row>
            </form>
       </v-card-text>

        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    </div>
  
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

<style lang="scss" scoped>
.title-card {
  font-size: 25px;
  color: $blue;
  padding-top: 7%;
  text-align: center;
}
.estilo-stepper{
  padding-top: 2%;
}
.v-dialog .v-card .v-card__title {
  font-size: 25px;
  font-weight: bold;
}
.campos {
  margin: 2% 10% 5% 10%; 
  border-color: white; 
}
.filas{
  margin: 2% 8% 5% 8%;
}
.btn-volver{
  margin-top: 4%;
  margin-bottom: 1%;
  margin-left: 5%;
  margin-right: 6%;
  background: $blue;
  color: white;
  border-radius: 10px;
  width: 90%;
  height: 5vh;
  font-weight: bold;
  font-size: 20px;
}
.btn-siguiente{
  background: $blue;
  color: white;
  border-radius: 10px;
  font-weight: bold;
  font-size: 20px;
}
</style>