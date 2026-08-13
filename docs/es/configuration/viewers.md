# Creación de Custom Device Viewers

En `playwright-io`, un **Device Viewer** es simplemente una plantilla en formato de cadena de texto (String HTML) que el framework renderiza dentro de una página de Playwright. Esto te permite crear interfaces de usuario (UI) totalmente personalizadas para visualizar tus pruebas móviles, ver las *capabilities* y leer los *logs* en tiempo real.

A continuación, te explico todo lo que debes tener en cuenta para crear tus propios diseños.

---

## 1. Variables de Plantilla Obligatorias

El framework utiliza un sistema simple de reemplazo de texto (`replace`) en la clase `Pages`. Para que tu HTML funcione, **debe** incluir estas dos etiquetas exactas en algún lugar del documento:

> [!IMPORTANT]
> **`{{PORT}}`**: El puerto donde se está emitiendo el *stream* del dispositivo móvil (MJPEG Server).
> **`{{CAPABILITIES}}`**: El bloque HTML generado automáticamente que contiene la lista de configuraciones de la sesión.

**Ejemplo de uso básico:**
```html
<img src="http://127.0.0.1:{{PORT}}/" alt="Pantalla en vivo">
<div class="mi-lista-de-caps">
    {{CAPABILITIES}}
</div>
```

---

## 2. Estructura CSS de las Capabilities

Cuando el framework reemplaza la etiqueta `{{CAPABILITIES}}`, no inserta texto plano, sino que inyecta bloques HTML predefinidos. Para que tu diseño luzca bien, **debes agregar estilos CSS** para las siguientes clases que vienen dentro del HTML inyectado:

```css
/* Contenedor principal de cada fila (clave-valor) */
.cap-item {
    /* Ej: display: flex; justify-content: space-between; border-bottom: 1px solid #ccc; */
}

/* El nombre de la capability (ej. "platformName") */
.cap-key {
    /* Ej: font-weight: bold; color: gray; */
}

/* El valor de la capability */
.cap-value {
    /* Ej: font-family: monospace; text-align: right; */
}

/* Modificadores dinámicos del valor según su tipo de dato */
.val-string { /* Color para textos (ej. blanco o azul) */ }
.val-true   { /* Color para booleanos verdaderos (ej. verde) */ }
.val-false  { /* Color para booleanos falsos (ej. rojo) */ }
```

El HTML inyectado por el framework detrás de escenas se ve exactamente así:
```html
<div class="cap-item">
    <span class="cap-key">platformName</span>
    <span class="cap-value val-string">IOS</span>
</div>
<div class="cap-item">
    <span class="cap-key">autoAcceptAlerts</span>
    <span class="cap-value val-true">true</span>
</div>
```

---

## 3. Integración de la Consola de Logs (Terminal)

Si deseas que tu nuevo *viewer* tenga soporte para **Logs en Tiempo Real** (interceptados por tu clase `Command`), necesitas agregar dos cosas a tu HTML: un contenedor y un pequeño script de JavaScript.

### El contenedor
Debe tener un `id` que tu script pueda encontrar, por ejemplo `id="terminal"`.
```html
<div id="terminal" class="mi-consola-oscura">
    <!-- Los logs aparecerán aquí -->
</div>
```

### El Script de Intercepción
Playwright invocará automáticamente la función `window.appendLog(message, level)` cada vez que ocurra una acción en el driver. **Debes declarar esta función** antes del cierre de tu `</body>`:

```html
<script>
    window.appendLog = function(message, level = 'info') {
        const terminal = document.getElementById('terminal');
        if (!terminal) return;
        
        // Crear el nuevo elemento de log
        const logLine = document.createElement('div');
        logLine.className = 'log-line ' + level; // Agrega las clases "info", "warn" o "error"
        
        // Formatear el texto
        const time = new Date().toLocaleTimeString('en-US', { hour12: false });
        logLine.innerText = '[' + time + '] ' + message;
        
        // Agregar al contenedor y auto-scrollear hacia abajo
        terminal.appendChild(logLine);
        terminal.scrollTop = terminal.scrollHeight;
    }
</script>
```

> [!TIP]
> Recuerda definir en tu `<style>` los colores para `.log-line.info`, `.log-line.warn` y `.log-line.error` para diferenciar los tipos de mensajes.

---

## 4. Exportación y Uso

Una vez que tengas tu HTML completo dentro de un *string* literal (usando backticks `` ` ``), simplemente expórtalo y configúralo en tu `playwright.config.ts`.

**Ejemplo:** `src/viewers/mi_diseno.ts`
```typescript
export const miViewerPersonalizado = `<!DOCTYPE html>
<html lang="en">
<head>
    <style> /* ... Tus estilos ... */ </style>
</head>
<body>
    <!-- ... Tu estructura con {{PORT}} y {{CAPABILITIES}} ... -->
</body>
</html>`;
```

**Uso:** `playwright.config.ts`
```typescript
import { miViewerPersonalizado } from "./src";

export default defineConfig({
    use: {
        deviceViewer: miViewerPersonalizado,
    }
});
```
