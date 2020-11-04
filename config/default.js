module.exports = {
    port : 5000,
    mongoUri :"MONGODB_CONNECTION_URI",
    jwtConfig: {
        secret: "JWT_SECRET",
        adminSecret: "JWT_ADMIN_SECRET",
        accessTokenAge: 60*60,
        refreshTokenAge: 30*24*60*60*1000
    },
    azure: {
        endpoint: 'AZURE_TRANSLATOR_ENDPOINT',
        key: 'AZURE_TRANSLATOR_KEY'
    }
}