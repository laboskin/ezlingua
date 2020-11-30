module.exports = {
    port : process.env.PORT || 5000,
    mongoUri : process.env.MONGODB_CONNECTION_URI || "MONGODB_CONNECTION_URI",
    jwtConfig: {
        secret: process.env.JWT_SECRET || "JWT_SECRET",
        adminSecret: process.env.JWT_ADMIN_SECRET || "JWT_ADMIN_SECRET",
        accessTokenAge: 60*60,
        refreshTokenAge: 30*24*60*60*1000
    },
    azure: {
        endpoint: process.env.AZURE_TRANSLATOR_ENDPOINT || 'AZURE_TRANSLATOR_ENDPOINT',
        key: process.env.AZURE_TRANSLATOR_KEY || 'AZURE_TRANSLATOR_KEY'
    },
    googleCloud: {
        projectId: process.env.GOOGLE_CLOUD_PROJECT_ID || 'GOOGLE_CLOUD_PROJECT_ID',
        storageBucket: process.env.GOOGLE_CLOUD_STORAGE_BUCKET || 'GOOGLE_CLOUD_STORAGE_BUCKET'
    }
}