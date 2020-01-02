import React from 'react';
import {Link} from 'react-router-dom'
import {Card, Button, Divider} from 'semantic-ui-react';

export default ({data}) => (
    <Card>
        <Card.Content header={data.text} />
        <Card.Content description={data.updated_at} />
        <Card.Content extra>
            <Button >View</Button> 
        </Card.Content>
    </Card>
);