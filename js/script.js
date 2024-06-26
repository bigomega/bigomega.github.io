/* ----- FUNCTIONS ----- */
function onResize() {
  // $('.first-section').css({ height: $(window).height() })

  if ($(window).width() > 720) {
    // $('.me-love').css({ height: $(window).height() })
  } else {
    // $('.me-love').css({ height: '' })
    // startYYanimation()
  }
}
function navigateToHash() {
  var hash = window.location.hash.substr(1)
  if (['about', 'work', 'connect'].indexOf(hash) > -1) {
    navigate(hash)
  } else {
    navigate('home')
  }
}
var connect_animation
var work_animation
var yy_animation_flag

function navigate(page, cb) {
  if (['home', 'about', 'work', 'connect'].indexOf(page) < 0) {
    return
  }
  // misc
  $(window).off('scroll.about')
  if (page === 'home') {
    //
  } else if (page === 'connect') {
    var animation = function(){ $('.hive').removeClass('first-animate loaded-animate'); setTimeout(function(){ $('.hive').addClass('loaded-animate') }, 10) }
    if (!connect_animation) {
      $('.hive').removeClass('loaded-animate first-animate');
      setTimeout(function(){ $('.hive').addClass('first-animate') }, 10)
      setTimeout(function(){ $('.hive').addClass('loaded loaded-animate') }, 2500)
    } else {
      window.clearInterval(connect_animation)
      animation()
    }
    connect_animation = window.setInterval(animation, 15000)
  } else if (page === 'work') {
    if (!work_animation) {
      work_animation = true
      cb = (function(oldCb) {
        return function() {
          $('.work-img-container').removeClass('animate'); setTimeout(function(){ $('.work-img-container').addClass('animate') }, 10)
          $('#work').removeClass('show-rest'); setTimeout(function(){ $('#work').addClass('show-rest'); $('.work-img-container').addClass('animation-done'); }, 4500)
          typeof(oldCb) === 'function' && oldCb()
        }
      })(cb)
    } else {
      $('#work').removeClass('show-rest'); setTimeout(function(){ $('#work').addClass('show-rest') }, 1000)
    }
  } else if (page === 'about') {
    if(!yy_animation_flag) {
      function animate() {
        $('.yin-yang').addClass('split')
        setTimeout(function() { $('.yin-yang').removeClass('split') }, 2000)
      }
      setTimeout(function(){
        animate()
        window.setInterval(animate, 10000)
      }, 4000)
      yy_animation_flag = true
    }
  }
  // animate dp
  $('.icon-container').attr('class', 'icon-container '+page)
  // animate page
  var len = $('.page').length
  $('.page').fadeOut(250, function(){
    if(--len === 0) {
      $('body').scrollTop(0)
      $('#' + page).fadeIn(500)
      typeof(cb) === 'function' && cb()
    }
  })
  // Change header
  $('.header .top-nav a').removeClass('active')
  $('.header .top-nav a[data-id='+page+']').addClass('active')
  $('.header').removeClass('hidden')
  // window.location.hash = page
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
/* ----- COMMON ----- */

onResize()
$(window).on('resize', onResize)

window.onhashchange = navigateToHash
$(window).on("load", function() {
  // $('.icon-container').attr('class', 'icon-container home')
  setTimeout(navigateToHash, 500)
  $('[data-nav]').click(function(event) {
    window.location.hash = $(this).attr('data-nav')
    event.preventDefault()
  })

  var bigomega_grid = [
    ' bbb',
    ' bttb',
    ['', 'tb', ' ', 'tb'],
    ['b', 'tb', '', '', 'tb', 'b'],
    'tt tt'
  ]

  $('.bigomega-block').html((new Array(6)).join(1).split('').reduce(function(mem, x, index) {
    return mem + '\
      <div class="line line-'+(index+1)+'">\
        ' + (new Array(7)).join(1).split('').reduce(function(mem2, y, index2) {
          return mem2 + '\
            <div class="point point-'+(index2+1)+' point-'+(bigomega_grid[index][index2] || '')+'"></div>\
          '
        }, '') + '\
      </div>\
    '
  }, ''))

  $('.point-t, .point-b').each(function(index) {
    var delay = Math.random() * 2 * Math.random() < 0.5 ? -1 : 1
    var duration = Math.random() < 0.5 ? Math.random() * 3 : 3
    duration = duration > 1 ? duration : 1
    $(this).attr('style', '\
      -webkit-animation-delay: '+delay+'s;\
       -moz-animation-delay: '+delay+'s;\
       -o-animation-delay: '+delay+'s;\
       animation-delay: '+delay+'s;\
      -webkit-animation-duration: '+duration+'s;\
       -moz-animation-duration: '+duration+'s;\
       -o-animation-duration: '+duration+'s;\
       animation-duration: '+duration+'s;\
    ')
  })
})


/* ----- HOME ----- */

// Initiate ILT animation
setTimeout(function() {
  $('.ilt').addClass('animate')
}, 4000)

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
        scrollTop: $('.' + submenu).offset().top - 50,
      }, 750)
    })
    event.preventDefault()
  })

