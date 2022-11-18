import './charList.scss';
import React, { Component } from 'react';
import MarvelServices from '../../services/MarvelServices';
import Spinner from '../spiner/Spinner';
import ErrorMassage from '../errorMassage/ErrorMassage';

class CharList extends Component {
    
    state = {
        charList: [],
        loading: true,
        error: false,
        itemLoading: false,
        offSet: 200,
        charEnd: false,
        
    }
    

    marvelServices= new MarvelServices();

    

    componentDidMount() {
        this.onReqest()
        
       
    }
        //первый запрос на сервер
    onReqest = (offset) => {
        this.onCharLoading();
        this.marvelServices.getAllCharacter(offset)
        .then(this.onCharLoaded)
        .catch(this.onError)
        console.log(offset)
    }

    onCharLoading = () => {
        this.setState({
            itemLoading: true
        })
    }
        //второй запрос на сервер
    onCharLoaded = (newCharList) => {      
        
        let ended = false
        if(newCharList.length < 9) {
            ended = true
        }
            
        this.setState(({charList, offSet}) => (
            {
                charList: [...charList, ...newCharList],
                loading: false,
                itemLoading: false,
                offSet: offSet +9,
                charEnd: ended,
            }
        ))
    }
    
    
        
     
    onError = () =>{
        this.setState({
            loading: false,
            error: true,
        })
    }

    arrRefs = [];
    
    itemRef = (ref) => {
        this.arrRefs.push(ref);
        console.log(this.arrRefs)
    }

    changeRefs = (id) => {
        this.arrRefs.forEach(item => {
            item.classList.remove('char__item_selected')
        })
        this.arrRefs[id].classList.add('char__item_selected')
        this.arrRefs[id].focus();
    }

   

    renderArr = (arr) =>{
        const charItem = arr.map((item, i) => {
            let imgSlyle = {'objectFit':'cover'}
            if(item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgSlyle = {'objectFit':'unset'};
            }
 
            return (
                <li className="char__item" key={item.id}
                //при клике передаем id в app.js
                onClick={() => {this.props.onCharSelected(item.id);
                this.changeRefs(i)}}
                ref={this.itemRef}
                
                >
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

        const {charList, loading, error, itemLoading, offSet, charEnd} = this.state
        const errorMassage = error ? <ErrorMassage/> : null
        const spinner = loading ? <Spinner/> : null 
        const item = this.renderArr(charList)
        const content = !(loading || error) ? item : null 

        
        return (
            <div className="char__list">
            
               {errorMassage}
               {spinner}
               {content}
            
            <button 
                className="button button__main button__long"
                disabled={itemLoading}
                onClick={() => {this.onReqest(offSet)}}
                style={{'display': charEnd ? 'none' : 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
        )
        
    }

  
}

export default CharList;