class ApplicationModel
{
    constructor()
    {
        this._authData = new Map();
        this._maxLoginFailedAttempts = 3;

        let users_Data = [
            {user: "admin", name: "admin123", password: "administrar123", category: "Administrador", failedLoginCounter: 0},
            {user: "cliente", name: "cliente123", password: "consumir123", category: "Cliente", failedLoginCounter: 0},
            {user: "vendedor", name: "vendedor123", password: "Bender123", category: "Vendedor", failedLoginCounter: 0},
            {user: "deposito", name: "deposito123", password: "depositar123", category: "Trabajador de depósito", failedLoginCounter: 0}  
        ];

        this._actualUser = null; 

        this._products = [
            { id: 1, name: "Lavandina x 1L", price: 875.25, stock: 3000 },
            { id: 4, name: "Detergente x 500mL", price: 1102.45, stock: 2010 },  
            { id: 22, name: "Jabón en polvo x 250g", price: 650.22, stock: 407 }
        ];

        let permisosPorRol = {
            "Administrador": ["ver_productos", "gestionar_articulos", "comprar_articulo", "cambiar_contrasena"],
            "Cliente": ["ver_productos", "comprar_articulo"],
            "Vendedor": ["ver_productos", "comprar_articulo"],
            "Trabajador de depósito": ["gestionar_articulos"]
        };

        for (let user of users_Data) {
            this._authData.set(user.name, { ...user, isLocked: false });
        }
    }

    /////////////////////////////////////////////////////////////// CUENTA ////////////////////////////////////////////////////////////////////////////////////////////
    isValidUserGetData( userName )
    {
        return this._authData.get(userName);
    }

    authenticateUser( userName, userPassword)
    {
        let api_return =
        {
            status: false,
            result: null
        };

        if ((userName !== undefined && userName !== null && userName !== '') &&
        (userPassword !== undefined && userPassword !== null && userPassword !== ''))
        {
            let userData = this.isValidUserGetData(userName);

            if( userData.isLocked == false )
            {
                if (userData.password === userPassword) {
                    api_return.status = true;
                    api_return.result = {
                        user: userData.user,
                        category: userData.category
                    };
                    this._actualUser = userData.name; // Guardamos el "name" del usuario (clave del Map)
                }
                else
                {
                    api_return.status = false;
                    api_return.result = 'USER_PASSWORD_FAILED';

                    userData.failedLoginCounter++;

                    if( userData.failedLoginCounter == this._maxLoginFailedAttempts)
                    {
                        userData.isLocked = true;
                        api_return.status = false;
                        api_return.result = 'BLOCKED_USER';
                    }
                }
            }
            else
            {
                api_return.status = false;
                api_return.result = 'BLOCKED_USER';
            }
        }

        return api_return;
    }

    getMaxLoginAttempts()
    {
        return this._maxLoginFailedAttempts;
    }

    changePassword()
    {
        const userData = this._authData.get(this._actualUser);

        if (!userData) {
            alert("Error: Usuario no autenticado.");
            return;
        }

        while (true) {
            const newPassword = window.prompt("Ingrese su nueva contraseña:");

            if (!newPassword || newPassword.trim() === '') {
                alert("Error: La contraseña no puede estar vacía.");
                continue;
            }

            const lengthValid = newPassword.length >= 8 && newPassword.length <= 16;
            const hasUppercase = /[A-Z]/.test(newPassword);
            const symbolMatches = newPassword.match(/[^a-zA-Z0-9]/g); // cuenta los símbolos
            const hasAtLeastTwoSymbols = symbolMatches && symbolMatches.length >= 2;

            if (!lengthValid) {
                alert("Error: La contraseña debe tener entre 8 y 16 caracteres.");
                continue;
            }

            if (!hasUppercase) {
                alert("Error: La contraseña debe contener al menos una letra mayúscula.");
                continue;
            }

            if (!hasAtLeastTwoSymbols) {
                alert("Error: La contraseña debe contener al menos dos símbolos especiales.");
                continue;
            }

            // Si pasó todas las validaciones, se cambia la contraseña
            userData.password = newPassword;
            alert("Contraseña cambiada exitosamente.");
            break; // salir del bucle
        }
    }

    createAccount(user, name, password, category)
    {
        const categoriasValidas = ["Administrador", "Cliente", "Vendedor", "Trabajador de depósito"];

        if (!user || !name || !password || !category) {
            alert("Error: Todos los campos son obligatorios.");
            return;
        }

        if (this._authData.has(name)) {
            alert("Error: El nombre de usuario ya está en uso.");
            return;
        }

        if (!categoriasValidas.includes(category)) {
            alert(`Error: Categoría inválida. Debe ser una de: ${categoriasValidas.join(", ")}`);
            return;
        }

        // Validación de contraseña segura
        const lengthValid = password.length >= 8 && password.length <= 16;
        const hasUppercase = /[A-Z]/.test(password);
        const symbolMatches = password.match(/[^a-zA-Z0-9]/g);
        const hasAtLeastTwoSymbols = symbolMatches && symbolMatches.length >= 2;

        if (!lengthValid || !hasUppercase || !hasAtLeastTwoSymbols) {
            alert("Error: La contraseña debe tener entre 8 y 16 caracteres, al menos una mayúscula y al menos 2 símbolos especiales.");
            return;
        }

        // Agrega el nuevo usuario
        this._authData.set(name, {
            user: user,
            name: name,
            password: password,
            category: category,
            failedLoginCounter: 0,
            isLocked: false
        });
        alert(`✅ Usuario "${name}" agregado exitosamente con categoría "${category}".`);
    }
    /////////////////////////////////////////////////////////////// CUENTA ////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////// CRUD ////////////////////////////////////////////////////////////////////////////////////////////
    showProducts() {
        let mensaje = "Lista de artículos:\n";
        this._products.forEach(p => {
            mensaje += `ID: ${p.id} | ${p.name} | $${p.price} | Stock: ${p.stock}\n`;
        });
        alert(mensaje);
    }

    NewProduct(newProductID, newProductName, newProductPrice, newProductStock)
    {
        newProductID = Number(newProductID);
        newProductPrice = Number(newProductPrice);
        newProductStock = Number(newProductStock);

         // Validaciones básicas
        if (
            isNaN(newProductID) || isNaN(newProductPrice) || isNaN(newProductStock) ||
            !newProductName || newProductPrice <= 0 || newProductStock < 0
        ) {
            alert("Datos inválidos. Asegúrese de ingresar valores correctos.");
            return;
        }

        // Verificar si ya existe un producto con ese ID
        let existe = this._products.some(p => p.id === newProductID);
        if (existe) {
            alert("Ya existe un producto con ese ID.");
            return;
        }

        this._products.push({
            id:newProductID,
            name: newProductName,
            price: newProductPrice,
            stock: newProductStock
        })
        alert("Producto agregado correctamente."); 
    }

    /////////////////////////////////////////////////////////////// CRUD ////////////////////////////////////////////////////////////////////////////////////////////
}

export { ApplicationModel };