FROM node:14

COPY ./package*.json /srv/
COPY ./.next /srv/.next/
COPY ./public /srv/public/
COPY ./next.config.js /srv/

WORKDIR /srv

RUN npm ci --production

CMD ["npm", "start"]
