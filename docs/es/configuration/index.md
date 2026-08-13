# ⚙️ Configuración

En esta sección te enseñaremos a configurar `playwright.config.ts` para diferentes proyectos: **browser**, **Android** e **iOS**. La configuración **siempre debe extender** `TestOptions` de **playwright-io**.

> La configuración **SIEMPRE** debe usar `defineConfig<TestOptions>()` para tener acceso a las funcionalidades de playwright-io.

## Estructura Básica

```ts
import { defineConfig } from "@playwright/test";
import { TestOptions } from "playwright-io";

export default defineConfig<TestOptions>({
    testDir: './tests',
    use: {
        // Configuración específica de playwright-io
        capabilities: { /* ... */ },
        config: { /* ... */ },
        takeScreenshot: true,
        takeVideo: false
    }
});
```


## Guías de Configuración

1. **[📱 Configuración de Proyectos](es/projects.md)** - Global, por proyectos y ejecución paralela
2. **[🔧 Opciones Disponibles](es/options.md)** - Todas las opciones de configuración de playwright-io
3. **[🧪 Escribir Primera Prueba](es/getting-started/write-first-test.md)** - Usar la configuración en tests
