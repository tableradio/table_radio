fetchRadioStations();
function fetchRadioStations() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': '50k-radio-stations.p.rapidapi.com',
            'X-RapidAPI-Key': '12243b1d97mshde8e8d53591ba1fp1c3c6ejsn59205afc2c46'
        }
    };
    var selecting_stations;
    fetch('https://50k-radio-stations.p.rapidapi.com/get/channels', options)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            for (let i = 0; i < response.data.length; i++) { 
                console.log(response.data[i]);
                var station_name = response.data[i].name;
                var station_logo = response.data[i].logo.original;
                var station_genres = response.data[i].genres;
                var station_country = response.data[i].country;
                console.log(station_name)
                create_station(station_name, station_logo, station_genres, station_country);
            }
        })
        .catch(err => console.error(err));}

        function create_station(station_name, station_logo, station_genres, station_country){
            console.log("got here")
            document.getElementById("station_name").textContent=station_name;
            document.getElementById("station_logo").innerHTML="<img src='"+ station_logo + "'/>"; //image tag, src is link for image
            var text;
            for (let i = 0; i < station_genres.length; i++) { 
                if (text == "" || text == null)
                {
                    text = station_genres[i];
                }
                else {
                    text += ", " + station_genres[i];
                }
            }
            document.getElementById("station_genre").textContent=text;
            document.getElementById("station_country").textContent=station_country;
        }
"<div class='row'><div class='col-4'>name: </div><div class='col-8' id='station_name'>value</div></div> "
"<div class='row'><div class='col-4'>logo: </div><div class='col-8' id='station_logo'>value</div></div>"
"<div class='row'><div class='col-4'>genre: </div><div class='col-8' id='station_genre'>value</div></div>"
"<div class='row'><div class='col-4'>country: </div><div class='col-8' id='station_country'>value</div></div>" 
//make 4 straight lines, single quotes