class ApplicationModel
{
    constructor()
    {
        this._authData = new Map();
        this._maxLoginFailedAttempts = 3;

        this._users_Data = [
            {user: "admin", name: "admin123", password: "administrar123", category: "Administrador", failedLoginCounter: 0},
            {user: "cliente", name: "cliente123", password: "consumir123", category: "Cliente", failedLoginCounter: 0},
            {user: "vendedor", name: "vendedor123", password: "Bender123", category: "Vendedor", failedLoginCounter: 0},
            {user: "deposito", name: "deposito123", password: "depositar123", category: "Trabajador de depósito", failedLoginCounter: 0}  
        ];

        this._actualUserName = null;
        this._actualUserCategory = null; 

        this._products = [
            { id: 1, name: "Lavandina x 1L", price: 875.25, stock: 3000 },
            { id: 4, name: "Detergente x 500mL", price: 1102.45, stock: 2010 },  
            { id: 22, name: "Jabón en polvo x 250g", price: 650.22, stock: 407 }
        ];

        this._permisosPorRol = {
            "Administrador": ["showProducts", "buyProduct", "EliminateProduct", "EditProduct", "NewProduct", "changePassword", "EditUserAccount", "EliminateAccount"],
            "Cliente": ["showProducts", "buyProduct", "changePassword"],
            "Vendedor": ["showProducts", "EliminateProduct", "EditProduct"],
            "Trabajador de depósito": ["NewProduct", "EditProduct"]
        };

        this._loadUsersFromLocalStorage();
        if (this._authData.size === 0) {
            for (let user of this._users_Data) {
                this._authData.set(user.name, { ...user, isLocked: false });
            }
            this._saveUsersToLocalStorage(); // guardar por primera vez
        }
        this._loadSessionUser(); // recupera sesión si existe
    }

    /////////////////////////////////////////////////////////////// CUENTA ////////////////////////////////////////////////////////////////////////////////////////////
    isValidUserGetData( userName )
    {
        return this._authData.get(userName);
    }

    authenticateUser(userName, userPassword)
    {
        let api_return = {
            status: false,
            result: null
        };

        if (userName && userPassword) {
            let userData = this._authData.get(userName);

            if (!userData) {
                api_return.result = 'USER_NOT_FOUND';
                return api_return;
            }

            if (!userData.isLocked) {
                if (userData.password === userPassword) {
                    api_return.status = true;
                    api_return.result = {
                        user: userData.user,
                        category: userData.category,
                        this:_saveSessionUser(),
                    };
                    this._actualUserName = userData.name;
                    this._actualUserCategory = userData.category;
                    userData.failedLoginCounter = 0; // reset
                } else {
                    userData.failedLoginCounter++;
                    if (userData.failedLoginCounter >= this._maxLoginFailedAttempts) {
                        userData.isLocked = true;
                        api_return.result = 'BLOCKED_USER';
                    } else {
                        api_return.result = 'USER_PASSWORD_FAILED';
                    }
                }
            } else {
                api_return.result = 'BLOCKED_USER';
            }
        }

        return api_return;
    }


    getMaxLoginAttempts()
    {
        return this._maxLoginFailedAttempts;
    }

    HavePermission(permission) {
        const categoria = this._actualUserCategory;

        if (!categoria) {
            console.warn("Categoría de usuario no definida.");
            return false;
        }

        return this._permisosPorRol[categoria]?.includes(permission) || false;
    }

