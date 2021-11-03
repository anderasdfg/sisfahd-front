<template>
  <div class="contenedor-general">
    <div class="contenedor-izquierda">
      <div class="contenedor-reunion">
        <iframe
          src="https://meet.jit.si/12sssss445fsdf"
          title="Reunion"
          class="item-reunion"
        ></iframe>
      </div>
      <div class="contenedor-info-paciente">
        <info-paciente />
      </div>
    </div>
    <div class="contenedor-derecha">
      <div class="contenedor-derecha-top">
        <v-tabs
          background-color="#4172F2"
          dark
          v-model="tab"
          class="contenedor-tab"
        >
          <v-tab>Anamnesis</v-tab>
          <v-tab>Medicación</v-tab>
          <v-tab>Signos vitales</v-tab>
          <v-tab>Diagnóstico</v-tab>
          <v-tab>Indicaciones</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab" class="contenedor-item-tab">
          <v-tab-item>
            <div class="item-atencion">
              <Anamnesis/>
            </div>
          </v-tab-item>
          <v-tab-item>
            <div class="item-atencion">Medicación</div>
          </v-tab-item>
          <v-tab-item>
            <div class="item-atencion">Signos vitales</div>
          </v-tab-item>
          <v-tab-item>
            <div class="item-atencion">Diagnóstico</div>
          </v-tab-item>
          <v-tab-item>
            <div class="item-atencion">Indicaciones</div>
          </v-tab-item>
        </v-tabs-items>
      </div>
      <div class="contenedor-derecha-bottom">
        <button class="btn-guardar orange">Guardar</button>
        <button class="btn-guardar green">Finalizar</button>
      </div>
    </div>
  </div>
</template>

<script>
import InfoPaciente from "@/components/ComponentesAtencion/InfoPaciente.vue";
import Anamnesis from "@/components/ComponentesAtencion/Anamnesis.vue";

export default {
  name: "Atencion",
  components: {
    InfoPaciente,
    Anamnesis,
  },
  data() {
    return {
      tab: null,
    };
  },
};
</script>

<style lang="scss" scoped>
.contenedor-general {
  display: flex;
  width: 100%;
  height: 83vh;
  margin-top: 35px;
  .contenedor-izquierda {
    width: 25%;
    margin: 1%;
    display: flex;
    flex-direction: column;
    .contenedor-reunion {
      margin: 1%;
      height: 30vh;
      .item-reunion {
        border-radius: 20px;
        height: 100%;
        width: 100%;
      }
    }
    .contenedor-info-paciente {
      height: 70vh;
      margin: 1%;
    }
  }
  .contenedor-derecha {
    width: 75%;
    margin: 1%;
    display: flex;
    flex-direction: column;
    .contenedor-derecha-top {
      height: 95vh;
      .contenedor-tab {
        border-radius: 10px;
        box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.068);
      }
      .contenedor-item-tab {
        box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.068);
        margin-top: 10px;
        border-radius: 10px;
        height: 65vh;
      }
    }
    .contenedor-derecha-bottom {
      height: 5vh;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      .btn-guardar {        
        color: white;        
        border-radius: 6px;
        padding: 1%;
        display: flex;
        flex-direction: column;        
        align-items: center;        
        margin-left: 10px;
        width: 10%;
      }
      
    }
  }
}
</style>