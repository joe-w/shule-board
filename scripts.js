// Load CSS
var urlParams = new URLSearchParams(window.location.search);
var link = document.createElement( "link" );
link.href = (urlParams.get('css') || 'stone-green') + '.css';
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

window.onload = function() {
    announce();
    setInterval(announce, 5000);
}
