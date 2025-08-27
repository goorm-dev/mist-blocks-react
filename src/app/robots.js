export const dynamic = 'force-static'

export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
        },
        sitemap: 'https://ktcloud-techup.com/sitemap.xml',
    }
}