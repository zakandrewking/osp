'use strict'

import d3 from 'd3'
import { createView } from 'tinier'
import * as showHide from './showHide'

export const NavButtons = createView({
  init: function (addressedActionIn, addressedActionOut, currentIndex) {
    return {
      addressedActionIn,
      addressedActionOut,
      currentIndex,
      lastCurrentIndex: null,
    }
  },

  getReducer: showHide.getReducer,

  create: function (localState, appState, el, actions, actionWithAddress) {
    const sel = d3.select(el)
    sel.append('button')
      .attr('id', 'button-in')
      .attr('class', 'my-button')
      .text('⬆')
      .on('click', actionWithAddress(localState.addressedActionIn) || null)
    sel.append('button')
      .attr('id', 'button-out')
      .attr('class', 'my-button')
      .text('⬇')
      .on('click', actionWithAddress(localState.addressedActionOut) || null)
  },

  update: function (localState, appState, el) {
    const sel = d3.select(el)
    sel.select('#button-in')
      .classed('my-button-disabled',
               localState.currentIndex === appState.pages.length - 1)
    sel.select('#button-out')
      .classed('my-button-disabled', localState.currentIndex === 0)
  }
})

export { NavButtons as default }
