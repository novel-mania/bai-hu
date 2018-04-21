# Bai Hu - Back-End da plataforma da Novel Mania
[![Build Status](https://travis-ci.org/novel-mania/bai-hu.svg?branch=develop)](https://travis-ci.org/novel-mania/bai-hu)

## Get Started

Nós recomendamos a utilização do [Docker](https://www.docker.com/) para execução da nossa plataforma, assim você não precisará configurar seu ambiente.

### Rodando a API com Docker

- Primeiramente instale o Docker em sua máquina conforme as recomendações do site oficial.
- Clone este repositório na sua máquina.
- Entre na pasta clonada e execute:

```docker-compose up -d```

Após a execução do comando a API deve estar disponível em:

```localhost:3000```

Caso queira que o serviro seja recarregado automaticamente, execute:

```docker-compose -f docker-compose.development.yml up -d```

Qualquer modificação nos arquivos `.js` do projeto deverão recarregar o node automaticamente, pois ele estará sendo executado através de um `nodemon`, assim é só codar e seu servidor irá atualizar automaticamente.

#### Outras plataformas

Em caso de erros na composição do *Docker*, tais como:

```ERROR: no supported platform found in manifest list```

Consulte outras plataformas: [i686](i686.md).

#### Problemas com Windows

Caso você faça clone do repositório e após um ```docker-compose up -d``` recebeu a mensagem de `no such file or directory`, pode ser que seu problema seja com EOL de arquivos do Windows (CRLF). Para isso é bem simples de resolver, delete seu clone do repositorio e configure seu GIT para não clonar automáticamente com CRLF com sequinte comando:

```git config --global core.autocrlf false```

Após isso é só clonar novamente e repositório que deve resolver seu problema.

### Rodando os testes com Docker

Há um `docker-compose` para rodar os testes da aplicação, com ele haverá a criação de um container com um banco novo para testes. Esse compose irá executar as migrations e seed no banco para testes, seguido dos testes de unidade e de aceitação, e depois irá automaticamente desligar os containers para testes.

Para executar os testes é só executar o seguinte comando:

```docker-compose -f docker-compose.test.yml up --abort-on-container-exit | grep "test_1"```

### Git Flow

O projeto está usando o *Git Flow* para organizar o fluxo do projeto, portanto após clonar inicialize-o:
- Instale o [Git Flow](https://github.com/nvie/gitflow/wiki/Installation).
- Inicialize-o com as configurações padrão: `git flow init -fd`.

Para um melhor entendimento do Git Flow, utilize esse [cheatsheet](https://danielkummer.github.io/git-flow-cheatsheet/index.pt_BR.html).
