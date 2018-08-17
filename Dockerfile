FROM ruby:2.5

ENV RAILS_ENV production
ENV RAILS_SERVE_STATIC_FILES true
ENV RAILS_LOG_TO_STDOUT true

RUN apt-get update && \
    apt-get install -y apt-transport-https build-essential libpq-dev && \
    mkdir -p /opt/application

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    curl -sL https://deb.nodesource.com/setup_8.x | bash  - && \
    apt-get update && \
    apt-get install -y nodejs yarn

WORKDIR /opt/application

COPY ./Gemfile .
COPY ./Gemfile.lock .
COPY ./package.json .
COPY ./yarn.lock .

RUN bundle install && \
    yarn install

COPY ./ /opt/application

RUN ./bin/rails assets:precompile

EXPOSE 3000

VOLUME /opt/application/db

ENTRYPOINT ["./entrypoint.sh"]