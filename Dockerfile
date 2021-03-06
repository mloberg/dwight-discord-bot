FROM node:14.16.1-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build && \
    npm prune --production && \
    rm -rf src tsconfig.json

CMD [ "npm", "start", "--silent" ]