/* ----- ABOUT ----- */

// Render "about" subnavigation

var yy_animation_flag = false
function startYYanimation() {
  if(yy_animation_flag) {
    return
  }
  function animate() {
    $('.yin-yang').addClass('split')
    setTimeout(function() { $('.yin-yang').removeClass('split') }, 2000)
  }
  setTimeout(function(){
    animate()
    window.setInterval(animate, 15000)
  }, 2000)
  yy_animation_flag = true
}

/* ----- WORK ----- */
var skills = [
    ['Art', 40]
  , ['Illustration', 55]
  , ['3D modeling', 15]
  , ['Sculpting', 30]

  , ['UX design', 70]
  , ['Graphic design', 35]
  , ['Web design', 80]

  , ['HTML/CSS', 95]
  , ['Sass/Less', 70]

  , ['Javascript ecosystem', 100]
  , ['ReactJS', 75]
  , ['App development', 90]

  , ['Node.js', 80]
  , ['Python', 35]
  , ['PHP', 30]
  , ['Ruby on Rails', 25]

  , ['BrainFuck', 60]
  , ['Hacking', 90]
  , ['Shell', 60]
  , ['Git', 90]

  , ['Dancing', 70]
  , ['Singing', 5]
  , ['Guitar', 20]
  , ['Trekking', 75]
  , ['Biking', 65]
  , ['Photography', 20]
  , ['Blogging', 45]
  , ['Rambling', 100]
  , ['Soccer', 35]
  , ['Dota2', 95]
]
shuffle(skills)
skills.forEach(function(sk){
  $('.skills-list').append('\
    <div class="skill"><span style="width:'+ sk[1] +'%;"></span>'+ sk[0] +'</div>\
  ')
})
$('.skill-toggle').click(function(){
  $('#work').toggleClass('showing-skills')
  if (!$('#work').hasClass('showing-skills')) {
    shuffle(skills)
    $('.skills-list').html('')
    skills.forEach(function(sk){
      $('.skills-list').append('\
        <div class="skill"><span style="width:'+ sk[1] +'%;"></span>'+ sk[0] +'</div>\
      ')
    })
  }
})

