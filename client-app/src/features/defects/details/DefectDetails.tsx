import React from 'react';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import { IDefect } from '../../../app/models/defect';

interface Props
{
    defect: IDefect;
    cancelSelectDefect: () => void;
    openForm: (id: string) => void;
}

export default function DefectDetails({defect, cancelSelectDefect, openForm}: Props)
{
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
                    <Button onClick={cancelSelectDefect} basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}