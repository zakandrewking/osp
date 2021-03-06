'use strict'

/* global Browser */

import d3 from 'd3'
import * as escher from 'escher-vis'
import * as pv from 'bio-pv'
import { Browser } from 'dalliance/js/cbrowser'
import { createView, createActionCreators, createAsyncActionCreators,
         createReducer, } from 'tinier'

import * as showHide from './showHide'

import 'escher-vis/css/dist/builder.css'
import map_json from './e_coli_core.Core metabolism'
import reaction_data from './reaction_data_iJO1366'

export const Title = createView({
  name: 'Title',
  init: showHide.init,
  actionCreators: showHide.actionCreators,
  getReducer: showHide.getReducer,

  create: function (localState, appState, el) {
    const sel = d3.select(el)
    sel
      .append('img')
      .attr('src', 'logo.svg')
      .attr('class', 'title-img centered')
    sel
      .append('img')
      .attr('src', 'start-here.svg')
      .attr('class', 'start-img')
  },

  update: showHide.update,
})

export const Cell = createView({
  name: 'Cell',
  init: showHide.init,
  actionCreators: showHide.actionCreators,
  getReducer: showHide.getReducer,

  create: function (localState, appState, el) {
    const sel = d3.select(el)
    sel
      .append('img')
      .attr('src', 'cell.svg')
      .attr('class', 'cell-img centered')
    sel.append('div')
      .attr('class', 'overlay bottom left')
      .text('This demo provides a glimpse of the multi-scale visualizations that ' +
            'will be possible with Escher Cell.')
  },

  update: showHide.update,
})

export const Pathway = createView({
  name: 'Pathway',
  init: showHide.init,
  actionCreators: showHide.actionCreators,
  getReducer: showHide.getReducer,

  create: function (localState, appState, el) {
    const sel = d3.select(el)
    const escher_sel = sel.append('div').attr('class', 'escher-container')
    escher.Builder(map_json, null, null, escher_sel, {
      reaction_data: reaction_data,
      reaction_styles: [ 'abs', 'color', 'size', 'text' ],
      menu: 'zoom',
      never_ask_before_quit: true,
      fill_screen: true,
      enable_keys: false,
      zoom_to_element: {type: 'reaction', id: '1576769' },
    })
    sel.append('div')
      .attr('class', 'overlay bottom right')
      .text('Visualize omics data on biochemical pathways. Try panning and ' +
            'zooming to see more of central metabolism.')
  },

  update: showHide.update,
})

export const Protein = createView({
  name: 'Protein',

  init: showHide.init,
  actionCreators: showHide.actionCreators,
  getReducer: showHide.getReducer,

  create: function (state, appState, el, actions) {
    const sel = d3.select(el)
    if (!pv.isWebGLSupported()) {
      const cont = sel.append('div').attr('class', 'webgl-message')
      cont.append('h3')
        .text('Cannot display the interactive protein viewer')
      cont.append('p')
        .text('WebGL not supported by this browser. ')
        .append('a')
        .attr('href', 'https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API')
        .attr('target', '_blank')
        .text('Learn more about WebGL')
      cont.append('img')
        .attr('class', 'protein-screen centered')
        .attr('src', 'protein_screen.png')
      return
    }
    sel.style('display', 'block')
    var options = {
      width: 'auto',
      height: 'auto',
      antialias: true,
      quality : 'high',
      fog: false,
    }
    const viewer = pv.Viewer(el, options)
    pv.io.fetchPdb('http://www.rcsb.org/pdb/files/4WNC.pdb', structure => {
      if (!structure) throw Error('Could not load structure')
      const obj = viewer.cartoon('protein', structure,
                                 { color: pv.color.ssSuccession() })
      viewer.setCenter(structure.center())
      viewer.setRotation([ 0.17, 0.14,  0.97, 0.09, 0.98, -0.16, -0.97, 0.12,  0.15 ])
      viewer.autoZoom()
    })
    sel.append('div')
      .attr('class', 'overlay bottom left')
      .text('Stepping into the visualization reveals interactive protein structures. ' +
            'Try rotating the structure for the glyceraldehye-3-phosphate ' +
            'dehydrogenase enzyme.')
  },

  update: showHide.update,
})

export const Genome = createView({
  name: 'Genome',
  init: showHide.init,
  actionCreators: showHide.actionCreators,
  getReducer: showHide.getReducer,

  create: (localState, appState, el, actions) => {
    const sel = d3.select(el)
    sel.style('display', 'block')
    sel.append('div').attr('id', 'svgHolder').attr('class', 'genome-center')
    new Browser({
      chr: 'chr',
      viewStart: 1859699,
      viewEnd:   1863062,
      noPersist: true,
      disablePoweredBy: true,
      noTitle: true,
      coordSystem: {
        speciesName: 'Escherichia coli',
      //   taxon:       562,
      //   auth:       'NCBI',
      //   version:    '36',
        ucscName:   'eschColi_K12',
      },
      browserLinks: {
        Ensembl: 'http://www.ensembl.org/Escherichia_coli/Location/View?r=${chr}:${start}-${end}'
      },
      sources: [
        {
          name:                 'Genome',
          uri:                  'http://microbes.ucsc.edu/cgi-bin/das/eschColi_K12/',
          tier_type:            'sequence',
          provides_entrypoints: true,
        },
        {
          name:                 'Genes',
          desc:                 'Genes',
          // http://microbes.ucsc.edu/cgi-bin/das/eschColi_K12/features?segment=chr:1856802,1865783;type=refSeq;maxbins=2863
          uri:                  'http://microbes.ucsc.edu/cgi-bin/das/eschColi_K12/',
          stylesheet_uri:       'gencode.xml',
          'tier_type':          'refSeq',
          collapseSuperGroups:  true,
          provides_karyotype:   true,
        },
      ],
    })
    sel.append('div')
      .attr('class', 'overlay bottom right')
      .text('Stepping down another level reveals the gene in the context of the genome. ' +
            'A fully featured genome browser will be available for visualizing ' +
            'omics data. Try zooming out to see nearby genes.')
  },

  update: showHide.update,
})

export const Questions = createView({
  name: 'Questions',
  init: showHide.init,
  actionCreators: showHide.actionCreators,
  getReducer: showHide.getReducer,

  create: function (localState, appState, el) {
    const sel = d3.select(el)
    const d = sel.append('div')
            .attr('class', 'overlay top center')
    d.append('img')
      .attr('src', 'logo.svg')
      .attr('class', 'title-questions-img')
    const p = d.append('p')
    p.append('span')
      .text('Right now, Escher Cell is just a demo. When we get started, you ' +
            'will be able to follow our progress on ')
    p.append('a')
      .attr('href', 'https://github.com/escher/escher-cell')
      .text('GitHub')
    p.append('span')
      .text('. If you have questions, you can contact Zachary King at zaking [at] ucsd ' +
            '[dot] edu. Source code for this demo is available ')
    p.append('a')
      .attr('href', 'https://github.com/zakandrewking/osp')
      .text('here')
    p.append('span')
      .text('.')
},

  update: showHide.update,
})
