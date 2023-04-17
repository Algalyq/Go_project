FROM golang:1.18

WORKDIR /cmd

COPY ./go.mod .

COPY ./go.sum .

# RUN go run ./cmd/main.go
# RUN go build -o cmd

EXPOSE 8080

COPY . /cmd/

CMD ["./cmd"]