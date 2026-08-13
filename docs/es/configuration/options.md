# 🔧 Opciones

Esta guía detalla las opciones específicas de **playwright-io** disponibles en tu archivo `playwright.config.ts`.

---

### config

- **Tipo:** `Partial<IOConfig>`
- **Predeterminado:** `undefined`
- **Descripción:** Configuración nativa de WebDriverIO (hostname, puerto, timeouts, reintentos)

```ts
use: {
    config: {
        hostname: 'localhost',
        port: 4723,
        logLevel: 'silent',
        waitforTimeout: 30000,
        connectionRetryTimeout: 120000,
        connectionRetryCount: 3
    }
}
```

> **💡 Nota:** Si no se especifica, se usan los valores por defecto de WebDriverIO.

> **📖 Más opciones:** Para ver todas las opciones disponibles de configuración de WebDriverIO, consulta: [https://webdriver.io/docs/configuration](https://webdriver.io/docs/configuration)

> **⚠️ Limitaciones:** Algunas opciones de WebDriverIO están limitadas o deshabilitadas para evitar conflictos con Playwright:
> - **Test Runner Options**: `specs`, `exclude`, `suites`, `capabilities`, etc.
> - **Lifecycle Hooks**: `before*`, `after*`, `on*` (usar hooks de Playwright en su lugar)
> - **Framework Options**: `mochaOpts`, `jasmineOpts`, `cucumberOpts`

### capabilities

- **Tipo:** `IOCapabilities`
- **Predeterminado:** Requerido
- **Descripción:** Capabilities de Appium que definen las características del dispositivo y configuración de automatización

```ts
use: {
    capabilities: {
        platformName: 'Android',
        "appium:automationName": "UiAutomator2",
        "appium:deviceName": "Mi Dispositivo",
        "appium:udid": "DEVICE_ID",
        "appium:appPackage": "com.ejemplo.app",
        "appium:appActivity": ".MainActivity"
    }
}
```

> **⚠️ Requerido:** Las capabilities son obligatorias para establecer la conexión con el dispositivo.

### takeScreenshot

- **Tipo:** `boolean`
- **Predeterminado:** `true`
- **Descripción:** Tomar screenshots automáticos durante la ejecución de tests móviles

```ts
use: {
    takeScreenshot: true,
    screenshot: 'off', // ⚠️ Requerido: desactivar para móviles
    // O simplemente no declarar screenshot
}
```

> **⚠️ Importante:** Para dispositivos móviles, el `screenshot` de Playwright debe estar desactivado (`'off'`) o no declararse.

### takeVideo

> **⚠️ Nota de Deprecación:** `recordingScreen` ha sido deprecado en favor de `takeVideo` para alinearse con las capacidades nativas de Playwright. Por favor, actualiza tu configuración.

- **Tipo:** `boolean | RecorderOptions`
- **Predeterminado:** `false`
- **Descripción:** Grabar pantalla durante la ejecución de tests móviles

```ts
use: {
    // Configuración booleana simple
    takeVideo: true,
    
    // Configuración con opciones
    takeVideo: {
        videoType: 'mp4',
        quality: 'medium', 
        maxDuration: 300
    },
    video: 'off', // ⚠️ Requerido: desactivar para móviles
}
```

#### videoType
- **`mp4`** - Formato estándar de video (recomendado)
- **`webm`** - Formato de video web

#### quality
- **`low`** - Calidad baja (menor tamaño de archivo)
- **`medium`** - Calidad media (equilibrio entre tamaño y calidad)
- **`high`** - Calidad alta (mayor tamaño de archivo)
- **`lossless`** - Sin pérdida de calidad (tamaño máximo)
- **`string | number`** - Valor personalizado (ej: '720p', 1080)

#### maxDuration
- **Tipo:** `number`
- **Unidad:** Segundos
- **Descripción:** Duración máxima de grabación por test
- **Recomendado:** 300 segundos (5 minutos)

> **⚠️ Importante:** Para dispositivos móviles, el `video` de Playwright debe estar desactivado (`'off'`) o no declararse.

### trace

- **Tipo:** `'on' | 'off' | 'retain-on-failure'`
- **Predeterminado:** `'off'`
- **Descripción:** Utiliza el sistema nativo de traces de Playwright (compatible con móviles)

```ts
use: {
    trace: 'retain-on-failure' // ✅ Compatible con dispositivos móviles
}
```

> **✅ Compatible:** Los traces de Playwright funcionan perfectamente con dispositivos móviles.
