# tcc-help

## Como rodar e gerenciar Docker (Backend)

Primeiramente o ambiente esta todo configurado em Docker.
Executando, na pasta raiz:

```
  ./run.sh
```

Caso precise instalar algum package, voce deve rodar npm install no docker.:

```
  ./install.sh {{NOME_DO_PACOTE}}
```

**QUALQUER MODIFICACAO NOS ARQUIVOS SERA LINKADA AUTOMATICAMENTE COM OS ARQUIVOS NO CONTAINER DOCKER**, então so rodar e programar normalmente.

## Como rodar o frontend em angular:

Pre-requisitos:

* NodeJS (recomendo usar NVM)
* Angular-cli instalado globalmente (`npm install -g @angular/cli`)

Entre na pasta `client/` e execute:

```
  npm run dev
```

Para instalar novos pacotes (execute dentro da pasta `client/`):

```
  npm install --save {{NOME_DO_PACOTE}}
```

**Lembre-se de atualizar o `app.module.ts`**


