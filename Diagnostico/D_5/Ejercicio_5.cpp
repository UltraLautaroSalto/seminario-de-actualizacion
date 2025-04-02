#include <iostream>
#include <string>
#include <regex>

using namespace std;

void Identificacion();
void User_Aceptado();
void NuevaPassword();
void CreateNewAccount();
void CrearUserName();
void CrearUserPassword();

string User_Name = "Lautaro";
string password = "1234";

struct Productos {
    int Id_Producto;
    string Nombre_Producto;
    float Precio_Producto;
    int Stock_Producto;
};

void Productos_Datos(){
    Productos Producto_1 = {1, "Lavandina 1L", 875.25, 3000};
    Productos Producto_2 = {4, "Detergente x 500mL", 1102.45, 2010};
    Productos Producto_3 = {22, "Jabón en polvo x 250g", 650.22, 407};
}

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

bool ValidarUserName(const string& User_Name){
    // Verifica la longitud
    if (User_Name.length() < 8 || User_Name.length() > 16)
    return false;
 
     // Verifica al menos una mayúscula
     if (!regex_search(User_Name, regex("[A-Z]")))
     return false;
 
     // Verifica al menos dos símbolos especiales
     if (count_if(User_Name.begin(), User_Name.end(), [](char c) { return ispunct(c); }) < 2)
     return false;
 
     return true;
}

void Identificacion(){
    string Ident_user_name;
    string Ident_password_user;
    int trials = 0;

    while(trials < 3){
    cout << "Ingrese [Nombre_de_Usuario] y [Password]:" << endl;
    cin >> Ident_user_name;
    cin >> Ident_password_user;

        if (Ident_user_name == User_Name && Ident_password_user == password){
            cout << "Biendenido " << Ident_user_name << endl;
            User_Aceptado();
            break;
        } else if(Ident_user_name != User_Name || Ident_password_user != password){  // "||" es para decir "O una o la otra"
            cout << "Usuario y/o Password incorrecta" << endl;
            trials++;
            cout << "----------------" << endl;
        }
    }
        if (trials >= 3) {
            cout << "Usuario bloqueado. Contacte al administrador" << endl;
    }  else {
        cout << "[ERROR CRITICO] PORVAFOR REINICIE EL SISTEMA!" << endl;
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

void CreateNewAccount(){
    CrearUserName();
    CrearUserPassword();
    cout << "Cuenta Creada Exitosamente" << endl;
    cout << "" << endl;
    Identificacion();
}

void CrearUserName(){
    string NewUser_Name;
    string NewUser_Password;

    cout << "Ingrese su Nombre de Usuario: ";
    cin >> NewUser_Name;
    ValidarUserName(NewUser_Name);

    if (ValidarUserName(NewUser_Name)) {
        cout << "El Nombre de Usuario es Valido." << endl;
        User_Name = NewUser_Name;  // Actualiza la contraseña
        cout << "Nombre de Usuario Creado Exitosamente" << endl;
    } else {
        cout << "Nombre no válida. Debe tener entre 8 y 16 caracteres, "
        "al menos una mayúscula y al menos 2 símbolos especiales." << endl;
    }
}

void CrearUserPassword(){
    string CreatePassword;
    cout << "Ingrese la Password de Usuario: ";
    cin >> CreatePassword;

    ValidarPassword(CreatePassword);

    if (ValidarPassword(CreatePassword)) {
        cout << "La Password es Valida." << endl;
        password = CreatePassword;  // Actualiza la contraseña
        cout << "Password Cambiada Exitosamente" << endl;
    } else {
        cout << "Contraseña no válida. Debe tener entre 8 y 16 caracteres, "
        "al menos una mayúscula y al menos 2 símbolos especiales." << endl;
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
    int option_user = 0;
    cout << "Que Desea Hacer?" << endl;
    cout << "1 - Iniciar Sesion" << endl;
    cout << "2 - Crear Nueva Cuenta" << endl;
    cout << "Ingrese su Opcion aqui: ";
    cin >> option_user;

    switch (option_user)
    {
    case 1:
        Identificacion();
        break;
    case 2:
        CreateNewAccount();
        break;
    default:
        cout << "ERROR, OPCION INVALIDA" << endl;
    }
    return 0;
}