class ApplicationUI {
    constructor(apiInstanceObject) {
        this._api = apiInstanceObject;
    }

    show() {
        while (true) {
            let userOption = window.prompt("¿Qué desea hacer?\n1 - Iniciar Sesión\n2 - Crear Usuario");

            switch (userOption) {
                case "1":
                    let userName = window.prompt("Ingrese su Nombre de Usuario:");
                    let userPassword = window.prompt("Ingrese su Contraseña:");
                    let api_return = this._api.authenticateUser(userName, userPassword);

                    if (api_return.status) {
                        alert(`Usuario Autenticado Exitosamente, Bienvenido ${api_return.result.category}`);

                        // Bucle de menú interno
                        while (true) {
                            let userOption_2 = window.prompt("Seleccione una opción:\n1 - Gestionar Cuentas\n2 - Gestionar Artículos\n3 - Salir");

                            switch (userOption_2) {
                                case "1":
                                    // Bucle para Gestionar las Cuentas
                                    while(true) {
                                        let userOption_3 = window.prompt("Seleccione una Opcion:\n1 - Cambiar Contraseña\n2 - Crear Cuenta\n3 - Editar Cuenta\n4 - Eliminar Cuenta\n5 - Salir");
                                        switch(userOption_3){
                                            case "1":
                                                this._api.changePassword();
                                            break;
                                            case "2":
                                                let newUser = window.prompt("Ingrese su Nuevo User");
                                                let newName = window.prompt("Ingrese su Nuevo Nombre de Usuario");
                                                let newPassword = window.prompt("Ingrese su Nueva Contraseña");
                                                let newCategory = window.prompt("Ingrese su Nueva Categoria de Usuario (Administrador/Cliente/Vendedor/Trabajador de depósito");

                                                this._api.createAccount(newUser, newName, newPassword, newCategory);
                                            break;
                                            case "3":
                                                let accountName = window.prompt("Ingrese el Nombre de la Cuenta a Modificar");
                                                let newAccountUser = window.prompt("Ingrese el nuevo tipo de User del Usuario (EJ: cliente1)");
                                                let newAccountName = window.prompt("Ingrese el Nuevo Nombre de la Cuenta");
                                                let newAccountPassword = window.prompt("Ingrese la Nueva Contraseña de la Cuenta");
                                                let newAccountCategory = window.prompt("Ingrese la Nueva Categoria de la Cuenta");
                                                
                                                this._api.EditUserAccount(accountName, newAccountUser, newAccountName, newAccountPassword, newAccountCategory);
                                                break;
                                            case "4":
                                                let eliminateAccountName = window.prompt("Ingrese el Nombre de la cuenta a Eliminar");

                                                this._api.EliminateAccount(eliminateAccountName);
                                            break;
                                            case "5":
                                                // Salir y Volver a la Pantalla de Inicio de Secion
                                            break;
                                            default:
                                                alert("Error, Opcion Ingresada Erronea");
                                            break;
                                        }
                                        if (userOption_3 === "5") break;
                                    }
                                    break;

                                case "2":
                                    // Bucle para Gestionar Artículos
                                    while (true) {
                                        let productOption = window.prompt(
                                            "Gestión de artículos:\n1 - Listar Artículos\n2 - Crear Artículo\n3 - Editar Artículo\n4 - Eliminar Artículo\n5 - Comprar Articulo\n6 - Salir"
                                        );
                                        switch (productOption) {
                                            case "1":
                                                this._api.showProducts();
                                                break;
                                            case "2":
                                                let newProductID = window.prompt("Ingrese el ID");
                                                let newProductName = window.prompt("Ingrese el nombre");
                                                let newProductPrice = window.prompt("Ingrese el precio");
                                                let newProductStock = window.prompt("Ingrese el stock");

                                                this._api.NewProduct(newProductID, newProductName, newProductPrice, newProductStock);
                                                break;
                                            case "3":
                                                let modProductID = window.prompt("ID del producto a modificar");
                                                let modProductName = window.prompt("Nuevo nombre");
                                                let modProductPrice = window.prompt("Nuevo precio");
                                                let modProductStock = window.prompt("Nuevo stock");

                                                this._api.EditProduct(modProductID, modProductName, modProductPrice, modProductStock);
                                                break;
                                            case "4":
                                                let eliminateProductID = window.prompt("ID del producto a eliminar");
                                                this._api.EliminateProduct(eliminateProductID);
                                                break;
                                            case "5":
                                                let buyProductID = window.prompt("Ingrese el ID del Producto a Comprar");
                                                let buyProductStock = window.prompt("Ingrese cuantas Unidades del Producto quiere Comprar");
                                                this._api.buyProduct(buyProductID, buyProductStock);
                                            case "6":
                                                // salir de gestión de artículos
                                                break;
                                            default:
                                                alert("Opción inválida");
                                            break;
                                        }

                                        if (productOption === "6") break; // salir del bucle CRUD
                                    }
                                    break;

                                case "3":
                                    alert("Volviendo al inicio de sesión...");
                                    break;
                                default:
                                    alert("Opción inválida");
                            }
                            if (userOption_2 === "3") break; // salir del menú del usuario autenticado
                        }
                    } else {
                        switch (api_return.result) {
                            case 'BLOCKED_USER':
                                alert('Usuario bloqueado. Contacte al Administrador');
                                break;
                            case 'USER_PASSWORD_FAILED':
                                alert('Usuario y/o contraseña incorrecta');
                                break;
                            default:
                                alert('Error desconocido');
                        }
                    }
                    break;

                case "2":
                    let newUser = window.prompt("Ingrese su identificador (Ej: cliente1):");
                    let newName = window.prompt("Ingrese el nombre de usuario (Ej: cliente123):");
                    let newPassword = window.prompt("Ingrese la contraseña:");
                    let newCategory = window.prompt("Ingrese la categoría (Administrador / Cliente / Vendedor / Trabajador de depósito):");

                    this._api.createAccount(newUser, newName, newPassword, newCategory);
                    continue;

                default:
                    alert("Opción no reconocida.");
            }
        }
    }
}

export { ApplicationUI };