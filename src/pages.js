'use strict'

import * as d3 from 'd3'
import * as escher from 'escher-vis'
import * as pv from 'bio-pv'
import { createView, createActionCreators, createAsyncActionCreators,
         createReducer, } from 'tinier'

import * as showHide from './showHide'

import 'escher-vis/css/dist/builder.css'
import map_json from './e_coli_core.Core metabolism'
import reaction_data from './reaction_data_iJO1366'
import pdb_file from './4wnc.pdb'

const WAIT_READY = '@WAIT_READY'
const READY = '@READY'

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
    escher.Builder(map_json, null, null, escher_sel, {
      reaction_data: reaction_data,
      reaction_styles: [ 'abs', 'color', 'size', 'text' ],
      menu: 'zoom',
      never_ask_before_quit: true,
      fill_screen: true,
      zoom_to_element: {type: 'reaction', id: '1576769' },
    })
  },

  update: showHide.update,
})

export const Protein = createView({
  init: function (...args) {
    return Object.assign(showHide.init(...args), {
      ready: false
    })
  },

  actionCreators: Object.assign(
    createAsyncActionCreators({
      [WAIT_READY]: () => actions => {
        document.addEventListener('DOMContentLoaded', actions[READY])
      },
    }),
    createActionCreators([ READY ]),
    showHide.actionCreators
  ),

  getReducer: (model) => {
    return createReducer({
      [READY]: (state) => Object.assign({}, state, {
        ready: true,
      }),
      [showHide.CHANGE]: showHide.changeReducer,
    })
  },

  create: function (localState, appState, el, actions) {
    actions[WAIT_READY]()
  },

  update: function (localState, appState, el) {
    const sel = d3.select(el)
    sel.style('display', 'block')
    if (sel.select('canvas').empty() && localState.ready) {
      var options = {
        width: 'auto',
        height: 'auto',
        antialias: true,
        quality : 'high',
        fog: false,
      }
      const viewer = pv.Viewer(el, options)
      const structure = pv.io.pdb(pdb_file)
      const obj = viewer.cartoon('protein', structure,
                                 { color: pv.color.ssSuccession() })
      viewer.setCenter(structure.center())
      viewer.setRotation([ 0.17, 0.14,  0.97, 0.09, 0.98, -0.16, -0.97, 0.12,  0.15 ])
      viewer.autoZoom()
    }

    showHide.update(localState, appState, el)
  },
})