// Tags: js - css - hack - art - design - visualization - bash - ui
var gibberish_list = [
    { title: 'BrainFuck Compiling Visualization', url: 'http://bigomega.github.io/brainfuck-visualizer/', tags: ['js', 'ui', 'visualization'], date: 'Nov 2012' }
  , { title: 'Conway’s Game-of-Life in js', url: 'http://blog.bharathraja.in/post/22316608463/conways-game-of-life-in-js', date: 'May 2012', tags: ['js', 'ui', 'visualization'] }
  , { title: 'CaaS - Charting As A Service', url: 'http://bharathraja.in/caas/', date: 'May 2014', tags: ['js', 'ui'] }
  , { title: 'Jigsaw Puzzle game - Facebook', url: 'http://bharathraja.in/facebook-image-jigsaw/', date: 'Oct 2012', tags: ['js', 'ui'] }

  , { title: 'Voicemash - Voice dubbing for famous videos', url: 'https://github.com/bigomega/voicemash', date: 'May 2015', tags: ['ui'] }
  , { title: 'Less css - Command line helper', url: 'https://github.com/bigomega/lesscss-cmd-helper', date: 'Mar 2013', tags: ['bash', 'hack'] }
  , { title: 'CommandLine url shortener - goo.gl', url: 'http://blog.bharathraja.in/post/32492820406/googl', tags: ['hack', 'bash'], date: 'Sep 2012' }
  , { title: 'jQuery helper for sahi - testing automation', url: 'http://blog.bharathraja.in/post/138615700562/jquery-helper-for-sahi-testing-automation', date: 'Dec 2014', tags: [] }
  , { title: 'Simple load testing script in bash', url: 'https://medium.com/@bigomega/simple-load-testing-script-in-bash-a8c5a4968dc7', date: 'Mar 2016', tags: ['bash'] }
  , { title: 'Information extraction from audio', url: 'https://medium.com/@bigomega/big%CF%89mega-information-extraction-from-audio-noob-level-9e6df4e98b54#.tsiku4ufh', date: 'May 2016', tags: ['hack'] }
  , { title: 'Tracking the Dota 2 International prize pool', url: 'https://medium.com/@bigomega/track-the-dota-2-international-prize-pool-102635901df#.r985pck2i', date: 'May 2016', tags: ['hack', 'visualization'] }

  , { title: 'Batman bust - clay model', url: 'https://medium.com/@bigomega/sculpture-from-a-first-timer-ae966088bcd8', date: 'May 2015', tags: ['art'] }
  , { title: 'Windranger - Dota 2 - ipad art', url: 'http://bigomega.deviantart.com/art/Windranger-Dota-2-521934478', date: 'Mar 2015', tags: ['art'] }
  , { title: 'Ubuntu logo - 3d art', url: 'http://bigomega.deviantart.com/art/Ubuntu-Logo-503582682', date: 'Apr 2009', tags: ['art'] }
  , { title: 'Vector Illustration - Abishek', url: 'https://www.behance.net/gallery/21931539/My-Dear-Abishek', date: 'Dec 2014', tags: ['art'] }
  , { title: '#TheCupcakeSwage logo design', url: 'https://www.behance.net/gallery/37828833/TheCupcakeSwag-Logo-design', date: 'Dec 2015', tags: ['art', 'design', 'ui'] }

  , { title: 'Spotless cleaning service - website design', url: 'https://www.behance.net/gallery/30710447/Spotless-cleaning-service-bootstrap', date: 'Oct 2015', tags: ['design', 'ui'] }

  , { title: 'Batman logo - css', url: 'http://bharathraja.in/css-batman-75-logo/', date: 'Nov 2014', tags: ['css', 'ui'] }
  , { title: 'Guy Fawkes mask in CSS', url: 'https://medium.com/@bigomega/drawing-guy-fawkes-mask-in-css-ecace7d58b88#.u7lxtn194', date: 'Dec 2014', tags: ['css', 'ui'] }

  // , { title: 'Batman bust clay model - sculpture', url: 'https://medium.com/@bigomega/drawing-guy-fawkes-mask-in-css-ecace7d58b88#.u7lxtn194', date: 'May 2015', tags: ['art'] }
]
gibberish_list.sort(function(a, b) {
  return new Date(a.date) < new Date(b.date) ? 1 : -1
})
gibberish_list.forEach(function(task){
  $('.gibberish-list').append('\
    <div class="task">\
      <a target="_blank" href="'+ task.url +'">'+ task.title +'</a>\
      <br/>\
      <span class="date">'+ task.date +'</span>\
      '+ task.tags.map(function(tag){
        return '<span class="tag">'+ tag +'</span>'
      }).join('') +'\
    </div>\
  ')
})
/* ----- CONNECT ----- */
// render hive
// 7 lines
var hex_arrangement = [
  '3333',
  '32223',
  '321123',
  '3210123'
]
var hexval = {
  0: [['profile', 'data-nav="home']],
  1: [
    ['behance', 'https://www.behance.net/bigOmega'],
    ['github', 'https://github.com/bigomega/'],
    ['mail', 'mailto:bharathraja04@gmail.com'],
    ['medium', 'https://medium.com/@bigomega/'],
    ['twitter', 'https://twitter.com/bigomega'],
    ['youtube', 'https://www.youtube.com/c/bigomega'],
  ],
  2: [
    ['deviantart', 'http://bigomega.deviantart.com/'],
    ['codepen', 'http://codepen.io/bigomega/'],
    ['stackoverflow', 'http://stackoverflow.com/users/2130750/bigOmega'],
    ['steam', 'https://steamcommunity.com/id/bigomega'],
    ['tumblr', 'http://big0mega.tumblr.com'],
    ['linkedin', 'https://www.linkedin.com/in/bigomega'],
    ['reddit', 'https://www.reddit.com/user/big_omega/'],
    ['skype', 'https://join.skype.com/invite/Q4JtzyJcyudT'],
    ['soundcloud', 'https://soundcloud.com/big0mega/'],
    ['facebook', 'https://www.facebook.com/big0mega'],
    ['instagram', 'https://instagram.com/big0mega/'],
    ['flickr', 'https://www.flickr.com/photos/bigomega/albums'],
    // ['imgur', 'http://big0mega.imgur.com/'],
    // ['quora', 'https://www.quora.com/profile/Bharath-Raja'],
  ],
  count: { 0: 0, 1: 0, 2: 0 },
}
$('.hive').html((new Array(8)).join(1).split('').reduce(function(mem, x, ind) {
  // console.log('-------L', ind, line_count)
  var line_count = ind < 4 ? ind + 4 : 3 + 7 - ind
  return mem + '\
    <div class="line">\
    ' +
      (new Array(line_count + 1)).join(1).split('').reduce(function(mem2, y, ind2) {
        var level = hex_arrangement[line_count - 4][ind2]
        var val = hexval[level] ? hexval[level][hexval.count[level]++] : ''
        // console.log(level)
        return mem2 + '\
          <'+(val ? 'a' : 'div')+' class="hex-container level-'+ level +' '+ (val ? 'icon ' + val[0] : '') +'" target="_blank" '+(val ? (level != 0 ? 'href="' : '') + val[1] + '"' : '')+'>\
            <div class="hex-border"><div class="hex"><span></span></div></div>\
          </'+(val ? 'a' : 'div')+'>\
        '
      }, '')
    + '\
    </div>\
  '
}, ''))

/* ----- END ----- */
