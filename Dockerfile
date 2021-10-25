FROM node:16.12.0-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY src tsconfig.json ./src/
RUN mv src/tsconfig.json tsconfig.json && \
    npm run build && \
    npm prune --production && \
    rm -rf src tsconfig.json

COPY docker/entrypoint.sh /usr/local/bin/
ENTRYPOINT [ "entrypoint.sh" ]

CMD [ "node", "dist/index.js" ]
