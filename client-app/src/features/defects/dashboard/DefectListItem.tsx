import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Segment } from 'semantic-ui-react';
import { IDefect } from '../../../app/models/defect';

interface IProps {
    defect: IDefect
}

export default function DefectListItem({ defect }: IProps) {

    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as={Link} to={`/defects/${defect.id}`}>
                                {defect.title}
                            </Item.Header>
                        <Item.Description>Hosted by Bilal</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {defect.date}
                    <Icon name='marker' /> {defect.status}
                </span>
            </Segment>
            <Segment secondary>
                Workers go here
            </Segment>
            <Segment clearing>
                <span>{defect.description}</span>
                <Button 
                    as={Link}
                    to={`/defects/${defect.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
            </Segment>
        </Segment.Group>
    )
}
