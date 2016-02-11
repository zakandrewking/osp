'use strict'

import { Builder } from 'escher-vis'
import * as d3 from 'd3'

import { createMiddleware, run } from 'tinier'
import { applyMiddleware, createStore } from 'redux'
import createLogger from 'redux-logger'

import App from './App'

import './app.css'
import 'purecss/build/pure.css'
import 'font-awesome-webpack'

const createStoreWithMiddleware = applyMiddleware(
  createMiddleware(App),
  createLogger()
)(createStore)

const api = run(App, document.body, createStoreWithMiddleware, App.init(0))
