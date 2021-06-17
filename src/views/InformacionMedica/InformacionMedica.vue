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
          <div class="texto-stepper">Rellena la info la puta que te pario</div>
          <div class="pasos-stepper">
            <div class="MuiStep-root MuiStep-vertical">
              <span class="stepp">
                <span></span>
                <span></span>
              </span>
            </div>
            <div class="espaciado-stepper"></div>
            <div class="MuiStep-root MuiStep-vertical"></div>
            <div class="espaciado-stepper"></div>
            <div class="MuiStep-root MuiStep-vertical"></div>
          </div>
        </div>
      </div>
      <div class="body-der"></div>
    </section>
  </v-app>
</template>  

<script>
export default {
  name: 'InformacionMedica',
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
    width: 500px;
    flex-shrink: 0;
    padding-left: 104px;
    overflow: hidden;
    position: relative;
    .contenido-izq{
      padding: 128px 60px 0 40px;
      .texto-stepper{
        text-align: left;
        padding-bottom: 40px;
        font-weight: bold;
        color: #535B6C;
        font-size: 30px;
        line-height: 40px;
        letter-spacing: 0.2px;
      }
      .pasos-stepper{
        padding: 0 46px 0 0;
        background-color: transparent;
        flex-direction: column;
        display: flex;
        box-shadow: none;
        color: #535B6C;
        transition-property: box-shadow;
        transition-duration: 300ms;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-delay: 0ms;
        .stepp{
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
    background-color:#E5E5E5;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: auto;
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
  padding: 0;
  margin-left: 12px;
  flex: 1 1 auto;
}
</style>