import styled from 'styled-components'
import { Box, Header, Text } from 'grommet'
// Import styled compoments and Box, Header, Text from gromment
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
font-weight: 300;
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


const CommentItem = ({ section }) => {
    const whichDate = section.editedAt ? section.editedAt : section.date // Checks if comment has edited
    const commentDate = new Date(whichDate)// Converts to date
    const fullDate = `${commentDate.getFullYear()}/${commentDate.getMonth()}/${commentDate.getDate()}  ${commentDate.getHours()}:${(commentDate.getMinutes() < 10 ? '0' : '') + commentDate.getMinutes()}`
    return (
        <CommentBox>
            <UserDateDiv>
                <UserName>{section.username}</UserName>
                <DateText>{section.editedAt ? 'Edited at' : 'Created at'} {fullDate}</DateText>
            </UserDateDiv>
            <CommentText>{section.text}</CommentText>
        </CommentBox>
    )
}

export default CommentItem