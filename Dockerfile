# FROM node:18-alpine
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# EXPOSE 3000
# CMD npm run dev 

#previous dockerfile content
# ---- Builder Stage ----
FROM node:18-alpine AS builder

WORKDIR /app

# Copy only necessary files first to leverage Docker caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the code
COPY . .

# Build the Next.js app
RUN npm run build

# ---- Runner Stage ----
FROM node:18-alpine AS runner

WORKDIR /app

# Copy only the build output and dependencies
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Only install production dependencies (if any extra dev deps were there)
RUN npm install --omit=dev

# Port Next.js runs on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]