<template>
  <v-card>
    <h1 class="title-card">Detalles de Mi Prescripcion</h1>
    <div class="estilo-stepper">
    <v-stepper v-model="step">
      <v-stepper-header>
          <v-stepper-step editable step="1">
          Datos Generales
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step editable step="2">
          Reacciones
        </v-stepper-step>

         <v-divider></v-divider>

        <v-stepper-step editable step="3">
          Datos Especificos
        </v-stepper-step>
          
      </v-stepper-header>
    <v-stepper-items>
    <v-stepper-content step="1">
    <v-card-text>
      <div class="container-user">
            <form>
              <div style ="margin:10px 0 20px">
              <h3 >Anamnesis</h3>
              <p style ="margin:10px 0 10px">{{detalleobj.anamnesis}}</p>
              </div>
              <div>
                <v-row>
                  <v-col>
                   <h3>Fecha Atención</h3>
                  </v-col>
                  <v-col>
                  <h3> Fecha Creación</h3>
                  </v-col>
                </v-row>
                 <v-row>
                  <v-col style="margin:-15px 0 0">
                   {{detalleobj.fecha_atencion}}
                  </v-col>
                  <v-col style="margin:-15px 0 0">
                   {{detalleobj.fecha_creacion}} 
                  </v-col>
                </v-row>
              </div>
              <div style ="margin:10px 0 10px">
              <h3>Indicaciones</h3>
              <p>{{detalleobj.indicaciones}}</p>
              </div>
              <div style="margin:10px auto 10px;background-color:#4ABBEF;height:150%!important">
                
                <v-card-title style="font-size:22px;padding: 10px 10px;color:white"
                  >Medicación Previa</v-card-title
                >
              </div>
              <div>
                  <v-card
                elevation="0"
                color="#4ABBEF"
                style="margin-top:5px; margin-bottom:15px"
                height="30"
              
               >
               
                  <v-row style="margin-left:10px;heigh:100%" align="center">
                    <v-col :cols="2">
                      <article>
                        <span style="font-size:16px;font-weight:500;color:white">Código</span>
                      </article>
                    </v-col>
                    <v-col :cols="2">
                      <article>
                        <span style="font-size:16px;font-weight:500;color:white">Dosis</span>
                      </article>
                    </v-col>
                    <v-col :cols="2">
                      <article>
                        <span style="font-size:16px;font-weight:500;color:white">Nombre</span>
                      </article>
                    </v-col>
                  </v-row>
                </v-card>
                <!-- Cuerpo -->
                <v-card
                  tile
                  elevation="0"
                  color="#FAFAFA"
                  style="margin-top:5px"
                  height="62"
                  v-for="(item, index) in detalleobj.medicacion.medicacion_previa"
                  :key="index"
                  
                >
                  <v-row style="margin-left:10px;heigh:100%;" align="center">
                    <v-col :cols="2" >
                      <article>
                        <span style="font-size:16px">{{item.codigo}}</span>
                      </article>
                    </v-col>
                    <v-col :cols="2" >
                      <article>
                        <span style="font-size:16px">{{item.dosis}}</span>
                      </article>
                    </v-col>
                    <v-col :cols="2" >
                      <article>
                        <span style="font-size:16px">{{item.nombre}}</span>
                      </article>
                    </v-col>
                    <v-col :cols="2" >
                      <div style="margin-right:20px">
                       <v-btn
                          style="margin-right:15px;margin-top:-5px"
                          dark
                          color="#2E9CCF"
                         @click="abrirDialogoMedicacionPrevia(item.observaciones)"
                        >
                          Ver Observaciones
                        </v-btn>  
                      </div>
                    </v-col>
                    <v-col align="right">
                      <div style="margin-right:20px">
                  
                        
                                    </div>
                                  </v-col>
                                </v-row>
                            
            </v-card>
              </div>
             <v-card
                style="margin-top:30px;left-top:30px;padding:5px 5px;background-color:#5dc1b9"
              >
                <v-card-title style="font-size:22px;padding: 10px 10px;"
                  >Diagnostico</v-card-title
                >
                <!-- Cabecera -->
                <v-card
                elevation="0"
                color="#5dc1b9"
                style="margin-top:5px; margin-bottom:15px"
                height="48"
                >
                  <v-row style="margin-left:10px;heigh:100%" align="center">
                    <v-col cols="2">
                      <article>
                        <span style="font-size:16px;margin:20px 0 0 ">Codigo</span>
                      </article>
                    </v-col>
                    <v-col cols="2">
                      <article>
                        <span style="font-size:16px;margin:20px 0 0 ">Frecuencia</span>
                      </article>
                    </v-col>
                    <v-col cols="2">
                      <article>
                        <span style="font-size:16px;margin:20px 0 0">Nombre de enfermedad</span>
                      </article>
                    </v-col>
                    <v-col>
                      <article cols="3">
                        <span style="font-size:16px;margin:20px 0 0">Tipo</span>
                      </article>
                    </v-col>
                    <v-col>
                      <article cols="3">
                        <span style="font-size:16px;margin:20px 0 0">Acciones</span>
                      </article>
                    </v-col>
                    <v-col align="right">
                    </v-col>
                  </v-row>
                </v-card>
                <!-- Cuerpo -->
                <v-card
                  tile
                  elevation="0"
                  color="#FAFAFA"
                  style="margin-top:5px"
                  height="60"
                  v-for="(item, index) in detalleobj.diagnostico"
                  :key="index"
                >
                  <v-row style="margin-left:5px;heigh:100%;" align="center">
                    <v-col :cols="2">
                      <article>
                        <span style="font-size:16px">{{item.codigo_enfermedad}}</span>
                      </article>
                    </v-col>
                    <v-col :cols="2">
                      <article>
                        <span style="font-size:16px">{{item.frecuencia}}</span>
                      </article>
                    </v-col>
                    <v-col :cols="2">
                      <article>
                        <span style="font-size:16px">{{item.nombre_enfermedad}}</span>
                      </article>
                    </v-col>
                    <v-col :cols="3">
                       <span style="font-size:16px">{{item.tipo}}</span>
                    </v-col>
                    
                    <v-col :cols="2">
                      <div style="margin-right:20px">
                        <!--card de  notas (conbinacion fuerte)-->
               
                       <v-btn
                          style="margin-right:15px;margin-top:-5px"
                          dark
                          color="#2E9CCF"
                          @click="abrirDialogoPrescripcion(item.prescripcion)"
                        >
                          Ver Prescripcion
                        </v-btn>  
          <!--Card de  trimestre --> 
          <v-row justify="center">
                <v-dialog v-model="dialog1" persistent max-width="850px">
                  <v-card>
                    <v-card-title>
                      <span class="headline" style="font-size:20px;font-weight:500;color:#5dc1b9"> Mi Prescripción</span>
                    </v-card-title>
                    <v-card-text>
            <v-card align="center" elevation="0">
            <v-card
                style="margin-top:30px;left-top:10px;padding:5px -15px;width:100%;background-color:#4ABBEF"
                
              >
                <v-card-title style="font-size:22px;padding: 10px 10px;color:white"
                  >Prescripciones de la cita</v-card-title
                >
                <!-- Cabecera -->
                <v-card
                elevation="0"
                color="#4ABBEF"
                style="margin-top:5px; margin-bottom:15px"
                height="30"
               >
                  <v-row style="margin-left:10px;heigh:100%" align="center">
                    <v-col :cols="2">
                      <article>
                        <span style="font-size:16px;font-weight:500;color:white">Código</span>
                      </article>
                    </v-col>
                    <v-col :cols="2">
                      <article>
                        <span style="font-size:16px;font-weight:500;color:white">Concrentación</span>
                      </article>
                    </v-col>
                    <v-col :cols="2">
                      <article>
                        <span style="font-size:16px;font-weight:500;color:white">Formula </span>
                      </article>
                    </v-col>
                    <v-col :cols="2">
                      <article>
                        <span style="font-size:16px;font-weight:500;color:white">Nombre</span>
                      </article>
                    </v-col>
                    <v-col :cols="2">
                      <article>
                        <span style="font-size:16px;font-weight:500;color:white">Acciones</span>
                      </article>
                    </v-col>
                  </v-row>
                </v-card>
                <!-- Cuerpo -->
                <v-card
                  tile
                  elevation="0"
                  color="#FAFAFA"
                  style="margin-top:5px"
                  height="62"
                  v-for="(item, index) in prescripcion"
                  :key="index"
                  
                >
                  <v-row style="margin-left:10px;heigh:100%;" align="center">
                    <v-col :cols="2" >
                      <article>
                        <span style="font-size:16px">{{item.codigo}}</span>
                      </article>
                    </v-col>
                    <v-col :cols="2" >
                      <article>
                        <span style="font-size:16px">{{item.concentracion}}</span>
                      </article>
                    </v-col>
                     <v-col :cols="2" >
                      <article>
                        <span style="font-size:16px">{{item.formula}}</span>
                      </article>
                    </v-col>
                     <v-col :cols="2" >
                      <article>
                        <span style="font-size:16px">{{item.nombre}}</span>
                      </article>
                    </v-col>
                    <v-col :cols="2" >
                      <div style="margin-right:20px">
                       <v-btn
                          style="margin-right:15px;margin-top:-5px"
                          dark
                          color="#2E9CCF"
                         @click="abrirDialogoPrescripcionDetalle(item)"
                        >
                          Ver Detalles
                        </v-btn>  
                      </div>
                    </v-col>
                    <v-col align="right">
                      <div style="margin-right:20px">
                  
                        
                                    </div>
                                  </v-col>
                                </v-row>
                            
            </v-card>
                            </v-card>
                            </v-card>
              
                            </v-card-text>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn
                                color="blue darken-1"
                                text
                                @click="dialog1 = false;"
                              >
                                Cerrar
                              </v-btn>
                  
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </v-row>
                      </div>
                    </v-col>
                  </v-row>

             <v-dialog v-model="dialog2" persistent max-width="850px">
            <v-card>
                    <v-card-title>
                      <span class="headline" style="font-size:20px;font-weight:600;color:#4ABBEF"> Mi Prescripción</span>
                    </v-card-title>
                    <v-card-text>
                        <v-card align="center" elevation="0">
                       
                        <v-row>
                          <v-col style="font-weight:600;font-size:18px">
                             Código
                          </v-col>
                          <v-col style="font-weight:600;font-size:18px">
                            Concentración
                          </v-col>
                          <v-col style="font-weight:600;font-size:18px"> 
                            Formula
                          </v-col>
                          <v-col style="font-weight:600;font-size:18px">
                            Cantidad
                          </v-col>
                          <v-col style="font-weight:600;font-size:18px">
                            Frecuencia
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                             {{detallePrescripcionvista.codigo}}
                          </v-col>
                          <v-col>
                              {{detallePrescripcionvista.concentracion}}
                          </v-col>
                          <v-col>
                            {{detallePrescripcionvista.formula}}
                          </v-col>
                          <v-col>
                            {{detallePrescripcionvista.dosis.cantidad}}
                          </v-col>
                          <v-col>
                            Cada {{detallePrescripcionvista.dosis.frecuencia.valor}}  {{detallePrescripcionvista.dosis.frecuencia.medida}} 
                          </v-col>
                         
                        </v-row>

                        <v-row>
                          <v-col style="font-weight:600;font-size:18px">
                            Nombre
                          </v-col>
                          <v-col style="font-weight:600;font-size:18px">
                            Tiempo
                          </v-col>
                          <v-col style="font-weight:600;font-size:18px">
                           Via de administracion
                          </v-col>

                        </v-row>
                      
                        <v-row>
                          <v-col>
                             {{detallePrescripcionvista.nombre}}
                          </v-col>
                          <v-col>
                            Durante  {{detallePrescripcionvista.dosis.tiempo.valor}}  {{detallePrescripcionvista.dosis.tiempo.medida}}
                          </v-col>
                          <v-col>
                            {{detallePrescripcionvista.dosis.via_administracion}}
                          </v-col>
                        </v-row>
                       
                        <v-card
                            tile
                            elevation="0"
                            color="#FAFAFA"
                            style="margin-top:5px"
                            height="62"
                            v-for="(item, index) in detallePrescripcionvista.dosis.observaciones"
                            :key="index"
                            
                          >
                         <v-card-title style="font-size:22px;padding: 10px 10px;"
                           >Observaciones</v-card-title>
                        
                            <v-row>
                              <v-col>
                                {{item}}
                              </v-col>
                            </v-row>
                        </v-card>

                          </v-card>
                          </v-card-text>
                          <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn
                                color="blue darken-1"
                                text
                                @click="dialog2 = false;"
                              >
                                Cerrar
                              </v-btn>
                  
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
         <v-dialog v-model="dialog3" persistent max-width="850px">
            <v-card>
                    <v-card-title>
                      <span class="headline" style="font-size:20px;font-weight:600;color:#4ABBEF"> Observaciones</span>
                    </v-card-title>
                    <v-card-text>
                        <v-card align="center" elevation="0">
                       
                        <v-card
                            tile
                            elevation="0"
                            color="#FAFAFA"
                            style="margin-top:5px"
                            height="62"
                            v-for="(item, index) in detallemedicacionPrevia"
                            :key="index"
                            
                          >
                            <v-row>
                              <v-col style="margin:-10px 0 0;border-color:white ">
                                <p>{{index + 1}}-{{item}} </p>
                              </v-col>
                            </v-row>
                        </v-card>

                          </v-card>
                          </v-card-text>
                          <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn
                                color="blue darken-1"
                                text
                                @click="dialog3 = false;"
                              >
                                Cerrar
                              </v-btn>
                  
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                </v-card>
              </v-card>
            </form>
              </div>
              <v-row style="margin:0 0 0 110px">
                  <v-col>
                    
                    <button  class="btn-siguiente" block @click="siguienteStep(2)" >
                      Continuar
                    </button>
                  </v-col>
                  <v-col>
                      <button class="btn-volver" block @click="cerrarDialogo">Volver</button>
                  </v-col>
            </v-row>
          </v-card-text>
      </v-stepper-content>
     <v-stepper-content step="2"
          ><!--CONTIENE EL STEPPERS 2 -->
        <v-card-text>
            <form>
               <h3 style="margin:0 0 20px">Reacción Adversa</h3>
                  <v-card
                            tile
                            elevation="0"
                            color="#FAFAFA"
                            style="margin-top:5px"
                            height="62"
                            v-for="(item, index) in detalleobj.medicacion.reaccion_adversa"
                            :key="index"
                            
                          >
                            <v-row>
                              <v-col style="margin:-10px 0 0;border-color:white ">
                                <p>{{index + 1}}-{{item}} </p>
                              </v-col>
                            </v-row>
                        </v-card>
            

               <!-- Botones de cada step-->
              <v-row style="margin:0 0 0 110px">
                <v-col>
                   
                  <button  class="btn-siguiente" block @click="siguienteStep(3)" >
                    Continuar
                  </button>
                </v-col>
                <v-col>
                    <button class="btn-volver" block @click="cerrarDialogo">Volver</button>
                </v-col>
              </v-row>
            </form>
       </v-card-text>

        </v-stepper-content>
        <v-stepper-content step="3"
          ><!--CONTIENE EL STEPPERS 3-->
        <v-card-text>
            <form>
             
                 <div style="margin:0 0 20px">
                    <h3 style="margin:0 0 20px;text-align:center;font-size:30px">Signos Vitales</h3>
                    <v-row>
                      <v-col style="font-weight:600;font-size:18px">
                            Frecuencia Cardiaca
                      </v-col>
                      <v-col style="font-weight:600;font-size:18px">
                            Frecuencia Respiratoria
                      </v-col>
                      <v-col style="font-weight:600;font-size:18px">
                            Presión Arterial
                      </v-col>
                      <v-col style="font-weight:600;font-size:18px">
                           Saturacion
                      </v-col>
                      <v-col style="font-weight:600;font-size:18px">
                            Temperatura
                      </v-col>

                    </v-row>

                    <v-row>
                      <v-col>
                            {{detalleobj.signos_vitales.constantes_vitales.frecuencia_cardiaca.valor}} p. por   {{detalleobj.signos_vitales.constantes_vitales.frecuencia_cardiaca.medida}}
                           
                      </v-col>
                      <v-col>
                             {{detalleobj.signos_vitales.constantes_vitales.frecuencia_respiratoria.valor}} v.por 
                              {{detalleobj.signos_vitales.constantes_vitales.frecuencia_respiratoria.medida}}
                      </v-col>
                      <v-col>
                            {{detalleobj.signos_vitales.constantes_vitales.presion_arterial.valor}}
                            {{detalleobj.signos_vitales.constantes_vitales.presion_arterial.medida}}
                      </v-col>
                      <v-col>
                        {{detalleobj.signos_vitales.constantes_vitales.saturacion.valor}}
                        {{detalleobj.signos_vitales.constantes_vitales.saturacion.medida}}
                             
                      </v-col>
                      <v-col>
                        {{detalleobj.signos_vitales.constantes_vitales.temperatura.valor}}
                        {{detalleobj.signos_vitales.constantes_vitales.temperatura.medida}} 
                      </v-col>
                    </v-row>
                   </div>
                   <div style="margin:20px 0 0">
                    <h3 style="margin:0 0 20px;text-align:center;font-size:30px">Datos antropometricos</h3>
                    <p><b>Clasificación ICM :</b>{{detalleobj.signos_vitales.datos_antropometricos.clasificacion_imc}}</p>
                    <p><b>ICM :</b>{{detalleobj.signos_vitales.datos_antropometricos.imc}}</p>
                    <v-row>
                      <v-col style="font-weight:600;font-size:18px">
                            Perimetro Abdominal
                      </v-col>
                      <v-col style="font-weight:600;font-size:18px">
                            Peso
                      </v-col>
                      <v-col style="font-weight:600;font-size:18px">
                           Superficie Corporal
                      </v-col>
                      <v-col style="font-weight:600;font-size:18px">
                            Talla
                      </v-col>

                    </v-row>

                    <v-row>
                      <v-col>
                             {{detalleobj.signos_vitales.datos_antropometricos.perimetro_abdominal.valor}}
                              {{detalleobj.signos_vitales.datos_antropometricos.perimetro_abdominal.medida}}
                      </v-col>
                      <v-col>
                            {{detalleobj.signos_vitales.datos_antropometricos.peso.valor}}
                            {{detalleobj.signos_vitales.datos_antropometricos.peso.medida}}
                      </v-col>
                      <v-col>
                        {{detalleobj.signos_vitales.datos_antropometricos.superficie_corporal.valor}}
                        {{detalleobj.signos_vitales.datos_antropometricos.superficie_corporal.medida}}
                             
                      </v-col>
                      <v-col>
                        {{detalleobj.signos_vitales.datos_antropometricos.talla.valor}}
                        {{detalleobj.signos_vitales.datos_antropometricos.talla.medida}} 
                      </v-col>
                    </v-row>
                  </div>    
           
               <!-- Botones de cada step-->
              <v-row style="margin:0 0 0 110px">
                <v-col>
                   
                  <button  class="btn-siguiente" block @click="siguienteStep(1)" >
                    Continuar
                  </button>
                </v-col>
                <v-col>
                    <button class="btn-volver" block @click="cerrarDialogo">Volver</button>
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
  name: "DetallePrescripcion",
  props: ["detalleobj"],
  data(){
  return{
    step:1,
    search: "",
    prescripcion:"",
    dialog1:false,
    detalleMedicacionPrevia:[],
    detallePrescripcionvista:{codigo:"",nombre:"",formula:"",concentracion:"",dosis:{
  cantidad:"",frecuencia:{valor:"",medida:""},tiempo:{valor:"",medida:""},via_administracion:"",observaciones:""}}
  ,
    dialog2:false,
    dialog3:false
    }
  },
  methods:{
      cerrarDialogo() {
            this.$emit("close-dialog-detail");
      },
      siguienteStep(num)
      {
        this.step=num;
        event.preventDefault();
      },
      abrirDialogoPrescripcion(prescripcion){
        this.prescripcion=prescripcion;
        this.dialog1=true;
        console.log(this.prescripcion)
      },
      abrirDialogoPrescripcionDetalle(item){
        this.detallePrescripcionvista=item;
        this.dialog2=true;
        console.log(item);
      },
      abrirDialogoMedicacionPrevia(medicacionPrevia){
         this.detallemedicacionPrevia=medicacionPrevia;
          this.dialog3=true;
          console.log(this.detallemedicacionPrevia);
      }
  }

}
</script>

<style lang="scss" scoped>
.title-card {
  font-size: 25px;
  color: $blue;
  padding-top: 2%;
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
  margin: 2% 2% 2% 2%; 
  border-color: white;
  border: hidden; 
}
.filas{
  margin: 2% 8% 5% 8%;
}
.btn-volver{
background: $red;
  color: white;
  border-radius: 10px;
  width: 60%;
  height: 5vh;
  font-weight: bold;
  font-size: 20px;
 
}
.btn-siguiente{
  background: $blue;
  color: white;
  border-radius: 10px;
  width: 70%;
  height: 5vh;
  font-weight: bold;
  font-size: 20px;
}
</style>