# opcua-monitor-backend

Repositório para código fonte da aplicação back-end do projeto OPC-UA Monitor.

<br>

Passo a passo para instalação em uma máquina virtual na plataforma Microsoft Azure:

### Criação de um resource group

Entre no portal Azure e crie um Resource Group

### Criação de uma máquina virtual

Crie uma Máquina Virtual Ubuntu 20.04 na Azure alterando as seguintes especificações:

- Availability options: No insfrastructure redundancy required
- Image: Ubuntu Server 20.04 LTS
- Select inbound ports: 80 (HTTP)

Durante o processo faça o download da chave ssh.

### Acesso à máquina virtual

Abra um terminal e acesse a máquina virtual criada alterando o inserindo o IP público da máquina:

```
  ssh -i ~/Downloads/OpcuaMonitorVM_key.pem azureuser@IP_PÙBLICO
```

### Preparação do servidor

- Faça a atualização

```
sudo apt-get update
```
###

- Instale o docker

```
curl -fsSL https://get.docker.com -o get-docker.sh
```
```
sudo sh get-docker.sh
```
```
rm get-docker.sh
```

###

- Instale o broker MQTT Mosquitto

```
sudo apt install -y mosquitto
```
```
sudo systemctl status mosquitto
```
<sub>Obs.: Pare o processo com Ctrl+C</sub> 

###

- Instale o Node.js

```
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
```
```
sudo apt-get install -y nodejs
```
###

- Instale o yarn

```
sudo npm install yarn -g
```

###

- Instale o pm2

```
sudo npm install pm2 -g
``` 

### Instalação do backend

- Clone o repositório

```
git clone https://github.com/RicardoGMiguel/opcua-monitor-backend.git
 ```
###

- Instale as dependências

```
cd opcua-monitor-backend
```
```
yarn
```
```
cd
```

###

- Prepare o servidor para executar comandos docker como usuário normal

```
sudo usermod -a -G docker $USER
```
```
exit
```

###

- Entre novamente na máquina virtual com o IP público da máquina

```
ssh -i ~/Downloads/OpcuaMonitorVM_key.pem azureuser@IP_PÙBLICO
```
  
###

- Crie um container docker para o banco de dados postgres

```
docker run --name postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=docker -e POSTGRES_DB=opcua -p 5432:5432 -d postgres
```

###

- Configuração do arquivo .env

```
cd opcua-monitor-backend
```
```
nano .env
```
Insira o seguinte código no arquivo .env

```
APP_WEB_API=http://localhost:3001/api
  
MQTT_URL=mqtt://localhost:1883
  
STORAGE_DRIVER=disk
  
MAIL_DRIVER=ethereal
  
PRODUCTION=false
POSTGRES_HOST=
POSTGRES_PORT=
POSTGRES_USER=
POSTGRES_PASS=
POSTGRES_DB=
```
<sub>Obs.: Para salvar o arquivo tecle Ctrl+O, e para sair tecle Ctrl+X</sub>

###

- Execute as migrations do banco de dados

```
yarn typeorm migration:run
```

###

- Gere os arquivos de produção do projeto
```
yarn build
```

###

- Inicie o pm2

```
pm2 start dist/shared/infra/http/server.js --restart-delay=1000 --time
```
```
pm2 save
```
```
pm2 startup
```

Copie o comando gerado no terminal e execute-o

### Liberação das portas da máquina virtual

Libere as portas 3001 que será utilizada para a API, seguindo a sequência:

  - vm azure > networking > add inbound port rule > destination port range = 3001 > priority = 330 > add

Libere a porta 1883 que será utilizada para o broker MQTT, seguindo a sequência:

   - vm azure > networking > add inbound port rule > destination port range = 1883 > priority = 340 > add














