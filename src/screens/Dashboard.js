// dit is de main container die alles indeelt voor de schermen die ingelogde gebruikers kunnen zien

import * as React from 'react';
import { Grid, Menu, Sidebar, Segment } from 'semantic-ui-react';
import './../css/App.css';
import Rapportage from '../components/charts/Rapportage';

const Grafiek = () => {
    return <h1>TEST</h1>
}

class Dashboard extends React.Component {
    state = {
        visible: true,
        screen: 'rapportage'
      }

    setScreen = (screen) => {
        this.setState({
            screen: screen
        })
    }

    getScreen = () => {
        if(this.state.screen === 'rapportage'){
            return <Rapportage/>
        } else if (this.state.screen === 'grafiek1'){
            return <Grafiek/>
        }
    }

    render() {
        const { visible } = this.state

        return (
            <div className='Dashboard'>
                <Grid columns='equal'>
                    <Grid.Column>
                        <Sidebar.Pushable as={Segment}>
                            <Sidebar
                                as={Menu}
                                animation='push'
                                icon='labeled'
                                inverted
                                vertical
                                visible={visible}
                                width='thin'
                            >
                                <Menu.Item name='rapportage' onClick={() => this.setScreen('rapportage')} />
                                <Menu.Item name='grafiek 1' onClick={() => this.setScreen('grafiek1')}/>
                            </Sidebar>

                            <Sidebar.Pusher>
                                <Segment basic>
                                    {
                                        this.getScreen()
                                    }
                                </Segment>
                            </Sidebar.Pusher>
                        </Sidebar.Pushable>
                    </Grid.Column>
                </Grid>
            </div >
        );
    }
}

export default Dashboard;