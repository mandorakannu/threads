/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [process.env.IMAGE_DOMAINS, "img.clerk.com", "gravatar.com"]
    }
}

module.exports = nextConfig
