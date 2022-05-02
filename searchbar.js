fetchRadioStations("");

async function fetchRadioStations(search_string) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': '50k-radio-stations.p.rapidapi.com',
            'X-RapidAPI-Key': '12243b1d97mshde8e8d53591ba1fp1c3c6ejsn59205afc2c46'
        }
    };
    var selecting_stations;
    var page_count = 5;
    for (var i = 1; i < page_count; i++) {
        var pageurl = 'https://50k-radio-stations.p.rapidapi.com/get/channels?country_id=5&page=' + i;
        console.log(pageurl);
        await fetch(pageurl, options)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                    // if (response.has_next === false){
                    //     page_count = i;
                    // }
                document.getElementById("rdcontent").innerHTML = "";
                for (let i = 0; i < response.data.length; i++) {
                    console.log(response.data.length);
                    console.log(response.data[i]);
                    var station_name = response.data[i].name;
                    var station_logo = response.data[i].logo.original;
                    var station_genres = response.data[i].genres;
                    var station_country = response.data[i].country;
                    console.log(station_name)
                    if (search_string != "") { //did we get anything from the parameter on line 2
                        var sUp = search_string.toUpperCase();
                        var gResult = false;
                        for (let i = 0; i < station_genres.length; i++) {
                            var gUp = station_genres[i].toUpperCase();
                            gResult = gUp.indexOf(sUp) > -1;
                            console.log(gUp.indexOf(sUp));
                            if (gResult === true) {
                                break;
                            }
                        }
                        var cUp = station_country.toUpperCase();
                        var nUp = station_name.toUpperCase();
                        let nResult = nUp.indexOf(sUp) > -1;
                        let cResult = cUp.indexOf(sUp) > -1;
                        if (nResult === false && cResult === false && gResult === false) {
                            continue;
                        }
                    }
                    if (selecting_stations == "" || selecting_stations == null) {
                        selecting_stations = create_station(station_name, station_logo, station_genres, station_country);
                    } else {
                        selecting_stations += create_station(station_name, station_logo, station_genres, station_country);
                    }
                    document.getElementById("rdcontent").innerHTML = selecting_stations;
                }
            })
            .catch(err => console.error(err));
    }
}

function create_station(station_name, station_logo, station_genres, station_country) {
    console.log("got here")
    var stations;
    for (let i = 0; i < station_genres.length; i++) {
        if (stations == "" || stations == null) {
            stations = station_genres[i];
        } else {
            stations += ", " + station_genres[i];
        }
    }
    var contenttemplate = "<div class='row'><div class='col-4'>name: </div><div class='col-8'>" + station_name + "</div></div>"
    contenttemplate = contenttemplate + "<div class='row'><div class='col-4'>logo: </div><div class='col-8'><img src='" + station_logo + "' alt='" + station_name + "'/> </div></div>"
    contenttemplate = contenttemplate + "<div class='row'><div class='col-4'>genre: </div><div class='col-8'>" + stations + "</div></div>"
    contenttemplate = contenttemplate + "<div class='row'><div class='col-4'>country: </div><div class='col-8'>" + station_country + "</div></div>"
    return contenttemplate;
}

function search_stations(search_string) {
    if (search_string.length > 3 || search_string.length == 0) {
        fetchRadioStations(search_string);
    }
}