<template>
  <div class="viewDiv">
    <div class="contaninerDiv-resultados">
      <v-card>
        <v-card-title class="titulo-resultados">Resultados de Exámenes Auxiliares</v-card-title>
        <div class="content-view-resultados">
          <v-card-actions class="btn-secciones-resultados">
            <v-btn
              text
              @click="seccion=1"
            >
              <span v-if="seccion==1" class="seccion-resaltada-resultados">Mis exámenes auxiliares</span>
              <span v-else>Mis exámenes auxiliares</span>
            </v-btn>
            <v-btn 
              text
              @click="seccion=2"
            >
              <span v-if="seccion==2" class="seccion-resaltada-resultados">Mis resultados</span>
              <span v-else>Mis resultados</span>
            </v-btn>
          </v-card-actions>
          <v-card class="content-resultados" elevation="0"> 
            <v-window v-model="seccion">
              <v-window-item :value="1">
                <v-card height="500" elevation="0" class="mt-0 mb-0">
                  <ComponentMisExamenesAuxiliares
                    @emit-edit-result="EditarResultado"
                    :ListTableElem="listExamElem"
                    :userId="user.id"
                  ></ComponentMisExamenesAuxiliares>
                </v-card>
              </v-window-item>
              <v-window-item :value="2">
                <v-card height="500" elevation="0" class="mt-0 mb-0">
                  <ComponentMisResultados
                    :ListTableElem="listResulExam"
                    :userId="user.id"
                  ></ComponentMisResultados>
                </v-card>
              </v-window-item>
            </v-window>
          </v-card>
        </div>
      </v-card>
    </div>
    <template>
      <v-row justify="center">
        <v-dialog
          v-model="dialogEditarResult"
          persistent
          max-width="600"
        >
          <EditarResultExamenAux
            :infoResultExamenAuxiliar="infoResultExamenAuxiliar"
            @emit-close-dialog="CloseDialogEdicion()"
          ></EditarResultExamenAux>
        </v-dialog>
      </v-row>
    </template>
  </div>
</template>


<script>
import axios from "axios";
import { mapGetters } from 'vuex'
import EditarResultExamenAux from "@/components/Resultados/OperDialogs/ResultadosExamenAux/EditarResultExamenAux";
import ComponentMisExamenesAuxiliares from "@/components/Resultados/ComponentMisExamenesAuxiliares"
import ComponentMisResultados from "@/components/Resultados/ComponentMisResultados"
export default {
  components:{
    ComponentMisExamenesAuxiliares,
    ComponentMisResultados,
    EditarResultExamenAux
  },
  data(){
    return{
      dialogEditarResult:false,
      infoResultExamenAuxiliar:{},
      seccion: 1,
      //Lista de Exámenes Auxiliares solicitados por el médico durante la cita.
      listExamElem:[],
      //Lista de Resultados subidos por el paciente.
      listResulExam:[],
    }
  },
  mounted () {
    this.initializeListResultExam();
    this.initializeListExamElem();
  },
  watch:{
    'listExamElem': function (){
      console.log(this.listExamElem.length);
      this.listExamElem.forEach((e)=>{
        e.numObs_val = e.observaciones.length;
        if(e.numObs_val>1){
          e.numObs_msg = e.observaciones.length + " observaciones";
        }
        else if(e.numObs_val==0){
          e.numObs_msg = "No hay observaciones";
        }
        else{
          e.numObs_msg = e.observaciones.length + " observación";
        }
        e.estadoExamAux_msg="Pendiente";
        e.estadoExamAux_val=false;
        if(this.listResulExam.length>0){
          this.listResulExam.forEach((f)=>{
            if (e.codigo==f.codigo){
              e.estadoExamAux_msg="Subido";
              e.estadoExamAux_val=true;
              return;
            }
          });
        }
      });
      console.log("LISTA EXAM PREPARADA: " + this.listExamElem);
    },
    'listResulExam': function (){
      console.log(this.listExamElem.length);
      if(this.listResulExam.length>0){
        this.listResulExam.forEach((e)=>{
          e.numDocs_val = e.documento_anexo.length;
          if(e.numDocs_val>1){
            e.numDocs_msg = e.documento_anexo.length + " documentos";
          }
          else{
            e.numDocs_msg = e.documento_anexo.length + " documento";
          }
  
        });
        console.log("LISTA PREPARADA: " + this.listResulExam);
      }
    }
  },
  methods:{
    initializeListExamElem () {
      this.GetListExamenesAuxiliares();
    },
    EditarResultado(codigo){
      console.log("Codigo:" + codigo);
      this.listResulExam.forEach((resultado)=>{
        if(resultado.codigo==codigo){
          this.infoResultExamenAuxiliar=resultado;
          this.dialogEditarResult=true;
          console.log(resultado);
          return;
        }
      })
    },

    async GetListExamenesAuxiliares() {
      let idUsuario = this.user.id
      await axios
        .get(`/ResultadoExamen/TraerExamenesSolicitados?idUsuario=${idUsuario}`)
        .then((res) => {
          this.listExamElem = res.data;
          console.log("listExamAux: " + res.data);
        })
        .catch((err) => console.log(err));
    },
    async GetListResultados() {
      let idUsuario = this.user.id
      await axios
        .get("/ResultadoExamen/all?idUsuario="+idUsuario)
        .then((res) => {
          this.listResulExam = res.data;
          console.log("listResultados: " + res.data);
        })
        .catch((err) => console.log(err));
    },


    initializeListResultExam(){
      this.GetListResultados();
    },
    CloseDialogEdicion(){
      this.dialogEditarResult=false;
    }
  },
  computed:{
    ...mapGetters(["user"]),
  }
}
</script>

<style>
.viewDiv{
  height: 100%;
  width: 100%;
}
.contaninerDiv-resultados{
  margin: 5% 1% 2% 5%;
  height: 80%;
}
.titulo-resultados{
  padding-top: 50px !important;
  padding-left: 50px !important;
  color: #4172F2;
  font-weight: bold;
  font-size: 2rem !important;
}
.seccion-resaltada-resultados{
  font-size: 1rem;
  color: #4172F2;
  font-weight:800;
}
.btn-secciones-resultados{
  margin-top: 20px !important;
}
.content-view-resultados{
  padding: 0% 2%;
}
.content-resultados{
  padding: 1%;
  margin-top: 0px !important;
  /*background-color: #4172F2 !important;*/
  min-height: 500px;
}
.btn-seccion-res-1 .btn-seccion-res-2{
  background-color: white !important;
}
</style>