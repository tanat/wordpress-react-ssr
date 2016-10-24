FROM node:6.9.1

RUN useradd --user-group --create-home --shell /bin/false app

ENV HOME=/home/app

COPY package.json webpack.config.js $HOME/nodeapp/
RUN chown -R app:app $HOME/*

USER app
WORKDIR $HOME/nodeapp
RUN npm install

USER root
COPY . $HOME/nodeapp
RUN chown -R app:app $HOME/*
USER app

CMD ["node", "app.js"]
