FROM node:6.9.1

RUN useradd --user-group --create-home --shell /bin/false app

ENV HOME=/home/app

COPY scripts $HOME/nodeapp

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
