import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'reduxFiles/contactsSlice';
import { getContacts } from 'reduxFiles/selectors';
import css from 'styles/ContactForm.module.css';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(getContacts);

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const phone = e.target.phone.value;

    if (items.some(contact => contact.name.toLowerCase() === name.toLowerCase())) {
      alert(`${name} is already in contacts`);
      return;
    }

    dispatch(addContact({ name, phone }));

    e.target.reset();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        className={css.input}
        type="text"
        placeholder="Name"
        name="name"
      />
      <input
        className={css.input}
        type="text"
        placeholder="Phone"
        name="phone"
      />
      <button className={css.button} type="submit">Add Contact</button>
    </form>
  );
};