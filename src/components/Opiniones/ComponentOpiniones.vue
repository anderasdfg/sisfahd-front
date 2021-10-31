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
import axios from "axios";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
export default {
  props:[
    "infoOpiniones","infoMedico"
  ],
  components: {

  },
  data () {
    return {
      values: [
        {
          from: 'You',
          value: `Sure, I'll see you later.`,
          time: '10:42am',
          color: 'deep-purple lighten-1',
        },
        {
          from: 'John Doe',
          value: 'Yeah, sure. Does 1:00pm work?',
          time: '10:37am',
          color: 'green',
        },
        {
          from: 'You',
          value: 'Did you still want to grab lunch today?',
          time: '9:47am',
          color: 'deep-purple lighten-1',
        },
        {
          from: 'You',
          value: 'Did you still want to grab lunch today?',
          time: '9:47am',
          color: 'deep-purple lighten-1',
        },
        {
          from: 'You',
          value: 'Did you still want to grab lunch today?',
          time: '9:47am',
          color: 'deep-purple lighten-1',
        },
        {
          from: 'You',
          value: 'Did you still want to grab lunch today?',
          time: '9:47am',
          color: 'deep-purple lighten-1',
        },
        {
          from: 'You',
          value: 'Did you still want to grab lunch today?',
          time: '9:47am',
          color: 'deep-purple lighten-1',
        },
        {
          from: 'You',
          value: 'Did you still want to grab lunch today?',
          time: '9:47am',
          color: 'deep-purple lighten-1',
        },
        {
          from: 'You',
          value: 'Did you still want to grab lunch today?',
          time: '9:47am',
          color: 'deep-purple lighten-1',
        },
        {
          from: 'You',
          value: 'Did you still want to grab lunch today?',
          time: '9:47am',
          color: 'deep-purple lighten-1',
        },
      ],
      search:null,
      listExamAuxFromDB:[],
      archivos:[],
      fileList: [],
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 250,
        maxFilesize: 3.0,
        maxFiles: 10,
        acceptedFiles: ".pdf",
        headers: { "My-Awesome-Header": "header value" },
        addRemoveLinks: true,
        uploadMultiple: true
      },
      examenAuxiliar:{
        id:'',
        descripcion:'',
        precio:''
      }

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