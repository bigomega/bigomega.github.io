document.querySelectorAll('#life-so-far .filters input').forEach(inp =>
  inp.onchange = function () {
    document.querySelectorAll('.events .event').forEach(d => d.classList.add('hide'))
    document.querySelectorAll(`.events .event${inp.value}`).forEach(d => d.classList.remove('hide'))
  }
)

;(function() {
  var diff = new Date(new Date() - new Date(document.querySelector('.time-from').dataset.date))
  var month = Math.ceil(diff / (1000 * 60 * 60 * 24 * 30))
  document.querySelector('.time-from').innerHTML = month + ' month(s)'
})()
