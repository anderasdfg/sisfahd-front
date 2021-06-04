<template>
  <v-card elevation="0">
    <v-card-title>Antecedentes Sexuales</v-card-title>
    <v-card-text>
      <v-expansion-panels flat>
        <v-expansion-panel class="borde-fino-expansion-panel margen-por-panel">
          <v-expansion-panel-header>Espermarquia</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card-text style="padding-left:0px">
              ¿Ha padecido esta condición médica?
            </v-card-text>
            <v-radio-group
              style="margin-top:0px"
              v-model="sexuales.espermarquia.estado"
              row
            >
              <v-radio
                label="Si"
                v-bind:value="true"
              ></v-radio>
              <v-radio
                label="No"
                v-bind:value="false"
              ></v-radio>
            </v-radio-group>
            <TablaObservaciones
              :lista_observaciones="sexuales.espermarquia.observaciones"
            ></TablaObservaciones>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel class="borde-fino-expansion-panel margen-por-panel">
          <v-expansion-panel-header>Inicio de actividades sexuales</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card-text style="padding-left:0px">
              ¿Ha iniciado ya la práctica de actividades sexuales?
            </v-card-text>
            <v-radio-group
              style="margin-top:0px"
              v-model="sexuales.inicio_actividad_sexual.estado"
              row
            >
              <v-radio
                label="Si"
                v-bind:value="true"
              ></v-radio>
              <v-radio
                label="No"
                v-bind:value="false"
              ></v-radio>
            </v-radio-group>
            <v-text-field
              :disabled="!sexuales.inicio_actividad_sexual.estado"
              v-model="inicio_actividad_sexual.edad"
              label="Ingrese la edad de inicio de actividad sexual"
            ></v-text-field>
            <TablaObservaciones
              :lista_observaciones="sexuales.inicio_actividad_sexual.observaciones"
            ></TablaObservaciones>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel class="borde-fino-expansion-panel margen-por-panel">
          <v-expansion-panel-header>Parejas Sexuales</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card-text style="padding-left:0px">
              ¿Ha iniciado ya la práctica de actividades sexuales?
            </v-card-text>
            <v-radio-group
              style="margin-top:0px"
              v-model="sexuales.parejas_sexuales.estado"
              row
            >
              <v-radio
                label="Si"
                v-bind:value="true"
              ></v-radio>
              <v-radio
                label="No"
                v-bind:value="false"
              ></v-radio>
            </v-radio-group>
            <v-card-text style="padding-left:0px">
              ¿Ha tenido más de una sola pareja sexual a la vez?
            </v-card-text>
            <v-radio-group
              style="margin-top:0px"
              v-model="sexuales.parejas_sexuales.parejas_simultaneas"
              row
            >
              <v-radio
                label="Si"
                v-bind:value="true"
              ></v-radio>
              <v-radio
                label="No"
                v-bind:value="false"
              ></v-radio>
            </v-radio-group>
            <v-text-field
              :disabled="!sexuales.parejas_sexuales.estado"
              v-model="parejas_sexuales.cantidad"
              label="Ingrese la cantidad de parejas sexuales que ha tenido"
            ></v-text-field>
            <TablaObservaciones
              :lista_observaciones="sexuales.parejas_sexuales.observaciones"
            ></TablaObservaciones>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel class="borde-fino-expansion-panel margen-por-panel">
          <v-expansion-panel-header>Percepcion de líbido</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card-text style="padding-left:0px">
              ¿Siente algún cambio en la percepción del líbido o deseo sexual?
            </v-card-text>
            <v-radio-group
              style="margin-top:0px"
              v-model="sexuales.percepcion_libido.estado"
              row
            >
              <v-radio
                label="Si"
                v-bind:value="true"
              ></v-radio>
              <v-radio
                label="No"
                v-bind:value="false"
              ></v-radio>
            </v-radio-group>
            <v-select
              v-model="sexuales.percepcion_libido.estado_percepcion"
              :items="estadosLibido"
              :item-text="estadosLibido.text"
              :item-value="estadosLibido.value"
              prepend-inner-icon="mdi-magnify"
              label="Seleccione su percepción de líbido actual"
            ></v-select>
            <TablaObservaciones
              :lista_observaciones="sexuales.percepcion_libido.observaciones"
            ></TablaObservaciones>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel class="borde-fino-expansion-panel margen-por-panel">
          <v-expansion-panel-header>Uso de métodos anticonceptivos</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card-text style="padding-left:0px">
              ¿Utiliza métodos anticonceptivos?
            </v-card-text>
            <v-radio-group
              style="margin-top:0px"
              v-model="sexuales.uso_metodos_anticonceptivos.estado"
              row
            >
              <v-radio
                label="Si"
                v-bind:value="true"
              ></v-radio>
              <v-radio
                label="No"
                v-bind:value="false"
              ></v-radio>
            </v-radio-group>
            <v-card-text style="padding-left:0px;margin-bottom:2%">
              <span>Indique los métodos anticonceptivos que utiliza:</span>
              <v-btn
                style="margin-left:1%;padding:1px 10px !important"
                color="primary"
                v-if="sexuales.uso_metodos_anticonceptivos.estado"
                
                dark
                text
                @click="AbrirDialogoMetodos()"
              >
                Metodos Anticonceptivos
              </v-btn>
              <v-btn
                style="margin-left:1%;padding:1px 10px !important"
                color="grey"
                v-else
                dark
                text
              >
                Metodos Anticonceptivos
              </v-btn>
            </v-card-text>
            <v-dialog v-model="dialogModalMetodos" max-width="42%" persistent>
              <v-card>
                <v-card-title>Metodos Anticonceptivos</v-card-title>
                <v-card-text>
                  <v-container>
                    <TablaMetodosAnticonceptivos
                      :lista_metodos="sexuales.uso_metodos_anticonceptivos.metodos"
                    ></TablaMetodosAnticonceptivos>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="GuardarSalirDialogoMetodos()"
                  >
                    <v-icon dark>
                      mdi-checkbox-marked-circle
                    </v-icon>
                    <span style="margin-left:2%">Guardar</span>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <TablaObservaciones
              :lista_observaciones="sexuales.uso_metodos_anticonceptivos.observaciones"
            ></TablaObservaciones>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-card-actions style="padding-left:0px !important">
        <v-btn
          class="boton-izquierda-stef"
          color="primary"
          dark
          outlined
          @click="CerrarDialogo()"
          >
            Cancelar
          <v-icon
            dark
            right
          >
            mdi-minus-circle
          </v-icon>
        </v-btn>
        <v-btn
          class="boton-izquierda-stef"
          color="primary"
          dark
          @click="CerrarDialogo()"
          >
            Guardar
          <v-icon
            dark
            right
          >
            mdi-checkbox-marked-circle
          </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script>
