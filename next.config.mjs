/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: `${process.env.NEXT_PUBLIC_HOST_BASE}`},
                    { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                    { key: "X-Appwrite-Project", value: `${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}`},
                    { key: "Content-Type", value: "application/json"},
                ],
                source: "/api/(.*)"
            }
        ]
    },
    images: {
        domains: ['cloud.appwrite.io'],
    },
    trailingSlash: true,
};

export default nextConfig;
