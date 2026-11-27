# Family Hold - instrucciones para Codex

## Proyecto
Nueva web de Family Hold (https://www.familyhold.com.ar/), servicio de terapia de pareja y familiar. La clienta se llama Analía; Sandra Amitar es el nombre de la cuenta publicitaria, no el nombre de la interlocutora.

## Implementación
- Desarrollar la nueva versión sin WordPress. Priorizar HTML, CSS y JavaScript estáticos; usar otro stack si Daniel lo indica o existe una necesidad concreta.
- Este repositorio comienza con documentación. El diseño y la implementación del sitio todavía están pendientes.
- Antes de escribir contenido, revisar el sitio actual y las instrucciones de Daniel. No inventar matrículas, especialidades, precios, testimonios, contactos o resultados terapéuticos.
- Mantener las URLs existentes que se confirmen necesarias, incluida /quienes-somos/, o documentar un mapa de redirecciones.
- Preparar navegación, recursos y rutas para el destino de alojamiento elegido, incluido un subdirectorio si se usa GitHub Pages.
- Crear una web responsive, accesible y rápida, con contenido principal legible sin depender de JavaScript.
- No presentar un formulario como operativo sin implementar y verificar su envío.

## Contexto técnico
La auditoría del 27/11/2026 detectó rechazo por Destino no operativo. Las pruebas externas simulando User-Agent de AdsBot recibieron HTTP 429, mientras el navegador común recibió 200. No se confirmó qué capa genera el bloqueo ni se probaron visitas desde IPs auténticas de Google. Una nueva web no garantiza por sí sola eliminar una regla del hosting o firewall.

## Validación y entrega
- Comprobar enlaces, rutas, imágenes, vista móvil, metadatos y estados HTTP.
- Validar acceso de rastreadores en el alojamiento final y revisar registros de AdsBot real cuando estén disponibles.
- No incorporar credenciales, conversaciones privadas, datos de pacientes ni informes de cuenta al repositorio.
- La publicación en el dominio actual, cambios de DNS/hosting y ediciones o apelaciones de Google Ads quedan fuera de la preparación inicial; requieren una instrucción específica de Daniel.
