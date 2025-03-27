#include <iostream>
#include <string>

void Identificacion();
void User_Aceptado();

int password = 1234;

int main(){
    Identificacion();
    return 0;
}

void Identificacion(){
    std::string user_name;
    int password_user;
    int trials = 0;

    while(trials < 3){
    std::cout << "Ingrese [Nombre_de_Usuario] y [Password]" << std::endl;
    std::cin >> user_name;
    std::cin >> password_user;

        if (user_name == "Lautaro" && password_user == password){
            std::cout << "Biendenido " << user_name << std::endl;
            User_Aceptado();
            break;
        } else if(user_name != "Lautaro" || password != 1234){  // "||" es para decir "O una o la otra"
            std:: cout << "Usuario y/o Password incorrecta" << std::endl;
            trials++;
            std::cout << "----------------" << std::endl;
        }
    }
        if (trials >= 3) {
            std:: cout << "Usuario bloqueado. Contacte al administrador" << std::endl;
    }
}

void User_Aceptado(){
    std::string option = 0;
    std::cout << "" << std::endl;
    std::cout << "Que Desea Hacer?" << std::endl;
    std::cout << "1 - Cambiar la Password" << std::endl;
    std::cout << "X - Salir" << std::endl;
    std::cout << "Ingrese Su Eleccion Aqui: ";
    std::cin >> option;

    if(option == "1"){
        std::cout << "Ingrese la Nueva Password: ";
        std::cin >> password;
        std::cout << "" << std::endl;
        std::cout << "Password Cambiada Exitosamente" << std::endl;
    } else if(option == "X"){
        std::cout << "Regresando a la Pantalla de Inicio de Secion..." << std::endl;
        std::cout << "" << std::endl;
        Identificacion();
    } else {
        std::cout << "ERROR, Opcion Seleccionada no Valida, Porfavor Vuelva a Intentarlo" << std::endl;
        std::cout << "" << std::endl;
        std::cout << "Ingrese Su Eleccion Aqui: ";
        std::cin >> option;
    }
}