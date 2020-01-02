import React from 'react';
import {Label, Button, Dimmer, Loader, Modal} from 'semantic-ui-react';
import {API_URL} from '../utils/constants';
import {getUserId} from '../utils/user'
import axios from 'axios';

class SingleEntry extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            entry: null,
            error: "",
            editing: false,
            loading: false
        }

        this.deleteEntry = this.deleteEntry.bind(this);
        this.fetchEntry = this.fetchEntry.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
    }

    async handleModalClose(shouldUpdate){
        this.setState({editing: false});

        if(shouldUpdate){
            await this.fetchEntry()
        }
    }

    async deleteEntry(){
        const {id} = this.props.match.params
        this.setState({loading: true})

        try {
            const delete_res = await axios({
                method: 'DELETE',
                url: `${API_URL}/entries/${id}`,
                data: { user_id: await getUserId()}
            });

            this.setState({ entry: delete_res.data })

            this.props.history.push("/")
        } catch (error) {
            console.log("SingleEntry.deleteEntry error", error)
            this.setState({ error: error.data.message })
        }
        this.setState({loading: false})
    };

    async fetchEntry(){
        this.setState({loading: true});

        const { id } = this.props.match.params
        try {
            const entry_res = await axios({
                method: 'GET',
                url: `${API_URL}/entries/${id}`,
            });

            this.setState({ entry: entry_res.data })
        } catch (error) {
            this.setState({ error: error.response.data.message })
        }

        this.setState({loading: false});
    }

    async componentDidMount(){
       await this.fetchEntry()
    };

    render(){

        console.log("SingleEntry.render this.props", this.props)

        const {entry, error, loading, editing} = this.state

        return(
            <div>
                Single Entry

                {loading &&
                    <Dimmer active>
                        <Loader>Loading</Loader>
                    </Dimmer>
                }

                {error &&
                    <Label color='red' horizontal>
                        {error}
                    </Label>
                }

                {entry && 
                    <div>
                        <p>{entry.text}</p>
                        <p>{entry.updated_at}</p>

                        <Button onClick={() => this.setState({editing: true})}>
                            Update
                        </Button>
                        <Button 
                            color='red' 
                            onClick={this.deleteEntry}
                        >
                            Delete
                        </Button>
                    </div>                
                }

                {editing && 
                    <Modal
                        onClose={this.handleModalClose}
                        open={true}
                    >
                        <Modal.Content>
                            <h3>This website uses cookies to ensure the best user experience.</h3>
                        </Modal.Content>
                    </Modal>
                }
            </div>
        )
    }
};

export default SingleEntry;