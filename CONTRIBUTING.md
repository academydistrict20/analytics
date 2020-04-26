# Contributing to Analytics

## Local Development Setup (MacOS)

### Step 1. Install and start Docker Dekstop

Used as the hypervisor(hyperkit) for running containers in Kubernetes
<https://www.docker.com/products/docker-desktop>

### Step 2. Install [minikube](https://minikube.sigs.Kubernetes.io/docs/)

Simplified local Kubernetes cluster

```bash
# Install using Homebrew
brew install minikube
# Start local cluster
minikube start
```

### Step 3. Install [garden](https://garden.io)

Manages the dev, build, push, deploy process

```bash
# Install using Homebrew
brew tap garden-io/garden
brew install garden-cli
```

### Step 4. Install and configure hosts [hosts](https://github.com/xwmx/hosts)

This will enable services to run locally over TLS on *.analytics.dev

```bash
# Install hosts A CLI for managing your machine's `/etc/hosts` file
brew install xwmx/taps/hosts

# Add a host
hosts add 127.0.0.1 analytics.dev
```

### Step 5. Install [mkcert](https://github.com/FiloSottile/mkcert#installation) and create a certificate

```bash
# Install mkcert
brew install mkcert
brew install nss # if you use Firefox

# Generate and install certificates
mkcert -install
mkcert analytics.dev '*.analytics.dev'
```

### Step 6. Configure the certificate in your Kubernetes installation

```bash
kubectl create secret tls tls-analytics-dev --key analytics.dev+1-key.pem --cert analytics.dev+1.pem
```

## Build & deploy to Kubernetes cluster

We use [garden](https://garden.io) to watch for changes and do re-builds, re-deploys, and re-tests automatically with one command.

```bash
garden dev
```
