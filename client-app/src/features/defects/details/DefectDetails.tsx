import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';

export default function DefectDetails()
{

    const {defectStore} = useStore();
    const {selectedDefect: defect, openForm, cancelSelectedDefect} = defectStore;

    if(!defect) return <LoadingComponent />;

    return(
        <Card fluid>
            <Image src={`/assets/categoryImages/${defect.category}.jpg`} />
            <Card.Content>
                <Card.Header>{defect.title}</Card.Header>
                <Card.Meta>
                    <span>{defect.date}</span>
                </Card.Meta>
                <Card.Description>
                    {defect.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button onClick={() => openForm(defect.id)} basic color='blue' content='Edit' />
                    <Button onClick={cancelSelectedDefect} basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}