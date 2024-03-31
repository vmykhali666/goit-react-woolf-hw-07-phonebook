import React, { useEffect } from 'react';
import styles from 'styles/ContactList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getFilteredContacts, getIsLoading } from 'reduxFiles/selectors';
import { Notification } from 'components/Notification/Notification';
import { deleteContacts, fetchContacts } from 'reduxFiles/operations';
import { Notify } from 'notiflix';

export const ContactList = () => {
  const isLoading = useSelector(getIsLoading);

  const filteredContacts = useSelector(getFilteredContacts);

  const dispatch = useDispatch();

  const handleRemove = id => {
    dispatch(deleteContacts(id))
    .unwrap()
    .then(() => {
      Notify.success('Contact deleted');
    })
    .catch((err) => {
      Notify.failure(err.message);
    });
  };

  useEffect(() => {
    dispatch(fetchContacts())
    .unwrap()
      .catch((err) => {
        Notify.failure(err.message);
      });
  }, [dispatch]);

  return (
    <>
      {
        isLoading ? 
        (<p>Loading...</p>) :
        filteredContacts.length === 0 ? (
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
        )
      }
    </>
  );
};
