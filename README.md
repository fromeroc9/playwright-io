<div align="center">
  <a href="https://fromeroc9.github.io/playwright-io">
    <img width="128" alt="playwright-io" src="./docs/logo.svg">
  </a>
</div>

<h2 align="center">Playwright-IO</h2>

<div align="center">

[![npm version](https://img.shields.io/npm/v/playwright-io)](https://www.npmjs.com/package/playwright-io)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue.svg)](https://www.typescriptlang.org/)
[![npm downloads](https://img.shields.io/npm/dw/playwright-io)](https://www.npmjs.com/package/playwright-io)
[![GitHub issues](https://img.shields.io/github/issues/fromeroc9/playwright-io)](https://github.com/fromeroc9/playwright-io/issues)
[![license](https://img.shields.io/npm/l/playwright-io)](https://github.com/fromeroc9/playwright-io/blob/main/LICENSE)

</div>

<div align="center">

Automatización móvil con [Playwright](https://playwright.dev/) runner y [WebDriverIO](https://webdriver.io/)

</div>

## ¿Por qué Playwright-IO?

**Playwright-IO** es una librería TypeScript que extiende las capacidades de testing de Playwright con soporte nativo para automatización móvil. Construida sobre WebDriverIO y el ecosistema Appium, esta librería proporciona integración perfecta entre la API moderna de testing de Playwright y la automatización de dispositivos móviles.

Combina lo mejor de Playwright y WebDriverIO para automatización móvil:

- 🚀 **Runner de Playwright**: Aprovecha todas las características del runner de Playwright
- 📱 **Automatización móvil**: Soporte completo para aplicaciones iOS y Android
- ♻️ **WebDriverIO**: Utiliza la potencia de WebDriverIO para interacciones móviles
- ⚡ **Paralelización**: Ejecuta pruebas en paralelo automático
- 📸 **Capturas automáticas**: Screenshots, videos y traces incluidos

## ✨ Características Principales

### **Funcionalidad**
- ✅ **Extensión de Playwright**: Extiende perfectamente Playwright con capacidades de automatización móvil
- ✅ **Automatización de Aplicaciones Nativas**: Soporte completo para testing de apps nativas Android y iOS
- ✅ **Testing de Navegadores Móviles**: Automatización de Chrome, Safari y WebView en dispositivos móviles
- ✅ **Cambio de Contexto Híbrido**: Transición perfecta entre contextos nativos y web
- ✅ **Resolución de Elementos Cross-Platform**: Estrategias de selectores adaptativas por plataforma
- ✅ **Sistema de Fixtures Mejorado**: Fixtures específicas para móviles integradas con el test runner de Playwright
- ✅ **Integración de Servicios**: Soporte nativo y estable para cualquier servicio del ecosistema WDIO

### **Características Técnicas**
- ✅ **TypeScript-First**: Seguridad de tipos completa con implementación estricta de TypeScript
- ✅ **Integración Playwright**: Test runner nativo de Playwright con soporte de fixtures mejorado
- ✅ **Backend WebDriverIO**: Automatización móvil robusta vía WebDriverIO y Appium
- ✅ **Gestión de Sesiones**: Ciclo de vida inteligente de sesiones WebDriver y connection pooling
- ✅ **Manejo de Errores**: Capacidades de recuperación de errores y debugging integral
- ✅ **Grabación Flexible**: Soporte para configuración de grabación boolean y basada en objetos
- ✅ **Arquitectura de Servicios**: Hooks nativos y lifecycle management completo de servicios WDIO

## Instalación

```bash
npm install playwright-io
```

### **🎯 Beneficios Clave**
- **🚀 Servicios Listos**: Usa cualquier servicio de WebDriverIO directamente en producción
- **🔄 Hooks Automáticos**: Los hooks se ejecutan automáticamente en el contexto correcto
- **📊 Compatibilidad Total**: Formateo automático de datos para servicios que esperan formato Mocha
- **⚡ Performance Optimizada**: Gestión optimizada de servicios launcher y worker
- **🛡️ Estabilidad Garantizada**: Funcionalidad completamente probada y lista para producción

## Uso básico

1. Configura tu `playwright.config.ts` con dispositivos móviles
2. Escribe tus pruebas usando el driver global
3. Ejecuta las pruebas con el runner de Playwright

```typescript
import { test, expect } from 'playwright-io';

test('Mi primera prueba móvil', async () => {
  await driver.url('https://example.com');
  await driver.$('#button').click();
  expect(await driver.$('#result').getText()).toBe('Success');
});
```

## 🏗️ Arquitectura de Integración

Para lograr una integración óptima entre el test runner de Playwright y las capacidades de automatización móvil de WebDriverIO, se han implementado las siguientes mejoras arquitectónicas:

### **Modificaciones de Integración WebDriverIO**
- **Lifecycle Hooks**: Los hooks nativos de WebDriverIO (`onPrepare`, `onWorkerStart`, `beforeTest`, `afterTest`, etc.) están integrados internamente y se ejecutan automáticamente sin intervención del usuario. Para personalizar el comportamiento de tus tests, usa los hooks equivalentes de Playwright (`beforeEach`, `afterEach`, `beforeAll`, `afterAll`).
- **Adaptador de Configuración**: La configuración de WebDriverIO es adaptada dinámicamente para trabajar dentro del contexto del test runner de Playwright, removiendo opciones duplicadas o conflictivas.

### **Detalles de Implementación Personalizada**
- **Adaptación de Estrategia de Selectores**: El motor de selectores de WebDriverIO está envuelto con métodos personalizados (`locator$`, `locator$$`) para proporcionar una API consistente que se integra con el manejo de elementos de Playwright.
- **Aislamiento de Sesiones**: Cada test recibe una sesión WebDriver aislada gestionada a través del sistema de fixtures de Playwright, asegurando limpieza apropiada e independencia de tests.
- **Traducción de Protocolo**: Los comandos del protocolo WebDriver son transparentemente traducidos para trabajar dentro del contexto de ejecución y sistema de reportes de Playwright.  

## Documentación

Para más detalles y ejemplos avanzados, revisa la carpeta `docs/` del proyecto.

## 🙏 Agradecimientos

Este proyecto no habría sido posible sin la inspiración y el trabajo de increíbles desarrolladores de la comunidad:

### **WebDriverIO Team**
Un agradecimiento especial al equipo de [WebDriverIO](https://webdriver.io/) por el excelente trabajo en el **wdio-video-reporter** y la lógica de grabación de videos que hemos adaptado para esta librería. Su implementación robusta y bien documentada fue fundamental para integrar las capacidades de grabación de pantalla en el contexto de Playwright.

### **Vitaliy Potapov (@vitalets)**
Profundo agradecimiento a [Vitaliy Potapov](https://github.com/vitalets) por su inspiración y enfoque en la documentación. Su trabajo en proyectos como [playwright-bdd](https://github.com/vitalets/playwright-bdd) y su estilo de documentación clara y comprensible sirvieron como modelo para esta librería. Su estructura de proyecto y metodología de documentación han sido adoptadas con gran respeto por su claridad y facilidad de comprensión.

Estos proyectos y desarrolladores demuestran la fuerza de la comunidad open source y cómo el trabajo colaborativo puede crear herramientas excepcionales para todos.

## Changelog

Consulta los últimos cambios en el [CHANGELOG.md](CHANGELOG.md).

## Licencia

Este proyecto está bajo la licencia [MIT](LICENSE).


<p align="center">
<a href="https://github.com/fromeroc9/playwright-io">
<img src="http://randojs.com/images/barsSmall.gif" alt="Animated footer bars" width="100%"/></a>
</p>
<br/>
<p align="center">
<a href="https://github.com/fromeroc9/playwright-io">
<img src="http://randojs.com/images/backToTopButton.png" alt="Back to top" height="29"/>
</a>
</p>