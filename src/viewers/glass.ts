export const viewGlass = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Glassmorphism Pro Viewer</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
        
        * { box-sizing: border-box; }

        body {
            font-family: 'Inter', -apple-system, sans-serif;
            margin: 0;
            height: 100vh;
            overflow: hidden;
            background-color: #0f172a;
            background-image: 
                radial-gradient(at 0% 0%, rgba(30, 58, 138, 0.4) 0px, transparent 50%),
                radial-gradient(at 100% 100%, rgba(88, 28, 135, 0.4) 0px, transparent 50%);
        }

        .app-container {
            display: flex;
            width: 100%;
            height: 100%;
            padding: 24px;
            gap: 24px;
        }

        /* Left Panel - Glass Capabilities */
        .capabilities-panel, .console-panel {
            flex: 0 0 320px;
            background: rgba(15, 23, 42, 0.4);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        .panel-header {
            padding: 20px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .panel-title {
            font-size: 0.875rem;
            font-weight: 600;
            color: rgba(255, 255, 255, 0.9);
            margin: 0;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        .cap-list-container, .console-container {
            flex: 1;
            overflow-y: auto;
            padding: 0;
        }

        .console-container {
            padding: 16px;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
            background: rgba(0, 0, 0, 0.2);
        }

        .cap-list-container::-webkit-scrollbar, .console-container::-webkit-scrollbar { width: 4px; }
        .cap-list-container::-webkit-scrollbar-thumb, .console-container::-webkit-scrollbar-thumb { background-color: rgba(255, 255, 255, 0.2); border-radius: 4px; }

        .cap-item {
            padding: 14px 20px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.03);
            display: flex;
            flex-direction: column;
            gap: 6px;
        }

        .cap-item:last-child { border-bottom: none; }
        .cap-key { font-size: 0.75rem; font-weight: 500; color: rgba(148, 163, 184, 0.9); }
        
        .cap-value {
            font-size: 0.875rem;
            color: rgba(241, 245, 249, 1);
            word-break: break-word;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
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
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border-radius: 44px;
            box-shadow: 
                0 0 0 1px rgba(255, 255, 255, 0.1),
                0 25px 50px -12px rgba(0, 0, 0, 0.5);
            padding: 12px;
            display: flex;
        }

        .device-screen-container {
            width: 100%;
            height: 100%;
            border-radius: 32px;
            overflow: hidden;
            background: #000000;
            position: relative;
            box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.05);
        }

        .device-stream {
            width: 100%;
            height: 100%;
            object-fit: fill;
            display: block;
        }

        /* Console Logs */
        .log-line {
            font-size: 0.75rem;
            margin-bottom: 6px;
            word-break: break-word;
            line-height: 1.4;
        }
        .log-line.info { color: rgba(148, 163, 184, 0.9); }
        .log-line.warn { color: #fbbf24; }
        .log-line.error { color: #f87171; }
    </style>
</head>
<body>
    <div class="app-container">
        <!-- Left Sidebar -->
        <aside class="capabilities-panel">
            <header class="panel-header">
                <h2 class="panel-title">Session Config</h2>
            </header>
            <div class="cap-list-container">
                <div class="cap-list">
                    {{CAPABILITIES}}
                </div>
            </div>
        </aside>

        <!-- Middle Content Area -->
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
