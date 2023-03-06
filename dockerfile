FROM node:18-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY ./backend/BobbyBank ./BobbyBank
COPY ./backend/dist .
COPY ./backend/package* .
RUN yarn install --production
CMD [ "node", "." ]
EXPOSE 8081