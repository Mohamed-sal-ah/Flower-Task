import Comments from '../Comments'
// Importing Comments
import styled from 'styled-components'
import { Box, Heading, Button, Text } from 'grommet'
// Importing styed components and Box, Heading, Button, Text from gromment
const StyledImg = styled.img`
    width: 60%;
    border-radius: 40px;
`
const FlowerSelectedStyle = styled.div`
display: flex;
flex-direction: column;
align-items: center;
background-color: #1A936F;
margin: 0 20px;
border-radius: 25px;
@media (max-width : 600px) {
    margin:0;
    border-radius: 0;
}
`


const FlowerHeading = styled(Heading)`
font-size:xxx-large;
font-weight: 400;
letter-spacing: 1px;
color:#fff;
margin: 10px 0;
font-family: 'Verdana';
@media (max-width : 600px) {
    font-size:xx-large;
}
`
const StyledText = styled(Text)`
font-family:'Roboto';
padding: 5px;
font-weight: 100;
font-size: medium;
`

const StyledUL = styled.ul`
padding: 0;
margin:0;
`
const StyledButton = styled(Button)`
width: fit-content;
align-self: center;
padding: 10px;
margin:20px;
background-color: #1f332c;
border-radius: 10px;
font-family: 'Roboto';
text-transform: uppercase;
font-size: small;
color:#fff;
box-shadow:none;
`
const InfoBox = styled(Box)`
background-color:#fff;
width: 90%;
margin: 20px 10px;
padding: 20px;
align-items: flex-start;
border-radius: 20px;
@media (max-width : 600px) {
margin:30px 0;
border-radius: 0;
width:100%;
    }
`
const BoldText = styled.span`
font-weight:900;
font-family: 'Verdana';
text-transform: uppercase;
letter-spacing:1px;
`
const StyledSpan = styled.span`
display: flex;
align-items: center;
justify-content: flex-start;
`
const NoImageDiv = styled.div`
background-color: #2f3313;
border-radius: 40px;
display:flex;
justify-content:center;
align-items:center;
height: 200px;
width: 60%;
`
const NoImageText = styled(Text)`
font-family: 'Roboto';
color:#fff;
width:60%;
text-align:center;
font-size:medium;
`

const FlowerSelected = ({ Deselect, flower }) => {
    const id = flower.flowerID
    const hasImage = flower.cover_image !== '' ? true : false;  // if flower has an image
    const lastIndex = flower.soil.length - 1; // last index of flower
    const heightBoolean = flower.height.length === 2 ? true : false // Has more than one height number
    // Shows all info of selected flower
    return (
        <FlowerSelectedStyle>
            <FlowerHeading>{flower.common_name}</FlowerHeading>
            {hasImage ? <StyledImg src={flower.cover_image} /> :
                <NoImageDiv>
                    <NoImageText>No Image Found</NoImageText>
                </NoImageDiv>
            }
            <InfoBox>

                <StyledText><BoldText>Latin: </BoldText>{flower.latin_name}</StyledText>
                <StyledText><BoldText>Notes: </BoldText>{flower.notes}</StyledText>
                <StyledText><BoldText>Blooming season: </BoldText>{flower.blooming_season}</StyledText>
                <StyledText><BoldText>Spacing: </BoldText>{flower.spacing.numberInt}cm</StyledText>
                <StyledText><BoldText>Exposure: </BoldText> {flower.sun ? 'Full Sun' : 'Partial Sun'}</StyledText>
                <StyledText><BoldText>Height: </BoldText>{heightBoolean ?
                    <>{flower.height[0].numberInt}-{flower.height[1].numberInt}</>
                    : <>{flower.height[0].numberInt}</>}cm</StyledText>
                <StyledText><BoldText>Depth: </BoldText>{flower.depth.numberInt}cm</StyledText>
                <StyledSpan>
                    <StyledText><BoldText>Soil: </BoldText></StyledText>
                    <StyledUL>
                        {/* map all items in soil */}
                        {flower.soil.map((item, key) => (
                            <span key={key}>
                                {key === lastIndex ?
                                    <StyledText>{item}</StyledText>
                                    : <StyledText>{item},</StyledText>}
                            </span>

                        ))}
                    </StyledUL>
                </StyledSpan>
            </InfoBox>
            <Comments id={id} />
            {/* deslect Flower function*/}
            <StyledButton onClick={Deselect}>Deselect</StyledButton>
        </FlowerSelectedStyle >
    )
}

export default FlowerSelected
