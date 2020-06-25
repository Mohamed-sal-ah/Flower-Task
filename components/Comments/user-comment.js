import styled from 'styled-components'
import { Box, Header, Text, Button, TextInput } from 'grommet'
// Import styled components and Box, Header, Text, Button, TextInput from gromment
const CommentBox = styled(Box)`
margin: 0 10px;
padding: 5px;
@media (max-width : 600px) {
    margin:0;
    padding: 5px;
}
`

const UserName = styled(Header)`
font-family: 'Verdana';
font-size: large;
font-weight: 100;
padding: 10px 0;
`
const DateText = styled(Text)`
font-family:'Roboto';
color: #7b7b7b;
font-weight: 600;
font-size: small;
`

const CommentText = styled(Header)`
font-family: 'Roboto';
padding: 10px;
font-size: medium;
background-color: #e6e6e6;
border-radius: 10px;
`
const UserDateDiv = styled.div`
display:flex;
flex-direction:row;
justify-content:space-between;
align-items:center;
`
const ButtonDiv = styled.div`
display:flex;
flex-direction:row-reverse;
justify-content:space-between;
`

const StyledButton = styled(Button)`
width: fit-content;
align-self: center;
padding: 10px;
margin:20px;
margin: 5px 0;
border-radius: 10px;
font-family: 'Roboto';
text-transform: uppercase;
font-size: small;
color:#fff;
box-shadow:none;
`
const DeleteButton = styled(StyledButton)`
background-color: #8a1515;
`

const DefaultButtton = styled(StyledButton)`
background-color: #fff;
color:#000;
padding:8px;
border:2px solid #000;
`
const SaveButton = styled(StyledButton)`
background-color: #1f332c;
&:hover{
    box-shadow: 0px 0px 0px 2px #8BC34A;
}
`

const EditInput = styled(TextInput)`
background-color:#fff;
margin: 0;
color:#000;
padding:10px;
border-radius: 10px;
font-family: 'Roboto';
box-shadow: none;
font-size:medium;
`

class UserCommentItem extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            editMode: false,
            editText: this.props.section.text
        }
    }
    onChangeEditText = event => {
        this.setState({ editText: event.target.value });
    };

    ToggleEditMode = () => {
        // Toggle edit mode
        this.setState(state => ({
            editMode: !state.editMode,
            editText: this.props.section.text,
        }));
    }

    onSaveEdit = () => {
        // Save edited comment
        this.props.onEditComment(this.props.section, this.state.editText)
        this.setState({ editMode: false });
    }
    render() {
        const { section, userIDComment, onDeleteComment } = this.props
        const { editMode, editText } = this.state
        const whichDate = section.editedAt ? section.editedAt : section.date
        const commentDate = new Date(whichDate) // covert to date
        const fullDate = `${commentDate.getFullYear()}/${commentDate.getMonth()}/${commentDate.getDate()}  ${commentDate.getHours()}:${(commentDate.getMinutes() < 10 ? '0' : '') + commentDate.getMinutes()}`
        return (
            <CommentBox>
                <UserDateDiv>
                    <UserName>{section.username}</UserName>
                    <DateText>{section.editedAt ? 'Edited at' : 'Created at'} {fullDate}</DateText>
                </UserDateDiv>
                {userIDComment === section.uid ? <>
                    {editMode ? <>
                        <EditInput value={editText} onChange={this.onChangeEditText} />
                        <ButtonDiv>
                            <SaveButton onClick={this.onSaveEdit}>Save</SaveButton>
                            <DefaultButtton onClick={this.ToggleEditMode}>Reset</DefaultButtton>
                        </ButtonDiv>
                    </> : <>
                            <CommentText>{section.text}</CommentText>
                            <ButtonDiv>
                                <DeleteButton onClick={() => onDeleteComment(section.commentID)}>Delete</DeleteButton>
                                <DefaultButtton onClick={this.ToggleEditMode}>Edit</DefaultButtton>
                            </ButtonDiv>
                        </>}

                </> : <CommentText>{section.text}</CommentText>}
            </CommentBox>
        )
    }

}

export default UserCommentItem