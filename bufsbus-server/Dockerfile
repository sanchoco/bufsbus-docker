FROM node:14-slim

COPY . /bufs-bus
WORKDIR /bufs-bus

RUN npm ci --only=production
RUN npm install -g pm2

EXPOSE 3000

CMD ["pm2-runtime", "index.js"]