<template>
  <div>
    <div v-if="qualification==0">
      <v-row no-gutters>
        <v-col class="pr-2 pl-0 py-2">
          <v-img :max-height="imgSize" :max-width="imgSize" src="../../../src/assets/estrella_vacia.png"/>
        </v-col>
        <v-col class="pr-2 pl-0 py-2">
          <v-img :max-height="imgSize" :max-width="imgSize" src="../../../src/assets/estrella_vacia.png"/>
        </v-col>
        <v-col class="pr-2 pl-0 py-2">
          <v-img :max-height="imgSize" :max-width="imgSize" src="../../../src/assets/estrella_vacia.png"/>
        </v-col>
        <v-col class="pr-2 pl-0 py-2">
          <v-img :max-height="imgSize" :max-width="imgSize" src="../../../src/assets/estrella_vacia.png"/>
        </v-col>
        <v-col class="pr-2 pl-0 py-2">
          <v-img :max-height="imgSize" :max-width="imgSize" src="../../../src/assets/estrella_vacia.png"/>
        </v-col>
      </v-row>
    </div>
    <div v-else-if="qualification==1">
      <v-row no-gutters>
        <v-col class="pr-2 pl-0 py-2">
          <v-img :max-height="imgSize" :max-width="imgSize" src="../../../src/assets/estrella_llena.png"/>
        </v-col>
        <v-col class="pr-2 pl-0 py-2">
          <v-img :max-height="imgSize" :max-width="imgSize" src="../../../src/assets/estrella_vacia.png"/>
        </v-col>
        <v-col class="pr-2 pl-0 py-2">
          <v-img :max-height="imgSize" :max-width="imgSize" src="../../../src/assets/estrella_vacia.png"/>
        </v-col>
        <v-col class="pr-2 pl-0 py-2">
          <v-img :max-height="imgSize" :max-width="imgSize" src="../../../src/assets/estrella_vacia.png"/>
        </v-col>
        <v-col class="pr-2 pl-0 py-2">
          <v-img :max-height="imgSize" :max-width="imgSize" src="../../../src/assets/estrella_vacia.png"/>
        </v-col>
      </v-row>
    </div>
    <div v-else-if="qualification==2">
      <v-row no-gutters>
        <v-col class="pr-2 pl-0 py-2">
          <v-img :max-height="imgSize" :max-width="imgSize" src="../../../src/assets/estrella_llena.png"/>
        </v-col>
        <v-col class="pr-2 pl-0 py-2">
          <v-img :max-height="imgSize" :max-width="imgSize" src="../../../src/assets/estrella_llena.png"/>
        </v-col>
        <v-col class="pr-2 pl-0 py-2">
          <v-img :max-height="imgSize" :max-width="imgSize" src="../../../src/assets/estrella_vacia.png"/>
        </v-col>
        <v-col class="pr-2 pl-0 py-2">
          <v-img :max-height="imgSize" :max-width="imgSize" src="../../../src/assets/estrella_vacia.png"/>
        </v-col>
        <v-col class="pr-2 pl-0 py-2">
          <v-img :max-height="imgSize" :max-width="imgSize" src="../../../src/assets/estrella_vacia.png"/>
        </v-col>
      </v-row>
    </div>
    <div v-else-if="qualification==3">
      <v-row no-gutters>
        <v-col class="pr-2 pl-0 py-2">
          <v-img :max-height="imgSize" :max-width="imgSize" src="../../../src/assets/estrella_llena.png"/>
        </v-col>
        <v-col class="pr-2 pl-0 py-2">
          <v-img :max-height="imgSize" :max-width="imgSize" src="../../../src/assets/estrella_llena.png"/>
        </v-col>
        <v-col class="pr-2 pl-0 py-2">
          <v-img :max-height="imgSize" :max-width="imgSize" src="../../../src/assets/estrella_llena.png"/>
        </v-col>
        <v-col class="pr-2 pl-0 py-2">
          <v-img :max-height="imgSize" :max-width="imgSize" src="../../../src/assets/estrella_vacia.png"/>
        </v-col>
        <v-col class="pr-2 pl-0 py-2">
          <v-img :max-height="imgSize" :max-width="imgSize" src="../../../src/assets/estrella_vacia.png"/>
        </v-col>
      </v-row>
    </div>
    <div v-else-if="qualification==4">
      <v-row no-gutters>
        <v-col class="pr-2 pl-0 py-2">
          <v-img :max-height="imgSize" :max-width="imgSize" src="../../../src/assets/estrella_llena.png"/>
        </v-col>
        <v-col class="pr-2 pl-0 py-2">
          <v-img :max-height="imgSize" :max-width="imgSize" src="../../../src/assets/estrella_llena.png"/>
        </v-col>
        <v-col class="pr-2 pl-0 py-2">
          <v-img :max-height="imgSize" :max-width="imgSize" src="../../../src/assets/estrella_llena.png"/>
        </v-col>
        <v-col class="pr-2 pl-0 py-2">
          <v-img :max-height="imgSize" :max-width="imgSize" src="../../../src/assets/estrella_llena.png"/>
        </v-col>
        <v-col class="pr-2 pl-0 py-2">
          <v-img :max-height="imgSize" :max-width="imgSize" src="../../../src/assets/estrella_vacia.png"/>
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <v-row no-gutters>
        <v-col class="pr-2 pl-0 py-2">
          <v-img :max-height="imgSize" :max-width="imgSize" src="../../../src/assets/estrella_llena.png"/>
        </v-col>
        <v-col class="pr-2 pl-0 py-2">
          <v-img :max-height="imgSize" :max-width="imgSize" src="../../../src/assets/estrella_llena.png"/>
        </v-col>
        <v-col class="pr-2 pl-0 py-2">
          <v-img :max-height="imgSize" :max-width="imgSize" src="../../../src/assets/estrella_llena.png"/>
        </v-col>
        <v-col class="pr-2 pl-0 py-2">
          <v-img :max-height="imgSize" :max-width="imgSize" src="../../../src/assets/estrella_llena.png"/>
        </v-col>
        <v-col class="pr-2 pl-0 py-2">
          <v-img :max-height="imgSize" :max-width="imgSize" src="../../../src/assets/estrella_llena.png"/>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  props:[
    "qualification",
    "imgSize"
  ]
}
</script>

<style>

</style>