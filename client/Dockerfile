FROM node:8.4.0

ENV HOME=/home/banana

COPY package.json $HOME/banana_tcc/client/

WORKDIR $HOME/banana_tcc/client/

RUN npm install --silent && npm cache clean --force

COPY . $HOME/banana_tcc/client/
RUN npm i -g @angular/cli \
    && npm i -g typescript

EXPOSE 4200
CMD ["npm", "start"]