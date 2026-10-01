# ISM Directo — Mobile UI para Vercel

Esta versión está diseñada como una experiencia mobile-first inspirada en la maqueta solicitada: onboarding, registro, permisos, home, catálogo, promociones, carrito, checkout, seguimiento, perfil y soporte.

## Productos y marcas
El catálogo usa referencias del portafolio de ISM en Perú y agrega presentaciones demostrativas (unidad/pack/caja). Las marcas listadas públicamente para ISM incluyen Kola Real, Cool Fresh, Sabor de Oro, Black, Energina, Cielo, Loa, 360 Energy Drink, Kero, Kris, Fruvi, Generade y Drink T, entre otras. No se debe interpretar el catálogo como inventario oficial en tiempo real.

## Imágenes
Se usan imágenes remotas de páginas públicas de productos (incluyendo Mi Tienda ISM y comercios que publican fotografías de producto) para el prototipo. Si ISM proporciona un paquete oficial de imágenes, conviene reemplazar las URLs por esos archivos antes de una publicación comercial.

## Publicar en Vercel
1. Reemplaza los archivos de tu repositorio `ism` por `index.html`, `style.css` y `app.js`.
2. Haz Commit changes.
3. Vercel detectará el cambio automáticamente.
4. No necesitas cambiar la configuración de Framework: es HTML/CSS/JS estático.

## Nota de prototipo
Los precios, stock, descuentos, estados de entrega, mapa, chat y pagos son simulados. La ubicación y notificaciones solicitan permisos del navegador, pero no existe todavía un backend real. Para producción se requiere autenticación segura, base de datos, inventario, mapas, notificaciones, pagos y un sistema real de soporte. No guardar DNI/ubicación en producción sin implementar medidas de protección de datos adecuadas.
