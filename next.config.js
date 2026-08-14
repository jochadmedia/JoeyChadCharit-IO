module.exports = {
    serverRuntimeConfig: {
        SUPABASE_URL: 'https://jhlmitaawdlqsusjmbox.supabase.co',
        SUPABASE_ANON_KEY:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxxxx'
    },
    runtimeOptions: {
        experimental: {
            externalDir: true,
            interop: false,
        },
        configPath: './.next/standalone',
        publicDir: '',
    },
};