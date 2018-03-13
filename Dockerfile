FROM node:8.4.0

ENV HOME=/home/banana

COPY package.json $HOME/banana_tcc/

WORKDIR $HOME/banana_tcc/

RUN npm install --silent && npm cache clean --force

COPY . $HOME/banana_tcc/

CMD ["npm", "start"]