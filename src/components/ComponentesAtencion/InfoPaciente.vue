<template>
  <div class="general">
      <div class="datos-nombre">
          <span> MARLYN ANDERLEY CANDELA PEÑA</span>
      </div>
     <div class="datos-generales">
         <div class="item">
             <div class="item-icono">
                 <img src="https://i.ibb.co/RcdQHGt/calendar.png" alt="">
             </div>
             <div class="item-datos">
                 <p class="blue"><b>Fecha y hora de cita</b></p>
                 <p class="margin-12">02/11/2021 - 12:30</p>
             </div>             
         </div>
          <div class="item">
             <div class="item-icono">
                 <img src="https://i.ibb.co/8PBB6bL/estetoscopio.png" alt="">
             </div>
             <div class="item-datos">
                 <p class="blue"><b>Especialidad</b></p>
                 <p class="margin-12">Dermatología</p>
             </div>             
         </div>
          <div class="item">
             <div class="item-icono">
                 <img src="https://i.ibb.co/s3X2rbf/licencia-de-conducir.png" alt="">
             </div>
             <div class="item-datos">
                 <p class="blue"><b>Nro. Documento</b></p>
                 <p class="margin-12">70477729</p>
             </div>             
         </div>
          <div class="item">
             <div class="item-icono">
                 <img src="https://i.ibb.co/vwmGZ3r/genero.png" alt="">
             </div>
             <div class="item-datos">
                 <p class="blue"><b>Género</b></p>
                 <p class="margin-12">FEMENINO</p>
             </div>             
         </div>
          <div class="item">
             <div class="item-icono">
                 <img src="https://i.ibb.co/pXdcFXs/grupo-de-edad.png" alt="">
             </div>
             <div class="item-datos">
                 <p class="blue"><b>Edad</b></p>
                 <p class="margin-12">20</p>
             </div>             
         </div>
          <div class="item">
             <div class="item-icono">
                 <img src="https://i.ibb.co/VDd2sh8/cita-medica.png" alt="">
             </div>
             <div class="item-datos">
                 <p class="blue"><b>Código de cita</b></p>
                 <p class="margin-12">A21SAS225S5S</p>
             </div>             
         </div>
         <div class="item">
             <button class="item-button">Historia clínica</button>
         </div>
         
     </div>
  </div>
</template>

<script>
export default {
    name: 'InfoPaciente'
}
</script>

<style lang="scss" scoped>
.general {
    background-color: white;
    border-radius: 20px;
    width: 100%;
    height: 99%;
    display: flex;    
    flex-direction: column;
    margin-bottom: 50px;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.068);
    .datos-nombre {
        height: 10%;      
        display: flex;
        justify-content: center;
        span {
            margin-top: 10px;
            font-weight: bold;
        }      
    }
    .datos-generales {
        height: 90%;          
        display: flex;
        flex-direction: column;
        .item {
            width: 100%;
            height: 100%;            
            flex-direction: row;
            display: flex;            
            align-items: center;            
            .item-icono {
                width: 15%;                                  
                margin-left: 5%;                
            }
            .item-datos {                
                width: 80%;
                        
            }
        }      
        .item-button {   
            width: 100%;            
            margin: 0 5%;
            background-color: $blue;
            border-radius: 6px;
            color: white;
            font-weight: bold;
            padding: 1%;
            box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
        }
    }
}
.blue {
    color: $blue; 
    background-color: transparent !important;
}
.margin-12 {
    margin-top: -12px;
}
</style>