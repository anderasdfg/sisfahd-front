<template>
  <div id="pagePrincipal">
     <template>
         <v-app  class="app">
             <app-drawer class="app--drawer"></app-drawer>
             <app-toolbar class="app--toolbar"></app-toolbar> 
             <v-main>

                 <div class="page-wrapper">
                     <router-view></router-view>
                 </div>
                 <v-footer height="auto" class="pa-3 app--footer">
                     <span class="caption">&copy; {{ new Date().getFullYear() }}</span>
                     <v-spacer></v-spacer>
                     <span class="caption mr-1">Este es el footer</span>                     
                 </v-footer>
             </v-main>
         </v-app>
     </template>
  </div>
</template>

<script>
import Drawer from '@/views/Layout/Drawer.vue';
import Toolbar from '@/views/Layout/Toolbar.vue';
export default {
    name: "AppPrincipal",
    components: {
        appDrawer: Drawer,
        appToolbar: Toolbar
    }
}
</script>

<style lang="scss" scoped>
    .page-wrapper {
        min-height: calc(100vh - 64px - 50px - 81px);
        margin-bottom: 50px;      
       
    }
    .app--footer {
        position: absolute;
        bottom: 0;
        width: 100%;
       
    }  
    .app--drawer {        
        box-shadow: 6px 2px 10px #ececec;
    }
</style>