const express = require('express')
const app = express()
const controller = require('../contoller/controller')
const validator = require('../../input-validation/validator')

app.get('/search', validator.checkPageNumber, controller.searchCustomers)
app.get('/search/:id', controller.searchCustomer)
app.post('/add',validator.addCustomer, controller.addCustomer)
app.get('/list',controller.listCities)

module.exports = app