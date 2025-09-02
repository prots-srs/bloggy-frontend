FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
# RUN npm ci --omit=dev
COPY . .
RUN npm run build


FROM node:22-alpine
# ENV NODE_ENV=production
WORKDIR /app

COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/next.config.mjs .

EXPOSE 3000
# CMD ["npx", "next", "start"]
# CMD ["npm", "run", "start"]
CMD ["npm", "start"]