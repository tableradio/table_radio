fetch("https://50k-radio-stations.p.rapidapi.com/get/channels?keyword=a&country_id=50&page=1", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "50k-radio-stations.p.rapidapi.com",
		"x-rapidapi-key": "12243b1d97mshde8e8d53591ba1fp1c3c6ejsn59205afc2c46"
	}
})
.then(response => response.json())
.then(data => {
    const list = data.d;

    list.map(item) => {
        const name = item.l;
        const poster = item.i.imageUrl;
        const station = '<li><img src="${poster}" <h2>${name}</h2><li>'
        document.querySelector('.stations').innerHTML += station;
    })
})
.catch(err => {
	console.error(err);
});