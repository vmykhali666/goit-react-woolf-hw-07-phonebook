import { Notify } from 'notiflix';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContacts } from 'reduxFiles/operations';
import { getContacts } from 'reduxFiles/selectors';
import css from 'styles/ContactForm.module.css';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const handleSubmit = e => {
    e.preventDefault();

    const name = e.target.name.value;
    const phone = e.target.phone.value;

    if (
      contacts.find(
        contact =>
          contact.name.toLowerCase() === name.toLowerCase() ||
          contact.phone === phone
      )
    ) {
      Notify.failure(`${name} is already in contacts.`);
      return;
    }

    dispatch(addContacts({ name, phone }))
      .unwrap()
      .then(() => {
        Notify.success(`New contact added`);
      })
      .catch(() => {
        Notify.failure(`smth went wrong`);
      });

    e.target.reset();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        className={css.input}
        type="text"
        placeholder="Name"
        pattern="^[a-zA-Zа-яА-Я]+([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*$"
        name="name"
      />
      <input
        className={css.input}
        type="text"
        placeholder="Phone"
        pattern="(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})"
        name="phone"
      />
      <button className={css.button} type="submit">
        Add Contact
      </button>
    </form>
  );
};
