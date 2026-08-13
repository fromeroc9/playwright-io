export const viewMinimalist = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minimalist Pro Viewer</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
        
        :root {
            --bg-color: #f7f9fa;
            --text-main: #111827;
            --text-muted: #6b7280;
            --border-color: #e5e7eb;
            --card-bg: #ffffff;
        }

        * { box-sizing: border-box; }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background-color: var(--bg-color);
            margin: 0;
            height: 100vh;
            overflow: hidden;
            background-image: radial-gradient(var(--border-color) 1px, transparent 1px);
            background-size: 24px 24px;
        }

        .app-container {
            display: flex;
            width: 100%;
            height: 100%;
            padding: 24px;
            gap: 24px;
        }

        /* Left Panel - Capabilities */
        .capabilities-panel {
            flex: 0 0 320px;
            background-color: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        .panel-header {
            padding: 20px;
            border-bottom: 1px solid var(--border-color);
            background-color: var(--card-bg);
        }

        .panel-title {
            font-size: 0.875rem;
            font-weight: 600;
            color: var(--text-main);
            margin: 0;
            letter-spacing: 0.025em;
            text-transform: uppercase;
        }

        .cap-list-container {
            flex: 1;
            overflow-y: auto;
            padding: 0;
        }

        .cap-list-container::-webkit-scrollbar, .console-container::-webkit-scrollbar { width: 4px; }
        .cap-list-container::-webkit-scrollbar-thumb { background-color: #d1d5db; border-radius: 4px; }
        .console-container::-webkit-scrollbar-thumb { background-color: #4b5563; border-radius: 4px; }

        .cap-item {
            padding: 12px 20px;
            border-bottom: 1px solid var(--border-color);
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

        .cap-item:last-child { border-bottom: none; }
        .cap-key { font-size: 0.75rem; font-weight: 500; color: var(--text-muted); }
        
        .cap-value {
            font-size: 0.875rem;
            font-weight: 400;
            color: var(--text-main);
            word-break: break-word;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        }

        /* Middle Panel - Device Centered */
        .device-panel {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }

        .device-frame {
            height: 94%;
            max-height: 850px;
            aspect-ratio: 9 / 19.5;
            background: #ffffff;
            border-radius: 44px;
            box-shadow: 
                0 0 0 1px #e5e7eb,
                0 20px 25px -5px rgba(0, 0, 0, 0.1),
                0 10px 10px -5px rgba(0, 0, 0, 0.04);
            padding: 10px;
            display: flex;
        }

        .device-screen-container {
            width: 100%;
            height: 100%;
            border-radius: 34px;
            overflow: hidden;
            background: #000000;
            position: relative;
            border: 1px solid #f3f4f6;
        }

        .device-stream {
            width: 100%;
            height: 100%;
            object-fit: fill;
            display: block;
        }

        /* Right Panel - Console */
        .console-panel {
            flex: 0 0 320px;
            background-color: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        .console-container {
            flex: 1;
            overflow-y: auto;
            background-color: #111827;
            padding: 16px;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        }

        .log-line {
            font-size: 0.75rem;
            margin-bottom: 6px;
            word-break: break-word;
            line-height: 1.4;
        }
        .log-line.info { color: #9ca3af; }
        .log-line.warn { color: #fbbf24; }
        .log-line.error { color: #f87171; }
    </style>
</head>
<body>
    <div class="app-container">
        <!-- Left Sidebar (Capabilities) -->
        <aside class="capabilities-panel">
            <header class="panel-header">
                <h2 class="panel-title">Session Details</h2>
            </header>
            <div class="cap-list-container">
                <div class="cap-list">
                    {{CAPABILITIES}}
                </div>
            </div>
        </aside>

        <!-- Middle Content Area (Device Centered) -->
        <main class="device-panel">
            <div class="device-frame">
                <div class="device-screen-container">
                    <img class="device-stream" src="http://127.0.0.1:{{PORT}}/" alt="Stream">
                </div>
            </div>
        </main>

        <!-- Right Sidebar (Terminal) -->
        <aside class="console-panel">
            <header class="panel-header">
                <h2 class="panel-title">Terminal Logs</h2>
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
            
            const time = new Date().toLocaleTimeString('en-US', { hour12: false });
            logLine.innerText = '[' + time + '] ' + message;
            
            terminal.appendChild(logLine);
            terminal.scrollTop = terminal.scrollHeight;
        }
    </script>
</body>
</html>`;
