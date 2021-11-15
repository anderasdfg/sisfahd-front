<template>
  <div class="div-principal">
    <div class="container-principal">
      <div class="div-title">
        <h3 class="tit-white">Constantes vitales</h3>
      </div>
      <v-row>
        <v-col>
          <v-text-field
            v-model.trim="signos_vitales.constantes_vitales.temperatura.valor"
            label="Temperatura"
            color="#009900"
            filled
            rounded
            hide-details
            @input="$emit('getSignosVitales', signos_vitales)"
          ></v-text-field>
        </v-col>
        <v-col :cols="2" align="right">
          <v-text-field
            v-model.trim="signos_vitales.constantes_vitales.temperatura.medida"
            label="Medida"
            color="#009900"
            filled
            rounded
            hide-details
            @input="$emit('getSignosVitales', signos_vitales)"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model.trim="
              signos_vitales.constantes_vitales.presion_arterial.valor
            "
            label="Presión arterial"
            color="#009900"
            filled
            rounded
            hide-details
            @input="$emit('getSignosVitales', signos_vitales)"
          ></v-text-field>
        </v-col>
        <v-col :cols="2" align="right">
          <v-text-field
            v-model.trim="
              signos_vitales.constantes_vitales.presion_arterial.medida
            "
            label="Medida"
            color="#009900"
            filled
            rounded
            hide-details
            @input="$emit('getSignosVitales', signos_vitales)"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model.trim="signos_vitales.constantes_vitales.saturacion.valor"
            label="Saturación"
            color="#009900"
            filled
            rounded
            hide-details
            @input="$emit('getSignosVitales', signos_vitales)"
          ></v-text-field>
        </v-col>
        <v-col :cols="2" align="right">
          <v-text-field
            v-model.trim="signos_vitales.constantes_vitales.saturacion.medida"
            label="Medida"
            color="#009900"
            filled
            rounded
            hide-details
            @input="$emit('getSignosVitales', signos_vitales)"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model.trim="
              signos_vitales.constantes_vitales.frecuencia_cardiaca.valor
            "
            label="Frecuencia cardiaca"
            color="#009900"
            filled
            rounded
            hide-details
            @input="$emit('getSignosVitales', signos_vitales)"
          ></v-text-field>
        </v-col>
        <v-col :cols="2" align="right">
          <v-text-field
            v-model.trim="
              signos_vitales.constantes_vitales.frecuencia_cardiaca.medida
            "
            label="Medida"
            color="#009900"
            filled
            rounded
            hide-details
            @input="$emit('getSignosVitales', signos_vitales)"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col :cols="4">
          <v-text-field
            v-model.trim="
              signos_vitales.constantes_vitales.frecuencia_respiratoria.valor
            "
            label="Frecuencia respiratoria"
            color="#009900"
            filled
            rounded
            hide-details
            @input="$emit('getSignosVitales', signos_vitales)"
          ></v-text-field>
        </v-col>
        <v-col :cols="2" align="right">
          <v-text-field
            v-model.trim="
              signos_vitales.constantes_vitales.frecuencia_respiratoria.medida
            "
            label="Medida"
            color="#009900"
            filled
            rounded
            hide-details
            @input="$emit('getSignosVitales', signos_vitales)"
          ></v-text-field>
        </v-col>
      </v-row>
    </div>
    <div class="container-principal">
      <div class="div-title">
        <h3 class="tit-white">Datos atropométricos</h3>
      </div>
      <v-row>
        <v-col>
          <v-text-field
            v-model.trim="signos_vitales.datos_antropometricos.peso.valor"
            label="Peso"
            color="#009900"
            filled
            rounded
            hide-details
            @input="$emit('getSignosVitales', signos_vitales)"
          ></v-text-field>
        </v-col>
        <v-col :cols="2" align="right">
          <v-text-field
            v-model.trim="signos_vitales.datos_antropometricos.peso.medida"
            label="Medida"
            color="#009900"
            filled
            rounded
            hide-details
            @input="$emit('getSignosVitales', signos_vitales)"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model.trim="signos_vitales.datos_antropometricos.talla.valor"
            label="Talla"
            color="#009900"
            filled
            rounded
            hide-details
            @input="$emit('getSignosVitales', signos_vitales)"
          ></v-text-field>
        </v-col>
        <v-col :cols="2" align="right">
          <v-text-field
            v-model.trim="signos_vitales.datos_antropometricos.talla.medida"
            label="Medida"
            color="#009900"
            filled
            rounded
            hide-details
            @input="$emit('getSignosVitales', signos_vitales)"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model.trim="
              signos_vitales.datos_antropometricos.perimetro_abdominal.valor
            "
            label="Perímetro abdominal"
            color="#009900"
            filled
            rounded
            hide-details
            @input="$emit('getSignosVitales', signos_vitales)"
          ></v-text-field>
        </v-col>
        <v-col :cols="2" align="right">
          <v-text-field
            v-model.trim="
              signos_vitales.datos_antropometricos.perimetro_abdominal.medida
            "
            label="Medida"
            color="#009900"
            filled
            rounded
            hide-details
            @input="$emit('getSignosVitales', signos_vitales)"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model.trim="
              signos_vitales.datos_antropometricos.superficie_corporal.valor
            "
            label="Superficie corporal"
            color="#009900"
            filled
            rounded
            hide-details
            @input="$emit('getSignosVitales', signos_vitales)"
          ></v-text-field>
        </v-col>
        <v-col :cols="2" align="right">
          <v-text-field
            v-model.trim="
              signos_vitales.datos_antropometricos.superficie_corporal.medida
            "
            label="Medida"
            color="#009900"
            filled
            rounded
            hide-details
            @input="$emit('getSignosVitales', signos_vitales)"
          ></v-text-field>
        </v-col>
      </v-row>
      <!-- <v-row>
        <v-col :cols="4">
          <v-text-field
            v-model.trim="signos_vitales.constantes_vitales.frecuencia_respiratoria.valor"
            label="IMC"
            color="#009900"
            filled
            rounded
            hide-details
          ></v-text-field>
        </v-col>
        <v-col :cols="2" align="right">
          <v-text-field
            v-model.trim="signos_vitales.constantes_vitales.frecuencia_respiratoria.medida"
            label="Medida"
            color="#009900"
            filled
            rounded
            hide-details
          ></v-text-field>
        </v-col>
      </v-row>    -->
    </div>
  </div>
