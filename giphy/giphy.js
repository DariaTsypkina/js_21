function search() {
    let searchValue = document.getElementById('search').value.trim();
    let api_key = 'wpmnrpK88lFhCGl7bWHIOE40I01NAbyZ';

    if (searchValue == "") return;
    fetch("https://api.giphy.com/v1/gifs/search?api_key=" + api_key + "&q=" + searchValue + "&limit=5&offset=0&rating=g&lang=en")
        .then(response => response.json())
        .then(data => {
            let result = data.data;

            document.getElementById("container").innerHTML = "";

            for (let i = 0; i < result.length; i++) {
                document.getElementById("container").innerHTML +=
                `<div>
                    <p>Title: ${result[i].title}</p>
                    <img src="${result[i].images.original.url}" alt="" id="img"><br>
                    <a href="${result[i].url}">Link to gif</a>
                </div>`;
            }
        })
        .catch(err => console.log(err));
}