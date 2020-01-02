import React from 'react';
import axios from 'axios';
import {Button, Dimmer, Loader} from 'semantic-ui-react';
import Entry from './Entry'
import {API_URL} from '../utils/constants'

class Entries extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            entries: [],
            loading: false
        }
    };

    async componentDidMount(){
        this.setState({loading: true})
        const entries_res = await axios({
            method: 'GET',
            url: `${API_URL}/entries`
        })
        const entries = entries_res.data
        this.setState({entries, loading: false})
    }

    render(){
        const {entries, loading} = this.state;

        return(
            <div className='Entries'>
                <h1>Things I am grateful for</h1>
                {loading && 
                    <Dimmer active>
                        <Loader>Loading</Loader>
                    </Dimmer> 
                }
                {entries.map((entry, i) => (
                    <Entry data={entry} key={i} />
                ))}
            </div>
        )
    }

};

export default Entries;