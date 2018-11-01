// dit component renderd de grafieken van de rapportage pagina

import * as React from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css'
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, Tooltip, XAxis, YAxis } from 'recharts';
import { Button, Grid, Input } from 'semantic-ui-react';
import CustomLoader from '../GlobalComponents/Loading';
import * as Globals from '../../Globals';

const data01 = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];
const data02 = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

const columnsReactTable = [
    {
        Header: 'IMO_Number',
        accessor: 'IMO_number',
    }, {
        Header: 'Co_name',
        accessor: 'co_name'
    }, {
        Header: 'Co_country',
        accessor: 'co_country',
    }, {
        Header: 'Created_month',
        accessor: 'created_month',
    }, {
        Header: 'Created_year',
        accessor: 'created_year',
    }, {
        Header: 'Ce_type',
        accessor: 'ce_type',
    }, {
        Header: 'Ce_country',
        accessor: 'ce_country',
    }, {
        Header: 'Contractgroup',
        accessor: 'contractgroup',
    }, {
        Header: 'Callownership',
        accessor: 'callownership',
    }, {
        Header: 'Vesselname',
        accessor: 'vesselname',
    }]

class Rapportage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ChartContractGroup: [],
            ChosenFilters: {},
            FilteredDataCollection: {},
            FiltersCollection: [],
            StateCollectingFilters: 'NotLoaded',
            StateFilteredData: 'NotLoaded',
        }

    }
    componentWillUnmount() {
        // stop all processes

    }

    componentDidMount() {
        this.GetAllFilters();
    }

    GetAllFilters() {
        this.setState({ StateCollectingFilters: 'Loading' });
        fetch(Globals.server + '/Charts/Filters', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'content-type': 'application/json'
            },
            method: 'GET',
        }).then(response => response.json())
            .then(Data => {
               
                this.setState({ StateCollectingFilters: 'Loaded', FiltersCollection: Data },
                    () => {
                        this.GetAllFilteredData()
                    });
            }).catch((error) => {
                // tslint:disable-next-line:no-console
                console.log(error)
                this.setState({ StateCollectingFilters: 'NotLoaded' });
            });
    }

    LoadFilters() {
        if (this.state.StateCollectingFilters === 'Loaded') {
            return (
                <Grid columns='equal'>
                    <Grid.Column width={4}>
                        <Input onChange={this.eventHandlerChosenFilters} name='created_month' list='months' placeholder='Choose month' />
                        <datalist id='months'>
                            {
                                this.state.FiltersCollection.Months.map((entry, index) => (
                                    <option key={index} value={entry.created_month} />
                                ))
                            }
                        </datalist>
                    </Grid.Column>

                    <Grid.Column width={4}>
                        <Input onChange={this.eventHandlerChosenFilters} name='created_year' list='Years' placeholder='Choose Years' />
                        <datalist id='Years'>
                            {
                                this.state.FiltersCollection.Years.map((entry, index) => (
                                    <option key={index} value={entry.created_year} />
                                ))
                            }
                        </datalist>
                    </Grid.Column>

                    <Grid.Column width={4}>
                        <Input onChange={this.eventHandlerChosenFilters} name='callownership' list='callownerships' placeholder='Choose callownership' />
                        <datalist id='callownerships'>
                            {
                                this.state.FiltersCollection.callownerships.map((entry, index) => (
                                    <option key={index} value={entry.callownership} />
                                ))
                            }
                        </datalist>
                    </Grid.Column>

                    <Grid.Column width={4}>
                        <Input onChange={this.eventHandlerChosenFilters} name='ce_country' list='ce_countries' placeholder='Choose ce_country' />
                        <datalist id='ce_countries'>
                            {
                                this.state.FiltersCollection.ce_countries.map((entry, index) => (
                                    <option key={index} value={entry.ce_country} />
                                ))
                            }
                        </datalist>
                    </Grid.Column>

                    <Grid.Column width={4}>
                        <Input onChange={this.eventHandlerChosenFilters} name='ce_type' list='ce_types' placeholder='Choose ce_type' />
                        <datalist id='ce_types'>
                            {
                                this.state.FiltersCollection.ce_types.map((entry, index) => (
                                    <option key={index} value={entry.ce_type} />
                                ))
                            }
                        </datalist>
                    </Grid.Column>

                    <Grid.Column width={4}>
                        <Input onChange={this.eventHandlerChosenFilters} name='co_country' list='co_countries' placeholder='Choose co_country' />
                        <datalist id='co_countries'>
                            {
                                this.state.FiltersCollection.co_countries.map((entry, index) => (
                                    <option key={index} value={entry.co_country} />
                                ))
                            }
                        </datalist>
                    </Grid.Column>

                    <Grid.Column width={4}>
                        <Input onChange={this.eventHandlerChosenFilters} name='contractgroup' list='contractgroups' placeholder='Choose contractgroup' />
                        <datalist id='contractgroups'>
                            {
                                this.state.FiltersCollection.contractgroups.map((entry, index) => (
                                    <option key={index} value={entry.contractgroup} />
                                ))
                            }
                        </datalist>
                    </Grid.Column>

                    <Grid.Column width={4}>
                        <Input onChange={this.eventHandlerChosenFilters} name='customer' list='customers' placeholder='Choose customer' />
                        <datalist id='customers'>
                            {
                                this.state.FiltersCollection.customers.map((entry, index) => (
                                    <option key={index} value={entry.customer} />
                                ))
                            }
                        </datalist>
                    </Grid.Column>

                    <Grid.Column width={4}>
                        <Input onChange={this.eventHandlerChosenFilters} name='financial_closing' list='financial_closings' placeholder='Choose financial_closing' />
                        <datalist id='financial_closings'>
                            {
                                this.state.FiltersCollection.financial_closings.map((entry, index) => (
                                    <option key={index} value={entry.financial_closing} />
                                ))
                            }
                        </datalist>
                    </Grid.Column>

                    <Grid.Column width={4}>
                        <Input onChange={this.eventHandlerChosenFilters} name='operational_closing' list='operational_closings' placeholder='Choose operational_closing' />
                        <datalist id='operational_closings'>
                            {
                                this.state.FiltersCollection.operational_closings.map((entry, index) => (
                                    <option key={index} value={entry.operational_closing} />
                                ))
                            }
                        </datalist>
                    </Grid.Column>

                    <Grid.Column width={4}>
                        <Input onChange={this.eventHandlerChosenFilters} name='tco_country' list='tco_countries' placeholder='Choose tco_country' />
                        <datalist id='tco_countries'>
                            {
                                this.state.FiltersCollection.tco_countries.map((entry, index) => (
                                    <option key={index} value={entry.tco_country} />
                                ))
                            }
                        </datalist>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Button
                            color='blue'
                            size='large'
                            onClick={this.GetAllFilteredData}
                        >
                            Fetch Data
                        </Button>
                    </Grid.Column>
                </Grid>
            )
        }
        else {
            return (
                <Grid.Column width={8}>
                    <CustomLoader />
                </Grid.Column>
            )
        }
    }

    eventHandlerChosenFilters = (event) => {
        if (event.currentTarget.value === '') {
            const tempVar = this.state.ChosenFilters;
            delete tempVar[event.currentTarget.name];
        } else {
            if (this.state.ChosenFilters[event.currentTarget.name] === undefined) {
                const tempVar = this.state.ChosenFilters;
                tempVar[event.currentTarget.name] = event.currentTarget.value;
                this.setState({ ChosenFilters: tempVar });
            } else {
                const tempVar = this.state.ChosenFilters;
                tempVar[event.currentTarget.name] = event.currentTarget.value;
                this.setState({ ChosenFilters: tempVar });
            }
        }
    }

    GetAllFilteredData = () => {
        this.setState({ StateFilteredData: 'Loading' });
        fetch(Globals.server + '/Charts/DataFiltered', {
            body: JSON.stringify(this.state.ChosenFilters),
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'content-type': 'application/json',
            },
            method: 'POST',
        }).then(response => response.json())
            .then(Data => {
                // tslint:disable-next-line:no-console
                console.log(Data)
                this.setState({ StateFilteredData: 'Loaded', FilteredDataCollection: Data });
            }).catch((error) => {
                // tslint:disable-next-line:no-console
                console.log(error)
                this.setState({ StateFilteredData: 'NotLoaded' });
            });
    }

    LoadReactTable() {
        if (this.state.StateFilteredData === 'Loaded') {
            return (
                <Grid columns='equal'>
                    <Grid.Column width={16}>
                        <ReactTable
                            data={this.state.FilteredDataCollection}
                            columns={columnsReactTable}
                            filterable={true}
                        />
                    </Grid.Column>
                </Grid>
            )
        } else if (this.state.StateFilteredData === 'Loading') {
            return (
                <Grid columns='equal'>
                    <Grid.Column width={16}>
                        <CustomLoader />
                    </Grid.Column>
                </Grid>
            )
        } else {
            return (
                <Grid columns='equal'>
                    <Grid.Column width={16}>
                        <h2 className='centerText'>no data is loaded</h2>
                    </Grid.Column>
                </Grid>
            )
        }
    }

    LoadPlots() {
        if (this.state.StateFilteredData === 'Loaded') {

            const tempVar = [];

            this.state.FiltersCollection.contractgroups.map((entry, index) => {
                const object = {}
                object.name = entry.contractgroup;
                object.total = 0;

                tempVar.push(object);
            });

            tempVar.map((TopEntry, TopIndex) => {
                this.state.FilteredDataCollection.map((entry, index) => {
                    if (TopEntry.name === entry.contractgroup) {
                        TopEntry.total = TopEntry.total + 1;
                    }
                });
            });

            const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF8092'];

            return (
                <Grid columns='equal'>
                    <Grid.Column width={8}>
                        <h3>Groups contracten</h3>

                        <BarChart width={730} height={250} data={tempVar}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar
                                dataKey="total"
                                fill="#8884d8"
                            >
                                {
                                    tempVar.map((entry, index) => (
                                        <Cell

                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))
                                }
                            </Bar>
                            <Legend />
                        </BarChart>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <PieChart width={800} height={400}>
                            <Pie
                                data={tempVar}
                                dataKey="total"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                fill="#82ca9d"
                                label={true}
                                onClick={this.addFilterDynmicly}
                            >
                                {
                                    tempVar.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))
                                }
                            </Pie>

                            <Tooltip />
                        </PieChart>
                    </Grid.Column>
                </Grid>
            )
        } else if (this.state.StateFilteredData === 'Loading') {
            return (
                <Grid columns='equal'>
                    <Grid.Column width={16}>
                        <CustomLoader />
                    </Grid.Column>
                </Grid>
            )
        } else {
            return (
                <Grid columns='equal'>
                    <Grid.Column width={16}>
                        <h2 className='centerText'>no data is loaded</h2>
                    </Grid.Column>
                </Grid>
            )
        }


    }

    addFilterDynmicly = (data) => {
        // tslint:disable-next-line:no-console
        console.log(data);
    }

     render() {
        // if (this.state.FilteredDataCollection){
        //     console.log(this.state.FiltersCollection)
        // }
        return (
            <div className="Rapportage">
                <h1 className='centerText'>Filters</h1>
                {this.LoadFilters()}
                <h1 className='centerText'>Charts</h1>
                {this.LoadPlots()}
                <h1 className='centerText'>Table of Content</h1>
                {this.LoadReactTable()}
            </div >
        );
    }
}

export default Rapportage;