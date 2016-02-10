'use strict'

import * as d3 from 'd3'
import * as escher from 'escher-vis'
import { createView } from 'tinier'

import * as showHide from './showHide'

import 'escher-vis/css/dist/builder.css'
import map_json from './iJO1366.Central metabolism'

console.log(map_json)

export const Title = createView({
  init: showHide.init,
  actionCreators: showHide.actionCreators,
  getReducer: showHide.getReducer,

  create: function (localState, appState, el) {
    const sel = d3.select(el)
    sel
      .append('img')
      .attr('src', 'logo.svg')
      .attr('class', 'title-img')
  },

  update: showHide.update,
})

export const Pathway = createView({
  init: showHide.init,
  actionCreators: showHide.actionCreators,
  getReducer: showHide.getReducer,

  create: function (localState, appState, el) {
    const escher_sel = d3.select(el).append('div').attr('class', 'escher-container')
    escher_sel.node().__builder__ = escher.Builder(map_json, null, null, escher_sel, {
      menu: 'zoom',
      never_ask_before_quit: true,
      scroll_behavior: 'none', // otherwise: Uncaught TypeError: Cannot read property 'stopPropagation' of null
      fill_screen: true,
    })
  },

  update: showHide.update,
})

export const Protein = createView({
  init: showHide.init,
  actionCreators: showHide.actionCreators,
  getReducer: showHide.getReducer,

  create: function (localState, appState, el) {
    const sel = d3.select(el)
    sel
      .append('img')
      .attr('src', 'logo.svg')
      .attr('class', 'title-img')
  },

  update: showHide.update,
})
