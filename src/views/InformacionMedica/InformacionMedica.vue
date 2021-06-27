<template>
  <v-app>
    <div>
      <nav class="nav-login nav-container">
        <span>SISFAHD</span>
        <v-btn class="boton-nav" outlined dark color="#4172F2">Regresar</v-btn>
      </nav>
    </div>
    <section class="body-login">
      <div class="body-izq">
        <div class="contenido-izq">
          <div class="texto-stepper">Información Médica del paciente</div>
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
              <span>Medicacion</span>
            </div>
            <div :class="[isActive5 ? 'stepp-actual' : 'stepp']">
              <span>Habitos</span>
            </div>
            <div :class="[isActive6 ? 'stepp-actual' : 'stepp']">
              <span>Antecedentes Sexuales</span>
            </div>
            
          </div>
        </div>
      </div>
      <div class="body-der">
        <div class="cuerpo-datos">
          <div class="titulo-modulo">
            <span class="texto-titulo">Llena </span><span class="texto-resaltado">{{seccion.nombre}} </span><span class="texto-titulo">para continuar</span>
          </div>
          <div class="numero-modulo">{{seccion.numero}}. {{seccion.titulo}}</div>
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
                @emit-cambiar-seccion="CambiarSeccion"
              ></AntecedentesFamiliares>
            </v-window-item>
            <v-window-item>
              <Medicacion
                @emit-cambiar-seccion="CambiarSeccion"
              ></Medicacion>
            </v-window-item>
            <v-window-item>
              <Habitos
                @emit-cambiar-seccion="CambiarSeccion"
              ></Habitos>
            </v-window-item>
            <v-window-item>
              <AntecedentesSexuales
                @emit-cambiar-seccion="CambiarSeccion"
              ></AntecedentesSexuales>
            </v-window-item>
          </v-window>
        </div>
      </div>
    </section>
  </v-app>
</template>  

<script>
import DatosPersonales from "@/components/GestionarInformacionMedica/ComponentesAntecedentes/Nuevo/DatosPersonales"
import AntecedentesPersonales from "@/components/GestionarInformacionMedica/ComponentesAntecedentes/Nuevo/AntecedentesPersonales"
import AntecedentesFamiliares from "@/components/GestionarInformacionMedica/ComponentesAntecedentes/Nuevo/AntecedentesFamiliares"
import Medicacion from "@/components/GestionarInformacionMedica/ComponentesAntecedentes/Nuevo/Medicacion"
import Habitos from "@/components/GestionarInformacionMedica/ComponentesAntecedentes/Nuevo/Habitos"
import AntecedentesSexuales from "@/components/GestionarInformacionMedica/ComponentesAntecedentes/Nuevo/AntecedentesSexuales"
export default {
  name: 'InformacionMedica',
  components:{
    DatosPersonales,
    AntecedentesPersonales,
    AntecedentesFamiliares,
    Medicacion,
    Habitos,
    AntecedentesSexuales,
  },
  data(){
    return{
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
          }
        }
      }
    }
  },
  methods:{
    CambiarSeccion(valor){
      if(valor){
        (this.seccion.numero == 6) ? this.seccion.numero = 1 : this.seccion.numero++;
      }else{
        (this.seccion.numero == 1) ? this.seccion.numero = 6 : this.seccion.numero--;
      }
    }
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
        this.seccion.nombre = "tus datos de medicacion"
        this.seccion.titulo = "Medicacion"
      }else if(newVal==5){
        this.seccion.nombre = "tus habitos"
        this.seccion.titulo = "Habitos"
      }else if(newVal==6){
        this.seccion.nombre = "tus antecedentes sexuales"
        this.seccion.titulo = "Antecedentes Sexuales"
      }
    },
  },
  computed:{
    
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
    },
    isActive6: function(){
      return (this.seccion.numero == 6) ? true: false
    }
  }

}
</script>


<style lang="scss">
@import "../../styles/main.scss";
.toolbar-login{
  background-color: black;
  min-width: 10%;
  height: 10%;
}
.body-login{
  
  //width: 100%;
  //height: 100%;
  display: flex;
  flex-direction: row;
  // align-items: center;
  // justify-content: center;
  .body-izq {
    //min-width: 1280px;
    background-color: #F2F7FD;
    width: 540px;
    flex-shrink: 0;
    padding-left: 80px;
    overflow: hidden;
    position: relative;
    .contenido-izq{
      padding: 128px 60px 0 40px;
      .texto-stepper{
        text-align: right;
        padding-bottom: 40px;
        font-weight: bold;
        color: #535B6C;
        font-size: 38px;
        line-height: 40px;
        letter-spacing: 0.2px;
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
          font-size: 20px ;
          font-weight: bold ;
          line-height: 43px ;
          margin-right: 0px;
          flex-direction: row-reverse;
          display: flex;
          align-items: center;
        }
        .stepp-actual{
          color: #4172F2;
          font-size: 25px ;
          font-weight: bold ;
          line-height: 65px ;
          margin-right: 0px;
          flex-direction: row-reverse;
          display: flex;
          align-items: center;
        }
      }
    }
  }
  .body-der{
    min-height: calc(100vh - 80px);
    padding-left: 109px;
    background-color:#f0f0f0;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: auto;
    .cuerpo-datos{
      padding: 60px 0px 0px 0px;
      .titulo-modulo{
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
        color: #4172F2;
        font-size: 18px;
        line-height: 20px;
        font-weight: 500;
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
.boton-nav {
  right: 72px;
  padding: 10px 20px;
  font-size: 15px;
  position: absolute;
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
.v-label{
  color:#7f9ce6 !important;
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
  border-color: #7f9ce6
}
.container-user{
  max-width: 450px;
}
.theme--light.v-label {
  color: rgba(0, 0, 0, 0.87);
}
.div-expansion{
  max-height: 600px;
  width: 600px !important;
}
</style>