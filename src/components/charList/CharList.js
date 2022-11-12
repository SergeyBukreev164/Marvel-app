import './charList.scss';
import { Component } from 'react';
import MarvelServices from '../../services/MarvelServices';
import Spinner from '../spiner/Spinner';
import ErrorMassage from '../errorMassage/ErrorMassage';

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false,
    }

    marvelServices= new MarvelServices();

    componentDidMount() {
        this.marvelServices.getAllCharacter()
        .then(this.onCharLoaded)
        .catch(this.onError)
       
    }
 
    onCharLoaded = (charList) => {      
        this.setState({charList, loading: false})
        console.log(charList)
    }
     
    onError = () =>{
        this.setState({
            loading: false,
            error: true,
        })
    }

    renderArr = (arr) =>{
        const charItem = arr.map(item => {
            let imgSlyle = {'objectFit':'cover'}
            if(item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
                imgSlyle = {'objectFit':'unset'};
            }
            
            return (
                <li className="char__item" key={item.id}>
                    <img src={item.thumbnail} alt={item.name} style={imgSlyle}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        
       
        })
    return (
        <ul className="char__grid">
            {charItem}
        </ul>
    )
    }

    render() {

        const {charList, loading, error} = this.state
        const errorMassage = error ? <ErrorMassage/> : null
        const spinner = loading ? <Spinner/> : null 
        const item = this.renderArr(charList)
        const content = !(loading || error) ? item : null 

        
        return (
            <div className="char__list">
            
               {errorMassage}
               {spinner}
               {content}
            
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
        )
        
    }

  
}

export default CharList;