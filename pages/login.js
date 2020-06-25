import { Box, Main, Text } from 'grommet';
import Layout from '../components/layout'
import SignInFunction from '../components/SignIn';
import RegisterFunction from '../components/Register';
import styled from 'styled-components';
import Link from 'next/link'
// Importing styled components and  Box, Main and Text from gromment
//Importing Layout, Link , SignInFunction and Register Function
const ToggleText = styled(Text)`
align-self:flex-start;
margin: 10px 0;
color: #000000;
font-weight: 100;
cursor: pointer;
`

const FullPageFlex = styled(Main)`
display:flex;
justify-content:center;
align-items:center;
background-color: #1B4332;
    width: 100%;
    height: 100vh;
    
`

const LoginFormBox = styled(Box)`
display:flex;
flex-direction:column;
padding: 20px;
background-color:#fff;
color: #000;
border-radius : 10px;
font-family: 'Roboto';
align-items: center;
@media (max-width: 600px) {
    width:100%;
    border-radius:0;
}
`
const LinkItem = styled.a`
text-decoration:none;
`
const FlexLinkBox = styled(Box)`
width:100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const Log_in = () => (
    <Layout>
        <FullPageFlex>
            <HasAccount />
        </FullPageFlex>
    </Layout>
)

class HasAccount extends React.Component {
    constructor(props) {
        super(props)
        //  set state toggleAccount
        this.state = {
            toggleAccount: true
        }
    }
    onToggle = (event) => {
        // toggle sign in and sign up between true or false
        const toggled = !this.state.toggleAccount
        this.setState({ toggleAccount: toggled })
        event.preventDefault()
    }

    render() {
        const { toggleAccount } = this.state
        const textButton = toggleAccount ? 'No Account' : 'Have Account' // Toggles text
        return (
            <LoginFormBox>
                {toggleAccount ?
                    <>
                        <SignInFunction />
                    </>
                    :
                    <>
                        <RegisterFunction />
                    </>
                }
                <FlexLinkBox>
                    <Link href='/'><LinkItem><ToggleText>Back</ToggleText></LinkItem></Link>
                    <ToggleText onClick={this.onToggle}>{textButton}</ToggleText>
                </FlexLinkBox>
            </LoginFormBox>
        )
    }

}

export default Log_in