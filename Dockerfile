FROM node:9.11.1

RUN useradd --user-group --create-home --shell /bin/false app &&\
  npm install --global npm@5.6.0

ENV HOME=/home/app

COPY --chown=app:app package.json package-lock.json $HOME/api/

USER app
WORKDIR $HOME/api
RUN npm cache verify && npm install

USER root
COPY --chown=app:app . $HOME/api
USER app

CMD ["npm", "start"]
