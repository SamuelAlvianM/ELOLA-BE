# Install dependencies
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

# Build the application
FROM node:18-alpine AS builder
WORKDIR /app
COPY . . 
COPY --from=deps /app/node_modules ./node_modules
RUN npx prisma generate # Ensure Prisma client is generated
RUN npm run build

# Production image
FROM node:18-alpine AS runner
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Set environment variables if needed
ENV DATABASE_URL=postgresql://postgres:pkYBhndFhQhiKNXwqgDtkmiweJUNMUiL@viaduct.proxy.rlwy.net:27020/railway
ENV NODE_ENV=production

CMD ["node", "dist/src/main.js"]
