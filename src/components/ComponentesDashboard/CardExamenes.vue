<template>
  <div class="content" v-if="this.examen != {}">      
    <div class="two">
       <span class="two-right"><b> {{ this.examen.cantidad }} </b> {{ this.examen._id }}</span>
    </div>    
  </div>
</template>

<script>
export default {
  name: "CardExamenes",
  props: ["examen"],
  data: () => ({ 
  }),
};
</script>

<style lang="scss" scoped>
.content {
  border-radius: 20px; 
  align-content: center;
  align-items: center;
  background: white;
  justify-content: flex-start;
  padding: 1% 0;
  background: #A2DBFA ;
}
.img-w {
  width: 72px;
  height: 72px;
  border-radius: 72px;
}

.two {
  padding: 1%;
  display: flex;
  align-content: center;
}
.two-right {
  margin-left: 2%;
}
</style>