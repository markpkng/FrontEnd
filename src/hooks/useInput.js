import {useState} from 'react';

export const useInput = initialState => {
    const [value, setValue] = useState(initialState);

    const handleChange = updatedValue => {
        setValue(updatedValue);
    }

    return [value, setValue, handleChange];
}