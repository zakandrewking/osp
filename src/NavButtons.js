'use strict'

import * as d3 from 'd3'
import { createView } from 'tinier'

export const NavButtons = createView({
  init: function (addressedActionIn, addressedActionOut) {
    return { addressedActionIn, addressedActionOut }
  },

  create: function (localState, appState, el, actions, actionWithAddress) {
    const sel = d3.select(el)
    sel.append('button').attr('class', 'fa fa-arrow-up pure-button')
      .on('click', actionWithAddress(localState.addressedActionIn) || null)
    sel.append('button').attr('class', 'fa fa-arrow-down pure-button')
      .on('click', actionWithAddress(localState.addressedActionOut) || null)
  }
})

export { NavButtons as default }
