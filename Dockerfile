FROM node:10 as base
WORKDIR /service

FROM base as dependencies
COPY package.json yarn.lock .npmrc tsconfig.json ./
RUN yarn --pure-lockfile --ignore-engines --production true

FROM dependencies as build
RUN yarn --pure-lockfile --ignore-engines --production false
COPY . ./
RUN yarn build

FROM base as release
COPY --from=dependencies /service/node_modules ./node_modules
COPY --from=dependencies /service/package.json ./package.json
COPY --from=build /service/dist ./dist

ENV DEPLOYMENT=production
EXPOSE 3000

HEALTHCHECK CMD curl -f http://localhost:${PORT}/isAlive

ENTRYPOINT [ "yarn", "start" ]
