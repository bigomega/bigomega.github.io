document.querySelectorAll('#life-so-far .filters input').forEach(inp =>
  inp.onchange = function () {
    document.querySelectorAll('.events .event').forEach(d => d.classList.add('hide'))
    document.querySelectorAll(`.events .event${inp.value}`).forEach(d => d.classList.remove('hide'))
  }
)

function getTimeTillDate(date) {
  var diff = new Date(new Date() - new Date(date))
  var month = Math.ceil(diff / (1000 * 60 * 60 * 24 * 30))
  return month + ' month(s)'
}

const CAREERS = [{
  tags: ['marketing', 'design'],
  org: {
    id: 'browserstack',
    title: 'BrowserStack',
    url: 'https://www.browserstack.com/',
  },
  title: 'Developer Advocate',
  duration: getTimeTillDate('12/1/2021'),
  // duration: '2 years',
  dates: 'Nov 2021 - Sep 2023',
  content: `
    <a href="https://www.browserstack.com/browserstack-champions">BrowserStack Champions Program</a>
    <br/>
    <a href="https://nightwatchjs.org/blog/">Nightwatch.js</a>
    <br/>
    <a href="https://www.browserstack.com/open-source">Open source Sponsorship</a>
  `,
},{
  tags: ['proto', 'app', 'api', 'devops'],
  org: {
    id: 'peritus',
    title: 'Peritus.ai',
    url: 'https://peritus.ai/',
  },
  title: 'Software Engineer',
  duration: '1 year 4 months',
  dates: 'Mar 2020 - Jun 2021',
  content: `
    Working in a startup again was a busy and nostalgic experience. In the 5 quarters, I
    had worked on 4 different projects in UI, data ingestion, data analysis using JS, python, and pinch of Java.
    Starting with front-end support for the existing product, I moved to the data ingestion side where I wrote
    python modules to ingest GitHub issues data into GCP and AWS (the infra kept changing), some data analysis
    scripts in python, and a couple of Java APIs. Then I worked on an annotation tool interface that was
    crowdsourced for tagging snippets of information. Then I focussed on getting an analytics dashboard prototype
    using custom widgets on top of redash UI. Later I migrated it to a full-fledged in-house application.
  `,
},{
  tags: ['design', 'marketing'],
  org: {
    id: 'india',
    title: 'Travel Break',
  },
  title: 'Digital Nomad',
  duration: '9 months',
  dates: 'Apr 2019 - Feb 2020',
  content: `
    Traveled alone around India and Nepal on a motorbike for about 18,000 km with just my
    tent and sleeping bag. It was a long journey with a lot of stories. Here are some highlights, Procured a
    paraglider’s pilot license; Helped a friend kickstart the first product prototype; Built cosplay for
    comic-con; Learned the Buddhist meditation technique through a 10-day pure-silent zero-distraction course;
    Helped the artist gathered in a remote Himachal village set up art installations; Interviewed a cafe owner
    stuck in J&K lockdown; Helped setup a website booking for tent stays in ziro music festivals, northeast; Met
    up with folks trying to set up hackerspaces in the Himalayas; Helped set up a mixed farm from the ground
    level.
  `,
},{
  tags: ['event', 'proto', 'app', 'marketing'],
  org: {
    id: 'freshworks',
    title: 'Freshworks',
    url: 'https://www.freshworks.com/',
  },
  title: 'Developer Advocate',
  duration: '7 months',
  dates: 'Apr 2019 - Feb 2020',
  content: `
    Traveled alone around India and Nepal on a motorbike for about 18,000 km with just my
    tent and sleeping bag. It was a long journey with a lot of stories. Here are some highlights, Procured a
    paraglider’s pilot license; Helped a friend kickstart the first product prototype; Built cosplay for
    comic-con; Learned the Buddhist meditation technique through a 10-day pure-silent zero-distraction course;
    Helped the artist gathered in a remote Himachal village set up art installations; Interviewed a cafe owner
    stuck in J&K lockdown; Helped setup a website booking for tent stays in ziro music festivals, northeast; Met
    up with folks trying to set up hackerspaces in the Himalayas; Helped set up a mixed farm from the ground
    level.
  `,
}]

;(function() {
  var diff = new Date(new Date() - new Date(document.querySelector('.time-from').dataset.date))
  var month = Math.ceil(diff / (1000 * 60 * 60 * 24 * 30))
  document.querySelector('.time-from').innerHTML = month + ' month(s)'
})()
