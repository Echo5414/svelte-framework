import type { Plugin } from 'vite';

const customReloadPlugin: Plugin = {
  name: 'custom-reload-plugin',
  configureServer(server) {
    server.watcher.on('change', (changedPath) => {
      console.log(`File changed: ${changedPath}`);
      if (changedPath.endsWith('.svelte')) {
        server.ws.send({
          type: 'full-reload',
          path: '*'
        });
      }
    });
  }
};

export default customReloadPlugin;
