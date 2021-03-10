import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Button, Card, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';

export default observer(function DefectDetails()
{

    const {defectStore} = useStore();
    const {selectedDefect: defect, loadDefect, loadingInitial} = defectStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if(id) loadDefect(id);
    }, [id, loadDefect]);

    if(loadingInitial || !defect) return <LoadingComponent />;

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
                    <Button basic color='blue' content='Edit' />
                    <Button basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
})