import TablaMetodosAnticonceptivos from "@/components/GestionarInformacionMedica/ComponentesTablas/TablaMetodosAnticonceptivos"
import TablaObservaciones from "@/components/GestionarInformacionMedica/ComponentesTablas/TablaObservaciones"
export default {
  components:{
    TablaObservaciones,
    TablaMetodosAnticonceptivos
  },
  props:['sexuales'],
  data(){
    return{
      dialogModalMetodos:false,
      estadosLibido:[
        { value: "aumentado", text: 'Aumentado'},
        { value: "disminuido", text: 'Disminuido'},
        { value: "normal", text: 'Normal'},
      ],
      //temporales:
      parejas_sexuales:{
        cantidad:''
      },
      inicio_actividad_sexual:{
        edad:''
      }

    }
  },
  methods:{
    CerrarDialogo(){
      this.$emit("emit-close-dialog");
    },
    AbrirDialogoMetodos(){
      this.dialogModalMetodos=true;
    },
    GuardarSalirDialogoMetodos(){
      this.dialogModalMetodos=false;
    }
  },
  watch:{
    dialog (val) {
      val || this.close()
    },
    'sexuales.parejas_sexuales.estado': function (newVal, oldVal){
      if(!newVal){
        this.sexuales.parejas_sexuales.cantidad=null;
        this.parejas_sexuales.cantidad=null;
      }else{
        this.sexuales.parejas_sexuales.cantidad="";
      }
    },
    'sexuales.inicio_actividad_sexual.estado': function (newVal, oldVal){
      if(!newVal){
        this.sexuales.inicio_actividad_sexual.edad=null;
        this.inicio_actividad_sexual.edad=null;
      }else{
        this.sexuales.inicio_actividad_sexual.edad="";
      }
    },
    'inicio_actividad_sexual.edad': function (newVal, oldVal){
      this.sexuales.inicio_actividad_sexual.edad=newVal;
    },
    'parejas_sexuales.cantidad': function (newVal, oldVal){
      this.sexuales.parejas_sexuales.cantidad=newVal;
    },
  }
  //Como me voy a volar esa madre jaja como si fuerea silupu
}
</script>

<style>

</style>