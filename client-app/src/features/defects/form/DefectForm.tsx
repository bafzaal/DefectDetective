import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Button, Label, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';
import { Link } from 'react-router-dom';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';

export default observer(function DefectForm() {
    const history = useHistory();
    const { defectStore } = useStore();
    const { createDefect, updateDefect, loading, loadDefect, loadingInitial } = defectStore;
    const { id } = useParams<{ id: string }>();
    const [defect, setDefect] = useState({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        priority: '',
        status: ''
    });

    const validationSchema = Yup.object({
        title: Yup.string().required('The defect title is required'),
        description: Yup.string().required('The defect description is required'),
        category: Yup.string().required(),
        date: Yup.string().required(),
        priority: Yup.string().required(),
        status: Yup.string().required(),
    })

    useEffect(() => {
        if (id) loadDefect(id).then(defect => setDefect(defect!))
    }, [id, loadDefect]);

    // function handleSubmit()
    // {
    //     if(defect.id.length === 0)
    //     {
    //         let newDefect = {
    //             ...defect,
    //             id: uuid()
    //         };
    //         createDefect(newDefect).then(() => history.push(`/defects/${newDefect.id}`))
    //     }
    //     else
    //     {
    //         updateDefect(defect).then(() => history.push(`/defects/${defect.id}`))
    //     }
    // }

    // function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
    // {
    //     const {name, value} = event.target;
    //     setDefect({...defect, [name]: value})
    // }

    if (loadingInitial) return <LoadingComponent content='Loading Defect...' />

    return (
        <Segment clearing>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={defect}
                onSubmit={values => console.log(values)}>
                {({ handleSubmit }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='title' placeholder='Title' />
                        <MyTextInput placeholder='Description' name='description' />
                        <MyTextInput placeholder='Category' name='category' />
                        <MyTextInput placeholder='Date' name='date' />
                        <MyTextInput placeholder='Priority' name='priority' />
                        <MyTextInput placeholder='Status' name='status' />
                        <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                        <Button as={Link} to='/defects' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>

        </Segment>
    )
})