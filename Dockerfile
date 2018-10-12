# Deploy
FROM node

MAINTAINER evi0s <wc810267705@163.com>

# Set node env
ENV NODE_ENV production

# Add Workdir
ADD . /app

WORKDIR /app

# Executable
RUN chmod +x /app/deploy/entrypoint.sh

# EntryPoint
ENTRYPOINT /app/deploy/entrypoint.sh
