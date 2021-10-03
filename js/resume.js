document.querySelectorAll('#life-so-far .filters input').forEach(inp =>
  inp.onchange = function () {
    document.querySelectorAll('.events .event').forEach(d => d.classList.add('hide'))
    document.querySelectorAll(`.events .event${inp.value}`).forEach(d => d.classList.remove('hide'))
  }
)