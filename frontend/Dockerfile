# Build
FROM node:10.6.0-alpine as Build
RUN mkdir -p /frontend
WORKDIR /frontend
COPY . .
RUN npm install --production
RUN npm run build

# Run
FROM nginx:1.12.2-alpine
RUN mkdir -p /frontend
WORKDIR /frontend
COPY nginx.conf /etc/nginx
COPY --from=Build /frontend/build .
EXPOSE 80
CMD nginx -g 'daemon off;'
