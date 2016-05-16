function setHeight() {
  $('.first-section').css({ height: $(window).height() })
  if ($(window).width() > 720) {
    $('.me-love').css({ height: $(window).height() })
  } else {
    $('.me-love').css({ height: '' })
  }
}

setHeight()

// Initiate ILT animation
setTimeout(function() {
  $('.ilt').addClass('animate')
}, 4000)

// Randomize description
;(function() {
  var desc = [
    'I\’m a designer who can code.'
    // , 'Designer by skill, Hacker by nature and Artist by heart.'
    , 'Geek. Gamer. Rookie artist. Weird thinker and a bathroom singer.'
    , 'I\'m a passionate Designer with craving towards Art and inclination towards Programming.'
  ]
  $('#desc').html(desc[Math.floor(Math.random() * desc.length)])

  // Render subnavigation
  $('.me-love .sub-navigation').each(function() {
    var selected = $(this).parent().parent().attr('id')
    var arr = ['explore', 'express', 'solve', 'play'].map(function(cat) {
      return '\
        <a class="nav-item'+(cat === selected ? ' active': '')+'" data-id="'+cat+'" href="#'+cat+'">'+cat+'</a>\
      '
    })
    $(this).html(arr)
  })

})()

$(function() {

  $(window).on('resize', setHeight)

  var top = true
  $(window).on('scroll resize', function(event) {

    if ($(window).scrollTop() < 30) {
      !top && $('.scroll-down-arrows').removeClass('hide');
      !top && $('.header').removeClass('minimized')
      !top && $('.icon-container').removeClass('placed-top')
      top = true
    } else {
      top && $('.scroll-down-arrows').addClass('hide');
      top && $('.header').addClass('minimized')
      top && $('.icon-container').addClass('placed-top')
      top = false
    }
  })

  $('.scroll-down-arrows').click(function() {
    $('body').animate({
      scrollTop: $('.first-section').height(),
    }, 1000)
  })


  $('.ilt-holder')
    .mouseover(function() {
      $('.ilt').removeClass('animate')
    })
    .mouseout(function() {
      $('.ilt').addClass('animate')
    })

  $('.ilt-option')
    .mouseover(function() {
      $('.ilt').css({
        top: $(this).index() * 25 + '%',
        // background: '#' + 'ff77bb-34D0FF-D0854B-FEFA59-bf78ff'.split('-')[$(this).index()],
      })
    })

  $('.ilt-option')
    .click(function(event) {
      var submenu = $(this).html().toLowerCase()

      // $('body').scrollTop(0)
      $('body').animate({
          scrollTop: $('#' + submenu).offset().top,
        }, 750, function() {
          window.location.hash = submenu
        })

      event.preventDefault()
    })
})
