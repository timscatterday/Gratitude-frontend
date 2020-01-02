import React from 'react';
import {Link} from 'react-router-dom'
import {Card, Button, Divider} from 'semantic-ui-react';

export default ({data}) => (
    <Card>
        <Card.Content header={data.text} />
        <Card.Content description={data.updated_at} />
        <Card.Content extra>
           <Link to={`/${data.id}`}>
                <Button >View</Button> 
           </Link>
        </Card.Content>
    </Card>
);