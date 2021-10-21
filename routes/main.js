const route = require("express").Router()
const mountedViews = require('./views')
const mountedActions = require('./actions')


mountedViews(route)
mountedActions(route)

module.exports = route