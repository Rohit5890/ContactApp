import React from 'react';
import ReactDOM from 'react-dom';

import Button from './component.Button';

import '../styles/contactForm.css';


export default class ContactForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            firstName:'',
            lastName:'',
            email:'',
            phoneNumber:'',
            status:''
        };
        this.CONTACTS = [];
        if(props.edit){
            this.myRef = React.createRef();
        }
    }
    handleSubmit(e){
        e.preventDefault();
        
        for(let i = 1; i< e.target.childNodes[0].childElementCount - 1;i++){
            let elem =  e.target.childNodes[0].children[i].querySelector('input');

            this.validForm = this.validate(elem.name,elem.value);
            if(!this.validForm){
                this.currElemName = elem.name;
                break;
            }
        }
        
        if(!this.validForm) {
            alert(`Invalid ${this.currElemName}  Data`);
            document.querySelector('input[name^='+this.currElemName+']').focus();
            return false;
        }
        if(this.props.edit){
            this.data = Object.assign({},this.props.contactList[0],this.state);
            let response = JSON.parse(localStorage.getItem('CONTACTS')); 
            let index ='';

            for(let i= 0;i<response.length;i++){
                if(this.data.key === response[i].key ){
                    index = i;
                    break;
                }
            }
            response[index] = (this.data);
            this.CONTACTS = response;
        }  
        else{
            this.data = Object.assign({}, this.state, {key: new Date().getTime()});
            this.CONTACTS = [...this.props.contactList, ...[this.data]];
        }
        
        localStorage.setItem('CONTACTS', JSON.stringify(this.CONTACTS));
        this.props.updateContact(JSON.parse(localStorage.getItem('CONTACTS')));
    }
    validate(name,value){

        switch(name){
            case 'firstName':
            case 'lastName':
            case 'status':
                if(value && value.match(/^[a-zA-Z]+$/)){
                    return true;
                }else{
                    return false
                }
            case 'email': 
                if(value){
                    let lastAtPos = value.lastIndexOf('@');
                    let lastDotPos = value.lastIndexOf('.');
                    if (!(lastAtPos < lastDotPos && lastAtPos > 0 && value.indexOf('@@') == -1 && lastDotPos > 2 && (value.length - lastDotPos) > 2)) {
                        return false;
                    }else{
                        return true;
                    }
                }else{
                    return false;
                }
            case 'phoneNumber':
                if(value && value.match(/^\d+$/)){
                    return true
                }else{
                    return false
                }
        }
        
    }
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
         })
    }
    componentDidMount(){
        this.props.edit ? this.handleEdit():''; 
    }
    handleEdit(){
        let  { firstName, lastName,email, phoneNumber, status } = this.props.contactList[0];
        
        this.setState({
            firstName: firstName,
            lastName: lastName,
            email:email,
            phoneNumber:phoneNumber,
            status:status
        })
    }
    closeModal(){
        debugger;
        this.props.updateContact(JSON.parse(localStorage.getItem('CONTACTS')));
    }
    render(){
        let { edit, heading } = this.props;
        return(
            <div className='contact-form'>
                <button className='modal-close' onClick={()=>{this.closeModal()}}>X</button>
                <form onSubmit={(e)=>{this.handleSubmit(e)}} ref={this.myRef}>
                    <fieldset>
                        <legend>{`${heading}`}</legend>
                        <fieldset>
                            <legend>{`First Name`}</legend>
                            <input placeholder='firstName' name='firstName' type='text' onChange={(e)=>{this.handleChange(e)}} value={this.state.firstName}/>
                        </fieldset>
                        <fieldset>
                            <legend>{`Last Name`}</legend>
                            <input  placeholder='lastName' name='lastName' type='text' onChange={(e)=>{this.handleChange(e)}} value={this.state.lastName}/>
                        </fieldset>
                        <fieldset>
                            <legend>{`Email`}</legend>
                        <input placeholder='email' name='email' type='text' onChange={(e)=>{this.handleChange(e)}} value={this.state.email}/>
                        </fieldset>
                        <fieldset>
                            <legend>{`Phone number `}</legend>
                        <input placeholder='phoneNumber' name='phoneNumber' type='text' minLength={10} onChange={(e)=>{this.handleChange(e)}} value={this.state.phoneNumber}/>
                        </fieldset>
                        <fieldset>
                            <legend>{`Number Status`}</legend>
                            <input placeholder='active / deactive' name='status' type='text'value={this.state.status} onChange={(e)=>{this.handleChange(e)}}/>
                        </fieldset>
                        <Button text={`Save Contact`} className={`submit-btn`}/>
                    </fieldset>
                </form>
            </div>
        )
    }
}