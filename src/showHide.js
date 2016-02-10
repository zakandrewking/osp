'use strict'

import * as d3 from 'd3'
import { createActionCreators, createReducer, } from 'tinier'

export const CHANGE = '@CHANGE'

export const init = function (index = 0, currentIndex = 0) {
  return { index, currentIndex }
}

export const update = function (localState, appState, el) {
  const sel = d3.select(el)
  sel.style('display', localState.currentIndex === localState.index ? 'block' : 'none')
}
