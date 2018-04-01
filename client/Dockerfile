FROM node:8.4.0

ENV HOME=/home/banana

COPY package.json $HOME/banana_tcc/client/

WORKDIR $HOME/banana_tcc/client/

RUN npm install --silent --progress=false && npm cache clean --force

COPY . $HOME/banana_tcc/client/
RUN npm i -g @angular/cli

EXPOSE 4200
EXPOSE 49153
CMD npm run dev