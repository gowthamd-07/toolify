# Base image: nginx version nginx/1.23.1
FROM nginx:latest
# Install dependencies
RUN apt-get update -qq && apt-get -y install apache2-utils curl build-essential

# Copy Nginx config template
ADD docker/web/webserver.conf /etc/nginx/conf.d/default.conf
ADD docker/web/nginx.conf /etc/nginx/nginx.conf

#Log Config
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log

EXPOSE 8080

# Use the "exec" form of CMD so Nginx shuts down gracefully on SIGTERM (i.e. `docker stop`)
CMD [ "nginx", "-g", "daemon off;" ]