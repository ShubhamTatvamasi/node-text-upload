'use strict'

var IPFS = require('ipfs-api')

var ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

function store () {
  var toStore = document.getElementById('source').value
  ipfs.add(Buffer.from(toStore), function (err, res) {
    if (err || !res) {
      return console.error('ipfs add error', err, res)
    }

    res.forEach(function (file) {
      if (file && file.hash) {
        console.log('successfully stored', file.hash)
        console.log(`https://ipfs.io/ipfs/${file.hash}`)
        display(file.hash)
      }
    })
  })
}

function display (hash) {

  document.getElementById('hash').innerText = hash

  ipfs.cat(hash, function (err, res) {
    if (err || !res) {
      return console.error('ipfs cat error', err, res)
    }

    document.getElementById('content').innerText = res.toString()
  })
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('store').onclick = store
})
