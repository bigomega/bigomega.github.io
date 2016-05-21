/* ----- FUNCTIONS ----- */
function onResize() {
  // $('.first-section').css({ height: $(window).height() })

  if ($(window).width() > 720) {
    $('.me-love').css({ height: $(window).height() })
  } else {
    $('.me-love').css({ height: '' })
    startYYanimation()
  }
}
function navigate(page, cb) {
  if (['home', 'about', 'work', 'connect'].indexOf(page) < 0) {
    return
  }
  // misc
  $(window).off('scroll.about')
  if (page === 'home') {
    set_desc()
  } else if (page === 'about') {
    cb = (function(oldCb) {
      return function() {
        setAboutScroll()
        typeof(oldCb) === 'function' && oldCb()
      }
    })(cb)
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
  window.location.hash = page
}

/* ----- COMMON ----- */

onResize()
$(window).on('resize', onResize)


$(window).on("load", function() {
  var hash = window.location.hash.substr(1)
  $('.icon-container').attr('class', 'icon-container home')

  setTimeout(function(){
    if (['about', 'work', 'connect'].indexOf(hash) > -1) {
      navigate(hash)
    } else {
      navigate('home')
    }
  }, 500)

  $('.header').removeClass('hidden')
  $('[data-nav]').click(function(event) {
    navigate($(this).attr('data-nav'))
  })
})


/* ----- HOME ----- */

function set_desc() {
  var desc = [
    'I\’m a designer who loves to code.'
    , 'Geek. Gamer. Rookie artist. Weird thinker and a bathroom singer.'
    , 'I\'m a passionate Designer with craze towards Art and impulse towards Programming.'
  ]
  var selected = desc[Math.floor(Math.random() * desc.length)]
  $('#desc').html(selected + '<br/>An erratic perfectionist.')
}

// Initiate ILT animation
setTimeout(function() {
  $('.ilt').addClass('animate')
}, 4000)

// Randomize description
set_desc()

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
    navigate('about', function() {
      $('body').animate({
        scrollTop: $('#' + submenu).offset().top,
      }, 750)
    })
    event.preventDefault()
  })

/* ----- ABOUT ----- */

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

$('.me-love .sub-navigation .nav-item:not(.disabled)').click(function() {
  $('body').animate({
    scrollTop: $('#' + $(this).attr('data-subnav')).offset().top,
  }, 750)
})

var animation_flag = false
function startYYanimation() {
  if(animation_flag) {
    return
  }
  function animate() {
    $('.yin-yang').addClass('split')
    setTimeout(function() { $('.yin-yang').removeClass('split') }, 2000)
  }
  setTimeout(function(){
    animate()
    window.setInterval(animate, 5000)
  }, 2000)
  animation_flag = true
}

function setAboutScroll() {
  var page = 'about'
  var submenu_offsets = {
    explore: $('#explore').height() + $('#explore').offset().top,
    express: $('#express').height() + $('#express').offset().top,
    solve: $('#solve').height() + $('#solve').offset().top,
    solve_header: $('.dd-header').offset().top,
    play: $('#play').height() + $('#play').offset().top
  }
  $(window).on('scroll.about', function(e) {
    if (e.currentTarget.scrollY + 280 < submenu_offsets.explore) {
      page !== 'about' && $('.icon-container').attr('class', 'icon-container about')
      page = 'about'
    } else if (e.currentTarget.scrollY + 280 < submenu_offsets.express) {
      page !== 'express' && $('.icon-container').attr('class', 'icon-container express')
      page = 'express'
    } else if (e.currentTarget.scrollY + $('.icon-holder').position().top + 110 < submenu_offsets.solve_header) {
      page !== 'none' && $('.icon-container').attr('class', 'icon-container none')
      page = 'none'
    } else if (e.currentTarget.scrollY + 280 < submenu_offsets.solve) {
      page !== 'solve' && $('.icon-container').attr('class', 'icon-container solve')
      page !== 'solve' && $('#solve .dd-header').addClass('animate') && startYYanimation()
      page = 'solve'
    } else if (e.currentTarget.scrollY + 280 < submenu_offsets.play) {
      page !== 'play' && $('.icon-container').attr('class', 'icon-container play')
      page = 'play'
    }
  })
}

/* ----- WORK ----- */
/* ----- CONNECT ----- */
/* ----- END ----- */
