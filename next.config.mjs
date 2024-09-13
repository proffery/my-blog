import { paraglide } from '@inlang/paraglide-next/plugin'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: '*',
                pathname: '/**',
                port: '',
                protocol: 'https'
            },
            {
                hostname: '*',
                pathname: '/**',
                port: '',
                protocol: 'http',
            },
        ],
    },
    trailingSlash: true,
}

export default withNextIntl(paraglide({
    paraglide: {
        outdir: './paraglide',
        project: './project.inlang'
    },
    ...nextConfig
}))

