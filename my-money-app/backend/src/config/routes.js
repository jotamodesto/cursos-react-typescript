const express = require('express');
const auth = require('./auth')

module.exports = function(server) {
    
    // Protected API
    const protectedApi = express.Router()
    server.use('/api', protectedApi)

    protectedApi.use(auth)

    // Routes for Billing Cycle
    const BillingCycle = require('../api/billingCycle/billingCyclesService');
    BillingCycle.register(protectedApi, '/billingCycles');
    
    // Open API
    const openApi = express.Router()
    server.use('/oapi', openApi)

    const AuthService = require('../api/user/authService')
    openApi.post('/login', AuthService.login)
    openApi.post('/signUp', AuthService.signup)
    openApi.post('/validateToken', AuthService.validateToken)
}