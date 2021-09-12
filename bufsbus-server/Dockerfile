FROM node:14-slim

COPY . /bufs-bus
WORKDIR /bufs-bus
RUN apt update && apt install curl -y
RUN npm ci --only=production
RUN npm install -g pm2

EXPOSE 3000

HEALTHCHECK --interval=10s --timeout=3s --start-period=30s --retries=1 CMD curl --fail http://localhost:3000/api || exit 1

CMD ["pm2-runtime", "start", "ecosystem.config.js", "--env", "production"]