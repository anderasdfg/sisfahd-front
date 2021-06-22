<script src="https://sdk.mercadopago.com/js/v2"></script>

 // SDK de Mercado Pago
 const mercadopago = require ('mercadopago');
 // Agrega credenciales
 mercadopago.configure({
    access_token: 'APP_USR-6623451607855904-111502-1f258ab308efb0fb26345a2912a3cfa5-672708410'
});

class MercadopagoController {
  async mercadopago({request}){
        let preference = {
            items: [
                {
                  title: 'ojatas',
                  unit_price: 100,
                  quantity: 1,
                }
            ]
        };
        const res = await mercadopago.preferences.create(preference)

        return res
  }
}

module.exports = MercadopagoController

export {MercadopagoController};