import FlowerItem from "./flower-item";
// Import FlowerItem
import styled from 'styled-components'
// Impoty styled components
const FlowerListStyle = styled.ul`
display: grid;
grid-gap: 20px;
grid-template-columns: repeat(2, 1fr);
padding: 40px 10px;
color:#fff;
@media (max-width: 1040px) { 
    grid-gap:10px;
};
@media (max-width : 900px) {
    grid-template-columns: auto;
};
@media (max-width : 600px) {
    padding:0;
};
`

const FlowerList = ({ onSelect, flowers }) => {
    // List all flowers
    return (
        <FlowerListStyle>
            {flowers.map((flower, key) => (
                <FlowerItem onSelect={onSelect} flower={flower} key={key} />
            ))}
        </FlowerListStyle>
    )
}


export default FlowerList
