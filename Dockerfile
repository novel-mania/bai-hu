FROM node:9.11.1

RUN useradd --user-group --create-home --shell /bin/false app &&\
  npm install --global npm@5.6.0

ENV HOME=/home/app

COPY package.json package-lock.json $HOME/api/
RUN chown -R app:app $HOME/*

USER app
WORKDIR $HOME/api
RUN npm cache verify && npm install

USER root
COPY . $HOME/api
RUN chown -R app:app $HOME/*
USER app

CMD ["npm", "start"]
