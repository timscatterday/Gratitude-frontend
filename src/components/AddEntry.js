import React from 'react';
import EntryForm from './EntryForm';

export default ({history}) => (
    <EntryForm mode="create" done={() => history.push('/')}/>
);