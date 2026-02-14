# FROM node:18-alpine
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# EXPOSE 3000
# CMD npm run dev 

# ---------- Builder Stage ----------
FROM node:18-alpine AS builder

WORKDIR /app

# Accept safe build-time-only arg
ARG NEXT_PUBLIC_DRIZZLE_DB_URL
ENV NEXT_PUBLIC_DRIZZLE_DB_URL=$NEXT_PUBLIC_DRIZZLE_DB_URL

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy full source code
COPY . .

# Build the optimized production bundle
RUN npm run build

# ---------- Runner Stage ----------
FROM node:18-alpine AS runner

WORKDIR /app

# Optional: set production mode (safe to expose)
ENV NODE_ENV=production

# Copy build artifacts
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

RUN npm install --omit=dev

EXPOSE 3000
CMD ["npm", "start"]

