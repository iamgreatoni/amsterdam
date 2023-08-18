FROM node:18-alpine

# Installing libvips-dev for sharp Compatibility
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /opt/
# COPY package.json package-lock.json* ./
COPY ./ ./
ENV PATH /opt/node_modules/.bin:$PATH
RUN npm install
# RUN npm audit fix
WORKDIR /opt/app
COPY ./ .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]