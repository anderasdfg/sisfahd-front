<template>
  <div class="viewDiv">
    <div class="contaninerDiv-resultados">
      <v-card>
        <v-card-title class="titulo-resultados">Resultados de Exámenes Auxiliares</v-card-title>
        <div class="content-view-resultados">
          <v-card class="content-resultados" elevation="0"> 
            <v-card height="500" elevation="0" class="mt-0 mb-0">
              <ComponentMisExamenesAuxiliares
                @emit-recargar-tablas-2="RecargarTablas"
                :ListTableElem="listExamElem"
              ></ComponentMisExamenesAuxiliares>
            </v-card>
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
    'listResulExam': function (){
      this.ProcesarListResulExam();
    }
  },
  methods:{
    RecargarTablas(){
      this.initializeListResultExam();
      this.initializeListExamElem();
      this.ProcesarListResulExam();
    },
    ProcesarListResulExam(){
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
    },
    initializeListExamElem () {
      this.GetListExamenesAuxiliares();
    },

    async GetListExamenesAuxiliares() {
      /*
      this.listExamElem = [
        {
          id_acto_medico: "6187716d034da60587a96d09",
          fecha:"2021-11-07",
          medico:"Stefano Garcia Luza",
          examenes_aux:[
            {
              codigo: "618499604693e7840cfb3ca9",
              nombre: "DIALISIS RENAL",
              observaciones: [
                "asdasdasdasds"
              ],
              tipo: "DIALISIS RENAL",
              estado:"pendiente",
              resultado:[{
                titulo: "",
                url: ""
              }]
            }
          ]
        },
        {
          id_acto_medico: "6187716d034da60587a96d10",
          fecha:"2021-11-08",
          medico:"Renzo Guerra Candela",
          examenes_aux:[
            {
              codigo: "618499604693e7840cfb3ca9",
              nombre: "DIALISIS RENAL_2",
              observaciones: [
                "asdasdasdasds_2"
              ],
              tipo: "DIALISIS RENAL_2",
              estado:"subido",
              resultado:[{
                titulo: "titulo_2",
                url: "http://bibliotecadigital.ilce.edu.mx/Colecciones/ObrasClasicas/_docs/JardinCerezos.pdf"
              },{
                titulo: "titulo_3",
                url: "http://bibliotecadigital.ilce.edu.mx/Colecciones/ObrasClasicas/_docs/SignoCuatro_Doyle.pdf"
              } ] 
            },
            {
              codigo: "618499604693e7840cfb3ca9",
              nombre: "DIALISIS RENAL_2",
              observaciones: [
                "asdasdasdasds_2"
              ],
              tipo: "DIALISIS RENAL_2",
              estado:"subido",
              resultado:[{
                titulo: "titulo_2",
                url: "http://bibliotecadigital.ilce.edu.mx/Colecciones/ObrasClasicas/_docs/JardinCerezos.pdf"
              },{
                titulo: "titulo_3",
                url: "http://bibliotecadigital.ilce.edu.mx/Colecciones/ObrasClasicas/_docs/SignoCuatro_Doyle.pdf"
              } ] 
            },
            {
              codigo: "618499604693e7840cfb3ca9",
              nombre: "DIALISIS RENAL_2",
              observaciones: [
                "asdasdasdasds_2"
              ],
              tipo: "DIALISIS RENAL_2",
              estado:"subido",
              resultado:[{
                titulo: "titulo_2",
                url: "http://bibliotecadigital.ilce.edu.mx/Colecciones/ObrasClasicas/_docs/JardinCerezos.pdf"
              },{
                titulo: "titulo_3",
                url: "http://bibliotecadigital.ilce.edu.mx/Colecciones/ObrasClasicas/_docs/SignoCuatro_Doyle.pdf"
              } ] 
            },
            {
              codigo: "618499604693e7840cfb3ca9",
              nombre: "DIALISIS RENAL_2",
              observaciones: [
                "asdasdasdasds_2"
              ],
              tipo: "DIALISIS RENAL_2",
              estado:"subido",
              resultado:[{
                titulo: "titulo_2",
                url: "http://bibliotecadigital.ilce.edu.mx/Colecciones/ObrasClasicas/_docs/JardinCerezos.pdf"
              },{
                titulo: "titulo_3",
                url: "http://bibliotecadigital.ilce.edu.mx/Colecciones/ObrasClasicas/_docs/SignoCuatro_Doyle.pdf"
              } ] 
            },
          ]
        }
      ];
      */
      let idUsuario = this.user.id
      await axios
        .get(`/Ordenes/all?idUsuario=${idUsuario}`)
        .then((res) => {
          res.data.forEach((x) =>{
            x.medico = x.datos_medico.nombre + " " + x.datos_medico.apellido;
            x.fecha_orden = x.fecha_orden.split("T")[0];
            x.especialidad = x.datos_medico.especialidad
          });
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
  margin-top: 20px !important;
  /*background-color: #4172F2 !important;*/
  min-height: 500px;
}
.btn-seccion-res-1 .btn-seccion-res-2{
  background-color: white !important;
}
</style>