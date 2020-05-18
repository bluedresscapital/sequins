FROM arm64v8/node:10-alpine as build-deps
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --network-timeout 300000 # 5 minute timeout
COPY . ./
RUN yarn build

FROM arm64v8/nginx:1.18-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
COPY --from=build-deps /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
