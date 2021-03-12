import React, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Label, Segment } from 'semantic-ui-react';
import { IDefect } from '../../../app/models/defect';
import { useStore } from '../../../app/stores/store';

interface IProps {
    defect: IDefect
}

export default function DefectListItem({ defect }: IProps) {
    const { defectStore } = useStore();
    const { deleteDefect, loading } = defectStore;

    const [target, setTarget] = useState('');

    function handleDefectDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteDefect(id);
    }

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
