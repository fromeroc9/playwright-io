export const viewMobilePro = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Playwright-IO Mobile Viewer Pro</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

:root {
    --bg-base: #09090b;
    --panel-bg: rgba(24, 24, 27, 0.6);
    --panel-border: rgba(255, 255, 255, 0.05);
    --text-primary: #f8fafc;
    --text-secondary: #94a3b8;
    --accent: #3b82f6;
    --accent-glow: rgba(59, 130, 246, 0.3);
    --device-bg: #000000;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background-color: var(--bg-base);
    color: var(--text-primary);
    height: 100vh;
    display: flex;
    overflow: hidden;
    background-size: 40px 40px, 40px 40px, 100% 100%, 100% 100%;
    background-image: 
        linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
        radial-gradient(circle at 15% 15%, rgba(59, 130, 246, 0.15), transparent 40%),
        radial-gradient(circle at 85% 85%, rgba(139, 92, 246, 0.15), transparent 40%);
}

/* Container */
.app-container {
    display: flex;
    width: 100%;
    height: 100%;
    padding: 20px;
    gap: 20px;
}

/* Left Panel - Capabilities & Right Panel - Console */
.capabilities-panel, .console-panel {
    flex: 0 0 350px;
    background: var(--panel-bg);
    border: 1px solid var(--panel-border);
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
    overflow: hidden;
}

.panel-header {
    padding: 16px;
    border-bottom: 1px solid var(--panel-border);
    background: rgba(255, 255, 255, 0.02);
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.panel-title {
    font-size: 1rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 10px;
    letter-spacing: -0.01em;
}

.panel-subtitle {
    font-size: 0.75rem;
    color: var(--text-secondary);
}

.status-indicator {
    width: 8px;
    height: 8px;
    background-color: #10b981;
    border-radius: 50%;
    box-shadow: 0 0 10px #10b981;
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
    70% { transform: scale(1); box-shadow: 0 0 0 5px rgba(16, 185, 129, 0); }
    100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
}

.cap-list-container, .console-container {
    flex: 1;
    overflow-y: auto;
    padding: 12px;
}

.console-container {
    font-family: 'Inter', monospace;
}

.cap-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.cap-item {
    background: rgba(255, 255, 255, 0.015);
    border: 1px solid rgba(255, 255, 255, 0.03);
    padding: 6px 12px;
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    transition: background 0.2s ease, border-color 0.2s ease;
}

.cap-item:hover {
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(255, 255, 255, 0.1);
}

.cap-key {
    font-size: 0.65rem;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
}

.cap-value {
    font-size: 0.75rem;
    text-align: right;
    word-break: break-word;
    font-family: 'Inter', monospace;
    color: #e2e8f0;
    font-weight: 500;
    max-width: 60%;
}

/* Value Colors for Boolean/Strings */
.val-true { color: #10b981; }
.val-false { color: #ef4444; }
.val-string { color: #e2e8f0; }

/* Middle Panel - Device Stream */
.device-panel {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

/* Realistic Device Frame */
.device-frame {
    position: relative;
    height: 94%;
    max-height: 850px;
    aspect-ratio: 19.5 / 40; /* Accurate iPhone ratio */
    background: #111;
    border-radius: 48px;
    padding: 14px;
    box-shadow: 
        inset 0 0 0 2px #444,
        inset 0 0 0 6px #111,
        0 40px 80px rgba(0,0,0,1),
        0 0 60px var(--accent-glow);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: float 6s ease-in-out infinite;
}

@keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-12px); box-shadow: inset 0 0 0 2px #444, inset 0 0 0 6px #111, 0 50px 90px rgba(0,0,0,1), 0 0 80px var(--accent-glow); }
    100% { transform: translateY(0px); }
}

/* Hardware buttons */
.device-frame::before {
    content: '';
    position: absolute;
    left: -2px;
    top: 120px;
    width: 3px;
    height: 30px;
    background: #444;
    border-radius: 2px 0 0 2px;
}
.device-frame::after {
    content: '';
    position: absolute;
    left: -2px;
    top: 170px;
    width: 3px;
    height: 55px;
    background: #444;
    border-radius: 2px 0 0 2px;
    box-shadow: 0 70px 0 #444;
}
.power-button {
    position: absolute;
    right: -2px;
    top: 190px;
    width: 3px;
    height: 80px;
    background: #444;
    border-radius: 0 2px 2px 0;
}

.device-screen-container {
    width: 100%;
    height: 100%;
    background: #000;
    border-radius: 36px;
    overflow: hidden;
    position: relative;
    box-shadow: inset 0 0 0 1px rgba(255,255,255,0.1);
}

/* Dynamic Island / Notch */
.notch {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 28px;
    background: #000;
    border-radius: 14px;
    z-index: 10;
}

.device-stream {
    width: 100%;
    height: 100%;
    object-fit: fill; /* Ensure it fills the screen perfectly */
    display: block;
    background-color: #000;
}

/* Scrollbar styles */
::-webkit-scrollbar {
    width: 5px;
}
::-webkit-scrollbar-track {
    background: transparent;
}
::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.15);
    border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.3);
}

/* Console Logs */
.log-line {
    font-size: 0.75rem;
    margin-bottom: 6px;
    word-break: break-word;
    line-height: 1.4;
}
.log-line.info { color: #94a3b8; }
.log-line.warn { color: #fbbf24; }
.log-line.error { color: #f87171; }

/* Responsive */
@media (max-width: 900px) {
    .app-container {
        flex-direction: column-reverse;
        overflow-y: auto;
    }
    .capabilities-panel, .console-panel {
        flex: none;
        height: 400px;
    }
    .device-panel {
        flex: none;
        height: 800px;
        padding: 40px 0;
    }
}

    </style>
</head>

<body>
    <div class="app-container">
        <!-- Left Panel: Capabilities -->
        <aside class="capabilities-panel">
            <header class="panel-header">
                <h1 class="panel-title">
                    <span class="status-indicator"></span>
                    Playwright-IO
                </h1>
                <span class="panel-subtitle">Session Capabilities</span>
            </header>
            <div class="cap-list-container">
                <div class="cap-list">
                    {{CAPABILITIES}}
                </div>
            </div>
        </aside>

        <!-- Middle Panel: Device Stream -->
        <main class="device-panel">
            <div class="device-frame">
                <div class="power-button"></div>
                <div class="device-screen-container">
                    <div class="notch"></div>
                    <img class="device-stream" src="http://127.0.0.1:{{PORT}}/" alt="Live Device Stream">
                </div>
            </div>
        </main>

        <!-- Right Panel: Terminal -->
        <aside class="console-panel">
            <header class="panel-header">
                <h1 class="panel-title">Terminal</h1>
                <span class="panel-subtitle">Live Logs</span>
            </header>
            <div class="console-container" id="terminal">
                <div class="log-line info">[System] Viewer initialized. Waiting for logs...</div>
            </div>
        </aside>
    </div>

    <script>
        window.appendLog = function(message, level = 'info') {
            const terminal = document.getElementById('terminal');
            if (!terminal) return;
            
            const logLine = document.createElement('div');
            logLine.className = 'log-line ' + level;
            
            logLine.innerText = '~' + message;
            
            terminal.appendChild(logLine);
            terminal.scrollTop = terminal.scrollHeight;
        }
    </script>
</body>

</html>`;
