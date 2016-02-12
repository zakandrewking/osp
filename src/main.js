'use strict'

import { Builder } from 'escher-vis'
import d3 from 'd3'

import { createMiddleware, run } from 'tinier'
import { applyMiddleware, createStore } from 'redux'

import App from './App'

import './app.css'

const createStoreWithMiddleware = applyMiddleware(
  createMiddleware(App)
)(createStore)

const appSel = d3.select('body')
        .append('div')
        .attr('class', 'fill')
        .style('display', 'block')

// run the app
const api = run(App, appSel.node(), createStoreWithMiddleware, App.init(4))

// set up keys
d3.select(document).on('keydown', function () {
  if      (d3.event.keyCode === 38) api.goIn()
  else if (d3.event.keyCode === 40) api.goOut()
})

window.setTimeout(() => {
  api.change(0)
  d3.select('#spinner').style('display', 'none')
}, 3000)
