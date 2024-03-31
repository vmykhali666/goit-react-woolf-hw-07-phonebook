import React from 'react';
import clsx from 'clsx';
import styles from 'styles/Filter.module.css';
import { useDispatch } from 'react-redux';
import { changeFilter } from 'reduxFiles/filterSlice';

export const Filter = () => {
  const dispatch = useDispatch();

  const onFilterChange = e => {
    dispatch(changeFilter(e.target.value));
  }
  return (
    <input
      type="text"
      className={clsx(styles.input)}
      name="search"
      onChange={onFilterChange}
      placeholder="Search by name"
    />
  );
};
