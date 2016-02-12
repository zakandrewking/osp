'use strict'

import d3 from 'd3'
import { createView, createAsyncActionCreators, createReducer,
         addressAction, addressRelFrom, } from 'tinier'

import { Title, Cell, Pathway, Protein, Genome, } from './pages'
import * as showHide from './showHide'
import NavButtons from './NavButtons'

const INC = '@INC'
const DEC = '@DEC'

function getOrAppend (el, tag, id, attrs = {}) {
  const sel = d3.select(el)
  const child = sel.select('#' + id)
  if (child.empty())
    return (sel
            .append(tag)
            .attr('id', id)
            .call(sel => {
              for (let key in attrs) {
                sel.attr(key, attrs[key])
              }
            })
            .node())
  else
    return child.node()
}

export const App = createView({
  name: 'App',

  model: {
    pages: [ Title, Cell, Pathway, Protein, Genome, ],
    navButtons: NavButtons,
  },

  init: function (currentIndex = 0) {
    const incActionAddress = addressAction(INC, addressRelFrom([ 'navButtons' ]))
    const decActionAddress = addressAction(DEC, addressRelFrom([ 'navButtons' ]))

    return {
      pages: [ Title, Cell, Pathway, Protein, Genome, ].map((view, i) => view.init(i, currentIndex)),
      navButtons: NavButtons.init(incActionAddress, decActionAddress, currentIndex),
      currentIndex,
      lastCurrentIndex: null,
    }
  },

  actionCreators: Object.assign(
    createAsyncActionCreators({
      [INC]: () => (actions, localState) => {
        const newIndex = Math.min(localState.currentIndex + 1, localState.pages.length - 1)
        actions[showHide.CHANGE](newIndex)
      }, //
      [DEC]: () => (actions, localState) => {
        const newIndex = Math.max(localState.currentIndex - 1, 0)
        actions[showHide.CHANGE](newIndex)
      },
    }),
    showHide.actionCreators
  ),

  getReducer: showHide.getReducer,

  create: function (localState, appState, el) {
    const sel = d3.select(el).attr('id', 'app')
  },

  update: function (localState, appState, el) {
    return {
      pages: [
        getOrAppend(el, 'div', 'title',   { class: 'page' }),
        getOrAppend(el, 'div', 'cell',    { class: 'page' }),
        getOrAppend(el, 'div', 'pathway', { class: 'page' }),
        getOrAppend(el, 'div', 'protein', { class: 'page' }),
        getOrAppend(el, 'div', 'genome',  { class: 'page' }),
      ],
      navButtons: getOrAppend(el, 'div', 'nav-buttons'),
    }
  },

  getAPI: actions => {
    return {
      change: actions[showHide.CHANGE],
      goIn: actions[INC],
      goOut: actions[DEC],
    }
  }
})

export { App as default }
