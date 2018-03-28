#! /bin/bash

# Bash Menu Script Example

while [[ true ]]
do
    clear
    PS3='[ANIMAL] oq deseja fazer? '
    options=("Instalar algo no Backend" "Instalar algo no Frontend" "Gerar component do Frontend" "Gerar service do Frontend" "Sair dessa merda...")
    select opt in "${options[@]}"
    do
        case $opt in
            "Instalar algo no Backend")
                read -p "Nome do pacote : " PACOTE
                docker exec tcchelp_app_1 npm install --save "$PACOTE"
                break
                ;;
            "Instalar algo no Frontend")
                read -p "Nome do pacote : " PACOTE
                docker exec tcchelp_app_1 npm install --save "$PACOTE"
                break
                ;;
            "Gerar component do Frontend")
                read -p "Nome do COMPONENT : " COMPONENT
                docker exec tcchelp_angular_1 ng g component components/"$COMPONENT"
                break
                ;;
            "Gerar service do Frontend")
                read -p "Nome do SERVICE : " COMPONENT
                docker exec tcchelp_angular_1 ng g service services/"$SERVICE"
                break
                ;;
            "Sair dessa merda...")
                echo "FLW ANIMAL...."
                exit;
                ;;
            *) echo "OOO JUMENTO.... NAOO TEM ESSA OPCAO NAO PORRA";;
        esac
    done
done
