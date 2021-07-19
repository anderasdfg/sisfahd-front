<template>
  <v-card elevation="3" outlined class="card">
    <div>
      <section class="body-info-medica">
        <div class="body-im-izq">
          <div class="contenido-im-izq">
            <div class="texto-stepper">Información Médica del paciente</div>
            <div class="subt-stepper">Registra toda, o parte de la información relacionada a sus datos de paciente y sus antecedentes.</div>
            <div class="pasos-stepper">
              <div :class="[isActive1 ? 'stepp-actual' : 'stepp']">
                <span>Datos Personales</span>
              </div>
              <div :class="[isActive2 ? 'stepp-actual' : 'stepp']">
                <span>Antecedentes Personales</span>
              </div>
              <div :class="[isActive3 ? 'stepp-actual' : 'stepp']">
                <span>Antecedentes Familiares</span>
              </div>
              <div :class="[isActive4 ? 'stepp-actual' : 'stepp']">
                <span>Habitos</span>
              </div>
              <div :class="[isActive5 ? 'stepp-actual' : 'stepp']">
                <span>Antecedentes Sexuales</span>
              </div>
            </div>
          </div>
        </div>
        <div class="body-im-der">
          <div class="cuerpo-im-datos">
            <div class="titulo-im-modulo">
              <span class="texto-titulo">Llena </span><span class="texto-resaltado">{{seccion.nombre}} </span><span class="texto-titulo">para continuar</span>
            </div>
            <div class="numero-modulo-header-im">{{seccion.numero}}. {{seccion.titulo}}</div>
            <v-window
              v-model="window"
              vertical
            >
              <v-window-item>
                <DatosPersonales
                  :datos="paciente_temp.datos"
                  @emit-cambiar-seccion="CambiarSeccion"
                ></DatosPersonales>
              </v-window-item>
              <v-window-item>
                <AntecedentesPersonales
                  :personales="paciente_temp.antecedentes.personales"
                  @emit-cambiar-seccion="CambiarSeccion"
                ></AntecedentesPersonales>
              </v-window-item>
              <v-window-item>
                <AntecedentesFamiliares
                  :familiares="paciente_temp.antecedentes.familiares"
                  @emit-cambiar-seccion="CambiarSeccion"
                ></AntecedentesFamiliares>
              </v-window-item>
              <v-window-item>
                <Habitos
                  :habitos="paciente_temp.antecedentes.habitos"
                  @emit-cambiar-seccion="CambiarSeccion"
                ></Habitos>
              </v-window-item>
              <v-window-item>
                <AntecedentesSexuales
                  :sexuales="paciente_temp.antecedentes.sexuales"
                  @emit-cambiar-seccion="CambiarSeccion"
                  @emit-guardar-todo="GuardarDatosPaciente"
                ></AntecedentesSexuales>
              </v-window-item>
            </v-window>
          </div>
        </div>
      </section>
    </div>
  </v-card>
</template>  

