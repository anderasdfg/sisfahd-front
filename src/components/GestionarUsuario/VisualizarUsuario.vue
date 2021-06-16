<template>
<v-card>
    <v-card-title class="justify-center">Modificacion de datos del paciente</v-card-title>
    
<v-stepper v-model="step">

     <v-stepper-header>

       <v-stepper-step editabled step="1"> Informacion del Usuario </v-stepper-step>
       <v-divider></v-divider> 
     <v-stepper-step editabled step="2"> Informacion del Paciente </v-stepper-step>
     </v-stepper-header>


<v-stepper-items>

 <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="name"
      :counter="10"
      :rules="nameRules"
      label="Escribe tu nombre"
      required
    ></v-text-field>

    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="Escribe tus apellidos"
      required
    ></v-text-field>

    <v-select
      v-model="select"
      :items="items"
      :rules="[v => !!v || 'Item is required']"
      label="Selecciona un tipo de documento"
      required
    ></v-select>

    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="Ingresa tu numero de documento"
      required
    ></v-text-field>


    <v-text-field
          v-model="phoneNumber"
          :counter="7"
          :error-messages="errors"
          label="Ingresa tu numero de celular"
          required
        ></v-text-field>

      <v-select
      v-model="select"
      :items="items"
      :rules="[v => !!v || 'Item is required']"
      label="Selecciona tu sexo"
      required
    ></v-select>


<v-btn

      block color="primary"
      class="mr-4"
      @click="validate"
    >
      Volver
    </v-btn>

  </v-form>

</v-stepper-items>

</v-stepper>
 
 </v-card>

</template>