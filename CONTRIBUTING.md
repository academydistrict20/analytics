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

# Add the analytics.dev host for the minikube ip
sudo hosts remove *.analytics.dev --force
sudo hosts add `minikube ip` analytics.dev
sudo hosts add `minikube ip` api.analytics.dev
```

### Step 5. Install [mkcert](https://github.com/FiloSottile/mkcert#installation) and create a certificate

```bash
# Install mkcert
brew install mkcert
# If you use Firefox (optional)
brew install nss

# Generate and install certificates
mkcert -install
mkcert analytics.dev '*.analytics.dev'
```

### Step 6. Configure the certificate in your Kubernetes installation

Create a secret with TLS certificate/key and add it to your loccal Kubernetes cluster

```bash
kubectl create secret tls tls-analytics-dev --key analytics.dev+1-key.pem --cert analytics.dev+1.pem
```

## Build & deploy to Kubernetes cluster

We use [garden](https://garden.io) to watch for changes and do re-builds, re-deploys, and re-tests automatically with one command.

```bash
garden dev
```
