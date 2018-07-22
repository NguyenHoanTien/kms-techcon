FROM node:10.6.0

RUN mkdir -p /api
WORKDIR /api

COPY . .
RUN npm install --production

EXPOSE 3001

CMD ["npm", "start"]
