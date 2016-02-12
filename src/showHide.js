'use strict'

import d3 from 'd3'
import { createActionCreators, createReducer, GLOBAL_ACTION, } from 'tinier'

export const CHANGE = '@CHANGE'

export const init = function (index = 0, currentIndex = 0) {
  return { index, currentIndex, lastCurrentIndex: null }
}

export const actionCreators = {
  [CHANGE]: newIndex => ({ type: CHANGE, payload: newIndex, [GLOBAL_ACTION]: true })
}

export const changeReducer = (state, action) => Object.assign({}, state, {
  lastCurrentIndex: state.currentIndex,
  currentIndex: action.payload,
})

export const getReducer = function (model) {
  return createReducer({ [CHANGE]: changeReducer })
}

export const update = function (localState, appState, el) {
  const sel = d3.select(el)
  const duration = 2000
  if (localState.currentIndex === localState.lastCurrentIndex) {
    // double check current style
    sel
      .style('display', localState.index === localState.currentIndex ? 'block' : 'none')
      .style('transform', null)
      .style('opacity', null)
  } else if (localState.index === localState.lastCurrentIndex) {
    sel
      .style('transform', 'scale(1)')
      .style('opacity', '1')
      .transition()
      .duration(duration)
      .ease('cubic-in-out')
      .style('transform', (localState.currentIndex > localState.lastCurrentIndex ?
                           'scale(10)' : 'scale(0.1)'))
      .style('opacity', '0')
      .each('end', () => {
        sel.style('display', 'none').style('transform', null).style('opacity', null)
      })
  } else if (localState.index === localState.currentIndex) {
    if (localState.lastCurrentIndex === null) {
      sel.style('display', 'block').style('transform', null).style('opacity', null)
    } else {
      sel
        .style('display', 'block')
        .style('transform', (localState.currentIndex < localState.lastCurrentIndex ?
                             'scale(10)' : 'scale(0.1)'))
        .style('opacity', '0')
        .transition()
        .duration(duration)
        .ease('cubic-in-out')
        .style('transform', 'scale(1)')
        .style('opacity', '1')
        .each('end', () => {
          sel.style('display', 'block').style('transform', null).style('opacity', null)
        })
    }
  } else {
    sel.style('display', 'none').style('transform', null).style('opacity', null)
  }
}
