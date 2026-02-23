# 🚀 Portfolio CI/CD Pipeline — GitHub Actions + Docker + AWS EC2

![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-blue?logo=githubactions)
![Docker](https://img.shields.io/badge/Container-Docker-2496ED?logo=docker)
![AWS](https://img.shields.io/badge/Cloud-AWS%20EC2-FF9900?logo=amazonaws)
![Nginx](https://img.shields.io/badge/Server-Nginx-009639?logo=nginx)
![Status](https://img.shields.io/badge/Status-Live-brightgreen)

A fully automated CI/CD pipeline that builds, packages, and deploys a static portfolio website to AWS EC2 — triggered automatically on every git push. Zero manual deployment steps.

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Project Structure](#-project-structure)
- [Architecture Diagram](#-architecture-diagram)
- [GitHub Secrets Setup](#-github-secrets-setup)
- [CI/CD Workflow Explanation](#-cicd-workflow-explanation)
- [Complete Flow — Start to End](#-complete-flow--start-to-end)
- [How to Run Locally](#-how-to-run-locally)
- [Screenshots](#-screenshots)

---

## 📌 Project Overview

This project demonstrates a  DevOps workflow for deploying a static portfolio website. The entire deployment process is automated — from a simple `git push` to a live running container on AWS EC2.

**Key highlights:**
- Fully automated pipeline — no manual SSH or deployment needed
- Dockerized application for consistent environments
- Hosted on AWS EC2 with public internet access
- Image versioned and stored on DockerHub

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| HTML / CSS / JS | Portfolio frontend |
| Docker + Nginx | Containerize and serve static site |
| DockerHub | Docker image registry |
| GitHub Actions | CI/CD pipeline automation |
| AWS EC2 (Amazon Linux) | Cloud server to host the app |

---

## ✅ Prerequisites

| Requirement | Details |
|---|---|
| GitHub Account | To host code and run Actions |
| DockerHub Account | To store Docker images (free) |
| AWS Account | Free tier EC2 instance |
| Docker installed locally | To build and test image |
| Git installed locally | To push code |
| AWS EC2 instance running | Amazon Linux 2, t2.micro |
| Docker installed on EC2 | `sudo yum install docker -y` |
| Port 80 open on EC2 | Security Group inbound rule |

---

## 📁 Project Structure
```
my-portfolio/
├── index.html              # Main HTML file
├── style.css               # Stylesheet
├── script.js               # JavaScript
├── Dockerfile              # Docker build instructions
└── .github/
    └── workflows/
        └── deploy.yml      # GitHub Actions CI/CD pipeline
```
---

## 🏗 Architecture Diagram
```
Developer Machine
      │
      │  git push
      ▼
┌─────────────────┐
│   GitHub Repo   │
│  (Source Code)  │
└────────┬────────┘
         │  triggers on push to main
         ▼
┌─────────────────────────────┐
│      GitHub Actions         │
│                             │
│  1. Checkout code           │
│  2. Login to DockerHub      │
│  3. Build Docker image      │
│  4. Push image to DockerHub │
│  5. SSH into EC2            │
│  6. Pull latest image       │
│  7. Restart container       │
└────────────┬────────────────┘
             │
     ┌───────┴────────┐
     │                │
     ▼                ▼
┌─────────┐    ┌─────────────────┐
│DockerHub│    │   AWS EC2       │
│ Image   │──▶│  Amazon Linux   │
│Registry │    │  Docker + Nginx │
└─────────┘    │  Port 80 open   │
               └────────┬────────┘
                        │
                        ▼
               http://<ec2-public-ip>
               🌍 Live on Internet
```

---
## 🔐 GitHub Secrets Setup

Go to repo → **Settings → Secrets and variables → Actions → New repository secret**

| Secret Name | Description |
|---|---|
| `DOCKER_USERNAME` | Your DockerHub username |
| `DOCKER_PASSWORD` | Your DockerHub password |
| `EC2_HOST` | Your EC2 public IP address |
| `EC2_KEY` | Full contents of your `.pem` key file |

---

## ⚙️ CI/CD Workflow Explanation

**Step 1 — Checkout Code**
GitHub Actions pulls the latest code from the repo into the runner environment.

**Step 2 — Login to DockerHub**
Uses `DOCKER_USERNAME` and `DOCKER_PASSWORD` secrets to authenticate with DockerHub securely.

**Step 3 — Build and Push Docker Image**
Builds a fresh Docker image from the Dockerfile and pushes it to DockerHub with the `latest` tag.

**Step 4 — Deploy to EC2 via SSH**
Uses `appleboy/ssh-action` to SSH into EC2 and runs:
- Pull latest image from DockerHub
- Stop and remove old container
- Start new container with updated image on port 80

**Result:** Every `git push` = live site updated automatically with zero manual steps.

---

## 🔄 Complete Flow — Start to End
```
Step 1 — Prepare App
   └── Clean portfolio code (HTML/CSS/JS)
   └── Create GitHub repo
   └── Push code to GitHub

Step 2 — Dockerize App
   └── Write Dockerfile (Nginx + static files)
   └── Build image locally → docker build
   └── Test locally → docker run + curl localhost:8080
   └── Confirm 200 OK ✅

Step 3 — Push to DockerHub
   └── Create DockerHub account and repo
   └── docker login
   └── docker tag → docker push
   └── Image available on DockerHub ✅

Step 4 — Setup AWS EC2
   └── Launch EC2 instance (Amazon Linux, t2.micro)
   └── Create key pair → download .pem file
   └── Open Port 22 (SSH) and Port 80 (HTTP) in Security Group
   └── SSH into EC2
   └── Install Docker on EC2
   └── Pull image from DockerHub → run container
   └── curl localhost:80 → 200 OK ✅

Step 5 — Setup GitHub Secrets
   └── Add DOCKER_USERNAME
   └── Add DOCKER_PASSWORD
   └── Add EC2_HOST (public IP)
   └── Add EC2_KEY (contents of .pem file)

Step 6 — Write GitHub Actions Pipeline
   └── Create .github/workflows/deploy.yml
   └── Push to GitHub → pipeline triggers automatically
   └── Watch Actions tab → all steps green ✅

Step 7 — Test Full Pipeline
   └── Make change in index.html
   └── git push → pipeline auto triggers
   └── New image built and pushed to DockerHub
   └── EC2 pulls new image and restarts container
   └── Live site updated automatically ✅
```

---

## 💻 How to Run Locally

**1. Clone the repo:**
```bash
git clone https://github.com/Roshni-Patil/CICD-Portfolio.git
cd CICP-Portfolio
```

**2. Build Docker image:**
```bash
docker build -t portfolio .
```

**3. Run container:**
```bash
docker run -d -p 8080:80 portfolio
```

**4. Test:**
```bash
curl -I http://localhost:8080
# Expected: HTTP/1.1 200 OK
```

**5. Stop container:**
```bash
docker stop $(docker ps -q --filter ancestor=my-portfolio)
```

---


## 📸 Screenshots

### GitHub Actions — Successful Pipeline
> <img width="1914" height="611" alt="image" src="https://github.com/user-attachments/assets/fc705979-39f5-4a51-8ad4-90b7f27a73c4" />


### Live Portfolio on EC2
> <img width="1914" height="905" alt="image" src="https://github.com/user-attachments/assets/161417ea-8571-4c4b-b241-1a63267175bc" />


---


