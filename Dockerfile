# build react frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app/react
COPY react/package*.json ./
RUN npm install
COPY react ./
RUN npm run build

# build express backend:
FROM node:20-alpine
WORKDIR /app
COPY node/package*.json .
RUN npm install
COPY node .
RUN npm run build
COPY --from=frontend-builder /app/react/dist dist/react-build

EXPOSE 3000

CMD ["npm", "start"]