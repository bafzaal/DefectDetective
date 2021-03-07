import React from 'react';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import { IDefect } from '../../../app/models/defect';

interface Props
{
    defect: IDefect;
    cancelSelectDefect: () => void;
}

export default function DefectDetails({defect, cancelSelectDefect}: Props)
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
                    <Button basic color='blue' content='Edit' />
                    <Button onClick={cancelSelectDefect} basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}