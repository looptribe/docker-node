# docker-node

Node image suitable for local development (see on [Docker Hub](https://hub.docker.com/r/looptribe/docker-node)).

In addition to base `node` images these images contain `rsync` and `gettext-base`.

## Example commands

Build/push to docker hub:
```bash
docker build -t looptribe/docker-node:14-windows-1809 14-windows-1809
docker push looptribe/docker-node:14-windows-1809
```

You can simply use the `build-push-sh` script:
```bash
./build-push.sh <tag>
# Examples:
./build-push.sh 16
./build-push.sh 18
./build-push.sh latest
```

If you get
> denied: requested access to the resource is denied
Remember to
```bash
docker login
```

Run a container (`-it` is required to open a pseudo-tty and keep stdin open, see [docs](https://docs.docker.com/engine/reference/run/#foreground)):
```bash
docker run -it looptribe/docker-node:14-windows-1809
```