<script>
import DatosPersonales from "@/components/GestionarInformacionMedica/ComponentesAntecedentes/Nuevo/DatosPersonales"
import AntecedentesPersonales from "@/components/GestionarInformacionMedica/ComponentesAntecedentes/Nuevo/AntecedentesPersonales"
import AntecedentesFamiliares from "@/components/GestionarInformacionMedica/ComponentesAntecedentes/Nuevo/AntecedentesFamiliares"
import Habitos from "@/components/GestionarInformacionMedica/ComponentesAntecedentes/Nuevo/Habitos"
import AntecedentesSexuales from "@/components/GestionarInformacionMedica/ComponentesAntecedentes/Nuevo/AntecedentesSexuales"
import axios from "axios";
import { mapGetters } from 'vuex'
export default {
  name: 'InformacionMedica',
  components:{
    DatosPersonales,
    AntecedentesPersonales,
    AntecedentesFamiliares,
    Habitos,
    AntecedentesSexuales,
  },
  data(){
    return{
      datospaciente:null,
      window:0,
      seccion:{
        nombre:'tus datos',
        numero:1,
        titulo:'Datos Personales'
      },
      paciente_temp:{
        datos:{
          lugar_nacimiento:'',
          estado_civil:'',
          domicilio:'',
          ocupacion:'',
          grupo_sanguineo:''
        },
        antecedentes:{
          personales:{
            existencia:null,
            enfermedades:[]
          },
          familiares:{
            existencia:null,
            enfermedades:[]
          },
          habitos:{
            consumo_tabaco:{
              consumo:null,
              observaciones:[]
            },
            consumo_alcohol:{
              consumo:null,
              observaciones:[]
            },
            consumo_drogas:{
              consumo:null,
              observaciones:[]
            }
          },
          sexuales:{
            inicio_actividad_sexual: {
              edad: null,
              estado: null
            },
            parejas_sexuales:null,
            percepcion_libido:"",
            uso_metodos_anticonceptivos:{
              uso_metodos:null,
              metodos:[],
            }
          }
        }
      }
    }
  },
  methods:{
    async mensaje(icono, titulo, texto, footer) {
      await this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
        footer: footer
      });
    },
    CambiarSeccion(valor){
      if(valor){
        (this.seccion.numero == 5) ? this.seccion.numero = 1 : this.seccion.numero++;
      }else{
        (this.seccion.numero == 1) ? this.seccion.numero = 5 : this.seccion.numero--;
      }
    },
    async GuardarDatosPaciente(){
      console.log(this.datosPaciente);
      var paciente = {
        id:null,
        datos:null,
        antecedentes:null
      };

      paciente.id = this.datosPaciente.id;
      paciente.datos = this.paciente_temp.datos;
      paciente.antecedentes = this.paciente_temp.antecedentes; 
      console.log(paciente);

      await axios
        .put("/Paciente/modificarinfomedica",paciente)
        .then(res => {
          console.log(res.data);
          this.mensaje(
          "success",
          "listo",
          "Se realizaron los cambios correspondientes",
          );
        })
        .catch(err => {
          this.mensaje(
            "error",
            "..Oops",
            "Error al obtener los datos. Por favor intentelo más tarde.",
          );
        });
        
    }
  },
  created(){
    this.paciente_temp.datos = this.datosPaciente.datos;
    this.paciente_temp.antecedentes = this.datosPaciente.antecedentes;
    console.log(this.datosPaciente);
    console.log(this.paciente_temp);
  },
  watch:{
    'seccion.numero': function (newVal){
      this.window = newVal-1;
      if(newVal==1){
        this.seccion.nombre = "tus datos"
        this.seccion.titulo = "Datos Personales"
      }else if(newVal==2){
        this.seccion.nombre = "tus antecedentes personales"
        this.seccion.titulo = "Antecedentes Personales"
      }else if(newVal==3){
        this.seccion.nombre = "tus antecedentes familiares"
        this.seccion.titulo = "Antecedentes Familiares"
      }else if(newVal==4){
        this.seccion.nombre = "tus habitos"
        this.seccion.titulo = "Habitos"
      }else if(newVal==5){
        this.seccion.nombre = "tus antecedentes sexuales"
        this.seccion.titulo = "Antecedentes Sexuales"
      }
    },
  },
  computed:{
    ...mapGetters(["datosPaciente"]),
    isActive1: function(){
      return (this.seccion.numero == 1) ? true : false
    },
    isActive2: function(){
      return (this.seccion.numero == 2) ? true: false
    },
    isActive3: function(){
      return (this.seccion.numero == 3) ? true: false
    },
    isActive4: function(){
      return (this.seccion.numero == 4) ? true: false
    },
    isActive5: function(){
      return (this.seccion.numero == 5) ? true: false
    }
  }

}
</script>


