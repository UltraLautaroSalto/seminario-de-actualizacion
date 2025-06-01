import { ApplicationUI } from './ApplicationUI.js'

class Application
{
    constructor(apiInstanceObject)
    {
        this._api = apiInstanceObject;
        this._defaultView = new ApplicationUI(this._api);
        this._maxLoginFailedAttempts = this._api.getMaxLoginAttempts();
        this._attempts = 0;
        this._api_return = null;
    }

    init()
    {
        this._api_return = this._defaultView.show();
    }

    run()
    {
        while( this._api_return.result == 'USER_PASSWORD_FAILED' && this._attempts < this._maxLoginFailedAttempts )
        {
            this._api_return = this._defaultView.show();

            if ( this._api_return.result == 'USER_PASSWORD_FAILED' )
            {
                this._attempts++;
            }
        }
    }
}

export { Application };