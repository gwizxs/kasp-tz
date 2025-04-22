FROM node:22-alpine as builder

WORKDIR /app

COPY package* .
RUN npm ci
COPY . .
RUN npm run build

FROM gcr.io/distroless/nodejs22-debian12
COPY --from=builder /app /app
WORKDIR /app

CMD ["npm", "run", "dev"]