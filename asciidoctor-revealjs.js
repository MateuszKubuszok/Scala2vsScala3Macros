#!/usr/bin/env node
// Load asciidoctor.js and asciidoctor-reveal.js
var asciidoctor = require('@asciidoctor/core')()
var ascidoctorRevealjs = require('@asciidoctor/reveal.js')
ascidoctorRevealjs.register()

// Convert the document 'index.adoc' using the reveal.js converter
var attributes = {
  'revealjsdir': './reveal.js',
  'revealjs_history': true,
  'revealjs_fragmentInURL': true,
  'stem': 'latexmath',
  'source-highlighter': 'highlightjs',
  'highlightjsdir': './highlightjs',
  'revealjs_theme': 'black',
  'highlightjs-theme': './highlightjs/css/zenburn.css'
}
var options = {safe: 'safe', backend: 'revealjs', attributes: attributes}
asciidoctor.convertFile('index.adoc', options)
