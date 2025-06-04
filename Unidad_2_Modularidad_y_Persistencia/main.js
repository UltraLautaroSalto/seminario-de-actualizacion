import { ApplicationModel } from './ApplicationModel.js';
import { Application } from './Application.js';

function main(){
    let model = new ApplicationModel();
    let ui = new Application(model);

    ui.init(); // Muestra los prompts al cargar
    ui.run();  // Controla reintentos
}

window.onload = main;