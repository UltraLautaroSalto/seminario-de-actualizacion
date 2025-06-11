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
                            let userOption_2 = window.prompt(
                                "Seleccione una opción:\n1 - Cambiar Password\n2 - Gestionar Artículos\n3 - Salir"
                            );

                            switch (userOption_2) {
                                case "1":
                                    let newPassword = window.prompt(`Ingrese su nueva Contraseña`);
                                    this._api.changePassword(newPassword);
                                    break;

                                case "2":
                                    // Bucle para gestionar artículos
                                    while (true) {
                                        let productOption = window.prompt(
                                            "Gestión de artículos:\n1 - Listar Artículos\n2 - Crear Artículo\n3 - Editar Artículo\n4 - Eliminar Artículo\n5 - Volver"
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
                                                continue;
                                                break;
                                            case "3":
                                                let modProductID = window.prompt("ID del producto a modificar");
                                                let modProductName = window.prompt("Nuevo nombre");
                                                let modProductPrice = window.prompt("Nuevo precio");
                                                let modProductStock = window.prompt("Nuevo stock");

                                                this._api.EditProduct(modProductID, modProductName, modProductPrice, modProductStock);
                                                continue;
                                                break;
                                            case "4":
                                                let eliminateProductID = window.prompt("ID del producto a eliminar");
                                                this._api.EliminateProduct(eliminateProductID);
                                                continue;
                                                break;
                                            case "5":
                                                // salir de gestión de artículos
                                                break;
                                            default:
                                                alert("Opción inválida");
                                        }

                                        if (productOption === "5") break; // salir del bucle CRUD
                                    }
                                    break;

                                case "3":
                                    alert("Volviendo al inicio de sesión...");
                                    continue;
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