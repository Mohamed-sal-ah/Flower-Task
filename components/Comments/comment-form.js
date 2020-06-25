import styled from 'styled-components'
import { Button, TextInput } from 'grommet'
// Import styled components and Button, TextInput from gromment
const StyledInput = styled(TextInput)`
background-color:#fff;
font-family: 'Roboto';
margin:10px 0;
color:#000;
`

const StyledButton = styled(Button)`
background-color: #1a4231;
color: #ffffff;
padding: 10px;
border-radius: 10px;
font-family: 'Roboto';
border: none;
font-size: small;
text-transform: uppercase;
&:hover{
    box-shadow: 0px 0px 0px 2px #8BC34A;
}
`

const FormStyle = styled.form`
padding: 15px;
`

class CommentForm extends React.Component {
    constructor(props) {
        super(props)
        // Inizialize state
        this.state = {
            textInput: ''
        }
    }
    onCreate = (event) => {
        // On submit form create comment
        this.props.onCreateComment(this.state.textInput, this.props.authUser)
        event.preventDefault();
    }
    onChange = (event) => {
        // Text value on change
        this.setState({ textInput: event.target.value })
    }
    render() {
        // user create comment
        return (
            <FormStyle onSubmit={event => this.onCreate(event)}>
                <StyledInput onChange={this.onChange} placeholder='You want to write something' />
                <StyledButton type="submit">Submit</StyledButton>
            </FormStyle>
        )
    }
}

export default CommentForm