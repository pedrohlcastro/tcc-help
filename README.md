# tcc-help

## Como rodar e gerenciar Docker

Primeiramente o ambiente esta todo configurado em Docker.
Executando, na pasta raiz (RODE O BUILD E O DOWN -V):

```
  docker-compose down -v
  docker-compose build
  docker-compose up
```

OBS: O down -v se faz necessário no momento.

Caso precise instalar algum package, voce deve rodar npm install no docker.:

```
  docker-compose exec tcchelp_app_1 npm install --save NOME_PACKAGE
```

**QUALQUER MODIFICACAO NOS ARQUIVOS SERA LINKADA AUTOMATICAMENTE COM OS ARQUIVOS NO CONTAINER DOCKER**, então so rodar e programar normalmente.
