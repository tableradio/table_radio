var currentstream = "";
var clickedplay = 0;

function playAudio(btn) {
  var stream = btn.parentElement.querySelector('audio');
  var playorpause = btn.getAttribute('class');

  if (playorpause === 'play') {
    if (clickedplay == 1){
      if (currentstream != btn.parentElement.querySelector('audio').id){
        document.getElementById(currentstream).pause();
        currentbtn.innerHTML = "Play &#9205;";
        currentbtn.setAttribute('class', 'play');
      }

    }
    clickedplay = 1;
    stream.load();
    stream.play();
    btn.innerHTML = "Pause &#9208;";
    btn.setAttribute('class', 'pause'); 
    currentstream = btn.parentElement.querySelector('audio').id;
    currentbtn = btn;
  } else {
    stream.pause();
    btn.innerHTML = "Play &#9205;";
    btn.setAttribute('class', 'play');
  }

  stream.onended = function () {
    btn.setAttribute('class', 'play');
  }
}

function addstream(name,url,num){ 
  var newDiv = document.createElement("div")
  newDiv.id = "radio" + String(num);
  newDiv.setAttribute('class', 'streamplayer');

  //var text = document.createTextNode(String(name));
  //newDiv.appendChild(text);
  newDiv.innerHTML += name;
  
  var audio = new Audio();
  audio.id = "player" + String(num);
  audio.src = url;
  newDiv.appendChild(audio);
  
  btn = document.createElement("button");
  //btn.id = "button" + String(num);
  btn.innerHTML += "Play &#9205;";
  btn.setAttribute('class', 'play');
  btn.setAttribute('onclick', 'playAudio(this)');
  newDiv.appendChild(btn);
  
  document.body.appendChild(newDiv);
}
/*
const CSVToArray = (data, delimiter = ",", omitFirstRow = false) =>
  data
      .slice(omitFirstRow ? data.indexOf("\n") + 1 : 0)
      .split("\n")
      .map(v => v.split(delimiter));
*/        
function csvToArray(str, delimiter = ",") {

//const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
//console.log(headers);
const headers = ['Name','Url'];

const rows = str.slice(str.indexOf("\n") + 1).split("\n");

const arr = rows.map(function (row) {
  const values = row.split(delimiter);
  const el = headers.reduce(function (object, header, index) {
    object[header] = values[index];
    return object;
  }, {});
  return el;
});

return arr;
}

async function getData(){
  var response = await fetch('http://ssh.noglider.com:8088/user1.csv');
  var data = await response.text();
  //console.log(typeof(data));
  console.log(data);
  var final = csvToArray(data);
  for (let i = 0; i< (final.length)-1; i++) {
    addstream(final[i].Name, final[i].Url,i);
  }
  return;
}
/*
function changestream(num,name,url){
  playername = "player" + String(num);
  radioname = "radio" + String(num);
  document.getElementById(radioname).firstChild.data = String(name);
  document.getElementById(playername).src = String(url);
}
*/

function changestream(){
  playername = "player" + String(document.getElementById("myInput1").value);
  radioname = "radio" + String(document.getElementById("myInput1").value);
  document.getElementById(radioname).firstChild.data = String(document.getElementById("myInput2").value);
  document.getElementById(playername).src = String(document.getElementById("myInput3").value);
}

function save(){
  var s = "Name,Url\n";
  for (let i = 0; i< (document.getElementsByClassName("streamplayer").length); i++) {
    playername = "player" + String(i);
    radioname = "radio" + String(i);
    var a = document.getElementById(radioname).firstChild.data + "," + document.getElementById(playername).src + "\n";
    var s = s + a;
  }
  console.log(s);
}

getData();


//document.getElementsByClassName("streamplayer").length;