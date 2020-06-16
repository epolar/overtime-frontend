FROM node as builder
WORKDIR /app
COPY . .
RUN yarn && yarn run build

FROM node
RUN npm install -g serve
WORKDIR /app
COPY --from=builder /app/build .
CMD ["serve", "-p", "8001", "-s", "."]