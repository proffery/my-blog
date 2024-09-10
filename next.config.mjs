/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                headers: [
                    { key: "Content-Type", value: "multipart/form-data"},
                ],
                source: "/api/auth/create-avatar"
            }
        ]
    },
    images: {
        domains: ['cloud.appwrite.io'],
        minimumCacheTTL: 5,
    },
    trailingSlash: true,
};

export default nextConfig;
