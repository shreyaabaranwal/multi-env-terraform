output "environment" {
  value = var.environment
}

output "vpc_id" {
  value = module.network.vpc_id
}

output "instance_id" {
  value = module.compute.instance_id
}

output "public_ip" {
  value = module.compute.public_ip
}

output "public_dns" {
  value = module.compute.public_dns
}

