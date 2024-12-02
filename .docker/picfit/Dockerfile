FROM golang:1.23-bookworm AS builder
LABEL stage=builder

ENV REPO=thoas/picfit

RUN apt-get update && apt-get install -y unzip \
    && wget -O /tmp/picfit.zip https://github.com/thoas/picfit/archive/refs/tags/0.14.0.zip \
    && unzip /tmp/picfit.zip -d /tmp/picfit/ \
    && mkdir -p /go/src/github.com/${REPO} \
    && cp -r /tmp/picfit/picfit-0.14.0/* /go/src/github.com/${REPO}

WORKDIR /go/src/github.com/${REPO}

RUN make docker-build-static && mv bin/picfit /picfit

###

FROM debian:buster-slim

RUN apt-get update && apt-get install -y ca-certificates

COPY --from=builder /picfit /picfit

COPY ./.docker/picfit/config.json /config.json
COPY ./.docker/picfit/config_cache.json /config_cache.json

CMD ["/picfit"]