</template>

<script>
export default {
  name: "SignosVitales",
  props: ["signos_vitales"],
  data: () => ({
    // signos_vitales: {
    //   constantes_vitales: {
    //     temperatura: {
    //       valor: "",
    //       medida: "ºC",
    //     },
    //     presion_arterial: {
    //       valor: "",
    //       medida: "mmhg",
    //     },
    //     saturacion: {
    //       valor: "",
    //       medida: "%",
    //     },
    //     frecuencia_cardiaca: {
    //       valor: "",
    //       medida: "min",
    //     },
    //     frecuencia_respiratoria: {
    //       valor: "",
    //       medida: "min",
    //     },
    //   },
    //   datos_antropometricos: {
    //     peso: {
    //       valor: "",
    //       medida: "kg",
    //     },
    //     talla: {
    //       valor: "",
    //       medida: "m",
    //     },
    //     perimetro_abdominal: {
    //       valor: "",
    //       medida: "cm",
    //     },
    //     superficie_corporal: {
    //       valor: "",
    //       medida: "m2",
    //     },
    //     imc: 0,
    //     clasificacion_imc: "",
    //   },
    // },
  }),
};
</script>

<style lang="scss" scoped>
.div-principal {
  padding: 2%;
  .container-principal {
    margin: 10px 0;
    border-radius: 6px;
    padding-bottom: 6px;
  }
  .div-title {
    background: $blue;
    padding: 1%;
    border-radius: 6px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .tit-white {
    color: $white;
  }
}
</style>