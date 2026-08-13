# Creating Custom Device Viewers

In `playwright-io`, a **Device Viewer** is simply a template in the form of an HTML string that the framework renders inside a Playwright page. This allows you to create fully customized User Interfaces (UI) to visualize your mobile tests, view the *capabilities*, and read *logs* in real-time.

Below is everything you need to know to create your own designs.

---

## 1. Required Template Variables

The framework uses a simple text replacement (`replace`) system in the `Pages` class. For your HTML to work, it **must** include these two exact tags somewhere in the document:

> [!IMPORTANT]
> **`{{PORT}}`**: The port where the mobile device stream is being broadcasted (MJPEG Server).
> **`{{CAPABILITIES}}`**: The automatically generated HTML block containing the session configuration list.

**Basic usage example:**
```html
<img src="http://127.0.0.1:{{PORT}}/" alt="Live screen">
<div class="my-caps-list">
    {{CAPABILITIES}}
</div>
```

---

## 2. Capabilities CSS Structure

When the framework replaces the `{{CAPABILITIES}}` tag, it doesn't insert plain text; it injects predefined HTML blocks. For your design to look good, you **must add CSS styles** for the following classes that come inside the injected HTML:

```css
/* Main container for each row (key-value) */
.cap-item {
    /* Ex: display: flex; justify-content: space-between; border-bottom: 1px solid #ccc; */
}

/* The capability name (e.g. "platformName") */
.cap-key {
    /* Ex: font-weight: bold; color: gray; */
}

/* The capability value */
.cap-value {
    /* Ex: font-family: monospace; text-align: right; */
}

/* Dynamic modifiers for the value based on its data type */
.val-string { /* Color for texts (e.g., white or blue) */ }
.val-true   { /* Color for true booleans (e.g., green) */ }
.val-false  { /* Color for false booleans (e.g., red) */ }
```

The HTML injected behind the scenes by the framework looks exactly like this:
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

## 3. Integrating the Logs Console (Terminal)

If you want your new *viewer* to support **Real-Time Logs** (intercepted by your `Command` class), you need to add two things to your HTML: a container and a small JavaScript script.

### The Container
It must have an `id` that your script can find, for example, `id="terminal"`.
```html
<div id="terminal" class="my-dark-console">
    <!-- Logs will appear here -->
</div>
```

### The Interception Script
Playwright will automatically invoke the `window.appendLog(message, level)` function every time an action occurs in the driver. You **must declare this function** before the closing `</body>` tag:

```html
<script>
    window.appendLog = function(message, level = 'info') {
        const terminal = document.getElementById('terminal');
        if (!terminal) return;
        
        // Create the new log element
        const logLine = document.createElement('div');
        logLine.className = 'log-line ' + level; // Add "info", "warn", or "error" classes
        
        // Format the text
        const time = new Date().toLocaleTimeString('en-US', { hour12: false });
        logLine.innerText = '[' + time + '] ' + message;
        
        // Append to the container and auto-scroll down
        terminal.appendChild(logLine);
        terminal.scrollTop = terminal.scrollHeight;
    }
</script>
```

> [!TIP]
> Remember to define the colors for `.log-line.info`, `.log-line.warn`, and `.log-line.error` in your `<style>` to differentiate the types of messages.

---

## 4. Exporting and Usage

Once you have your complete HTML inside a literal string (using backticks `` ` ``), simply export it and configure it in your `playwright.config.ts`.

**Example:** `src/viewers/my_design.ts`
```typescript
export const myCustomViewer = `<!DOCTYPE html>
<html lang="en">
<head>
    <style> /* ... Your styles ... */ </style>
</head>
<body>
    <!-- ... Your structure with {{PORT}} and {{CAPABILITIES}} ... -->
</body>
</html>`;
```

**Usage:** `playwright.config.ts`
```typescript
import { myCustomViewer } from "./src";

export default defineConfig({
    use: {
        deviceViewer: myCustomViewer,
    }
});
```
