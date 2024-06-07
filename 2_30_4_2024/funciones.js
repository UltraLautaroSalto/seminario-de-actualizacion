    function onCreateClientUserButtonClick(){
        let nombre_cliente = prompt("Introduce su Nombre");
        let clave_cliente = prompt("Introduce su Contraseña");
    
        let createClientFormData = {
            client_username: null,
            client_password: null
        };
    
        createClientFormData.client_username = nombre_cliente;
        createClientFormData.client_password = clave_cliente;
    
        fetch('./api/cliente_crear.php', { 
            method: 'post', 
            body: JSON.stringify(createClientFormData) 
        }).then(response => alert(response))
    } 

    var nombre_cliente_confirmacion;
    var clave_cliente_confirmacionStr;
function main()
{   
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    const createClientFormDataButton = document.getElementById('createClientFormData');
    createClientFormDataButton.onclick = onCreateClientUserButtonClick;
    /////////////////////////////////////////////////////////////////////////////////////////////////////////

    const opcion_1 = document.getElementById('opcion_1');
    const opcion_2 = document.getElementById('opcion_2');

    const Opcion_1_elegida = document.getElementById('Opcion_1_elegida');
    const Opcion_2_elegida = document.getElementById('Opcion_2_elegida');


    opcion_1.addEventListener("click", ()=>{
        nombre_cliente_confirmacion = prompt("Ingrese su nombre");
        clave_cliente_confirmacionStr = prompt("Ingrese su Clave");
        var clave_cliente_confirmacion = parseInt(clave_cliente_confirmacionStr);

        
        Opcion_1_elegida.classList.remove('hidden');
        Opcion_2_elegida.classList.add('hidden');
    });

    opcion_2.addEventListener("click", ()=>{
        Opcion_1_elegida.classList.add('hidden');
        Opcion_2_elegida.classList.remove('hidden');
    });
}

  

window.onload = main;
