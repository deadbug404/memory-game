function search(api,query){
    query = query.replace(" ","+");
    const data = fetch(`https://www.searchapi.io/api/v1/search?engine=duckduckgo&q=${query}&api_key=${api}`)
        .then(response => {
            if (!response.ok) {
                throw new Error();
            }
            return response.json();
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
    return data;
}

export { search }
