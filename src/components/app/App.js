/*************************************************
 Code Written By: Mahdi Abu Hamida & Malek Safory
**************************************************/

import React, { Component } from 'react';

// import style (css) files for this component
import './App.css';

// import components
import SplashScreen from '../splashscreen/SplashScreen';
import staticDetails from './details';
import ContactsContainer from '../contacts/contacts_container/ContactsContainer';
import ContactsTools from '../contacts/conatcts_tools/ContactsTools';
import AddContactForm from '../form/AddContactForm';
import EditContactForm from '../form/EditContactForm';
import CardInfo from '../contacts/contact-card/CardInfo';
import Footer from '../footer/Footer';


/************************************************************************
 App Component - represents the main brain of this whole bunch of other
 components, which connects them all to it, and applies some requests,
 callbacks, main data-flow, data storing to stay live with the user
 requests, and all the components changes
*************************************************************************/

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editTools:
      {
        formOpenAdd: false,
        formOpenEdit: false,
        contactInfoOpen: false
      },
      year: new Date().getFullYear(),
      developers: 'Mahdi & Malek',
      contacts: staticDetails,
      inSplashScreen: true
    };
  }

  componentWillMount() {
    /* 
      as we've pre defined contacts (4), so we should append to them the
     other stored contacts once the component is going to mount 
    */
    let allContacts = JSON.parse(localStorage.getItem('contacts') || '[]');

    // set the component's contacts state value to the new one from above
    this.setState({
      contacts: allContacts
    });
  } 

  // callback to close the form pop-up
  closeForm = () => {
    this.setState({editTools: {formOpenAdd: false, formOpenEdit: false}});
  }

  // callback to open the form for adding a new contact
  formOpenAdd = () => {
    this.setState({editTools: {formOpenAdd: true}});
  }

  // callback to open the form for changing specific contact's details
  onEditContact = (contact) => {
    this.contactToEdit = contact;
    this.setState({editTools: {formOpenAdd: false, formOpenEdit: true}});
  }

  onContactInfo = (contact) => {
    this.contactToView = contact;
    this.setState({editTools: 
      {
        contactInfoOpen: true, formOpenAdd: false, formOpenEdit: false
      }});
  }

  onCloseContactInfo = () => {
    this.setState({editTools: {contactInfoOpen: false}});
  } 

  /* 
    callback function receives a contact to be deleted, 
    & move it to the contacts backup storage 
  */
  onDeleteContact = (contactToDelete) => {
    let contactToBackup = null;
    let tempContacts = [];
    this.state.contacts.forEach(contact => {
      if (this.contactEquals(contact, contactToDelete, '', '',false))
      {
        contactToBackup = contact;
      }
      else 
      {
        tempContacts.push(contact);
      }
    });

    this.setState({contacts: tempContacts});
    this.saveContacts(tempContacts);

    let tempBackupContacts = JSON.parse(localStorage.getItem('backupContacts') || '[]');
    tempBackupContacts.push(contactToBackup);
    this.saveToBackupContacts(tempBackupContacts);
  }

  /* 
    callback function to delete all contacts & move them all 
    to the contacts backup storage 
  */
  onDeleteAll = () => {
    let backedupContacts = JSON.parse(localStorage.getItem('backupContacts') || '[]');
    this.state.contacts.forEach(contact => {
       backedupContacts.push(contact);
    });
    this.saveToBackupContacts(backedupContacts);

    let tempContacts = [];
    this.setState({contacts: tempContacts});
    this.saveContacts(tempContacts);  
  }

  /* 
    callback function which reveives string value by the user 
    using the search-bar (contacts-tools component), then it checks
    all the contacts to any includes any character from the received
    string, filters it and set the conatcts state to the new filtered one
    .. if the search value is an empty string then the contacts state value
    will be the origin one (from the local storage) 
  */
  setSearchValue = (searchValue) => {
    let allContacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    if (searchValue === '')
    {
      this.setState({
        contacts: allContacts
      });
    }
    // we tried filter function, but for some reason it didn't work.
    else 
    {
      let tempContacts = [];
      allContacts.forEach(contact => {
        if (contact.name.toLowerCase().includes(searchValue.toLowerCase()))
        {
          tempContacts.push(contact);
        }
      });
      this.setState({contacts: tempContacts});
    }
  }

  // method that sorts the current state conatcts (alpha-bet: ascending)
  sortContacts = (contacts) => {
    contacts.sort((a, b) => 
      a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
    );
  }

  /*
    method receives two contacts, old phone number value, contact to be edited id,
    boolean isEdit. it checks first if [isEdit] is true, if it is
    , means we comparing 2 contacts ((contact): a contact from the current contacts, 
    (contactOther): the contact that is currently being edited after the user
    succeeded to click save changes), so it compares if both equal by contact id, and old phone
    number, old phone number needed cause the user might have changed the phone number
    value, so the after edit phone number cannot be the comparable one.

    otherwise [isEdit==false], method compares the whole fields (in case it is
      due to deleting contact)
  */
  contactEquals = (contact, contactOther, oldPhoneNumber, edtId, isEdit) => {
    if (isEdit)
    {
      return contact.id === edtId && contact.phoneNumber === oldPhoneNumber;
    }
    else 
    {
      if (contact.name === contactOther.name && 
        contact.phoneNumber === contactOther.phoneNumber && 
        contact.id === contactOther.id)
        {
          return true;
        }
    }
    return false;
  }

  /* 
    method receives 2 contacts, then it
    does a deep copy from 1 contact to other one 
  */
  copyContact = (contact, contactOther) => {
    contactOther.name = contact.name;
    contactOther.phoneNumber = contact.phoneNumber;
    contactOther.address = contact.address;
    contactOther.email = contact.email;
    contactOther.moreDetails = contact.moreDetails;
    contactOther.imgSrc = contact.imgSrc;
  }

  // receives contacts array, saves it in [local storage]
  saveContacts = (contacts) => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }

  // updates the deleted contacts in the [local storage]
  saveToBackupContacts = (contactsToBackup) => {
    localStorage.setItem('backupContacts', JSON.stringify(contactsToBackup));
  }

  /* 
    once the user succeeded to fill a new contact's input fields,
    we call this function, receives the new contact, saves it with
    a unique id, and also updates the contacts current state value
  */
  onSubmitNewContact = (newContact) => {
    console.log(newContact);
    let backedupContactsLength = JSON.parse(localStorage.getItem('backupContacts' || '[]')).length;
    newContact.id = this.state.contacts.length + backedupContactsLength;
    let tempContacts = this.state.contacts;
    tempContacts.push(newContact);
    this.sortContacts(tempContacts);
    this.setState({contacts: tempContacts});
    this.saveContacts(this.state.contacts);
  }

  // once the user succeeded to edit a contact currectly
  onSubmitEditContact = (contactToEdit, oldPhoneNumber, edtId) => {
    let tempContacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    tempContacts.forEach(contact => {
      if (this.contactEquals(contact, contactToEdit, oldPhoneNumber, edtId, true))
      {
        this.copyContact(contactToEdit, contact);
      }
    });
    this.sortContacts(tempContacts);
    this.saveContacts(tempContacts);
    this.setState({contacts: tempContacts});
  }

  /* 
    this function is called once the user clicks on 'restore-all-deleted' button.
    once it get called, all the deleted contacts will be restored to main
    storage key, updates the current contacts state value too 
  */
  onBackup = () => {
    let allContacts = JSON.parse(localStorage.getItem('backupContacts') || '[]');
    this.state.contacts.forEach(contact => {
      allContacts.push(contact);
    });
    this.sortContacts(allContacts);
    this.setState({contacts: allContacts});
    this.saveContacts(allContacts);
    localStorage.setItem('backupContacts', JSON.stringify([]));
  }


  render() {
    // initializing some changable (view able-non) components-elements as null
    let addContactForm = null, editContactForm = null, contactCardInfo = null;

    /* 
      in case the user already clicked on (add-new-contact-button),
      a new value associated to [addContactForm]
    */
    if (this.state.editTools.formOpenAdd)
    {
      addContactForm = <AddContactForm closeForm={this.closeForm} 
      onSubmitNewContact={this.onSubmitNewContact} />;
    }

    // else
    /* 
      in case the user already clicked on (edit-contact-button),
      a new value associated to [editContactForm]
    */
    else if (this.state.editTools.formOpenEdit)
    {
      editContactForm = <EditContactForm closeForm={this.closeForm}
      onSubmitEditContact={this.onSubmitEditContact} 
      contact={this.contactToEdit}/>;
    }

    // else
    /* 
      in case the user already clicked on (contact-info-button),
      a new value associated to [contactCardInfo]
    */
    else if (this.state.editTools.contactInfoOpen)
    {
      contactCardInfo = <CardInfo contact={this.contactToView} 
        onClose={this.onCloseContactInfo} />
    }

    let code = null;
    if (this.state.inSplashScreen)
    {
      setTimeout(() => {
        this.setState({inSplashScreen: false});
      }, 7000);
      code = <SplashScreen/>;
    }
    else 
    {
      code = (<div className="app">
      <h1 className = 'top-title'>Phonebook App</h1>
      <main>

        <ContactsTools setSearchValue={this.setSearchValue} 
          formOpenAdd={this.formOpenAdd} 
          openEditContact={this.openEditContact} 
          onDeleteAll={this.onDeleteAll}
          onBackup={this.onBackup}
          results={this.state.contacts.length}/>

        {addContactForm || editContactForm || contactCardInfo}

        <ContactsContainer 
          onEditContact={this.onEditContact} 
          contacts={this.state.contacts}
          onDeleteContact={this.onDeleteContact}
          onCardInfo={this.onCardInfo}
          onContactInfo={this.onContactInfo} />

      </main>
      <Footer year = {this.state.year} developers={this.state.developers} />
    </div>
      );
    }

    return (
      code
    );
  }
}

export default App;
