FROM alpine

RUN mkdir -p /srv/app/directory/docshare-api
RUN apk add nodejs && \
    apk add yarn && \
    apk add python3

WORKDIR /srv/app/directory/docshare-api

COPY package.json /srv/app/directory/docshare-api
COPY yarn.lock /srv/app/directory/docshare-api

RUN yarn install

COPY . /srv/app/directory/docshare-api

EXPOSE 8000

CMD ["yarn", "start"]