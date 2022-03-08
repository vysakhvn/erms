FROM node:14.17.0

LABEL version="1.0"
LABEL description="This is the base docker image for ERMS backend"
LABEL maintainer = ["vysakh.velloor@gmail.com"]

WORKDIR /app

COPY package.json .
COPY package-lock.json .
COPY prisma prisma
COPY .env .

RUN npm install --production

COPY . .

EXPOSE 3010

CMD ["npm", "start"]