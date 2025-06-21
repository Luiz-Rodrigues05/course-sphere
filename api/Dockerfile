# Passo 1: Usar a imagem oficial do Node.js como base
FROM node:16

# Passo 2: Definir diretório de trabalho
WORKDIR /api

# Passo 3: Instalar dependências do JSON Server
RUN npm install -g json-server

# Passo 4: Copiar o arquivo db.json
COPY db.json /api/db.json

# Passo 5: Expor a porta 5000 para o JSON Server
EXPOSE 5000

# Passo 6: Iniciar o JSON Server
CMD ["json-server", "--watch", "/api/db.json", "--port", "5000"]
