#include <iostream>
#include <string>

void Identificacion();

int main(){
    Identificacion();
    return 0;
}

void Identificacion(){
    std::string user_name;
    int password;
    int trials = 0;

    while(trials < 3){
    std::cout << "Ingrese [Nombre_de_Usuario] y [Password]" << std::endl;
    std::cin >> user_name;
    std::cin >> password;

        if (user_name == "Lautaro" && password == 1234){
            std::cout << "Biendenido " << user_name << std::endl;
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