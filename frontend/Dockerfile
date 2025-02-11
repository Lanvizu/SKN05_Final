FROM node:22
WORKDIR /frontend
RUN curl -o- -L https://yarnpkg.com/install.sh | bash \
    && export PATH="$HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH"
ENV DANGEROUSLY_DISABLE_HOST_CHECK=true
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build
CMD ["yarn", "start"]
