import React, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Item, Label } from 'semantic-ui-react';
import { IDefect } from '../../../app/models/defect';
import { useStore } from '../../../app/stores/store';

interface IProps 
{
    defect: IDefect
}

export default function DefectListItem({ defect }: IProps) 
{
    const { defectStore } = useStore();
    const { deleteDefect, loading } = defectStore;

    const [target, setTarget] = useState('');

    function handleDefectDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteDefect(id);
    }

    return (
        <Item key={defect.id}>
            <Item.Content>
                <Item.Header as='a'>{defect.title}</Item.Header>
                <Item.Meta>{defect.date}</Item.Meta>
                <Item.Description>
                    <div>{defect.description}</div>
                    <div>{defect.priority}, {defect.status}</div>
                </Item.Description>
                <Item.Extra>
                    <Button as={Link} to={`/defects/${defect.id}`} floated='right' content='View' color='blue' />
                    <Button
                        name={defect.id}
                        loading={loading && target === defect.id}
                        onClick={(e) => handleDefectDelete(e, defect.id)}
                        floated='right'
                        content='Delete'
                        color='red'
                    />
                    <Label basic content={defect.category} />
                </Item.Extra>
            </Item.Content>
        </Item>
    )
}
