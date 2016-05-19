function setHeight() {
  $('.first-section').css({ height: $(window).height() })
  if ($(window).width() > 720) {
    $('.me-love').css({ height: $(window).height() })
  } else {
    $('.me-love').css({ height: '' })
  }
}
function navigate(page, cb) {
  if (['home', 'about', 'work', 'connect'].indexOf(page) < 0) {
    return
  }

  // animate dp
  $('.icon-container').attr('class', 'icon-container '+page)

  // animate page
  var len = $('.page').length
  $('.page').fadeOut(250, function(){
    if(--len === 0) {
      $('body').scrollTop(0)
      $('#' + page).fadeIn(250)
      typeof(cb) === 'function' && cb()
    }
  })

  // Change header
  $('.header .link').removeClass('active')
  $('.header .link[data-nav='+page+']').addClass('active')

  // change description
  if (page === 'home') {
    set_desc()
  }

  window.location.hash = page
}

function set_desc() {
  var desc = [
    'I\’m a designer who loves to code.'
    , 'Geek. Gamer. Rookie artist. Weird thinker and a bathroom singer.'
    , 'I\'m a passionate Designer with craving towards Art and inclination towards Programming.'
  ]
  var selected = desc[Math.floor(Math.random() * desc.length)]
  $('#desc').html(selected + '<br/>An erratic perfectionist.')
}

// Set height
setHeight()

// Initiate ILT animation
setTimeout(function() {
  $('.ilt').addClass('animate')
}, 4000)

// Randomize description
set_desc()

// Render "about" subnavigation
$('.me-love .sub-navigation').each(function() {
  var selected = $(this).parent().parent().attr('id')
  var subnav_list = ['explore', 'express', 'solve', 'play']
  var index = subnav_list.indexOf(selected)
  $(this).html('\
    <span class="nav-item link subnav '+(index < 1 ? 'disabled' : '')+'" data-subnav="'+subnav_list[index - 1]+'">▲</span>\
    <span class="nav-item link active" data-subnav="'+selected+'">'+selected+'</span>\
    <span class="nav-item link subnav '+(index >= subnav_list.length - 1 ? 'disabled' : '')+'" data-subnav="'+subnav_list[index + 1]+'">▼</span>\
  ')
})

$(function() {

  $(window).on('resize', setHeight)

  var hash = window.location.hash.substr(1)
  if (['about', 'work', 'connect'].indexOf(hash) > -1) {
    setTimeout(function(){ navigate(hash) }, 500)
  }

  $('[data-nav]').click(function(event) {
    navigate($(this).attr('data-nav'))
  })

  // var top = true
  // $(window).on('scroll resize', function(event) {

  //   if ($(window).scrollTop() < 30) {
  //     !top && $('.header').removeClass('minimized')
  //     !top && $('.icon-container').removeClass('placed-top')
  //     top = true
  //   } else {
  //     top && $('.header').addClass('minimized')
  //     top && $('.icon-container').addClass('placed-top')
  //     top = false
  //   }
  // })



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
    .click(function(event) {
      var submenu = $(this).html()

      // $('body').scrollTop(0)
      navigate('about', function() {
        $('body').animate({
          scrollTop: $('#' + submenu).offset().top,
        }, 750)
      })

      event.preventDefault()
    })

    $('.me-love .sub-navigation .nav-item:not(.disabled)').click(function() {
      $('body').animate({
        scrollTop: $('#' + $(this).attr('data-subnav')).offset().top,
      }, 750)
    })

})
