<template>
  <v-card elevation="3" class="content">
    <div class="tooltip">
      <p class="tooltiptext">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
        exercitationem necessitatibus corporis eaque quibusdam rem eius sint
        consequuntur, numquam autem.
      </p>
      <img
        :src="linkImg"
        alt=""
      />
    </div>
    <span>{{ nombreEspecialidad }}</span>
  </v-card>
</template>

<script>
export default {
  name: "CardEspecialidad",
  data() {
    return {
      nombreEspecialidad: "Medicina general",
      linkImg: "https://qullana.com.pe/wp-content/uploads/2020/08/esp02.png"
    };
  },
};
</script>

<style lang="scss" scoped>
.content {
  border-radius: 20px;
  background: $sky-blue;
  @include flex-center;
  flex-direction: column;
  padding: 3%;
  span {
      padding-bottom: 5%;
      font-size: 20px;
  }  
  img {
      width: 60%;
      margin-left: 20%;
      padding: 5%;
  }
}
.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 80%;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 10%;
  padding: 10%;
  //margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;
}

.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
</style>