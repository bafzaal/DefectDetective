import React from 'react'
import { Segment, List, Label, Item, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { IProfile } from '../../../app/models/profile'

interface IProps {
    workers: IProfile[];
}

export default observer(function DefectDetailedSidebar({ workers }: IProps) {
    return (
        <>
            <Segment
                textAlign='center'
                style={{ border: 'none' }}
                attached='top'
                secondary
                inverted
                color='teal'
            >
                {workers.length} {workers.length === 1 ? 'Worker' : 'Workers'} going
            </Segment>
            <Segment attached>
                <List relaxed divided>
                    {workers.map(worker => (
                        <Item style={{ position: 'relative' }} key={worker.username}>
                            <Label
                                style={{ position: 'absolute' }}
                                color='orange'
                                ribbon='right'
                            >
                                Creator
                        </Label>
                            <Image size='tiny' src={worker.image || '/assets/user.png'} />
                            <Item.Content verticalAlign='middle'>
                                <Item.Header as='h3'>
                                    <Link to={`/profiles/${worker.username}`}>{worker.displayName}</Link>
                                </Item.Header>
                                <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>
                            </Item.Content>
                        </Item>
                    ))}
                </List>
            </Segment>
        </>

    )
})

