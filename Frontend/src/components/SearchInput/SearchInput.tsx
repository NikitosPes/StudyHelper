import React from 'react';
import styles from './SearchInput.module.css'

interface SearchInputProps {
    setValue: (value: string) => void,
    text: string
}

export const SearchInput: React.FC<SearchInputProps> = ({ setValue, text }) => {

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    return(
        <input type="text" className={styles.searchInput} placeholder={text}  onChange={onChangeHandler}/>
    )
}