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










