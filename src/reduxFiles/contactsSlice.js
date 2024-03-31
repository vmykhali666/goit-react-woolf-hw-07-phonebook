import { createSlice } from "@reduxjs/toolkit";
import { addContacts, deleteContacts, fetchContacts } from "./operations";

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
        isLoading: false,
        items: [],
        error: null
    },
    extraReducers : builder => {
        builder
            .addCase(fetchContacts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.items = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchContacts.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(addContacts.fulfilled, (state, action) => {
                state.items = [...state.items, action.payload];
            })
            .addCase(deleteContacts.fulfilled, (state, action) => {
                state.items = state.items.filter(({ id }) => id !== action.payload);
            })
    }
});

export const contactsReducer = contactsSlice.reducer;
export const { addContact, removeContact } = contactsSlice.actions;
