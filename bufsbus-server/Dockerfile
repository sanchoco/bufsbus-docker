FROM node:14-slim

COPY . /bufs-bus
WORKDIR /bufs-bus

RUN npm install
RUN npm install -g pm2

EXPOSE 3000

CMD ["npm", "run", "prod"]