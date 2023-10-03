FROM node:14-slim

WORKDIR /bufs-bus
RUN apt update && apt install curl -y
COPY . /bufs-bus
RUN npm ci --only=production

EXPOSE 3000

HEALTHCHECK --interval=10s --timeout=5s --start-period=30s CMD curl --fail http://localhost:3000 || kill 1

CMD ["npm", "start"]