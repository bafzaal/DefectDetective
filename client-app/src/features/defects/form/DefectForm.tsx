import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from 'uuid';
import { Link } from 'react-router-dom';

export default observer(function DefectForm()
{
    const history = useHistory();
    const {defectStore} = useStore();
    const {createDefect, updateDefect, loading, loadDefect, loadingInitial} = defectStore;
    const {id} = useParams<{id: string}>();
    const [defect, setDefect] = useState({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        priority: '',
        status: ''
    });

    useEffect(() => {
        if (id) loadDefect(id).then(defect => setDefect(defect!))
    }, [id, loadDefect]);

    function handleSubmit()
    {
        if(defect.id.length === 0)
        {
            let newDefect = {
                ...defect,
                id: uuid()
            };
            createDefect(newDefect).then(() => history.push(`/defects/${newDefect.id}`))
        }
        else
        {
            updateDefect(defect).then(() => history.push(`/defects/${defect.id}`))
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
    {
        const {name, value} = event.target;
        setDefect({...defect, [name]: value})
    }

    if(loadingInitial) return <LoadingComponent content='Loading Defect...' />

    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={defect.title} name='title' onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' value={defect.description} name='description' onChange={handleInputChange} />
                <Form.Input placeholder='Category' value={defect.category} name='category' onChange={handleInputChange} />
                <Form.Input type='date' placeholder='Date' value={defect.date} name='date' onChange={handleInputChange} />
                <Form.Input placeholder='Priority' value={defect.priority} name='priority' onChange={handleInputChange} />
                <Form.Input placeholder='Status' value={defect.status} name='status' onChange={handleInputChange} />
                <Button loading={loading} floated='right' positive type='submit' content='Submit' onChange={handleInputChange} />
                <Button as={Link} to='/defects' floated='right' type='button' content='Cancel' onChange={handleInputChange} />
            </Form>
        </Segment>
    )
})