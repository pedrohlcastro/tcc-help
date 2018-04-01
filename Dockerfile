FROM node:8.4.0

ENV HOME=/home/banana

COPY package.json $HOME/banana_tcc/

WORKDIR $HOME/banana_tcc/

RUN npm install --silent --progress=false && npm cache clean --force

COPY . $HOME/banana_tcc/

EXPOSE 8000

CMD ["npm", "start"]
