// menu.js - ARCHIVO DE CONFIGURACIÓN DEL CLIENTE
const DATOS_CLIENTE = {
  nombreNegocio: "Postres Doña Mimis",
  numeroWhatsApp: "525513694267",
  tituloPedido: "NUEVO PEDIDO",
  moneda: "$",
  categorias: [
    {
      nombre: "Gelatinas",
      productos: [
        { id: "gel-fresa", nombreCorto: "Fresa", nombre: "Gelatina de fresa", precio: 25 },
        { id: "gel-limon", nombreCorto: "Limón", nombre: "Gelatina de limón", precio: 25 },
        { id: "gel-uva", nombreCorto: "Uva", nombre: "Gelatina de uva", precio: 25 },
        { id: "gel-pina", nombreCorto: "Piña", nombre: "Gelatina de piña", precio: 25 },
        { id: "gel-mosaico", nombreCorto: "Mosaico", nombre: "Gelatina de mosaico", precio: 30 },
        { id: "flan", nombreCorto: "Flan", nombre: "Flan", precio: 35 }
      ]
    },
    {
      nombre: "Con fruta",
      productos: [
        { id: "pay-limon", nombre: "Pay de limón", precio: 40 },
        { id: "pay-mango", nombre: "Pay de mango", precio: 45 },
        { id: "fresas-crema", nombre: "Fresas con crema", precio: 50 }
      ]
    },
    {
      nombre: "Otros",
      productos: [
        { id: "huevito", nombre: "Huevito dulce", precio: 15 },
        { id: "hot-cakes", nombre: "Hot cakes", precio: 40 }
      ]
    }
  ]
};