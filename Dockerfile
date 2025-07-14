FROM node:22

WORKDIR /root/app
EXPOSE 80

RUN npm install -g npm

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm i --no-cache

COPY public public
COPY src src
COPY pages pages
COPY eslint.config.mjs .
COPY jsconfig.json .
COPY next.config.js .

RUN npm run build

ENV HOST=0.0.0.0
ENV PORT=80
ENTRYPOINT ["npm", "run", "start"]
