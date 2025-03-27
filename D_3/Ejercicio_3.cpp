#include <iostream>
#include <string>
#include <regex>

using namespace std;

void Identificacion();
void User_Aceptado();
void NuevaPassword();

string password = "1234";

bool ValidarPassword(const string& password){
    // Verifica la longitud
    if (password.length() < 8 || password.length() > 16)
    return false;
 
     // Verifica al menos una mayúscula
     if (!regex_search(password, regex("[A-Z]")))
     return false;
 
     // Verifica al menos dos símbolos especiales
     if (count_if(password.begin(), password.end(), [](char c) { return ispunct(c); }) < 2)
     return false;
 
     return true;
}

void Identificacion(){
    string user_name;
    string password_user;
    int trials = 0;

    while(trials < 3){
    cout << "Ingrese [Nombre_de_Usuario] y [Password]:" << endl;
    cin >> user_name;
    cin >> password_user;

        if (user_name == "Lautaro" && password_user == password){
            cout << "Biendenido " << user_name << endl;
            User_Aceptado();
            break;
        } else if(user_name != "Lautaro" || password_user != password){  // "||" es para decir "O una o la otra"
            cout << "Usuario y/o Password incorrecta" << endl;
            trials++;
            cout << "----------------" << endl;
        }
    }
        if (trials >= 3) {
            cout << "Usuario bloqueado. Contacte al administrador" << endl;
    }
}

void User_Aceptado(){
    string option = "";
    cout << "" << endl;
    cout << "Que Desea Hacer?" << endl;
    cout << "1 - Cambiar la Password" << endl;
    cout << "X - Salir" << endl;
    cout << "Ingrese Su Eleccion Aqui: ";
    cin >> option;

    if(option == "1"){
        NuevaPassword();
    } else if(option == "X"){
        cout << "Regresando a la Pantalla de Inicio de Sesion..." << endl;
        cout << "" << endl;
        Identificacion();
    } else {
        cout << "ERROR, Opcion Seleccionada no Valida, Porfavor Vuelva a Intentarlo" << endl;
        cout << "" << endl;
        User_Aceptado();
    }
}

void NuevaPassword(){
    string NewPassword;
    cout << "Ingrese la Nueva Password: ";
    cin >> NewPassword;

    ValidarPassword(NewPassword);

    if (ValidarPassword(NewPassword)) {
        cout << "La Password es Valida." << endl;
        password = NewPassword;  // Actualiza la contraseña
        cout << "Password Cambiada Exitosamente" << endl;
        User_Aceptado();
    } else {
        cout << "Contraseña no válida. Debe tener entre 8 y 16 caracteres, "
        "al menos una mayúscula y al menos 2 símbolos especiales." << endl;
    }
}

int main(){
    Identificacion();
    return 0;
}