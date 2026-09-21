resource "aws_instance" "app" {
  ami           = var.ami_id
  instance_type = var.instance_type

  subnet_id = var.subnet_id

  vpc_security_group_ids = [
    var.security_group_id
  ]

  associate_public_ip_address = true

  monitoring = var.enable_monitoring

  user_data = <<-EOF
#!/bin/bash

dnf update -y
dnf install -y nginx

systemctl enable nginx
systemctl start nginx

cat > /usr/share/nginx/html/index.html <<'HTML'
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>Multi-Environment Infrastructure</title>

  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: Arial, Helvetica, sans-serif;
      background: #f4f7fb;
      color: #1f2937;
      min-height: 100vh;
    }

    .header {
      background: #111827;
      color: white;
      padding: 35px 8%;
    }

    .header h1 {
      font-size: 32px;
      margin-bottom: 10px;
    }

    .header p {
      color: #cbd5e1;
      font-size: 16px;
    }

    .container {
      width: 84%;
      max-width: 1100px;
      margin: 40px auto;
    }

    .card {
      background: white;
      border-radius: 14px;
      padding: 30px;
      margin-bottom: 25px;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
    }

    .badge {
      display: inline-block;
      background: #2563eb;
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: bold;
      text-transform: uppercase;
      margin-bottom: 20px;
    }

    h2 {
      margin-bottom: 12px;
      color: #111827;
    }

    .status {
      color: #15803d;
      font-weight: bold;
      margin-bottom: 25px;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 18px;
    }

    .info {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 20px;
    }

    .info span {
      display: block;
      color: #64748b;
      font-size: 13px;
      margin-bottom: 8px;
    }

    .info strong {
      font-size: 18px;
      color: #111827;
    }

    .architecture {
      background: #111827;
      color: #e5e7eb;
      padding: 25px;
      border-radius: 10px;
      overflow-x: auto;
      line-height: 1.6;
      font-family: monospace;
      white-space: pre;
    }

    .tech {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 20px;
    }

    .tech span {
      background: #e5e7eb;
      color: #1f2937;
      padding: 8px 14px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: bold;
    }

    .footer {
      text-align: center;
      padding: 30px;
      color: #64748b;
      font-size: 14px;
    }
  </style>
</head>

<body>

  <header class="header">
    <h1>Multi-Environment Infrastructure</h1>
    <p>Infrastructure as Code using Terraform on AWS</p>
  </header>

  <main class="container">

    <section class="card">

      <span class="badge">
        ENVIRONMENT_PLACEHOLDER
      </span>

      <h2>
        Infrastructure Successfully Provisioned
      </h2>

      <p class="status">
        ● Deployment Status: Active
      </p>

      <div class="grid">

        <div class="info">
          <span>Environment</span>
          <strong>ENVIRONMENT_PLACEHOLDER</strong>
        </div>

        <div class="info">
          <span>Infrastructure</span>
          <strong>AWS EC2</strong>
        </div>

        <div class="info">
          <span>Provisioning</span>
          <strong>Terraform</strong>
        </div>

        <div class="info">
          <span>Web Server</span>
          <strong>Nginx</strong>
        </div>

      </div>

    </section>

    <section class="card">

      <h2>Infrastructure Architecture</h2>

      <div class="architecture">
Terraform
   |
   +-- Network Module
   |     |
   |     +-- VPC
   |     +-- Public Subnet
   |     +-- Internet Gateway
   |     +-- Route Table
   |     +-- Security Group
   |
   +-- Compute Module
         |
         +-- EC2 Instance
         +-- Nginx Web Server
      </div>

    </section>

    <section class="card">

      <h2>Technologies Used</h2>

      <div class="tech">
        <span>AWS</span>
        <span>Terraform</span>
        <span>EC2</span>
        <span>VPC</span>
        <span>Linux</span>
        <span>Nginx</span>
        <span>Infrastructure as Code</span>
      </div>

    </section>

  </main>

  <footer class="footer">
    MSE-1 Project |
    Multi-Environment Infrastructure Provisioning
    using Terraform and AWS
  </footer>

</body>
</html>
HTML

sed -i "s/ENVIRONMENT_PLACEHOLDER/${var.environment}/g" /usr/share/nginx/html/index.html

EOF

  tags = merge(
    var.common_tags,
    {
      Name = "${var.project_name}-${var.environment}-server"
    }
  )
}

