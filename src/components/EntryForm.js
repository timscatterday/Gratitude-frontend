import React from 'react';
import axios from 'axios';
import {API_URL} from '../utils/constants';
import {getUserId} from '../utils/user';
import {Button, Form} from 'semantic-ui-react';

class EntryForm extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            text: "",
            user_id: getUserId(),
            loading: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    };

    async handleSubmit(e){
        e.preventDefault();

        this.setState({loading: true});

        // make post request
        
        const {user_id, text} = this.state;

        console.log("add entry.handleSubmit before axios", this)
        
        let method = 'POST'
        let url = `${API_URL}/entries`

        const add_entry_res = await axios({
            method,
            url,
            data: {user_id, text}
        })

        console.log("add entry.handleSubmit after axios")

        this.setState({loading: false, text: ""})
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    render(){
        const {loading} = this.state;
        return(
            <div className="EntryForm">
                <Form onSubmit={this.handleSubmit.bind(this)} loading={loading}>
                    <h3>I am grateful for...</h3>
                    <Form.Input 
                        fluid label='Text' 
                        placeholder='Text' 
                        name='text' 
                        onChange={this.handleChange}
                    />
                    <Form.Input 
                        fluid label='User Id' 
                        placeholder='User Id' 
                        name='user_id' 
                        disabled 
                    />
                    <Button type='submit'>Create</Button>
                </Form>
            </div>
        )
    }

};

export default EntryForm;