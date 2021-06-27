<template>
  <div class="container-user container-user-max-widht">
    <form style="margin-top: 15px">
      <v-text-field
        outlined
        v-model.trim="datos.lugar_nacimiento"
        label="Ingrese su lugar de nacimiento"                  
        @input="$v.datos.lugar_nacimiento.$touch()"
        @blur="$v.datos.lugar_nacimiento.$touch()"
        :error-messages="error_lugar_nacimiento"
      ></v-text-field>
      <v-select
        outlined
        :items="selectEstadoCivil"
        label="Ingrese su estado civil"
        v-model="datos.estado_civil"
        @input="$v.datos.estado_civil.$touch()"
        @blur="$v.datos.estado_civil.$touch()"
        :error-messages="error_estado_civil"   
      ></v-select>
      <v-text-field
        outlined
        v-model.trim="datos.domicilio"
        label="Ingrese su domicilio"
        @input="$v.datos.domicilio.$touch()"
        @blur="$v.datos.domicilio.$touch()"
        :error-messages="error_domicilio"
      ></v-text-field>
      <v-select
        outlined
        :items="selectGrupoSang"
        label="Ingrese su grupo sanguineo"
        v-model="datos.grupo_sanguineo"
        @input="$v.datos.grupo_sanguineo.$touch()"
        @blur="$v.datos.grupo_sanguineo.$touch()"
        :error-messages="error_grupo_sanguineo"  
      ></v-select>
      <v-text-field
        outlined
        v-model.trim="datos.ocupacion"
        label="Ingrese su ocupacion"    
        @input="$v.datos.ocupacion.$touch()"
        @blur="$v.datos.ocupacion.$touch()"
        :error-messages="error_ocupacion"
      ></v-text-field>
      <br>
      <v-snackbar
        v-model="snackbar"
        color="#4172F2"
      >
        {{ textoSnackBar }}

        <template v-slot:action="{ attrs }">
          <v-btn
            color="white"
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
            Cerrar
          </v-btn>
        </template>
      </v-snackbar>
      <v-btn dark color="#4172F2" @click="CambiarSeccion(true)">Continuar</v-btn>
      <v-btn style="margin-left:16px" text color="#4172F2" @click="CambiarSeccion(false)">Retroceder</v-btn>
    </form>
  </div>
</template>

<script>
import Vuelidate from "vuelidate";
//import vue2Dropzone from "vue2-dropzone";
//import "vue2-dropzone/dist/vue2Dropzone.min.css";
//import { mapMutations, mapState } from "vuex";
import { required } from "vuelidate/lib/validators";
//Para una sola palabra o frase
function esTexto(value) {
  return /^[A-Za-z\sáéíóúÁÉÍÓÚñÑ]+$/.test(value); 
}
//Para oraciones o parrafos
function esParrafo(value) {
  return /^[A-Za-z\d\s.,;°"“()áéíóúÁÉÍÓÚñÑ]+$/.test(value); 
}

export default {
  name: 'DatosPersonales',
  props:['datos'],
  data(){
    return{
      textoSnackBar:'Debe llenar toda la informacion necesaria para continuar',
      snackbar:false,
      textoErrores:{
        requerido: 'Debe llenar el campo obligatoriamente',
        crtEspeciales:'El campo no puede contener caracteres especiales'
      },
      //Dentro del campo "antecedentes"
      //lista_tutores_legales:[],
      selectEstadoCivil:[
        { value: "casado", text: 'Casado'},
        { value: "soltero", text: 'Soltero'},
        { value: "viudo", text: 'Viudo'},
        { value: "divorciado", text: 'Divorciado'},
      ],
      selectGrupoSang:[
        { value: "a", text: 'Grupo A'},
        { value: "b", text: 'Grupo B'},
        { value: "ab", text: 'Grupo AB'},
        { value: "o", text: 'Grupo O'},
      ],
    }
  },
  methods:{
    CambiarSeccion(valor) {
      this.$v.datos.$touch();
      if(!this.$v.datos.$invalid){
        this.$emit("emit-cambiar-seccion",valor);
      }else{
        this.snackbar=true;
      }
    },
  },
  computed:{
    error_lugar_nacimiento() {
      const errors = [];
      if (!this.$v.datos.lugar_nacimiento.$dirty) return errors;
      !this.$v.datos.lugar_nacimiento.required &&
        errors.push(this.textoErrores.requerido);
      !this.$v.datos.lugar_nacimiento.esParrafo &&
        errors.push(this.textoErrores.crtEspeciales);
      return errors;
    },
    error_estado_civil() {
      const errors = [];
      if (!this.$v.datos.estado_civil.$dirty) return errors;
      !this.$v.datos.estado_civil.required &&
        errors.push(this.textoErrores.requerido);
      return errors;
    },
    error_domicilio() {
      const errors = [];
      if (!this.$v.datos.domicilio.$dirty) return errors;
      !this.$v.datos.domicilio.required &&
        errors.push(this.textoErrores.requerido);
      !this.$v.datos.domicilio.esParrafo &&
        errors.push(this.textoErrores.crtEspeciales);
      return errors;
    },
    error_grupo_sanguineo() {
      const errors = [];
      if (!this.$v.datos.grupo_sanguineo.$dirty) return errors;
      !this.$v.datos.grupo_sanguineo.required &&
        errors.push(this.textoErrores.requerido);
      return errors;
    },
    error_ocupacion() {
      const errors = [];
      if (!this.$v.datos.ocupacion.$dirty) return errors;
      !this.$v.datos.ocupacion.required &&
        errors.push(this.textoErrores.requerido);
      !this.$v.datos.ocupacion.esParrafo &&
        errors.push(this.textoErrores.crtEspeciales);
      return errors;
    },

  },
  validations(){
    return{
      datos:{
        lugar_nacimiento:{
          required,
          esParrafo
        },
        estado_civil:{
          required,
        },
        domicilio:{
          required,
          esParrafo
        },
        grupo_sanguineo:{
          required,
        },
        ocupacion:{
          required,
          esParrafo
        },
      },
    }
  }
}
</script>

<style>

</style>