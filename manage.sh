#! /bin/bash

# inject pre-commit script
fileName='pre-commit'
filePath=".git/hooks/$fileName"

cp pre-commit "$filePath"
chmod +x "$filePath"

# fix database folder issue
if [ "$OSTYPE" != "msys" ]; then
    if [ -d database/ -a `stat -c %A database/ | sed 's/...\(.\).\+/\1/'` != "${whoami}" ]; then
        echo 'Changing Database permissions'
        sudo chown -R $(whoami) database/
    fi
fi


if [[ $# -gt 0 ]]; then
    case "$1" in
        -h|--help)
            echo "___________________________________________"
            echo "*******************************************"
            echo "-r ou --run Executa ambiente de Dev"
            echo "-s ou --stop Força stop dos containers"
            echo "-tu Roda teste unitáro"
            echo "-ti Roda teste de integração"
            echo "--travis Roda Ambiente Travis"
            echo "___________________________________________"
            echo "*******************************************"
        ;;
        -r|--run)
            docker-compose down -v
            docker image rm -f tcchelp_app
            docker image rm -f tcchelp_angular
            docker-compose up
        ;;
        -r|--run)
            if [ -d database/ ]; then
                echo 'Changing Database permissions'
                sudo chown -R $(whoami) database/
            fi

            docker-compose down -v
            docker image rm -f tcchelp_app
            docker image rm -f tcchelp_angular
            docker-compose up
        ;;
        -s|--stop)
            docker stop tcchelp_app_1 tcchelp_phpmyadmin_1 tcchelp_mysql_1 tcchelp_angular_1
        ;;
        -tu)
            docker-compose -f docker-compose.test-unit.yml build
            docker-compose -f docker-compose.test-unit.yml up
        ;;
        -ti)
            docker-compose -f docker-compose.test-integration.yml build
            docker-compose -f docker-compose.test-integration.yml up
        ;;
        --travis)
            docker-compose up -d
        ;;
    esac
    exit 0;
else
    while [[ true ]] 
    do
        clear
        PS3='[ANIMAL] oq deseja fazer? '
        options=("Rodar Ambiente Docker" "Forçar Stop ambiente Docker" "Instalar algo no Backend" "Instalar algo no Frontend" "Gerar component do Frontend" "Gerar service do Frontend" "Sair dessa merda...")
        select opt in "${options[@]}"
        do
            case $opt in
                "Rodar Ambiente Docker")
                    docker-compose down -v
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
                    docker exec tcchelp_angular_1 npm install --save "$PACOTE"
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
fi
