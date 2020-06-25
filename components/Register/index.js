import { withFirebase } from '../Firebase';
import router from 'next/router';
// Importing withFirebase from Firebase and router
import { Form, TextInput, Button, Text } from 'grommet';
import styled from 'styled-components';
// Importing styled components and Form, TextInput, Button and Text from gromment

const RegisterFunction = () => (
    <>
        <SignUpForm />
    </>
);

const StyledFrom = styled(Form)`
display: flex;
flex-direction: column;
width :400px;
@media (max-width: 600px) {
    width:100%;
}
`

const StyledInput = styled(TextInput)`
background-color:#fff;
margin:10px 0;
color:#000;
`

const StyledButton = styled(Button)`
background-color: #1a4231;
color: #ffffff;
padding: 5px 10px;
border-radius: 4px;
border: none;
font-size: small;
text-transform: uppercase;
&:disabled{
    opacity: 0.4;
}
&:hover{
    box-shadow: 0px 0px 0px 2px #8BC34A;
}
`

const SignUpTitle = styled(Text)`
text-transform:uppercase;
font-size:x-large;
`

// Creating INITIAL_STATE object
const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class SignUpFormBase extends React.Component {
    constructor(props) {
        super(props);
        // Setting inital state in this.state
        this.state = { ...INITIAL_STATE }
    }
    onSubmit = event => {
        const { username, email, passwordOne } = this.state;
        // create user submit 
        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                // Create a user in Firebase in realtime database
                return this.props.firebase
                    .user(authUser.user.uid)
                    .set({
                        username,
                        email,
                    });
            })
            .then(() => {
                // clears state after user is signed up
                this.setState({ ...INITIAL_STATE });
                // pushes to index page
                router.push('/');
            })
            .catch(error => {
                this.setState({ error });
            });
        event.preventDefault();
    }
    onChange = event => {
        // Onchange event value to event target name
        this.setState({ [event.target.name]: event.target.value });
    };
    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;
        // disables button if no input text is found or both password is not found
        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';
        return (
            <StyledFrom onSubmit={this.onSubmit}>
                <SignUpTitle>Create Account</SignUpTitle>
                <StyledInput
                    name="username"
                    value={username}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Full Name"
                />
                <StyledInput
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email Address"
                />
                <StyledInput
                    name="passwordOne"
                    value={passwordOne}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Password"
                />
                <StyledInput
                    name="passwordTwo"
                    value={passwordTwo}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Confirm Password"
                />
                <div>
                    <StyledButton disabled={isInvalid} type="submit" label='Sign up' />
                </div>

                {error && <p>{error.message}</p>} {/*Prints out error message */}
            </StyledFrom>
        );
    }
}
// wrap SignUpForm with withFirebae
const SignUpForm = withFirebase(SignUpFormBase)

export default RegisterFunction