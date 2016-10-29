FROM node:6.9.1

RUN useradd --user-group --create-home --shell /bin/false app

ENV HOME=/home/app

COPY package.json webpack.config.js $HOME/nodeapp/
COPY scripts $HOME/nodeapp/scripts

RUN chown -R app:app $HOME/*

USER app
WORKDIR $HOME/nodeapp
RUN npm install
RUN npm run build

USER root
RUN chown -R app:app $HOME/*
USER app

# webpack --watchにしたらいい？
CMD ["node", "app.js"]
