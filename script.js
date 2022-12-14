
// INITIAL SELECTORS

const body = document.body,
      intro = body.querySelector("pg[name='Intro']"),
      slide = body.querySelector("pg[name='Projects']"),
      graphic = body.querySelector("#Graphics"),
      bbls = body.querySelector("pagination");

// SLIDES

const ps = {
  "Lablo"  : {
    box : [
      {size: [2,4], url: "src/lablo/stream.jpg"},
      {size: [1,2], url: "src/lablo/chat.jpg"},
      {size: [1,2], url: "src/lablo/splash.gif"}],
    txt : "Lablo is a desktop app for Win/MacOS that streams to Twitch, with custom overlays, stream controls & widgets. Built in Electron utilizing html, js, css & node.js",
    acc: "#6b48da"
  },
  "Weather"  : {
    box : [
      {size: [1,1], url: "src/weather/loading.gif"},
      {size: [1,1], url: "src/weather/app.gif"},
      {size: [2,1], url: "src/weather/code.jpg"}],
    txt : "A React weather app that uses geolocation, rain alerts, 7-day forecasting and provides fundamental weather data.",
    acc: "#71b3ff"
  },
  "Spooder"  : {
    box : [
      {size: [2,1], url: "src/spooder/banner.jpg"},
      {size: [1,1], url: "src/spooder/part1.jpg"},
      {size: [1,1], url: "src/spooder/part2.jpg"},
      {size: [1,1], url: "src/spooder/logo.svg"},
      {size: [1,1], url: "src/spooder/capability_map.jpg"}],
    link : "https://github.com/GreySole/Spooder",
    txt : "Spooder is an OSC Client to run chat command interactions by GreySole. I just created the website.",
    acc: "#fab400"
  },
  "Wirenut"  : {
    box : [
      {size: [2,1], url: "src/wirenut/chat.jpg"},
      {size: [2,1], url: "src/wirenut/reschedule.jpg"},
      {size: [2,2], url: "src/wirenut/audit.jpg"},
      {size: [1,1], url: "src/wirenut/logo.svg"}],
    link : "https://wirenut.work",
    txt : "An all-in-one, proprietary cross-platform application solution for iOS, Android, MacOS & Windows, covering support for inventory & file management, video player, scheduling, reporting, training, messaging, notifications and user credentials, with real-time updating & offline async capability. Built on HTML, CSS, JavaScript, jQuery, MYSQL, PHP, NodeJS & Amazon Web Services.",
    acc: "#3F77CA"
  },
  "Ghostly"  : {
    box : [
      {size: [2,1], url: "src/ghostly/ss1.jpg"},
      {size: [2,1], url: "src/ghostly/logo.jpg"},
      {size: [1,1], url: "src/ghostly/vs.gif"}],
    txt : "Ghostly is a solo project, party game where you play as floaty ghosts and do floaty ghost stuff, written in GDScript.",
    acc: "#5da0a7"
  }
}

let html = "";

for (p in ps) {
  let set = ps[p];
  html += `<pg name="${p}" style="--acc: ${ps[p]["acc"]}; --bg: ${ps[p]["bg"]}">`;
  html +=   `<div class="gallery">`;
  for (img in set["box"]) {
    let size = set["box"][img]["size"],
        url = set["box"][img]["url"];
    html += `<img style="grid-column: span ${size[0]}; grid-row: span ${size[1]};" src=${url}>`;
  };
  html +=   `<el>`;
  html +=     `<button class="l" onclick="mslide(-1)"></button>`;
  html +=     `<h1>`;
  html +=       `<text>${p}</text>`;
  html +=     `</h1>`;
  html +=     `<text>${ps[p]["txt"]}</text>`;
  if (ps[p]["link"]) html +=
              `<a href="${ps[p]["link"]}" target="_blank"><i class="fa-solid fa-link"></i></a>`;
  if (ps[p]["gh"]) html +=
              `<a href="${ps[p]["gh"]}" target="_blank"><i class="fa-brands fa-github-alt"></i></a>`;
  html +=     `<button class="r" onclick="mslide(1)"></button>`;
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

// GRAPHICS

const gs =
  [ "src/graphics/bc_alic.jpg", "src/graphics/angry_cat_pillow.jpg",
    "src/graphics/cap_fire_logo.jpg", "src/graphics/cnc_bc.jpg",
    "src/graphics/3staxidermy.jpg", "src/graphics/map.jpg",
    "src/graphics/cpsol.jpg", "src/graphics/hpp_bc.jpg",
    "src/graphics/craftia_label.jpg" ];

let html2 = "";

for (g in gs) html2 += `<img src=${gs[g]}>`;

graphic.innerHTML += html2;


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
let cx = 0//previous position

body.onscroll = (e) => {
  const scroll = body.scrollTop,
        win = window.innerHeight,
        c = Math.round(scroll / win);
  let cs = document.getElementsByClassName("current");
  if (c !== cx) while (cs.length) cs[0].classList.remove("current");
  cx = c;
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
  if (!check) setTimeout(wait, 1500);
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
  "","","","","","","","","","","","","","","",""
]

const tc = body.querySelector("tagcloud");

var tagCloud = TagCloud(tc, mytags,{
  radius: 360,
  maxSpeed: 'normal',
  initSpeed: 'slow',
  direction: 120,
  keep: true
});
