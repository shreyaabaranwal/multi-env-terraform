# Multi-Environment Infrastructure Provisioning using Terraform

A reusable Infrastructure as Code (IaC) project for provisioning multiple AWS environments — **Development, Staging, and Production** — using Terraform.

The project uses reusable Terraform modules, environment-specific configuration files, and Terraform workspaces to maintain isolated infrastructure states.

---

## Project Overview

The goal of this project is to automate AWS infrastructure provisioning across multiple environments using a single reusable Terraform codebase.

Instead of manually creating infrastructure through the AWS Console, Terraform provisions the required resources consistently and repeatably.

### Environments

- Development
- Staging
- Production

Each environment has its own:

- VPC CIDR
- Public subnet CIDR
- Availability Zone
- EC2 configuration
- Terraform state through workspaces

---

## Architecture

```text
                    Terraform
                        |
              +---------+---------+
              |                   |
        Network Module       Compute Module
              |                   |
       +------+-------+        EC2 Instance
       |      |       |            |
      VPC   Subnet   IGW          Nginx
              |
        Route Table
              |
       Security Group


Environment Configuration
        |
   +----+----+---------+
   |         |         |
  Dev     Staging     Prod
   |         |         |
 Workspace Workspace Workspace
