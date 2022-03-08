FROM node:14.17.0

LABEL version="1.0"
LABEL description="This is the base docker image for ERMS frontend"
LABEL maintainer = ["vysakh.velloor@gmail.com"]

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install --production

COPY . .

EXPOSE 3005

CMD ["npm", "start"]