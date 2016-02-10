'use strict'

import * as d3 from 'd3'
import { createView, createActionCreators, createReducer,
         addressAction, addressRelFrom, } from 'tinier'
import { mapValues } from 'lodash'

import { Title, Pathway, Protein, } from './pages'
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
            .call(sel => mapValues(attrs, (val, key) => sel.attr(key, val)))
            .node())
  else
    return child.node()
}

export const App = createView({
  model: {
    pages: [ Title, Pathway, Protein ],
    navButtons: NavButtons,
  },

  init: function (currentIndex = 0) {
    const incActionAddress = addressAction(INC, addressRelFrom([ 'navButtons' ]))
    const decActionAddress = addressAction(DEC, addressRelFrom([ 'navButtons' ]))

    return {
      pages: [ Title, Pathway, Protein ].map((view, i) => view.init(i)),
      navButtons: NavButtons.init(incActionAddress, decActionAddress),
      currentIndex,
    }
  },

  actionCreators: Object.assign(createActionCreators([ INC, DEC ]),
                                showHide.actionCreators),

  getReducer: (model) => {
    return createReducer({
      [INC]: (state, action) => actions => {
        const newIndex = Math.min(state.currentIndex + 1, state.pages.length - 1)
        actions[showHide.CHANGE](newIndex)
      },
      [DEC]: (state, action) => actions => {
        const newIndex = Math.max(state.currentIndex - 1, 0)
        actions[showHide.CHANGE](newIndex)
      },
      [showHide.CHANGE]: (state, action) => Object.assign({}, state, {
        currentIndex: action.payload,
      })
    })
  },

  create: function (localState, appState, el) {
    const sel = d3.select(el).attr('id', 'app')
  },

  update: function (localState, appState, el) {
    return {
      pages: [
        getOrAppend(el, 'div', 'model',   { class: 'page' }),
        getOrAppend(el, 'div', 'pathway', { class: 'page' }),
        getOrAppend(el, 'div', 'protein', { class: 'page' }),
      ],
      navButtons: getOrAppend(el, 'div', 'nav-buttons'),
    }
  },
})

export { App as default }
