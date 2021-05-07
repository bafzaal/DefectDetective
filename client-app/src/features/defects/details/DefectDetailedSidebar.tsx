import React from 'react'
import { Segment, List, Label, Item, Image, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { IDefect } from '../../../app/models/defect'

interface IProps {
    defect: IDefect;
}

export default observer(function DefectDetailedSidebar({ defect: { workers, owner } }: IProps) {
    if (!workers) return null;
    return (
        <>
            <Segment
                textAlign='center'
                style={{ border: 'none' }}
                attached='top'
                secondary
                inverted
                color='red'
                id="defectWorkers"
            >
                <Header id="workersTitle">{workers.length} {workers.length === 1 ? 'Worker' : 'Workers'} </Header>
            </Segment>
            <Segment attached>
                <List relaxed divided>
                    {workers.map(worker => (
                        <Item style={{ position: 'relative' }} key={worker.username}>
                            {worker.username === owner?.username &&
                                <Label
                                    style={{ position: 'absolute' }}
                                    color='orange'
                                    ribbon='right'
                                >
                                    Creator
                                </Label>}
                            <Image size='tiny' src={worker.image || '/assets/user.png'} />
                            <Item.Content verticalAlign='middle'>
                                <Item.Header as='h3'>
                                    <Link to={`/profiles/${worker.username}`}>{worker.displayName}</Link>
                                </Item.Header>
                                {worker.following && 
                                <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>}
                            </Item.Content>
                        </Item>
                    ))}
                </List>
            </Segment>
        </>

    )
})

