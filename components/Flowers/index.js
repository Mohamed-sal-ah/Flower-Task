import FlowerList from './flower-list'
import FlowerSelected from './flower-selected'
// Importing FlowerList and FlowerSelected
import styled from 'styled-components'
import { Select, Grommet, grommet } from 'grommet'
import { deepMerge } from 'grommet/utils'
// Importing styed components and deepMegre , Select, Grommet, grommet from gromment
const colors = {
    selected: '#28610b'
};

const theme = deepMerge(grommet, {
    // Change theme color of select
    global: {
        colors
    },
    select: {
        background: '#ffffff',
        icons: {
            color: '#28610b'
        }
    }
})

const SeletedDiv = styled.div`
display:flex;
flex-direction:row;
width:100%;
justify-content:space-around;
`

const LoadingFlowers = styled.h5`
color: #fff;
text-align: center;
font-size: 20px;
font-family: 'Roboto';
`

const StyledSelect = styled(Select)`
background-color:white;
color:black;
width: fit-content;
`
const WidthDiv = styled.div`
width: min-content;
padding: 20px;
`
class Flowers extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selected: false,
            flowerObj: '',
            allFlowers: '',
            flowers: '',
            bloomingSeason: [
                'Spring',
                'Early Spring',
                'Mid Spring',
                'Late Spring',
                'Early Summer',
                'Mid Summer',
                'All'
            ],
            soilSelect: '',
            seasonSelect: ''
        }
    }
    componentDidMount() {
        /* fetch flower list */
        const url = 'https://flowers-mock-data.firebaseio.com/flowers.json'
        fetch(url).then(response => response.json())
            .then(data => {
                const flowersData = data.map((flower, key) => ({
                    ...data[key],
                    flowerID: key
                }))
                // put in state
                this.setState({ flowers: flowersData, loaded: true, allFlowers: flowersData })

            });
    }
    Selected = (flower) => {
        // Flower Selected function
        this.setState({ flowerObj: flower, selected: true })
    }

    Deselect = () => {
        // Flower Deselected
        this.setState({ selected: false, flowerObj: '' })
    }

    SeasonSelect = event => {
        // Selecet Growing season
        if (event.value === 'All') {
            // Show all Flowers
            const allFlowers = this.state.allFlowers
            this.setState({
                value: event.value,
                seasonSelect: event.select,
                flowers: allFlowers
            })

        } else {
            //Show Selected
            const seasonFlowers = this.state.allFlowers.filter(flower => flower.blooming_season === event.value)
            this.setState({
                value: event.value,
                seasonSelect: event.select,
                flowers: seasonFlowers
            })
        }


    }

    render() {
        const { selected, flowerObj, flowers, loaded, bloomingSeason, seasonSelect } = this.state
        return (
            <>
                <SeletedDiv>
                    {loaded ?
                        <WidthDiv>
                            {/* Initialize Gromment theme */}
                            <Grommet theme={theme}>
                                <StyledSelect
                                    multiple={false}
                                    options={bloomingSeason}
                                    placeholder='Select Blooming Season'
                                    value={seasonSelect}
                                    onChange={this.SeasonSelect}
                                />
                            </Grommet>
                        </WidthDiv>
                        : null}

                </SeletedDiv>

                {selected ? <div><FlowerSelected flower={flowerObj} Deselect={this.Deselect} /> </div> : null}
                <div>
                    {loaded ?
                        <FlowerList flowers={flowers} onSelect={this.Selected} /> :
                        <LoadingFlowers>Loading...</LoadingFlowers>}

                </div>
            </>
        )
    }
}

export default Flowers
