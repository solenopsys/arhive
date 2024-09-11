FROM ghcr.io/puppeteer/puppeteer:latest

WORKDIR /app

COPY package-lock.json ./
COPY package.json ./
COPY tsconfig.json ./

RUN npm install

COPY src/index.ts ./
COPY src/client.ts ./
COPY src/conf.ts ./
COPY src/spider.ts ./
COPY src/tools.ts ./

CMD ["node","--require","ts-node/register", "/app/index.ts"]
