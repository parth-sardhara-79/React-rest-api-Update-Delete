import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

class ListUsers extends React.Component {
    state = {
        user: [],
        m: false,
        m_firstName: '',
        m_lastName: '',
        m_id: ''
    }
    afterDelete = [];
    componentDidMount() {
        axios.get('https://node-fake-api.herokuapp.com/user/')
            .then(res => {
                this.setState({ user: res.data.data });
            })
            .catch(err => console.log("Error" + err));
    }
    deleteUser = () => {
        console.log("Called");
        axios.delete(`https://reqres.in/api/users/${this.state.m_id}`)
            .then(res => {
                console.log("User Deleted" + res.status);
                if (res.status === 204) {
                    this.setState(previousState => ({
                        user: previousState.user.filter((u) => {
                            return u.first_name !== previousState.m_firstName
                        })
                    }))
                }
            })
            .then(() => {
                this.setState({ m: false, m_firstName: '', m_lastName: '', m_id: '' })
            })
            .catch(err => console.log("Error" + err));
        console.log(this.afterDelete)
    }
    updateUsers = (props) => {
        var {first_name,last_name} = this.state.user;
        this.setState({
            user: this.state.user.map(el => (el.id === props.updateId ? {...el, first_name: props.updateFirstName, last_name: props.updateLastName} : el))
          });
    }
    render() {
        let { user } = this.state;
        
        return (
            <div className="side-bar">
                <Button className="listUserButtons" variant="dark" onClick={() => this.setState({ m: true })}>Add User</Button>
                <Modal show={this.state.m}>
                    <Modal.Header closeButton onClick={() => this.updateUsers(this.props.update)}>
                        <Modal.Title>Are you sure want to delete this user?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.m_firstName} <> </> {this.state.m_lastName}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.setState({ m: false, m_firstName: '', m_lastName: '', m_id: '' })}>
                            No
                        </Button>
                        <Button variant="danger" onClick={() => this.deleteUser()}>
                            Yes
                        </Button>

                    </Modal.Footer>
                </Modal>
                {
                    user.map(u => {
                        return (<div className="listUsers">
                            <Button variant="link" className="listUserButton"
                                id={u.id} onClick={(e) => this.props.click(e)}>
                                {u.first_name}
                            </Button>
                            <FontAwesomeIcon icon={faTrashAlt}
                                className="icon"
                                onClick={() => this.setState({ m: true, m_firstName: u.first_name, m_lastName: u.last_name, m_id: u.id })} />
                        </div>
                        )
                    })
                }
            </div>
        );
    }
}

export default ListUsers;