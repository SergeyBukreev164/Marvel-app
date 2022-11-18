import { Component } from 'react';
import PropTypes from 'prop-types';
import MarvelServices from '../../services/MarvelServices';
import ErrorMassage from '../errorMassage/ErrorMassage';
import Spinner from '../spiner/Spinner';
import Skeleton from '../skeleton/Skeleton'
import './charInfo.scss';


class CharInfo extends Component {

    state = {
        char: null,
        loading: false,
        error: false,
    }

    
    marvelServices = new MarvelServices() // создаем новое св-во внутри класса

    componentDidMount() {
        this.UpdateChar()
    }

    componentDidUpdate(prevProps) {
        if(this.props.charId !== prevProps.charId){
            this.UpdateChar();
        }
    }

    UpdateChar = () => {
       const {charId} = this.props
       if(!charId) {
        return
       }
       this.onCharloading()
       this.marvelServices
       .getCharacter(charId)
       .then(this.onCharLoaded)
       .catch(this.onError)
    }

    
    onCharLoaded = (char) => {      
        this.setState({char, loading: false})
    }

    onCharloading = () => {
        this.setState({
            loading: true
        })
    }

    onError = () =>{
        this.setState({
            loading: false,
            error: true,
        })
    }

    render() {
        const {char, loading, error} = this.state
        const errorMassage = error ? <ErrorMassage/> : null
        const spinner = loading ? <Spinner/> : null 
        const skeleton = loading || error || char ? null : <Skeleton/>
        const content = !(loading || error || !char) ? <View char={char}/> : null 
        
        return (
            <div className="char__info">
                {skeleton}
                {errorMassage}
                {spinner}
                {content}
            </div>
        )
    }
    
}

const View = ({char}) => {
   const {name, description, thumbnail, wiki, homepage, comics} = char;
   let imgSlyle = {'objectFit':'cover'}
    if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
        imgSlyle = {'objectFit':'contain'};
    } 
    return (
        <>
            <div className="char__basics">
                    <img src={thumbnail} alt={name} style={imgSlyle}/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                 {description}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    { comics.length > 0 ? null : 'Комиксы этого персонажа не найдены' }

                    

                    {
                        comics.map((item, i) => {
                            if(i > 9) return
                                return (
                                    <li key={i} className="char__comics-item">
                                        {item.name}
                                    </li>
                                )
                            
                            
                        })
 
                    }
                </ul>
        </>
    )
}

export default CharInfo;