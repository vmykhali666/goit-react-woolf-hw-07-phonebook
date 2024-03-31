import React from 'react';
import styles from 'styles/ContactList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { removeContact } from 'reduxFiles/contactsSlice';
import { getContacts, getFilter } from 'reduxFiles/selectors';
import { Notification } from 'components/Notification/Notification';

export const ContactList = () => {
  const { items } = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const handleRemove = id => {
    dispatch(removeContact(id));
  };

  const getFilteredContacts = () => {
    if (!filter) {
      return items;
    }

    const temp = items.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return temp;
  };

  const filteredContacts = getFilteredContacts();

  return (
    <>
      {filteredContacts.length === 0 ? (
        <Notification message="No contacts" />
      ) : (
        <ul className={styles.contactsList}>
          {filteredContacts.map(contact => (
            <li key={contact.id} className={styles.element}>
              {contact.name + ' : ' + contact.phone}
              <button
                onClick={() => handleRemove(contact.id)}
                className={styles.button}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
