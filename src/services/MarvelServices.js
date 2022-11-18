class MarvelServices {

    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=44d3e5d5a17f9388fb974c0daf97d965';
    _offset = 210;
    

    getResource = async(url) =>  {
        
        let res = await fetch (url);
    
        if(!res.ok) {
            throw new Error(`could not fetch ${url} status ${res.status}`)
        }
    
        return await res.json();
    }

    getAllCharacter = async(offset = this._offset) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter)
    }
   // https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=5&apikey=44d3e5d5a17f9388fb974c0daf97d965
    getCharacter = async(id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0])
    }

    _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0,200)} ...` : 'Описание персонажа отсутствует',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items,
        }
    }
}



export default MarvelServices;