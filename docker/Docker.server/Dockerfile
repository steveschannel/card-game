FROM python:3.8.5

ENV PYTHONUNBUFFERED 1

RUN apt-get update && apt-get install -y \
    sudo && apt-get install -y \
    git \
    nginx \
    postgresql-client \
    python-psycopg2 \
    supervisor
RUN python3 -m pip install poetry
RUN python3 -m pip install gunicorn

RUN mkdir /code
WORKDIR /code/server

RUN rm /etc/supervisor/supervisord.conf && \
    ln -s /code/docker/Docker.server/supervisord.conf /etc/supervisor/supervisord.conf && \
    rm /etc/nginx/nginx.conf && \
    ln -s /code/docker/Docker.server/nginx.conf /etc/nginx/nginx.conf && \
    mkdir -p /var/log/supervisor && \
    mkdir -p /var/log/gunicorn && \
    mkdir -p /code/logs/supervisord

ADD server /code/server
ADD .env /code
ADD docker /code/docker

# Install python requirements
RUN poetry install

RUN groupadd -r app -g 1000 && \
    useradd -u 1000 -r -g app -d /code -s /bin/bash -c "Docker image user" app
RUN chown -R app:app /code && \
    chown -R app:app /var/run && \
    chown -R app:app /var/log/gunicorn

EXPOSE 5000

ENTRYPOINT ["/bin/bash", "/code/docker/Docker.server/entrypoint.sh"]
CMD ["development"]
