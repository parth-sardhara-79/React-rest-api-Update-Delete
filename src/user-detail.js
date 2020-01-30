import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'

class UserDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: Number(props.userData),
            user: [],
            show: true,
            updateModal: false,
            ufirstName: '',
            uLastName: '',
            uEmail: ''
        }
    }
    componentWillReceiveProps(props) {
        let { userId } = this.state;
        if (userId !== props.userData) {
            this.setState({
                userId: Number(props.userData),
                show: false
            }, () => {
                axios.get(`https://node-fake-api.herokuapp.com/user/${this.state.userId}`)
                    .then(res => {
                        //console.log('rewdddds', res.data.data);
                        this.setState({ user: res.data.data });
                    })
                    .catch(err => console.log("Error" + err));
            })
        }
    }
    render() {
        let { show } = this.state;
        let { avatar, first_name, last_name, email } = this.state.user;
        let { ufirstName, uLastName, uEmail } = this.state;
        return (
            !show &&
            <div className="user-details">
                <b>PROFILE</b>
                <img src={avatar} />
                <h4>{first_name}<> </>{last_name}</h4>
                <p>{email}</p>
                <Button variant="dark" onClick={() => this.setState({
                    updateModal: true,
                    ufirstName: first_name,
                    uLastName: last_name,
                    uEmail: email
                })}>
                    Edit
                    </Button>

                <Modal show={this.state.updateModal}>
                    <Modal.Header closeButton onClick={() => this.setState({ updateModal: false })}>
                        <Modal.Title>Edit user</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Form>
                                <Form.Group controlId="formBasicEmail">
                                    <Row>
                                        <Col><Form.Control type="text" value={ufirstName} onChange={(event) => this.setState({ ufirstName: event.target.value })} /></Col>
                                        <Col><Form.Control type="email" value={uLastName} onChange={(event) => this.setState({ uLastName: event.target.value })} /></Col>
                                    </Row>
                                </Form.Group>
                                <Form.Group>
                                    <Row>
                                        <Col><Form.Control type="email" value={uEmail} onChange={(event) => this.setState({ uEmail: event.target.value })} /></Col>
                                    </Row>
                                </Form.Group>
                            </Form>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary">
                            Cancel
                        </Button>
                        <Button variant="success" onClick={
                              () =>  this.props.update(ufirstName,uLastName,this.state.user.id),
                                () => this.setState({
                                    updateModal: false
                                },() =>
                                this.setState({
                                    first_name: ufirstName,
                                    last_name: uLastName,
                                    email: uEmail
                                }))
                        }>
                            Submit
                        </Button>

                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default UserDetail;