    changePassword()
    {
        if (!this.HavePermission("changePassword")) {
            alert("No tiene permiso para cambiar la contraseña.");
            return;
        }

        let userData = this._authData.get(this._actualUserName);

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
            const symbolMatches = newPassword.match(/[^a-zA-Z0-9]/g);
            const hasAtLeastTwoSymbols = symbolMatches && symbolMatches.length >= 2;

            if (!lengthValid || !hasUppercase || !hasAtLeastTwoSymbols) {
                alert("Error: La contraseña debe tener entre 8 y 16 caracteres, al menos una mayúscula y al menos 2 símbolos especiales.");
                continue;
            }

            userData.password = newPassword;
            alert("Contraseña cambiada exitosamente.");
            break;
        }
    }

    createAccount(user, name, password, category)
    {
        const validCategory = ["Administrador", "Cliente", "Vendedor", "Trabajador de depósito"];

        if (!user || !name || !password || !category) {
            alert("Error: Todos los campos son obligatorios.");
            return;
        }

        if (this._authData.has(name)) {
            alert("Error: El nombre de usuario ya está en uso.");
            return;
        }

        if (!validCategory.includes(category)) {
            alert(`Error: Categoría inválida. Debe ser una de: ${validCategory.join(", ")}`);
            return;
        }

        const lengthValid = password.length >= 8 && password.length <= 16;
        const hasUppercase = /[A-Z]/.test(password);
        const symbolMatches = password.match(/[^a-zA-Z0-9]/g);
        const hasAtLeastTwoSymbols = symbolMatches && symbolMatches.length >= 2;

        if (!lengthValid || !hasUppercase || !hasAtLeastTwoSymbols) {
            alert("Error: La contraseña debe tener entre 8 y 16 caracteres, al menos una mayúscula y al menos 2 símbolos especiales.");
            return;
        }

        this._authData.set(name, {
            user: user,
            name: name,
            password: password,
            category: category,
            failedLoginCounter: 0,
            isLocked: false
        });

        this._saveUsersToLocalStorage();
        alert(`✅ Usuario "${name}" agregado exitosamente con categoría "${category}".`);
    }

    EditUserAccount(accountName, newUser, newName, newPassword, newCategory)
    {
        if (!this.HavePermission("EditUserAccount")) {
            alert("No tiene permiso para editar cuentas.");
            return;
        }

        let userData = this._authData.get(accountName);

        if (!userData) {
            alert("No se encontró un usuario con ese nombre.");
            return;
        }

        if (newUser && newUser.trim() !== '') userData.user = newUser.trim();
        if (newName && newName.trim() !== '') {
            // Si cambia el name, debemos actualizar la clave en el Map
            this._authData.delete(accountName);
            userData.name = newName.trim();
            this._authData.set(userData.name, userData);
        }
        if (newPassword && newPassword.trim() !== '') userData.password = newPassword.trim();
        if (newCategory && newCategory.trim() !== '') userData.category = newCategory.trim();

        this._saveUsersToLocalStorage();
        alert("Información del usuario actualizada exitosamente.");
    }


    EliminateAccount(accountName)
    {
        if (!this.HavePermission("EliminateAccount")) {
            alert("No tiene permiso para eliminar cuentas.");
            return;
        }

        if (!this._authData.has(accountName)) {
            alert("Usuario no encontrado.");
            return;
        }

        this._authData.delete(accountName);
        this._saveUsersToLocalStorage();
        alert("Cuenta eliminada exitosamente.");
    }
    /////////////////////////////////////////////////////////////// CUENTA ////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////// CRUD ////////////////////////////////////////////////////////////////////////////////////////////
    showProducts() {
        if (!this.HavePermission("showProducts")) {
            alert("No tiene permiso para ver los productos.");
            return;
        }

        let mensaje = "Lista de artículos:\n";
        this._products.forEach(p => {
            mensaje += `ID: ${p.id} | ${p.name} | $${p.price} | Stock: ${p.stock}\n`;
        });
        alert(mensaje);
    }

    NewProduct(newProductID, newProductName, newProductPrice, newProductStock)
    {
        if (!this.HavePermission("newProduct")) {
            alert("No tiene permiso para añadir un nuevo producto.");
            return;
        }

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

    EditProduct(modProductID, modProductName, modProductPrice, modProductStock)
    {
        if (!this.HavePermission("EditProduct")) {
            alert("No tiene permiso para Editar un Producto.");
            return;
        }

        modProductID = Number(modProductID);
        modProductPrice = Number(modProductPrice);
        modProductStock = Number(modProductStock);

        // Validaciones básicas
        if (isNaN(modProductID)) {
            alert("ID inválido.");
            return;
        }

        // Busca el producto por ID
        let product = this._products.find(p => p.id === modProductID);
        if (!product) {
            alert("Producto no encontrado.");
            return;
        }

        // Actualiza si los nuevos datos están presentes y son válidos
        if (modProductName && modProductName.trim() !== '') {
            product.name = modProductName.trim();
        }
        if (!isNaN(modProductPrice) && modProductPrice > 0) {
            product.price = modProductPrice;
        }
        if (!isNaN(modProductStock) && modProductStock >= 0) {
            product.stock = modProductStock;
        }
        alert("Producto actualizado correctamente.");
    }

    EliminateProduct(eliminateProductID) {
        if (!this.HavePermission("EliminateProduct")) {
            alert("No tiene permiso para Eliminar un Producto");
            return;
        }

        eliminateProductID = Number(eliminateProductID);

        const index = this._products.findIndex(p => p.id === eliminateProductID);
        if (index === -1) {
            alert("No existe el artículo.");
            return;
        }

        this._products.splice(index, 1);
        alert("Artículo eliminado correctamente.");
    }

    buyProduct(buyProductID, buyProductStock) {
        if (!this.HavePermission("buyProduct")) {
            alert("No tiene permiso para Comprar un Producto.");
            return;
        }

        buyProductID = Number(buyProductID);
        buyProductStock = Number(buyProductStock);

        // Validaciones básicas
        if (isNaN(buyProductID)) {
            alert("ID inválido.");
            return;
        }

        if (isNaN(buyProductStock) || buyProductStock <= 0) {
            alert("Cantidad ingresada inválida.");
            return;
        }

        // Buscar producto
        let product = this._products.find(p => p.id === buyProductID);
        if (!product) {
            alert("Producto no encontrado.");
            return;
        }

        // Verificar stock disponible
        if (buyProductStock > product.stock) {
            alert(`No hay suficiente stock disponible. Stock actual: ${product.stock}`);
            return;
        }

        // Realizar compra
        let total = product.price * buyProductStock;
        product.stock -= buyProductStock;

        alert(`Se ha comprado por un total de $${total} del producto ${product.name}`);
    }
    /////////////////////////////////////////////////////////////// CRUD ////////////////////////////////////////////////////////////////////////////////////////////
    // ------------------- PERSISTENCIA ---------------------
    _saveUsersToLocalStorage() {
        const usersArray = Array.from(this._authData.values());
        localStorage.setItem('userData', JSON.stringify(usersArray));
    }

    _loadUsersFromLocalStorage() {
        const stored = localStorage.getItem('userData');
        if (stored) {
            const users = JSON.parse(stored);
            this._authData.clear();
            users.forEach(user => {
                this._authData.set(user.name, user);
            });
        }
    }

    _saveSessionUser() {
        if (this._actualUserName && this._actualUserCategory) {
            sessionStorage.setItem('activeUser', JSON.stringify({
                name: this._actualUserName,
                category: this._actualUserCategory
            }));
        }
    }

    _loadSessionUser() {
        const stored = sessionStorage.getItem('activeUser');
        if (stored) {
            const { name, category } = JSON.parse(stored);
            this._actualUserName = name;
            this._actualUserCategory = category;
        }
    }
    // -------------------------------------------------------
}

export { ApplicationModel };

/*

| Característica  | `localStorage`                             | `sessionStorage`                           |
| --------------- | ------------------------------------------ | ------------------------------------------ |
| Duración        | Permanente (hasta que el usuario lo borre) | Temporal (mientras dure la pestaña)        |
| Alcance         | Disponible en todas las pestañas           | Sólo en la pestaña actual                  |
| Uso recomendado | Datos persistentes (usuarios, productos)   | Estado temporal de sesión (usuario activo) |

*/