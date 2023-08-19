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
