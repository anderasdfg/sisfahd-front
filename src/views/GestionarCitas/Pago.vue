<template>
  <v-app>    
    <section class="body">
      <div class="body-izq">
        <div class="contenido-izq">
          <div class="texto-stepper">Detalle de la cita here</div>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam,
            provident qui dolorem perspiciatis voluptate soluta, et dolor
            molestias velit esse distinctio. Alias quaerat nostrum aperiam
            facilis possimus consequatur accusamus dicta!
          </p>
        </div>
      </div>
      <div class="body-der">        
        <div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est quia
            natus cupiditate, assumenda, a doloremque animi ea facere, ab
            aspernatur totam voluptatum temporibus eaque accusantium sint? Earum
            rem aspernatur itaque numquam totam? Recusandae corrupti ad,
            repudiandae labore animi magni nesciunt earum, eaque amet numquam
            porro a eum! Asperiores, explicabo itaque rem numquam similique
            iusto expedita provident qui obcaecati aliquam, laudantium nulla ad
            accusantium, dignissimos eaque iure facilis ducimus molestiae
            laboriosam? Animi fuga iste ullam, eligendi iusto maxime a quia
            earum veritatis placeat provident officia velit recusandae aperiam
            culpa quam accusamus labore ex doloribus beatae dolore laborum rem
            itaque! Cumque, dolor!
          </p>
        </div>
      </div>
    </section>
  </v-app>
</template>  

<script>
export default {
  name: "Pago",
};
</script>


<style lang="scss">
@import "../../styles/main.scss";
.toolbar-login {
  background-color: black;
  min-width: 10%;
  height: 10%;
}
.body {
  display: flex;
  flex-direction: row;
  .body-izq {
    background-color: #f2f7fd;
    width: 30%;
    flex-shrink: 0;
    padding-left: 10%px;
    overflow: hidden;
    position: relative;
    .contenido-izq {
      padding: 10% 10% 0 10%;
      .texto-stepper {
        text-align: left;
        padding-bottom: 40px;
        font-weight: bold;
        color: #535b6c;
        font-size: 30px;
        line-height: 40px;
        letter-spacing: 0.2px;
      }
    }
  }
  .body-der {
    min-height: 100vh;
    padding: 3%;
    background-color: #e5e5e5;
    display: flex;
    flex-direction: row;
  }
}

</style>