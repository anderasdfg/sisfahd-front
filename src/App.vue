<template>
<div class="app">
  <router-view/>
</div>
  
</template>

<script>

export default {
  name: 'App',
};
</script>

<style lang="scss">
@import './styles/main.scss';
#app {
 font-family: 'Nunito', sans-serif;
 background-color: $sky-light;
}

</style>