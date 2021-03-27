import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Label, Segment } from 'semantic-ui-react';
import { IDefect } from '../../../app/models/defect';
import {format} from 'date-fns';
import DefectListItemWorker from './DefectListItemWorker';

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
                        <Item.Description>Hosted by {defect.owner?.displayName}</Item.Description>
                        {defect.isOwner && (
                            <Item.Description>
                                <Label basic color='orange'>
                                    You are the owner of this Defect
                                </Label>
                            </Item.Description>
                        )}
                        {defect.isGoing && !defect.isOwner && (
                            <Item.Description>
                                <Label basic color='green'>
                                    You are working on this Defect
                                </Label>
                            </Item.Description>
                        )}
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {format(defect.date!, 'dd MMM yyyy h:mm aa')}
                    <Icon name='exclamation' /> {defect.priority}
                    <Icon name='info' /> {defect.status}
                </span>
            </Segment>
            <Segment secondary>
                <DefectListItemWorker workers={defect.workers!} />
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
