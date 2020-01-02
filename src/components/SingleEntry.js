import React from 'react';
import {Divider, Label} from 'semantic-ui-react';
import {API_URL} from '../utils/constants';
import axios from 'axios';

class SingleEntry extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            entry: null,
            error: ""
        }
    }

    async componentDidMount(){
        const {id} = this.props.match.params

        try{
            const entry_res = await axios({
                method: 'GET',
                url: `${API_URL}/entries/${id}`,
            });

            this.setState({ entry: entry_res.data })
        } catch(error) {
            this.setState({error: error.response.data.message})
        }
    };

    render(){

        console.log("SingleEntry.render this.props", this.props)

        const {entry, error} = this.state

        return(
            <div>
                Single Entry

                {error &&
                    <Label color='red' horizontal>
                        {error}
                    </Label>
                }

                {entry && 
                    <div>
                        <p>{entry.text}</p>
                        <p>{entry.updated_at}</p>
                    </div>                
                }
            </div>
        )
    }
};

export default SingleEntry;