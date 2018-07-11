import React from 'react';
import ReactDOM from 'react-dom';
import './styles/app.css';

import Button from './components/component.Button';
import ContactForm from './components/component.ContactForm';
import EditContact from './components/component.editContact';

class App extends React.Component {
    constructor(props){
        super(props);
        let contactList = JSON.parse(localStorage.getItem('CONTACTS')) ? JSON.parse(localStorage.getItem('CONTACTS')).length : '';
        this.state = {
            searchValue: '',
            editModalOpen: false,
            contactList: contactList ? JSON.parse(localStorage.getItem('CONTACTS')):[],
            editable: false
        }
    };
    renderList(){
        return this.state.contactList.map((item, index)=>{
                let key = item.key;
            return(
                <div key={`${key}`} className={'contacts' + (item.status.toLowerCase() === 'active'? ' active': ' disable')}>
                   <h3 className='contact-name'><label>Name:</label> <span>{item.firstName}</span><span> {item.lastName}</span> </h3>
                   <p><label>Phone:</label> {item.phoneNumber}</p>
                   <p className='contact-status'><label>Status:</label> {item.status}</p>
                   <button onClick={()=>{this.EditContact(key)}}>Edit</button> 
                   <button onClick={()=>{this.deleteContact(key)}}>Delete</button>
                </div>
            )
        })
    }
    addContact(){
        this.setState({
            editModalOpen: true
        }) 
    }
    renderSearchInput(){
        return(
            <input className='search-filter' placeholder='Search contacts' type='text' value={this.state.searchValue ? this.state.searchValue : '' } onChange={(e)=>{this.filterList(e)}}/>
        ) 
    };

    filterList(e){

        this.setState({
            searchValue: e.target.value
        })
        var searchVal = e.target.value.toLowerCase();
        var contactData = JSON.parse(localStorage.getItem('CONTACTS'));
        this.contactList = contactData.filter((item)=>{
            if(item.firstName.toLowerCase().indexOf(searchVal) > -1 || item.lastName.toLowerCase().indexOf(searchVal) > -1){
                return item;
            }
        })
        this.setState({
            contactList: this.contactList
        })
        
    }
    updateContact(updatedContact){
        this.setState({
            contactList: updatedContact,
            editable: false,
            editModalOpen: this.state.editModalOpen ? false : this.state.editModalOpen
        })
    }
    deleteContact(key){
        this.contactList = this.state.contactList.filter((item)=>{
            if(item.key !== key){
                return item;
            }
        });
        localStorage.setItem('CONTACTS', JSON.stringify(this.contactList));
        this.setState({
            contactList: this.contactList
        });

    }
    EditContact(key){
        this.contactList = this.state.contactList.filter((item)=>{
            if(item.key === key){
                return item;
            }
        })
        this.setState({
            editable: true
        })
    }
    render() {
        let contactList = this.state.contactList;
        return(
            <div>
               {this.renderSearchInput()}
                <Button text={`+`} lable={`Add Contact`} handleClick = {()=>{this.addContact()}}/>
                {this.state.editModalOpen && <ContactForm heading={'Add New Contact'} contactList={contactList} updateContact={(newContactList)=>{this.updateContact(newContactList)}}/>}
                {contactList && this.renderList()}
                
                {this.state.editable && <EditContact contactList={this.contactList} updateContact={(newContactList)=>{this.updateContact(newContactList)}}/>}
            </div>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.querySelector('#root')
);
