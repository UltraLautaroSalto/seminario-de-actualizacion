import { ApplicationModel } from './ApplicationModel.js';
import { Application } from './Application.js';

window.addEventListener('DOMContentLoaded', () => {
    let model = new ApplicationModel();
    let ui = new Application(model);

    app.init(); // Muestra los prompts al cargar
    app.run();  // Controla reintentos
});

window.onload = main;