import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Label, Segment } from 'semantic-ui-react';
import { IDefect } from '../../../app/models/defect';
import { format } from 'date-fns';
import DefectListItemWorker from './DefectListItemWorker';

interface IProps {
    defect: IDefect
}

export default function DefectListItem({ defect }: IProps) {

    function Capitalize(str: string) 
    {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <Segment.Group>
            <Segment>
                {defect.isClosed &&
                    <Label attached='top' color='red' content='Closed' style={{ textAlign: 'center' }} />
                }
                <Item.Group>
                    <Item>
                        <Item.Image style={{ marginBottom: 3 }} size='tiny' circular src={defect.owner?.image || '/assets/user.png'} />
                        <Item.Content>
                            <Item.Header as={Link} to={`/defects/${defect.id}`}>
                                {defect.title}
                            </Item.Header>
                            <Item.Description>Hosted by <Link to={`/profiles/${defect.ownerUsername}`}>{defect.owner?.displayName}</Link></Item.Description>
                            {defect.isOwner && (
                                <Item.Description>
                                    <Label basic color='orange'>
                                        You are the owner of this Defect
                                </Label>
                                </Item.Description>
                            )}
                            {defect.isWorking && !defect.isOwner && (
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
                    <Icon name='exclamation' /> {`Priority: ${Capitalize(defect.priority)}`}
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
                    color='red'
                    floated='right'
                    content='View'
                />
            </Segment>
        </Segment.Group>
    )
}
