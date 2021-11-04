<template>
  <div>
    <v-card class="mx-5 mb-4" elevation="0" height="600">
      <v-row class="height-op my-0" align="center" justify="center">
        <v-col cols="12" sm="6" class="height-op" >
          <v-card color="#4172F2" class="height-op">
            <v-row class="mt-2">
              <v-col align="center" justify="center" class="mt-15 pt-10">
                <v-img :src="infoMedico.usuario.datos.foto" class="profile-medico-op"></v-img>  
              </v-col>
            </v-row>
            <v-card-title style="font-weight:bold; color:white">Médico</v-card-title>
            <v-card-title style="color:white" class="pt-1">{{infoMedico.usuario.datos.nombre}} {{infoMedico.usuario.datos.apellido_paterno}} {{infoMedico.usuario.datos.apellido_materno}}</v-card-title>
            
            <v-row>
              <v-col align="center" justify="center">
                <v-card-text style="color:white" class="pt-1 pb-0">Especialista en {{nombreEspecialidad}}</v-card-text>
              </v-col>
            </v-row>
            <v-row class="my-2">
              <v-col align="center" justify="center">
                <div style="max-width:180px;">
                  <ComponentQualification
                    :qualification="infoOpiniones.item2"
                    :imgSize="25"
                  ></ComponentQualification>
                </div> 
              </v-col>
            </v-row>
          </v-card>
          
        </v-col>
        <v-col cols="12" sm="6" class="height-op">
          <v-row no-gutters class="height-op-2">
            <v-card-text>    
              <v-container class="height-op">
                <v-row justify="space-around" class="height-op">
                  <v-card width="2000"  elevation="0">
                    <v-list three-line class="height-op">
                      <v-virtual-scroll
                        :bench="benched"
                        :items="items"
                        height="300"
                        item-height="64"
                        class="height-op"
                        
                      >
                        <template>
                          <div v-for="(value,index) in infoOpiniones.item1" :key="index">
                            <v-list-item>
                              <v-list-item-content>
                                <div style="margin-top:5px;margin-bottom:10px;max-width:150px;">
                                  <ComponentQualification
                                    :qualification="value.calificacion"
                                    :imgSize="20"
                                  ></ComponentQualification>
                                </div>
                                <v-list-item-title>
                                  <strong>{{ value.datos_paciente.nombre }} {{ value.datos_paciente.apellido }}</strong> @{{ value.fecha_opinion }}
                                </v-list-item-title>
                                <v-list-item-subtitle>{{ value.observacion }}</v-list-item-subtitle>
                              </v-list-item-content>
                            </v-list-item>
                            <v-divider
                              v-if="index!=infoOpiniones.item1.length-1"
                            ></v-divider>
                          </div>
                        </template>
                      </v-virtual-scroll>
                    </v-list>
                  </v-card>
                </v-row>
              </v-container>      
            </v-card-text>
          </v-row>
          <v-row no-gutters>
            <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="closeDialog()"
              >
                Cerrar
              </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import ComponentQualification from "@/components/Opiniones/ComponentQualification";
export default {
  props:[
    "infoOpiniones","infoMedico","nombreEspecialidad"
  ],
  components: {
    ComponentQualification
  },
  data () {
    return {
      subheader:'Opiniones'
      
    }
  },
  methods:{
    closeDialog(){
      this.$emit("emit-close-dialog-opiniones");
    }
  },
  computed: {
    items () {
      return Array.from({ length: this.length }, (k, v) => v + 1)
    },
    length () {
      return 1
    },
  },


}
</script>

<style>
.profile-medico-op{
  margin: 0 5%;
  width: 8rem;
  height: 8rem;
  border-radius: 8rem;
}
.height-op{
  height: 100% !important;
}
.height-op-2{
  height: 93% !important;
}
</style>