import React, { Fragment } from 'react';
import { Chip } from '@mui/material';
import { useStyles } from './style';

const FilterGroup = ({ options, type, selected, setSelected, property }) => {

    //Styling
    const classes = useStyles();

    // Handlers
    const changeHandler = (option) => {
        let current;
        let active = isActive(option);

        if (type === 'multi') {
            if (active) {
                current = [...selected].filter((val) => val !== option);
            } else {
                current = [...selected, option];
            }
        } else {
            if (active)
                current = 'none';
            else
                current = option;
        }
        setSelected(property, current);
    }

    const isActive = (option) => {
        if (type === 'multi') {
            return selected.includes(option);
        } else {
            return selected === option;
        }
    }

    return (
        <Fragment>
            {
                options.map((option) => {
                    return (
                        <Chip label={option.label} variant='outlined' key={option.value}
                            className={isActive(option.value) ? classes.filterStyleActive : classes.filterStyleInActive}
                            onClick={() => { changeHandler(option.value) }}
                        />)
                })
            }
        </Fragment>
    )
}

export default FilterGroup
