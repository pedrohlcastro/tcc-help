#! /bin/bash

fileName='pre-commit.sh'
filePath=".git/hooks/$fileName"
touch "$filePath"
echo "echo 'Belo Commit'   " >> "$filePath"

chmod +x "$filePath"


while [[ true ]]
do
    clear
    PS3='[ANIMAL] oq deseja fazer? '
    options=("Rodar Ambiente Docker" "Forçar Stop ambiente Docker" "Instalar algo no Backend" "Instalar algo no Frontend" "Gerar component do Frontend" "Gerar service do Frontend" "Sair dessa merda...")
    select opt in "${options[@]}"
    do
        case $opt in
            "Rodar Ambiente Docker")
                docker-compose down
                docker image rm -f tcchelp_app
                docker image rm -f tcchelp_angular
                docker-compose up
                break
                ;;
            "Forçar Stop ambiente Docker")
                docker stop tcchelp_app_1 tcchelp_phpmyadmin_1 tcchelp_mysql_1 tcchelp_angular_1
                break
                ;;
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
