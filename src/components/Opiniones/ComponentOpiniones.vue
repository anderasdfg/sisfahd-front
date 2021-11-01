<template>
  <div>
    <v-card class="mx-5 my-2" elevation="0">
      <v-card-text>
        <v-row>
          <v-col>
            <v-container>
              <v-row>
                <div>
                  <p>Medico</p>
                  <p>{{infoMedico.usuario.datos.nombre}} {{infoMedico.usuario.datos.apellido_paterno}} {{infoMedico.usuario.datos.apellido_materno}}</p>
                </div>
              </v-row>
              <v-row>
                <div style="background-color:yellow">
                  <span></span>
                </div>
              </v-row>
            </v-container>
          </v-col>
          <v-col>
            <div style="background-color:red">
              <span></span>
            </div>
          </v-col>
        </v-row>
        <v-container>
          <v-row justify="space-around">
            <v-card width="2000"  elevation="0">
              <div class="font-weight-bold ml-8 mb-2">
                Opiniones
              </div>

              <v-timeline
                align-top
                dense
              >
                <v-timeline-item
                  v-for="(value,index) in infoOpiniones.item1"
                  :key="index"
                  small
                >
                  <div>
                    <div class="font-weight-normal">
                      <strong>{{ value.datos_paciente.nombre }} {{ value.datos_paciente.apellido }}</strong> @{{ value.fecha_opinion }}
                    </div>
                    <div style="margin-top:5px;margin-bottom:5px;max-width:150px;">
                      <ComponentQualification
                        :qualification="value.calificacion"
                        :imgSize="20"
                      ></ComponentQualification>
                    </div>
                    <div>{{ value.observacion }}</div>
                  </div>
                </v-timeline-item>
              </v-timeline>
            </v-card>
          </v-row>
        </v-container>      
      </v-card-text>
      <v-card-actions class="px-5 py-5">
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          text
          @click="closeDialog()"
        >
          Cerrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import ComponentQualification from "@/components/Opiniones/ComponentQualification";
export default {
  props:[
    "infoOpiniones","infoMedico"
  ],
  components: {
    ComponentQualification
  },
  data () {
    return {
      
    }
  },
  methods:{
    closeDialog(){
      this.$emit("emit-close-dialog-opiniones");
    }
  }


}
</script>

<style>

.dropzone-custom-content {
  margin-left: 20px;
  margin-right: 20px;
  text-align: center;
}
.dropzone-custom-title {
  margin-top: 0;
  color: #4172F2;
}

.subtitle {
  color: #314b5f;
}
</style>