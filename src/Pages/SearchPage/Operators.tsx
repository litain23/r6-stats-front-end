
import React from 'react';
import * as operators from '../../@operatorpng'; // 자동으로 타입을 만듬. operators tyle.
import { OPERATORAPI } from '../../util/type';

import { Table, Row } from 'antd';
import { ColumnType } from 'antd/lib/table/interface'
import { Typography } from 'antd';
import { API } from '../../util/API';
import { withRouter, RouteComponentProps} from 'react-router-dom';
const { Text } = Typography;

interface Props {
    // operators: OPERATORAPI[];
}

interface State {
    operators: OPERATORAPI[];
}

class SearchOperators extends React.Component<RouteComponentProps, State> {

    constructor(props:RouteComponentProps) {
        super(props);
        
        this.state = {
            operators: [] as OPERATORAPI[]
        }
    }

    async componentDidMount() {
        const [operatorAPIs, operatorError] = await API<OPERATORAPI[]>("operator/uplay/piliot/");

        if (operatorError) {
            alert("Error : 연결에 문제가 있습니다.")
            this.props.history.goBack();
        } else {
            this.setState({operators : operatorAPIs!})
        }
    }


    row = (api : OPERATORAPI) => {
            return(
            <tr>
            <td>
                <img style={{width:'40px'}}src={operators[api.name]}></img>
                <div>{api.name}</div> 
            </td>
            <td>{api.kills}</td>
            <td>{api.death}</td>
            <td> "K/D" </td>
            <td>{api.roundWon}</td>
            <td>{api.roundLost}</td>
            <td> "W/L" </td>
            <td>{api.headShot}</td>
            <td>{api.meleeKills}</td>
            <td>{api.totalXp}</td>
            <td>{api.timePlayed}</td>
            </tr>
        )  
    }

    render() {

    
        const columns: ColumnType<OPERATORAPI>[] = [{
            title: 'Operator',
            dataIndex: "name",
            sorter: (a, b) => a.name.localeCompare(b.name),
            filters: [
                { text: '공격팀', value: 'attack' },
                { text: '방어팀', value: 'deffense' },
            ],
            ellipsis: false,
            showSorterTooltip:false,
            onCell: (record, index) => {
                return {
                }
            },
            render: (value, record, index) => {
                return(
                    <>  
                        <Row justify="center">
                            <img style={{width:'50px'}} src={operators[record.name]}></img>
                        </Row>
                        <Row justify="center">
                        <Text strong>{record.name.toString().toUpperCase()}</Text>
                        </Row>
                    </>
                )
            }
            },  
            
            {
                title: 'Kills',
                dataIndex: 'kills',
                ellipsis: false,
            },{
                title: 'Deaths',
                dataIndex: 'death',
                ellipsis: false,
            },{
                title: 'K/D',
                dataIndex: 'K/D',
                ellipsis: false,
            }, {
                title: 'Wins',
                dataIndex: 'roundWon',
                ellipsis: false,
            },{
                title: 'Losses',
                dataIndex: 'roundLost',
                ellipsis: false,
            },{
                title: 'W/L',
                dataIndex: 'W/L',
                ellipsis: false,
            },{
                title: 'Headshots',
                dataIndex: 'headShot',
                ellipsis: false,
            },{
                title: 'Melee Kills',
                dataIndex: 'meleeKills',
                ellipsis: false,
            },{
                title: 'Total XP',
                dataIndex: 'totalXp',
                ellipsis: false,
            },{
                title: 'Playtime',
                dataIndex: 'timePlayed',
                ellipsis: false,
            }
        ]

        const dataSource = (operators : OPERATORAPI[]): (OPERATORAPI & { key : string })[] =>{
            let index : number = 0;
            return operators.map( (api) => {
                const operator = Object.assign(api, {key : index.toString()});
                index++;
                return operator;
            })
        }       

    return( 
        <>
         <Table
            columns={columns}
            dataSource={dataSource(this.state.operators)}
            scroll={{x:true}}
            pagination={false}
            />
        </>
        ) 
    }
}

export default withRouter(SearchOperators);