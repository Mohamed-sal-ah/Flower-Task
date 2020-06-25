import Layout from '../components/layout'
import Flowers from '../components/Flowers'
import NavigationBar from '../components/Navigation'
//Importing Layout ,Navigationbar and Flowers
import styled from 'styled-components'
import { Main, Box, Text } from 'grommet'
// importing styled components and Main, Box and Text from gromment
const Image = styled.img`
width:100%;
`
const MainPage = styled(Main)`
background-color: #1B4332;
    height: fit-content;
`
const FlowerBox = styled(Box)`
`
const Footer = styled.footer`
display:flex;
height:80px;
align-items:center;
justify-content:flex-start;
`
const FooterText = styled(Text)`
    font-size: large;
    color: #fff;
    padding-left: 2%;
    width: fit-content;
    font-family: 'Roboto';
    width: 100%;
`

//Render index page
const Index = () => (
    <>
        <Layout>
            <NavigationBar />
            <MainPage>
                <Image src='image/flowers.jpg' alt='Photo by Sergey Shmidt on Unsplash' />
                <FlowerBox>
                    <Flowers />
                </FlowerBox>
                <Footer>
                    <FooterText>@2020 by Mohamed Salah Ahmed</FooterText>
                </Footer>
            </MainPage>
        </Layout>
    </>
)


export default Index
