import React from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { IDefect } from '../../../app/models/defect';

interface IProps
{
    defect: IDefect | undefined;
    closeForm: () => void;
}

export default function DefectForm({defect, closeForm}: IProps)
{
    return(
        <Segment clearing>
            <Form>
                <Form.Input placeholder='Title' />
                <Form.TextArea placeholder='Description' />
                <Form.Input placeholder='Category' />
                <Form.Input placeholder='Date' />
                <Form.Input placeholder='Priority' />
                <Form.Input placeholder='Status' />
                <Button floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}