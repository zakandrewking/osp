'use strict'

import * as d3 from 'd3'
import { createActionCreators, createReducer, GLOBAL_ACTION, } from 'tinier'

export const CHANGE = '@CHANGE'

export const init = function (index = 0, currentIndex = 0) {
  return { index, currentIndex }
}

export const actionCreators = {
  [CHANGE]: newIndex => ({ payload: newIndex, [GLOBAL_ACTION]: true })
}

export const getReducer = function (model) {
  return createReducer({
    [CHANGE]: (state, action) => Object.assign({}, state, {
      currentIndex: action.payload,
    })
  })
}

export const update = function (localState, appState, el) {
  const sel = d3.select(el)
  sel.style('display', localState.currentIndex === localState.index ? 'block' : 'none')
}
