FROM golang:1.16-buster as builder
LABEL stage=builder

ENV REPO=thoas/picfit

RUN apt-get update && apt-get install -y unzip

RUN wget -O /tmp/master.zip https://github.com/thoas/picfit/archive/refs/heads/master.zip \
    && unzip /tmp/master.zip -d /tmp/picfit/ \
    && mkdir -p /go/src/github.com/${REPO} \
    && cp -r /tmp/picfit/picfit-master/* /go/src/github.com/${REPO}

WORKDIR /go/src/github.com/${REPO}

RUN make docker-build-static && mv bin/picfit /picfit

###

FROM debian:buster-slim

RUN apt-get update && apt-get install -y ca-certificates

COPY --from=builder /picfit /picfit

COPY ./.docker/picfit/config.json /config.json
COPY ./.docker/picfit/config_cache.json /config_cache.json

CMD ["/picfit"]