<style lang="scss">
@import "../../styles/main.scss";
.card {
  width: 95%;
  margin: 0px auto;
  margin-left: 50px;
  margin-top: 40px;
  margin-bottom: 40px;
}
.body-info-medica{
  //width: 100%;
  min-height: 850px;
  display: flex;
  flex-direction: row;
  // align-items: center;
  // justify-content: center;
  .body-im-izq {
    //min-width: 1280px;
    background-color: #fbfbfb;
    width: 35%;
    min-width: 526px;
    min-height: 850px;
    flex-shrink: 0;
    overflow: hidden;
    position: relative;
    .contenido-im-izq{
      padding: 128px 60px 0 40px;
      .texto-stepper{
        text-align: right;
        padding-bottom: 20px;
        font-weight: bold;
        color: #535B6C;
        font-size: 38px;
        line-height: 40px;
        letter-spacing: 0.2px;
      }
      .subt-stepper{
        padding-bottom: 40px;
        text-align: right;
      }
      .pasos-stepper{
        padding: 20px 0 0 0;
        background-color: transparent;
        flex-direction: column;
        display: flex;
        box-shadow: none;
        transition-property: box-shadow;
        transition-duration: 300ms;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-delay: 0ms;
        .stepp{
          color: #afafaf;
          font-size: 25px ;
          font-weight: bold ;
          line-height: 60px ;
          margin-right: 0px;
          flex-direction: row-reverse;
          display: flex;
          align-items: center;
        }
        .stepp-actual{
          color: #4172F2;
          font-size: 30px ;
          font-weight: bold ;
          line-height: 78px ;
          margin-right: 0px;
          flex-direction: row-reverse;
          display: flex;
          align-items: center;
        }
      }
    }
  }
  .body-im-der{
    min-height: 850px;
    width: 65%;
    padding-left: 50px;
    background-color:#FFFFFF;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: auto;
    .cuerpo-im-datos{
      padding: 60px 0px 40px 0px;
      .titulo-im-modulo{
        padding-bottom: 25px;
        .texto-titulo{
          color: #535B6C;
          font-size: 30px;
          font-weight: 500;
          line-height: 30px;
        }
        .texto-resaltado{
          color: #535B6C;
          font-weight: bold;
          font-size: 30px;
          line-height: 30px;
          letter-spacing: 0.2px;
        }
      }
      .numero-modulo{
        display: block;
        padding-bottom: 30px;
        font-size: 18px;
        line-height: 20px;
        font-weight: 500;
        letter-spacing: 0.2px;
        margin: 0;
      }
      .numero-modulo-header-im{
        display: block;
        padding-bottom: 30px;
        color: #4172F2;
        font-size: 18px;
        line-height: 20px;
        font-weight: 800;
        letter-spacing: 0.2px;
        margin: 0;
      }

    }
  }

}
.nav-login{
  padding: 27px 0;
  display: flex;
  justify-content: center;
  position: relative;
  align-items: center;
  border-bottom: 1px solid #4172F2;
}
.espaciado-stepper{
  height: 15px;
  padding: 0;
  margin-left: 12px;
  flex: 1 1 auto;
}
.espaciado-stepper-actual{
  height: 20px;
  padding: 0;
  margin-left: 12px;
  flex: 1 1 auto;
}

//Estilos de campos de texto
.v-label.v-label, .v-alert.v-alert {
  font-size: 17px;
}
.v-input {
  font-size: 16px;
  
}
.v-messages {
  font-size: 15px;
}
.v-select {
  padding: 10px 0 0px;
  margin-bottom: 15px !important;
}
.v-text-field{
  margin-bottom: 15px !important;
}

.v-text-field--outlined fieldset{
  border-width: 2px;
}
.container-im-user{
  max-width: 450px;
}
.theme--light.v-label {
  color: rgba(0, 0, 0, 0.87);
}
.div-expansion{
  max-height: 600px;
  width: 750px !important;
}
.div-expansion-preguntas{
  width: 650px !important;
  padding-left: 0px;
  .texto-pregunta-im{
    max-height: 5px !important;
    padding-bottom:35px !important;
  }
}
.header-expansion-panel-im{
  color:#4172F2; 
  font-weight:700; 
  font-size:18px
}
.boton-observaciones-im{
  font-weight:bold;
  color: #4172F2
}
.contenedor-info{
  border-radius: 5px;
  border-style: solid;
  border-width: 1px;
}
</style>