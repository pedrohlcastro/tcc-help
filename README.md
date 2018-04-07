# tcc-help
[![Build Status](https://travis-ci.org/pedrohlcastro/tcc-help.svg?branch=master)](https://travis-ci.org/pedrohlcastro/tcc-help)

## Como rodar e gerenciar Docker

USE o `manage.sh`. Se nao conseguir usar fale com esse cara [O cara](https://www.doctoralia.com.br/enfermidade/demencia-14275/especialistas/belo+horizonte-116720-1)

Atalhos, no `manage.sh`:

````
___________________________________________
*******************************************
-r ou --run Executa ambiente de Dev
-s ou --stop Força stop dos containers
-tu Roda teste unitáro
-ti Roda teste de integração
--travis Roda Ambiente Travis
--runNode Run Resetando somente NodeJS
--start Roda imagens ja armazenadas
___________________________________________
*******************************************
````

## Como Rodar o Lint em tempo real com VisualCode

* Instalar o Node local na sua maquina.
* Procure o pacote EsLint no Visual Code
* Instale o Eslint Global na sua Maquina: `npm i -g eslint`
* Instale essas dependencias (copie e cole): 

````
(export PKG=eslint-config-airbnb;npm info "$PKG@latest" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs npm install -g "$PKG@latest")
````

**Lembre-se de atualizar o `app.module.ts`**


