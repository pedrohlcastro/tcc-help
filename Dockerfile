FROM node:8.4.0

ENV HOME=/home/banana

COPY package.json package-lock.json $HOME/banana_tcc/

WORKDIR $HOME/banana_tcc/

RUN npm install --silent

COPY . $HOME/banana_tcc/

CMD ["npm", "start"]