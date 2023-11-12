FROM golang:1.21-bullseye as builder
LABEL stage=builder

ENV REPO=thoas/picfit

RUN apt-get update && apt-get install -y unzip \
    && wget -O /tmp/main.zip https://github.com/thoas/picfit/archive/refs/heads/main.zip \
    && unzip /tmp/main.zip -d /tmp/picfit/ \
    && mkdir -p /go/src/github.com/${REPO} \
    && cp -r /tmp/picfit/picfit-main/* /go/src/github.com/${REPO}

WORKDIR /go/src/github.com/${REPO}

RUN make docker-build-static && mv bin/picfit /picfit

###

FROM debian:buster-slim

RUN apt-get update && apt-get install -y ca-certificates

COPY --from=builder /picfit /picfit

COPY ./.docker/picfit/config.json /config.json
COPY ./.docker/picfit/config_cache.json /config_cache.json

CMD ["/picfit"]
