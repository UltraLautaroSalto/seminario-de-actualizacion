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

        let products = [
            { id: 1, name: "Lavandina x 1L", price: 875.25, stock: 3000 },
            { id: 4, name: "Detergente x 500mL", price: 1102.45, stock: 2010 },  
            { id: 22, name: "Jabón en polvo x 250g", price: 650.22, stock: 407 }
        ];

        this._permisosPorRol = {
            "Administrador": ["ver_productos", "gestionar_articulos", "comprar_articulo", "cambiar_contrasena"],
            "Cliente": ["ver_productos", "comprar_articulo"],
            "Vendedor": ["ver_productos", "comprar_articulo"],
            "Trabajador de depósito": ["gestionar_articulos"]
        };

        for (let user of users_Data) {
            this._authData.set(user.name, { ...user, isLocked: false });
        }
    }

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
                if( userData.password === userPassword)
                {
                    api_return.status = true;
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
}

export { ApplicationModel };