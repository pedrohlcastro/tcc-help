FROM node:8.4.0

ENV HOME=/home/banana

COPY package.json $HOME/banana_tcc/client/

WORKDIR $HOME/banana_tcc/client/

RUN npm install --silent --progress=false && npm cache clean --force

RUN npm i -g --silent --progress=false --unsafe-perm --verbose @angular/cli

COPY . $HOME/banana_tcc/client/

EXPOSE 4200
EXPOSE 49153
CMD npm run dev