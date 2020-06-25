import { Box, Heading, Text } from 'grommet';
import styled from 'styled-components';
// Importing styed components and from Box, Heading and Text gromment
import { withFirebase } from '../Firebase';
import authContext from '../Session'
import Link from 'next/link'
// Importing withFirebase from Firebase, authContext and Link
const NavBox = styled(Box)`
width:100%;
z-index: 1;
display:flex;
flex-direction:row;
justify-content:space-between;
align-items: center;
position: fixed;
`
const Title = styled(Heading)`
color:white;
font-family:'Montserrat';
font-weight:400;
padding-left:10px;
text-decoration:none;
`
const TextNav = styled(Text)`
font-family:'Roboto';
text-transform:uppercase;
padding:0 20px;
font-weight: 300;
cursor:pointer;
display: flex;
align-items: center;
height: 100%;
@media (max-width :768px) {
    padding:0 10px;    
    }
`
const LinkItem = styled.a`
text-decoration:none;
height: 100%;
`
const UserName = styled(TextNav)`
background-color: #7f9e00;
`

const StyledDiv = styled.div`
height: 56px;
display: flex;
flex-direction: row;
align-items: center;
@media (max-width :768px) {
    height: 40px;
}
`

const TextButton = styled(TextNav)`
&:active{
    background-color: #187584;
}
`

// Sign out button
const SignOutButtonBase = ({ firebase }) => (
    <TextButton onClick={firebase.doSignOut}>Log out</TextButton>
)
// wrap SignOutButton with withFirebase
const SignOutButton = withFirebase(SignOutButtonBase)

const UserStaus = ({ authUser, signIn }) => {
    // Checks if user is loged in
    return (
        <StyledDiv>
            {signIn ?
                <>
                    <UserName>{authUser.username}</UserName>
                    <SignOutButton />
                </>
                :
                <Link href='/login'>
                    <LinkItem>
                        <TextNav>Log in</TextNav>
                    </LinkItem>
                </Link>
            }
        </StyledDiv>
    )
}

// wrap UserStatus with authContext
const UserStausNav = authContext(UserStaus)
const Navigation = () => {
    // Navigation Bar
    return (
        <NavBox background='neutral-1'><Title
            margin='none'
            size='medium'>Flowers</Title>
            <UserStausNav />
        </NavBox>
    )
}



export default Navigation