FROM node:14

RUN npm ci --production

COPY . /srv

WORKDIR /srv

CMD ["npm", "start"]
