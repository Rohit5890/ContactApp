import React from 'react';
import ReactDOM from 'react-dom';

export default class Button extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        let {handleClick, text, lable, className} = this.props;
        return(
            <div>
            { lable && 
                <button className={className} onClick = {handleClick && (()=>{handleClick()})}>{text}
                    <span>{lable}</span>
                </button>
            }
            { !lable && 
             <button className={className} onClick = {handleClick && (()=>{handleClick()})}>
             {text}
             </button>
            }
            </div>
        )
    }
}