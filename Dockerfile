FROM node:20.11-alpine as dependencies
# Установка pnpm
RUN npm install -g pnpm
WORKDIR /app
COPY package*.json ./

RUN pnpm install

FROM node:20.11-alpine as builder
RUN npm install -g pnpm
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN pnpm run build:production

FROM node:20.11-alpine as runner
RUN npm install -g pnpm
WORKDIR /app
ENV NODE_ENV production
# If you are using a custom next.config.js file, uncomment this line.
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
EXPOSE 3000
CMD ["pnpm", "start"]
