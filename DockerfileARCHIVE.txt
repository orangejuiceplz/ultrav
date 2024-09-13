FROM node:18-alpine
ENV NODE_ENV=production
ARG NPM_BUILD="npm install --omit=dev"
EXPOSE 8080/tcp
LABEL maintainer="xlamdashi"
LABEL summary="Custom UV Proxy Image"
LABEL description="My own custom version of the Ultraviolet Proxy to be able to be used in production"
WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN $NPM_BUILD
COPY . .
ENTRYPOINT [ "node" ]
CMD ["src/index.js"]
