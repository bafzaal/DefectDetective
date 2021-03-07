import React from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { IDefect } from '../../../app/models/defect';

interface IProps
{
    defects: IDefect[];
}

export default function DefectList({defects}: IProps)
{
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
                                <Button floated='right' content='View' color='blue' />
                                <Label basic content={defect.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}