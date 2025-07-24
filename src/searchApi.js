function search(api,query){
    query = query.replace(" ","+");
    const data = fetch(`https://www.searchapi.io/api/v1/search?engine=google_images&q=${query}&api_key=${api}`)
        .then(response => {
            if (!response.ok) {
                throw new Error();
            }
            return response.json();
        }).then(data => {
            const imagesArr = [...data["images"]];
            const randomizedImages = imagesArr.sort(()=> 0.5 - Math.random()).slice(0,20);
            return randomizedImages;
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
    return data;
}

export { search }
