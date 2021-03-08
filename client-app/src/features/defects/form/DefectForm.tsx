import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { IDefect } from '../../../app/models/defect';

interface IProps
{
    defect: IDefect | undefined;
    closeForm: () => void;
    createOrEdit: (defect: IDefect) => void;
    submitting: boolean;
}

export default function DefectForm({defect: selectedDefect, closeForm, createOrEdit, submitting}: IProps)
{

    const initialState = selectedDefect ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        priority: '',
        status: '',
    }

    const [defect, setDefect] = useState(initialState);

    function handleSubmit()
    {
        createOrEdit(defect);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
    {
        const {name, value} = event.target;
        setDefect({...defect, [name]: value})
    }

    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={defect.title} name='title' onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' value={defect.description} name='description' onChange={handleInputChange} />
                <Form.Input placeholder='Category' value={defect.category} name='category' onChange={handleInputChange} />
                <Form.Input type='date' placeholder='Date' value={defect.date} name='date' onChange={handleInputChange} />
                <Form.Input placeholder='Priority' value={defect.priority} name='priority' onChange={handleInputChange} />
                <Form.Input placeholder='Status' value={defect.status} name='status' onChange={handleInputChange} />
                <Button loading={submitting} floated='right' positive type='submit' content='Submit' onChange={handleInputChange} />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' onChange={handleInputChange} />
            </Form>
        </Segment>
    )
}