
// INITIAL SELECTORS

const body = document.body,
      intro = body.querySelector("pg[name='Intro']"),
      slide = body.querySelector("pg[name='Projects']"),
      bbls = body.querySelector("pagination");

// SLIDES

const ps = {
  "Lablo"  : {
    box : [
      {size: [2,4], url: "src/lablo/stream.png"},
      {size: [1,2], url: "src/lablo/chat.png"},
      {size: [1,2], url: "src/lablo/splash.gif"}],
    txt : "Lablo is a desktop app for Win/MacOS that streams to Twitch, with custom overlays, stream controls & widgets. Built in Electron utilizing html, js, css & node.js",
    acc: "#6b48da"
  },
  "Weather"  : {
    box : [
      {size: [1,1], url: "src/weather/app.gif"},
      {size: [1,1], url: "src/weather/long.png"},
      {size: [2,1], url: "src/weather/code.png"}],
    txt : "A React weather app that uses geolocation, rain alerts, 7-day forecasting and provides fundamental weather data.",
    acc: "#71b3ff"
  },
  "Spooder Web"  : {
    box : [
      {size: [2,1], url: "src/spooder/banner.png"},
      {size: [1,1], url: "src/spooder/part1.png"},
      {size: [1,1], url: "src/spooder/part3.png"},
      {size: [1,1], url: "src/spooder/logo.svg"},
      {size: [1,1], url: "src/spooder/capability_map.png"}],
    link : "https://github.com/GreySole/Spooder",
    txt : "Spooder is an OSC Client to run chat command interactions by GreySole. I just created the website.",
    acc: "#fab400"
  },
  "Croworn"  : {
    box : [
      {size: [2,1], url: "src/croworn/page.png"},
      {size: [2,1], url: "src/croworn/logo.svg"},
      {size: [1,1], url: "src/croworn/logo_square.svg"}],
    gh : "https://github.com/tytekkit/croworn",
    link : "https://tytekkit.github.io/croworn/",
    txt : "CroWorn is a launching fashion co., specialty and traditional style in hats.",
    acc: "#b66e4d"
  },
  "Wirenut"  : {
    box : [
      {size: [2,1], url: "src/wirenut/chat.png"},
      {size: [2,1], url: "src/wirenut/reschedule.png"},
      {size: [2,2], url: "src/wirenut/audit.png"},
      {size: [1,1], url: "src/wirenut/logo.svg"}],
    link : "https://wirenut.work",
    txt : "An all-in-one, proprietary cross-platform application solution for iOS, Android, MacOS & Windows, covering support for inventory & file management, video player, scheduling, reporting, training, messaging, notifications and user credentials, with real-time updating & offline async capability. Built on HTML, CSS, JavaScript, jQuery, MYSQL, PHP, NodeJS & Amazon Web Services.",
    acc: "#3F77CA"
  }
}

let html = "";

for (p in ps) {
  let set = ps[p];
  html += `<pg name="${p}" style="--acc: ${ps[p]["acc"]}; --bg: ${ps[p]["bg"]}">`;
  html +=   `<button class="l" onclick="mslide(-1)"></button>`;
  html +=   `<button class="r" onclick="mslide(1)"></button>`;
  html +=   `<div class="gallery">`;
  for (img in set["box"]) {
    let size = set["box"][img]["size"],
        url = set["box"][img]["url"];
    html += `<img style="grid-column: span ${size[0]}; grid-row: span ${size[1]};" src=${url}>`;
  };
  html +=   `<el>`;
  html +=     `<h1>`;
  html +=       `<text>${p}</text>`;
  if (ps[p]["link"]) html +=
                `<a href="${ps[p]["link"]}" target="_blank"><i class="fa-solid fa-link"></i></a>`;
  if (ps[p]["gh"]) html +=
                `<a href="${ps[p]["gh"]}" target="_blank"><i class="fa-brands fa-github-alt"></i></a>`;
  html +=     `</h1>`;
  html +=     `<text>${ps[p]["txt"]}</text>`;
  html +=   `</el>`;
  html +=   `</div>`;
  html += `</pg>`;
}

slide.innerHTML += html;

mslide = (dir) => {
  let current = body.querySelector("pg.slide");
  (dir == -1) ? current.previousSibling.scrollIntoView({behavior: "smooth", inline: "nearest"}) :
                    current.nextSibling.scrollIntoView({behavior: "smooth", inline: "nearest"});
}

// SCROLLER - Dots

body.querySelectorAll("body > pg").forEach(el => {
  let html =  `<bubble name=${el.getAttribute("name")} onclick="scroller('${el.getAttribute("name")}')">`;
  el.querySelectorAll("pg").forEach(la => html +=
                `<bubble name=${la.getAttribute("name")}  onclick="scroller('${la.getAttribute("name")}')"></bubble>`);
      html += `</bubble>`;
  bbls.innerHTML += html;
});

scroller = (name) => {
  let pg = body.querySelector(`pg[name='${name}']`);
  pg.scrollIntoView({behavior: "smooth", inline: "nearest"});
}

// SCROLLING - Handler

let pgs = body.querySelectorAll("body > pg");

body.onscroll = (e) => {

  let cs = document.getElementsByClassName("current");
  while (cs.length) cs[0].classList.remove("current");
  const scroll = body.scrollTop,
        win = window.innerHeight,
        c = Math.round(scroll / win);

  bbls.children[c].classList.add("current");
  pgs[c].classList.add("current");

};

slide.onscroll = (e) => {

  let cs = document.getElementsByClassName("slide");
  while (cs.length) cs[0].classList.remove("slide");

  let scroll = slide.scrollLeft,
      width = slide.offsetWidth,
      c = Math.round(scroll / width);
      c++;

  body.querySelectorAll(`[name=Projects] > :nth-child(${c})`)
  .forEach(el => el.classList.add("slide"));

}

// LOAD, add current & slide

let check = false;
loaded = async () => check = true;
const wait = () => {
  if (!check) setTimeout(wait, 500);
  else {
    slide.firstElementChild.classList.add("slide");
    bbls.querySelector("bubble[name=Projects]").firstElementChild.classList.add("slide");
    intro.classList.add("current");
    bbls.firstElementChild.classList.add("current");
    document.querySelector('loader').remove();
  }
}; wait();

// EMAIL

const form = body.querySelector("form");

subform = (e) => {
  const url = "https://formsubmit.co/7c271fd82b574c6a98cb0d47ed48c97d",
        req = new XMLHttpRequest();
  req.open('POST', url, true);
  form.classList.add("sending");
  req.onload = () => form.classList.add("sent");
  req.onerror = function() {};
  req.send(new FormData(event.target));
  e.preventDefault();
}

// TagCloud

const mytags = [
  "HTML", "XHTML", "CSS3", "SASS", "LESS", "Bootstrap",
  "Javascript", "JQuery", "React", "PHP", "MySQL", "Python",
  "AWS", "Node.js", "Laravel", "Wireframing", "Prototyping", "Sketch",
  "Figma", "Photoshop", "Illustrator", "InDesign", "Illustration",
  "Unity", "Unreal", "Godot", "Electron", "Canvas", "WordPress"
]

const tc = body.querySelector("tagcloud");

var tagCloud = TagCloud(tc, mytags,{
  radius: 400,
  maxSpeed: 'normal',
  initSpeed: 'slow',
  direction: 120,
  keep: true
});
