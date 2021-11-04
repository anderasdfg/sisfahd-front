<template>
  <div v-if="mostrar" class="content">
    <div style="margin-left: 3%; margin-right: 3%">
        <v-row class="mt-2">
            <v-col cols="12" sm="12" md="12" lg="3" xl="3">
              <v-img                
                :src="paciente.datos_usua.foto ? paciente.datos_usua.foto : 'https://image.flaticon.com/icons/png/512/2741/2741191.png'"
                max-width="125"
                max-height="125"
                class="ml-auto mr-auto ml-sm-3 mr-sm-0 mb-3"
              ></v-img>              
            </v-col>
            <v-col cols="12" sm="12" md="12" lg="9" xl="9">
              <v-row class="ml-3 ml-sm-0">
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  lg="6"
                  xl="6"
                  class="text-center text-sm-start"
                >
                  <label class="font-weight-medium label-title campos"
                    >Nombres y apellidos:</label
                  >
                  <p class="label-text">
                    {{ paciente.datos_usua.nombre + " "+ paciente.datos_usua.apellido_paterno + " " + paciente.datos_usua.apellido_materno }}
                  </p>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  lg="6"
                  xl="6"
                  class="text-center text-sm-start"
                >
                  <label class="font-weight-medium label-title  campos"
                    >{{paciente.datos_usua.tipo_documento + ": "}}</label
                  >
                  <p class="label-text">
                    {{ paciente.datos_usua.numero_documento }}
                  </p>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  lg="6"
                  xl="6"
                  class="text-center text-sm-start"
                >
                  <label class="font-weight-medium label-title campos"
                    >Teléfono:</label
                  >
                  <p class="label-text">
                    {{ paciente.datos_usua.telefono}}
                  </p>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  lg="6"
                  xl="6"
                  class="text-center text-sm-start"
                >
                  <label class="font-weight-medium label-title campos"
                    >Servicios pendientes:</label
                  >
                  <p class="label-text">
                    {{ paciente.cantidad }}
                  </p>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <div style="display: flex; justify-content:flex-end; ">
           <button class="btn-atender" block @click="atenderExamenes()">Atender</button>
          </div>
    </div>
  </div>
  <div v-else class="content centrar">
    <span> No hay más pacientes por atender </span>
  </div>
</template>

<script>
import { mapActions} from "vuex";
export default {
  name: "PacientesPendientes",
  props: ["mostrar","paciente"],
  data() {
    return {
    };
  },
  methods: {
    atenderExamenes(){
      console.log("Hola"),
      this.$emit("emit-atender-paciente");
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  background: rgb(224, 238, 255);
  width: 100%;
  color: black;
  align-self: center;
  border-radius: 10px;
  height: 20vh;
  align-items: center;
  margin-left:1%;
  margin-right:1%;
  margin-top: 1%
}
.campos {
  color: $blue !important; 
  font-weight: normal !important;
}
.resultados{
  color: $black !important;
  font-weight: normal !important;
  padding-left: 2%;
}
.resultadosb{
  color: $black !important;
  font-weight: normal !important;
}
.campos {
  color: $blue !important; 
  font-weight: normal !important;
}
.btn-atender {
  background: $blue;
  color: white;
  border-radius: 10px;
  width: 9vh;
  height: 3.5vh;
  font-weight: bold;
  font-size: 15px;
}
.centrar {
  align-items: center;
  display: flex;
  justify-content: center;
}
</style>