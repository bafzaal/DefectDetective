import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer(function DefectList()
{
    const {defectStore} = useStore();
    const {deleteDefect, defects, loading} = defectStore;

    const [target, setTarget] = useState('');

    function handleDefectDelete(e: SyntheticEvent<HTMLButtonElement>, id: string)
    {
        setTarget(e.currentTarget.name);
        deleteDefect(id);
    }

    return(
        <Segment>
            <Item.Group divided>
                {defects.map(defect => (
                    <Item key={defect.id}>
                        <Item.Content>
                            <Item.Header as='a'>{defect.title}</Item.Header>
                            <Item.Meta>{defect.date}</Item.Meta>
                            <Item.Description>
                                <div>{defect.description}</div>
                                <div>{defect.priority}, {defect.status}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => defectStore.selectDefect(defect.id)} floated='right' content='View' color='blue' />
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
                ))}
            </Item.Group>
        </Segment>
    )
})