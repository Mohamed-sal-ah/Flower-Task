import { withFirebase } from '../Firebase'
import router from 'next/router';
// Importing withFirebase from Firebase and router
import { Form, TextInput, Button, Heading } from 'grommet';
import styled from 'styled-components';
// importing styled components and Form, TextInput, Button and Heading from gromment

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

const SignInTitle = styled(Heading)`
text-transform:uppercase;
`
// Creating INITIAL_STATE object
const INITIAL_STATE = {
    email: '',
    password: '',
    error: null
};


class SignInForm extends React.Component {
    constructor(props) {
        super(props);
        // Setting inital state in this.state
        this.state = { ...INITIAL_STATE };
    }
    onSubmit = event => {
        // Sign in submit 
        const { email, password } = this.state;
        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                // clears state after user is signed in
                this.setState({ ...INITIAL_STATE });
                // pushes to index page
                router.push('/');
            })
            .catch(error => {
                // Catches error and put it in state
                this.setState({ error });
            });
        event.preventDefault();
    };
    onChange = event => {
        // Onchange event value to event target name
        this.setState({ [event.target.name]: event.target.value });
    };
    render() {
        const { email, password, error } = this.state;
        const isInvalid = password === '' || email === ''; // disables button if no input text is found
        return (
            <StyledFrom onSubmit={this.onSubmit}>
                <SignInTitle size="small">Log in</SignInTitle>
                <StyledInput
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type='text'
                    placeholder='Email Address'
                />
                <StyledInput
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    type='password'
                    placeholder='Password' />
                <div>
                    <StyledButton
                        disabled={isInvalid} type="submit" label='Sign in' />
                </div>
                {error && <p>{error.message}</p>} {/*Prints out error message */}
            </StyledFrom>
        )
    }

}
// wrap SignInForm with withFirebae
const SignInFunction = withFirebase(SignInForm)

export default SignInFunction