// =====================================================
// WERO ENCARGOS - MOTOR DE PEDIDOS
// MVP v0.2
// =====================================================

// =====================================================
// 1. RENDERIZAR MENÚ DINÁMICO AL CARGAR LA PÁGINA
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.getElementById('contenedor-productos');
  if (!contenedor || typeof DATOS_CLIENTE === 'undefined') return;

  let htmlMenu = '';

  DATOS_CLIENTE.categorias.forEach(cat => {
        htmlMenu += `<div class="mp-card">
        <h3 class="text-center">${cat.nombre}</h3>`;
    
    cat.productos.forEach(prod => {
      // Si el producto tiene nombreCorto lo usa en el label, si no, usa el normal
      const textoMostrar = prod.nombreCorto || prod.nombre;
      
      htmlMenu += `
        <div class="fila-producto row" style="margin-bottom: 10px;">
          <div class="col">
            <label class="mp-label">${textoMostrar} <strong><br>(${DATOS_CLIENTE.moneda}${prod.precio})</strong></label><br>
          </div>
          <div class="col-5 d-flex">
            <button type="button" class="menos mp-btnS" data-id="${prod.id}">-</button>
            <input type="number" 
                  class="producto mp-input-num" 
                  id="input-${prod.id}" 
                  data-nombre="${prod.nombre}" 
                  data-precio="${prod.precio}" 
                  value="0" min="0" readonly>
            <button type="button" class="mas mp-btnE" data-id="${prod.id}">+</button>
          </div>
        </div>
      `;
    });
    htmlMenu += `<br></div>`;
  });

  contenedor.innerHTML = htmlMenu;
});

// =====================================================
// 2. CONTROL DE BOTONES + Y - (DELEGACIÓN DE EVENTOS)
// =====================================================
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('mas')) {
    const input = e.target.previousElementSibling;
    input.value = parseInt(input.value) + 1;
  }
  
  if (e.target.classList.contains('menos')) {
    const input = e.target.nextElementSibling;
    const val = parseInt(input.value);
    if (val > 0) input.value = val - 1;
  }
});

let urlWhatsApp = '';

document
  .getElementById('pedidoForm')
  .addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const direccion = document.getElementById('direccion').value.trim();
    const hora = document.getElementById('hora').value;

    function generarFolio(nombre, telefono) {
      const inicial = nombre.charAt(0).toUpperCase();
      const ultimos4 = telefono.slice(-4);
      return `${inicial}-${ultimos4}`;
    }

    const folio = generarFolio(nombre, telefono);
    const productos = document.querySelectorAll('.producto');

    let pedido = '';
    let totalCobrar = 0;

    productos.forEach(input => {
      const cantidad = parseInt(input.value) || 0;
      const nombreProducto = input.dataset.nombre;
      const precioUnitario = parseFloat(input.dataset.precio) || 0;

      if (cantidad > 0) {
        pedido += `• ${cantidad} ${nombreProducto}\n`;
        totalCobrar += (cantidad * precioUnitario);
      }
    });

    if (!pedido) {
      alert('Selecciona al menos un producto.');
      return;
    }

    //--------------------------------------------------
    // MENSAJE PARA WHATSAPP (Usando datos de menu.js)
    //--------------------------------------------------
    // si agregas esto al final del mensaje, se verá el total de la compra en el chat de WhatsApp:
    // \nTotal a pagar: ${DATOS_CLIENTE.moneda}${totalCobrar}
    const mensaje =
`${DATOS_CLIENTE.tituloPedido}

Folio: ${folio}
Cliente: ${nombre}
Teléfono: ${telefono}
Dirección: ${direccion}
Horario: ${hora}

--------------------------------
PEDIDO
${pedido}--------------------------------

Gracias por tu preferencia.`;

    urlWhatsApp = `https://wa.me/${DATOS_CLIENTE.numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

    //--------------------------------------------------
    // LLENAR PREVIEW (Con Total a Pagar visible)
    //--------------------------------------------------
    document.getElementById('folioView').innerHTML = `<strong>Folio:</strong> <span style="color:red">${folio}</span>`;

    document.getElementById('resumenPedido').innerHTML = `
      <strong>Cliente:</strong> ${nombre}<br>
      <strong>Teléfono:</strong> ${telefono}<br>
      <strong>Dirección:</strong> ${direccion}<br>
      <strong>Horario:</strong> ${hora}
      <hr>
      <pre>${pedido}</pre>
      <hr>
      <h4 style="text-align: right; margin: 0; color: #2d3748;">Total: ${DATOS_CLIENTE.moneda}${totalCobrar}</h4>
    `;

    const preview = document.getElementById('previewPedido');
    preview.classList.remove('oculto');
    preview.classList.add('visible');

    const formulario = document.getElementById('pedidoForm');
    formulario.classList.remove('visible');
    formulario.classList.add('oculto');
});

document.getElementById('btnWhatsApp').addEventListener('click', function () {
    if (urlWhatsApp) {
      window.open(urlWhatsApp, '_blank');
      setTimeout(() => {
        document.getElementById('pedidoForm').reset();
        document.getElementById('previewPedido').classList.remove('visible');
        document.getElementById('previewPedido').classList.add('oculto');
        document.getElementById('pedidoForm').classList.remove('oculto');
        document.getElementById('pedidoForm').classList.add('visible');
      }, 500);
    }
});

document.getElementById('editarPedido').addEventListener('click', function () {
    const preview = document.getElementById('previewPedido');
    preview.classList.remove('visible');
    preview.classList.add('oculto');

    const formulario = document.getElementById('pedidoForm');
    formulario.classList.remove('oculto');
    formulario.classList.add('visible');
});