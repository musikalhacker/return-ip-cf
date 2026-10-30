# return-ip-cf

Cloudflare Worker that returns the visitor’s public IP address.

Deployed with Terraform to a free Cloudflare Workers account and attached to crypty.xyz.

## What it does

- Serves a minimal page showing the caller’s public IP (via the `CF-Connecting-IP` header).
- Runs on Cloudflare Workers (free tier).
- Bound to the custom domain `crypty.xyz` via a Workers route.


## Notes

- Credentials live in `terraform/terraform.tfvars` (gitignored).
- Custom domain requires the root DNS record to be **Proxied** (orange cloud) in Cloudflare.
