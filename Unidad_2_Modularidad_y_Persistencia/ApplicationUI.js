class ApplicationUI
{
    constructor(apiInstanceObject)
	{
		this._api = apiInstanceObject;
	}

    show()
    {
        let userName = window.prompt("Ingrese su Nombre de Usuario:");
        let userPassword = window.prompt("Ingrese su Contraseña:");

        let api_return = this._api.authenticateUser(userName, userPassword);

        if ( api_return.status)
        {
            alert(`Usuario Autenticado Exitosamente, Bienvenido ${api_return.result.category}`);
        }
        else if ( api_return.status == false)
        {
            switch ( api_return.result)
            {
                case 'BLOCKED_USER':
                    alert('Usuario bloqueado. Contacte al Administrador');
                break;

                case 'USER_PASSWORD_FAILED':
                    alert('Usuario y/o contraseña incorrecta');
                break;

                default:
                    alert('Error desconocido');
                break;
            }
        }

        return api_return
    }
}

export { ApplicationUI };

