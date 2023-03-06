FROM node:18-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY ./backend/BobbyBank ./BobbyBank
COPY ./backend/dist .
COPY ./backend/package* .
COPY ./frontend/BobbyApp/public ./static
RUN npm install --omit=dev
CMD [ "node", "." ]
EXPOSE 8081