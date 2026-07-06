// =====================================================
// WERO ENCARGOS - MOTOR DE PEDIDOS
// MVP v0.1
// =====================================================

// Aquí guardaremos la URL de WhatsApp hasta que el
// cliente confirme el pedido.
let urlWhatsApp = '';

document
  .getElementById('pedidoForm')
  .addEventListener('submit', function (e) {

    // Evita que el formulario recargue la página
    e.preventDefault();

    //--------------------------------------------------
    // DATOS DEL CLIENTE
    //--------------------------------------------------

    const nombre =
      document
        .getElementById('nombre')
        .value
        .trim();

    const telefono =
      document
        .getElementById('telefono')
        .value
        .trim();

    const hora =
      document
        .getElementById('hora')
        .value;

    const tipo =
      document
        .querySelector('input[name="tipo"]:checked')
        .value;

    //--------------------------------------------------
    // GENERAR FOLIO
    //--------------------------------------------------

    function generarFolio(nombre, telefono) {

      const inicial =
        nombre
          .charAt(0)
          .toUpperCase();

      const ultimos4 =
        telefono.slice(-4);

      return `${inicial}-${ultimos4}`;
    }

    const folio =
      generarFolio(nombre, telefono);

    //--------------------------------------------------
    // ARMAR LISTA DE PRODUCTOS
    //--------------------------------------------------

    const productos =
      document.querySelectorAll('.producto');

    let pedido = '';

    productos.forEach(input => {

      const cantidad =
        parseInt(input.value) || 0;

      const nombreProducto =
        input.dataset.nombre;

      if (cantidad > 0) {

        pedido +=
          `• ${cantidad} ${nombreProducto}\n`;

      }

    });

    //--------------------------------------------------
    // VALIDAR PEDIDO
    //--------------------------------------------------

    if (!pedido) {

      alert(
        'Selecciona al menos un producto.'
      );

      return;
    }

    //--------------------------------------------------
    // CONFIGURACIÓN
    //--------------------------------------------------

    const config = {

      titulo: 'NUEVO PEDIDO',
      numeroWhatsApp: '525513694267'

    };

    //--------------------------------------------------
    // MENSAJE PARA WHATSAPP
    //--------------------------------------------------

    const mensaje =
`${config.titulo}

Folio: ${folio}

Cliente: ${nombre}

Teléfono: ${telefono}

Modalidad: ${tipo}

Hora solicitada: ${hora}

--------------------------------

PEDIDO

${pedido}

Gracias por tu preferencia.
`;

    //--------------------------------------------------
    // GENERAR URL
    //--------------------------------------------------

    urlWhatsApp =
      `https://wa.me/${config.numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

    //--------------------------------------------------
    // LLENAR PREVIEW
    //--------------------------------------------------

    document
      .getElementById('folioView')
      .innerHTML =
      `<strong>Folio:</strong> ${folio}`;

    document
      .getElementById('resumenPedido')
      .innerHTML =

      `
      <strong>Cliente:</strong> ${nombre}<br>
      <strong>Teléfono:</strong> ${telefono}<br>
      <strong>Modalidad:</strong> ${tipo}<br>
      <strong>Hora:</strong> ${hora}

      <hr>

      <pre>${pedido}</pre>
      `;

    //--------------------------------------------------
    // CAMBIAR DE PANTALLA
    //--------------------------------------------------

    const preview =
      document.getElementById('previewPedido');

    preview.classList.remove('oculto');
    preview.classList.add('visible');

    const formulario =
      document.getElementById('pedidoForm');

    formulario.classList.remove('visible');
    formulario.classList.add('oculto');

});


//======================================================
// BOTÓN ENVIAR A WHATSAPP
//======================================================

document
  .getElementById('btnWhatsApp')
  .addEventListener('click', function () {

    if (urlWhatsApp) {

      window.open(
        urlWhatsApp,
        '_blank'
      );

      setTimeout(() => {

    document.getElementById('pedidoForm').reset();

    document
      .getElementById('previewPedido')
      .classList.remove('visible');

    document
      .getElementById('previewPedido')
      .classList.add('oculto');

    document
      .getElementById('pedidoForm')
      .classList.remove('oculto');

    document
      .getElementById('pedidoForm')
      .classList.add('visible');

}, 500);

    }

});


//======================================================
// BOTÓN EDITAR PEDIDO
//======================================================

document
  .getElementById('editarPedido')
  .addEventListener('click', function () {

    //--------------------------------------------------
    // OCULTAR PREVIEW
    //--------------------------------------------------

    const preview =
      document.getElementById('previewPedido');

    preview.classList.remove('visible');
    preview.classList.add('oculto');

    //--------------------------------------------------
    // MOSTRAR FORMULARIO
    //--------------------------------------------------

    const formulario =
      document.getElementById('pedidoForm');

    formulario.classList.remove('oculto');
    formulario.classList.add('visible');

});