FROM node:14-slim

COPY . /bufs-bus
WORKDIR /bufs-bus
RUN apt update && apt install curl -y
RUN npm ci --only=production
RUN npm install -g pm2

EXPOSE 3000

HEALTHCHECK --interval=5s --timeout=2s --start-period=30s CMD curl --fail http://localhost:3000/api || kill 1

CMD ["pm2-runtime", "start", "ecosystem.config.js", "--env", "production"]