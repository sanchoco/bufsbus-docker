FROM node:14-slim

WORKDIR /bufs-bus
RUN apt update && apt install curl -y
RUN npm install -g pm2
COPY . /bufs-bus
RUN npm ci --only=production

EXPOSE 3000

HEALTHCHECK --interval=10s --timeout=5s --start-period=30s CMD curl --fail http://localhost:3000/api || kill 1

CMD ["pm2-runtime", "start", "ecosystem.config.js", "--env", "production"]