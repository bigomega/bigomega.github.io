$('.first-section, .me-love').css({ height: $(window).height() })

// Initiate ILT animation
setTimeout(function() {
  $('.ilt').addClass('animate')
}, 4000)

// Randomize description
;(function() {
  var desc = [
    'I\’m a designer who can code.'
    , 'Designer by skill, Hacker by nature and Artist by heart.'
    , 'Geek. Gamer. Rookie artist. Weird thinker and a bathroom singer.'
    , 'A passionate Designer with craving towards Art and inclination towards Programming.'
  ]
  $('#desc').html(desc[Math.floor(Math.random() * desc.length)])
})()

$(function() {

  $(window).on('resize', function(event) {
    $('.first-section, .me-love').css({ height: $(window).height() })
  })

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
        top: $(this).index() * 20 + '%',
        // background: '#' + 'ff77bb-34D0FF-D0854B-FEFA59-bf78ff'.split('-')[$(this).index()],
      })
    })
    .click(function() {
      var submenu = $(this).attr('data-id')
      window.location.hash = submenu
      $('body').scrollTop(0)
      $('body').animate({
        scrollTop: $('#' + submenu).offset().top,
      }, 1000)
    })
})
