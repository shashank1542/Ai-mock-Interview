# FROM node:18-alpine
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# EXPOSE 3000
# CMD npm run dev 

# ---------- Builder Stage ----------
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Accept build-time env vars
ARG NEXT_PUBLIC_DRIZZLE_DB_URL
ARG CLERK_SECRET_KEY

# Set them as environment vars for build-time access
ENV NEXT_PUBLIC_DRIZZLE_DB_URL=$NEXT_PUBLIC_DRIZZLE_DB_URL
ENV CLERK_SECRET_KEY=$CLERK_SECRET_KEY

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the full code
COPY . .

# Build the Next.js app (will use env vars defined above)
RUN npm run build

# ---------- Runner Stage ----------
FROM node:18-alpine AS runner

WORKDIR /app

# Optionally redeclare runtime envs if needed in container
ARG NEXT_PUBLIC_DRIZZLE_DB_URL
ARG CLERK_SECRET_KEY

ENV NEXT_PUBLIC_DRIZZLE_DB_URL=$NEXT_PUBLIC_DRIZZLE_DB_URL
ENV CLERK_SECRET_KEY=$CLERK_SECRET_KEY

# Copy production artifacts only
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Ensure no dev dependencies are carried over
RUN npm install --omit=dev

# Expose app port
EXPOSE 3000

# Launch the app in production mode
CMD ["npm", "start"]
