import { Terminal } from 'https://cdn.jsdelivr.net/npm/@xterm/xterm@5.5.0/+esm';

const terminalElement = document.getElementById('terminal');
const statusElement = document.getElementById('status');
const term = new Terminal({
  cols: 80,
  rows: 24,
  convertEol: false,
  cursorBlink: false,
  disableStdin: false,
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
  fontSize: 14,
  theme: { background: '#08090c', foreground: '#e7e9ee', cursor: '#e7e9ee' }
});
term.open(terminalElement);
term.focus();
window.taxTerminal = term;

const keyCodes = {
  Enter: 0x1001,
  Backspace: 0x1002,
  ArrowUp: 0x1004,
  ArrowDown: 0x1005,
  Escape: 0x1006
};

function showError(error) {
  console.error('Tax calculator failed to start:', error);
  if (statusElement) statusElement.textContent = `Startup error: ${error?.message ?? error}. Check the browser console.`;
  term.write('\r\n\r\nStartup error. Open Developer Tools → Console for details.\r\n');
}

try {
  // This import expects Emscripten's -sMODULARIZE=1 -sEXPORT_ES6=1 output.
  const imported = await import('./taxcalc.js');
  const moduleFactory = imported.default;
  if (typeof moduleFactory !== 'function') {
    throw new Error('taxcalc.js is not an ES-module factory. Run "make clean && make".');
  }

  const Module = await moduleFactory({ noInitialRun: true });
  if (typeof Module._tb_web_key !== 'function') {
    throw new Error('Missing _tb_web_key export. Rebuild with the supplied Makefile.');
  }

  term.onKey(({ key, domEvent }) => {
    if (['ArrowUp', 'ArrowDown', 'Backspace', 'Escape'].includes(domEvent.key)) {
      domEvent.preventDefault();
    }
    const specialKey = keyCodes[domEvent.key];
    if (specialKey !== undefined) {
      Module._tb_web_key(specialKey, 0);
      return;
    }
    if (key.length === 1) {
      const code = key.charCodeAt(0);
      if (code >= 32 && code <= 126) Module._tb_web_key(0, code);
    }
  });

  term.write('Loading C/WebAssembly tax calculator...\r\n');
  Module.callMain([]);
} catch (error) {
  showError(error);
}
