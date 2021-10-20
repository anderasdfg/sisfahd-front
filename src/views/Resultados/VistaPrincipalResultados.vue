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
                <v-card height="500" elevation="0">
                  <ComponentMisExamenesAuxiliares
                    :ListTableElem="listExamElem"
                  ></ComponentMisExamenesAuxiliares>
                </v-card>
              </v-window-item>
              <v-window-item :value="2">
                <v-card height="500" elevation="0">
                  <ComponentMisResultados
                    :ListTableElem="listResulExam"
                  ></ComponentMisResultados>
                </v-card>
              </v-window-item>
            </v-window>
          </v-card>
        </div>
      </v-card>
    </div>
  </div>
</template>


<script>
import ComponentMisExamenesAuxiliares from "@/components/Resultados/ComponentMisExamenesAuxiliares"
import ComponentMisResultados from "@/components/Resultados/ComponentMisResultados"
export default {
  components:{
    ComponentMisExamenesAuxiliares,
    ComponentMisResultados
  },
  data(){
    return{
      seccion: 1,
      //Lista de Exámenes Auxiliares solicitados por el médico durante la cita.
      listExamElem:[],
      //Lista de Resultados subidos por el paciente.
      listResulExam:[],
    }
  },
  created () {
    this.initializeListResultExam();
    this.initializeListExamElem();
    
  },
  methods:{
    initializeListExamElem () {
      this.listExamElem = [
        {
          codigo: 'C001',
          nombre: 'Examen de Sangre1',
          observaciones: [
            "C001 - OBS - 1",
            "C001 - OBS - 2",
            "C001 - OBS - 3"
          ],
          tipo: 'Examen sanguíneo01'
        },
        {
          codigo: 'C002',
          nombre: 'Examen de Sangre2',
          observaciones: [
            "C002 - OBS - 1",
            "C002 - OBS - 2",
            "C002 - OBS - 3"
          ],
          tipo: 'Examen sanguíneo02'
        },
        {
          codigo: 'C003',
          nombre: 'Examen de Sangre3',
          observaciones: [
            "C003 - OBS - 1",
            "C003 - OBS - 2",
            "C003 - OBS - 3"
          ],
          tipo: 'Examen sanguíneo03'
        },
        {
          codigo: 'C004',
          nombre: 'Examen de Sangre4',
          observaciones: [
            "C004 - OBS - 1",
            "C004 - OBS - 2",
            "C004 - OBS - 3"
          ],
          tipo: 'Examen sanguíneo04'
        },
        {
          codigo: 'C005',
          nombre: 'Examen de Sangre5',
          observaciones: [
            "C005 - OBS - 1",
            "C005 - OBS - 2",
            "C005 - OBS - 3"
          ],
          tipo: 'Examen sanguíneo05'
        },
        {
          codigo: 'C006',
          nombre: 'Examen de Sangre6',
          observaciones: [
            "C006 - OBS - 1",
            "C006 - OBS - 2",
            "C006 - OBS - 3"
          ],
          tipo: 'Examen sanguíneo06'
        },
        {
          codigo: 'C007',
          nombre: 'Examen de Sangre7',
          observaciones: [
            "C007 - OBS - 1",
            "C007 - OBS - 2",
            "C007 - OBS - 3"
          ],
          tipo: 'Examen sanguíneo07'
        },
        {
          codigo: 'C008',
          nombre: 'Examen de Sangre8',
          observaciones: [
            "C008 - OBS - 1",
            "C008 - OBS - 2",
          ],
          tipo: 'Examen sanguíneo08'
        },
        {
          codigo: 'C009',
          nombre: 'Examen de Sangre9',
          observaciones: [],
          tipo: 'Examen sanguíneo09'
        },
        {
          codigo: 'C010',
          nombre: 'Examen de Sangre10',
          observaciones: [
            "C010 - OBS - 1"
          ],
          tipo: 'Examen sanguíneo10'
        }
      ];
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
        this.listResulExam.forEach((f)=>{
          if (e.codigo===f.codigo){
            e.estadoExamAux_msg="Subido";
            e.estadoExamAux_val=true;
            return;
          }
        });

      });
      console.log(this.listExamElem);
    },
    initializeListResultExam(){
      this.listResulExam = [
        {
          codigo: 'C005',
          nombre: 'Examen de Sangre10',
          observaciones: 'Observacion del examen',
          documento_anexo:[
            'www.enlace_de_documento_1.pdf',
            'www.enlace_de_documento_2.pdf',
            'www.enlace_de_documento_3.pdf'
          ],
          tipo: 'Examen sanguíneo10'
        },
        {
          codigo: 'C015',
          nombre: 'Examen de Sangre15',
          observaciones: 'Observacion del examen',
          documento_anexo:[
            'www.enlace_de_documento_1.pdf',
            'www.enlace_de_documento_2.pdf',
            'www.enlace_de_documento_3.pdf'
          ],
          tipo: 'Examen sanguíneo15'
        },
        {
          codigo: 'C016',
          nombre: 'Examen de Sangre15',
          observaciones: 'Observacion del examen',
          documento_anexo:[
            'www.enlace_de_documento_1.pdf',
            'www.enlace_de_documento_2.pdf',
            'www.enlace_de_documento_3.pdf'
          ],
          tipo: 'Examen sanguíneo15'
        },
        {
          codigo: 'C017',
          nombre: 'Examen de Sangre15',
          observaciones: 'Observacion del examen',
          documento_anexo:[
            'www.enlace_de_documento_1.pdf',
            'www.enlace_de_documento_2.pdf',
            'www.enlace_de_documento_3.pdf'
          ],
          tipo: 'Examen sanguíneo15'
        },
        {
          codigo: 'C018',
          nombre: 'Examen de Sangre10',
          observaciones: 'Observacion del examen',
          documento_anexo:[
            'www.enlace_de_documento_1.pdf',
            'www.enlace_de_documento_2.pdf',
            'www.enlace_de_documento_3.pdf'
          ],
          tipo: 'Examen sanguíneo10'
        },
        {
          codigo: 'C019',
          nombre: 'Examen de Sangre10',
          observaciones: 'Observacion del examen',
          documento_anexo:[
            'www.enlace_de_documento_1.pdf',
            'www.enlace_de_documento_2.pdf',
            'www.enlace_de_documento_3.pdf'
          ],
          tipo: 'Examen sanguíneo10'
        },
        {
          codigo: 'C020',
          nombre: 'Examen de Sangre10',
          observaciones: 'Observacion del examen',
          documento_anexo:[
            'www.enlace_de_documento_1.pdf',
            'www.enlace_de_documento_2.pdf',
            'www.enlace_de_documento_3.pdf'
          ],
          tipo: 'Examen sanguíneo10'
        },
        {
          codigo: 'C021',
          nombre: 'Examen de Sangre10',
          observaciones: 'Observacion del examen',
          documento_anexo:[
            'www.enlace_de_documento_1.pdf',
            'www.enlace_de_documento_2.pdf',
            'www.enlace_de_documento_3.pdf'
          ],
          tipo: 'Examen sanguíneo10'
        },
        {
          codigo: 'C022',
          nombre: 'Examen de Sangre10',
          observaciones: 'Observacion del examen',
          documento_anexo:[
            'www.enlace_de_documento_1.pdf',
            'www.enlace_de_documento_2.pdf',
            'www.enlace_de_documento_3.pdf'
          ],
          tipo: 'Examen sanguíneo10'
        },
        {
          codigo: 'C023',
          nombre: 'Examen de Sangre10',
          observaciones: 'Observacion del examen',
          documento_anexo:[
            'www.enlace_de_documento_1.pdf',
            'www.enlace_de_documento_2.pdf',
            'www.enlace_de_documento_3.pdf'
          ],
          tipo: 'Examen sanguíneo10'
        },
        {
          codigo: 'C024',
          nombre: 'Examen de Sangre10',
          observaciones: 'Observacion del examen',
          documento_anexo:[
            'www.enlace_de_documento_1.pdf',
            'www.enlace_de_documento_2.pdf',
            'www.enlace_de_documento_3.pdf'
          ],
          tipo: 'Examen sanguíneo10'
        }
      ];

      this.listResulExam.forEach((e)=>{
        e.numDocs_val = e.documento_anexo.length;
        if(e.numDocs_val>1){
          e.numDocs_msg = e.documento_anexo.length + " documentos";
        }
        else{
          e.numDocs_msg = e.documento_anexo.length + " documento";
        }

      });
      console.log(this.listResulExam);
    }
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