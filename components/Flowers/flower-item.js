import styled from 'styled-components'
import { Box, Heading, Button, Text } from 'grommet'
// Import styled components and Box, Heading, Button, Text from gromment
const StyledImg = styled.img`
 height: 150px;
width: 200px;
@media (max-width : 400px) {
width:125px;
height:125px;
}
`
const FlowerItemStyle = styled.li`
justify-self: center;
display: flex;
flex-direction: row;
align-items: center;
list-style-type: none;
width: 100%;
background-color:#1A936F;
border-radius:25px;
overflow:hidden;
justify-content:space-between;
@media (max-width : 600px) {
border-radius:0;
}
`
const BoxStyled = styled(Box)`
display:flex;
flex-direction:column;
width:100%;
text-align:center;
padding: 10px 0;
`

const FlowerHeading = styled(Heading)`
font-size:x-large;
font-weight: 400;
letter-spacing: 1px;
font-family: 'Verdana';
@media (max-width : 600px) {
    font-size:large;
}
`

const StyledButton = styled(Button)`
width: fit-content;
align-self: center;
box-shadow:none;
padding: 10px;
background-color: #1f332c;
border-radius: 10px;
font-family: 'Roboto';
text-transform: uppercase;
font-size: small;
@media (max-width : 600px) {
font-size:xx-small;
}
`

const NoImageDiv = styled.div`
height: 150px;
background-color: #2f3313;
display:flex;
justify-content:center;
align-items:center;
@media (max-width : 400px) {
    width:125px;
    height:125px;
}
`
const NoImageText = styled(Text)`
font-family: 'Roboto';
width:200px;
text-align:center;
font-size:small;
`

const FlowerItem = ({ flower, onSelect }) => {
    // Flower  List item
    const hasImage = flower.cover_image !== '' ? true : false  // if flower has an image
    return (
        <FlowerItemStyle>
            {hasImage ? <StyledImg src={flower.cover_image} /> :
                <NoImageDiv>
                    <NoImageText>No Image Found</NoImageText>
                </NoImageDiv>
            }

            <BoxStyled>
                <FlowerHeading>{flower.common_name}</FlowerHeading>
                <StyledButton onClick={() => onSelect(flower)}>Click here for details</StyledButton>
            </BoxStyled>
        </FlowerItemStyle>
    )
}


export default FlowerItem
