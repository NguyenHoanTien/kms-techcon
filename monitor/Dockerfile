FROM node:10.6.0-alpine

RUN mkdir -p /monitor
WORKDIR /monitor

COPY . .
RUN npm install --production

EXPOSE 3002

CMD ["npm", "start"]
