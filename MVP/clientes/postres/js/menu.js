// menu.js - ARCHIVO DE CONFIGURACIÓN DEL CLIENTE
const DATOS_CLIENTE = {
  nombreNegocio: "Postres Doña Mimis",
  numeroWhatsApp: "525539146809",
  tituloPedido: "NUEVO PEDIDO",
  moneda: "$",
  categorias: [
    {
      nombre: "Gelatinas de agua",
      productos: [
        { id: "gel-fresa", nombreCorto: "Fresa", nombre: "Gelatina de fresa", precio: 10 },
        { id: "gel-limon", nombreCorto: "Limón", nombre: "Gelatina de limón", precio: 10 },
        { id: "gel-uva", nombreCorto: "Uva", nombre: "Gelatina de uva", precio: 10 },
        { id: "gel-pina", nombreCorto: "Piña", nombre: "Gelatina de piña", precio: 10 }
      ]
    },
    {
      nombre: "Con fruta",
      productos: [
        { id: "fresas-crema", nombre: "Fresas con crema", precio: 30 },
        { id: "ensalada-manzana", nombre: "Ensalada de manzana con pacitas y nuéz", precio: 25 },
        { id: "duraznos-almibar", nombre: "Duraznos en almíbar", precio: 30 }
      ]
    },
    {
      nombre: "Otros",
      productos: [
        { id: "pay-limon", nombre: "Pay de limón 2 piezas", precio: 25 },
        { id: "pay-mango", nombre: "Pay de mango 2 piezas", precio: 25 },
        { id: "hot-cakes", nombre: "Hot cakes con lechera 2 piezas", precio: 25 }
      ]
    }
  ]
};
