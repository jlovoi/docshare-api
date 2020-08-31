FROM alpine

RUN mkdir -p /srv/app/directory/docshare-api
RUN apk add nodejs && \
    apk add yarn && \
    apk add python3 && \
    apk add python3-dev && \
    apk add bash

RUN apk add --update --no-cache --virtual .build-deps \
        g++ \
        libxml2 \
        libxml2-dev && \
    apk add libxslt-dev && \
    pip3 install --no-cache-dir lxml && \
    apk del .build-deps

WORKDIR /srv/app/directory/docshare-api

COPY package.json /srv/app/directory/docshare-api
COPY yarn.lock /srv/app/directory/docshare-api

RUN yarn install

COPY . /srv/app/directory/docshare-api

EXPOSE 2599

CMD ["yarn", "start"]