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
void Opciones_Productos();

string User_Name = "Lautaro";
string password = "1234";


////////////////////////////////////////////////////////////////////////////////////////////////////////////
struct Productos {
    int Id_Producto;
    string Nombre_Producto;
    float Precio_Producto;
    int Stock_Producto;
};

vector<Productos> productos = { 
    {1, "Lavandina 1L", 875.25, 3000},
    {2, "Detergente x 500mL", 1102.45, 2010},
    {3, "Jabón en polvo x 250g", 650.22, 407}
};

void Enlistar_Productos(const vector<Productos>& productos){

    if(productos.empty()){
        cout << "ERROR, NO SE ENCONTRO NINGUN PRODUCTO REGISTRADO" << endl;
        return;
    }

    for(const auto& Productos : productos){
    cout << "<--------------------------->" << endl;
    cout << "ID: " << Productos.Id_Producto << endl;
    cout << "Nombre Del Articulo: " << Productos.Nombre_Producto << endl;
    cout << "Precio Del Producto: " << Productos.Precio_Producto << endl;
    cout << "Cantidad en Stock: " << Productos.Stock_Producto << endl;
    }

    cout << endl << endl << endl;
    Opciones_Productos();
}

void Add_Producto(vector<Productos>& productos, int& siguienteID){
    Productos Nuevo;
    Nuevo.Id_Producto = siguienteID++;
    cout << "Ingrese el Nombre del Nuevo Producto: ";
    cin >> Nuevo.Nombre_Producto;
    cout << endl << "Ingrese el Precio del Nuevo Producto: ";
    cin >> Nuevo.Precio_Producto;
    cout << endl << "Ingrese el Stock del Nuevo Producto: ";
    cin >> Nuevo.Stock_Producto;

    productos.push_back(Nuevo);
    cout << "Producto Ingreso Exitosamente\n" << endl;

    Opciones_Productos();
}

void Modify_Producto(vector<Productos>& productos, int id){
    for(auto& Productos : productos){
        if(Productos.Id_Producto == id){
            cout << "Ingrese el Nuevo Nombre del Articulo: ";
            cin >> Productos.Nombre_Producto;
            cout << "Ingrese el Nuevo Precio del Articulo: ";
            cin >> Productos.Precio_Producto;
            cout << "Ingrese el Nuevo Stock Del Articulo: ";
            cin >> Productos.Stock_Producto;
            Opciones_Productos();
        }
    }
    cout << "ERROR: Producto No Encontrado" << endl;
}

void Remove_Producto(vector<Productos>& productos, int id){
    for(auto it = productos.begin(); it != productos.end(); ++it){
        if(it->Id_Producto == id){
            productos.erase(it);
            cout << "Producto Eliminado Exitosamente" << endl;
            Opciones_Productos();
        }
    }
    cout << "ERROR: Producto No Encontrado" << endl;
}

void Opciones_Productos(){

    int siguienteID = 4;
    string Opciones_Product = "";
    cout << "Opciones:" << endl;
    cout << "1 - Listar Articulos" << endl;
    cout << "2 - Nuevo Articulo" << endl;
    cout << "3 - Editar Articulo" << endl;
    cout << "4 - Eliminar Articulo" << endl;
    cout << "X - Salir" << endl;
    cout << "Eleccion: ";
    cin >> Opciones_Product;
    cout << "" << endl;

    if(Opciones_Product == "1"){
        Enlistar_Productos(productos);
    }else if (Opciones_Product == "2"){
        Add_Producto(productos, siguienteID);
    }else if (Opciones_Product == "3"){
        int id;
        cout << "Ingrese el ID del Articulo a Modificar: ";
        cin >> id;
        Modify_Producto(productos, id);
    }else if (Opciones_Product == "4"){
        int id;
        cout << "Ingrese el ID del Articulo a Eliminar: ";
        cin >> id;
        Remove_Producto(productos, id);
    }else if (Opciones_Product == "X"){
        User_Aceptado();
    }else{
        cout << "ERROR DESCONOCIDO, PORFAVOR REINICIE EL SISTEMA" << endl;
    }
    
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
    cout << "2 - Gestionar Articulos de Limpieza" << endl;
    cout << "X - Salir" << endl;
    cout << "Ingrese Su Eleccion Aqui: ";
    cin >> option;

    if(option == "1"){
        NuevaPassword();
    } else if(option == "2"){
        Opciones_Productos();
    }else if(option == "X"){
        cout << "Regresando a la Pantalla de Inicio de Sesion..." << endl;
        cout << "" << endl;
        Identificacion();
    } else {
        cout << "ERROR, Opcion Seleccionada no Valida, Porfavor Vuelva a Intentarlo" << endl;
        cout << "" << endl;
        User_Aceptado();
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////


void Inicio(){
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
}

int main(){
    Inicio();
    return 0;
}