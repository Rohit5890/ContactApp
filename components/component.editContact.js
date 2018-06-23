import React from 'react';

import ContactForm from './component.ContactForm';

export default class EditContact extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let {contactList, updateContact} = this.props;
        return(
                <ContactForm heading={'Edit Contact'} edit={true} contactList={contactList} updateContact={(newContactList)=>{updateContact(newContactList)}}/>
        )
    }
} 