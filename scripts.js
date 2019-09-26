// Load CSS
var urlParams = new URLSearchParams(window.location.search);
var link = document.createElement( "link" );
link.href = (urlParams.get('css') || 'stone-green') + '.css?no-cache';
link.type = "text/css";
link.rel = "stylesheet";
document.getElementsByTagName( "head" )[0].appendChild( link );


announcements = [
    'Mazal Tov to whomever on whatever',
    `A multiline announcement
with newlines embedded`,
    `A long line that goes on and on and will hopefully wrap around before it goes off the screen, but we'll only know once we try it`,
    `some English
גם עברית
and everyone's nightmare עברית and English on same line`
]

var a_index = 0;
function announce() {
    document.getElementById("announcement").innerHTML = announcements[a_index].replace(/(?:\r\n|\r|\n)/g, '<br>');
    a_index += 1;
    if (a_index == announcements.length) { a_index = 0; }
}

console.log('in script')
function loadJSON(path, callback) {   
    console.log('loading JSON:', path)
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', path, true);
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") {
        callback(JSON.parse(xobj.responseText));
      }
    };
    xobj.send(null);  
}

var rotations = new Map()
function rotate(name, array, delay) {
    index = rotations[name] || 0;
    document.getElementById(name).innerHTML = array[index];
    rotations[name] = index + 1;
    if (rotations[name] == array.length) { rotations[name] = 0; }
    if (delay) {
        setInterval(rotate, delay, name, array, 0)
    }
}

function render(obj) {
    console.log('in render')
    times_t = document.getElementById("times_t").innerHTML
    console.log('found template')
    times_render = Handlebars.compile(times_t)
    console.log('compiled template')
    pages = []
    console.log('# of pages:', obj.pages.length)
    for (page of obj.pages) {
        console.log('compiling page')
        pages.push(times_render(page).replace(/@/g,'"'))
    }
    page_div = document.getElementById("main")
    page_div.innerHTML = pages[0]
    rotate('main', pages, 2000)
}

for (var i=0; i < announcements.length; i++) {
    announcements[i] = announcements[i].replace(/(?:\r\n|\r|\n)/g, '<br>');
}

window.onload = function() {
    // announce();
    // setInterval(announce, 5000);
    rotate('announcement', announcements, 5000)
    loadJSON('src/' + (urlParams.get('json') || 'rh-raw') + '.json?no-cache', render);
}

