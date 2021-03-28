import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Button, Header, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MyComboBox from '../../../app/common/form/MyComboBox';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { DefectFormValues } from '../../../app/models/defect';
import { priorityOptions } from '../../../app/common/options/priorityOptions';
import { statusOptions } from '../../../app/common/options/statusOptions';

export default observer(function DefectForm() {
    const history = useHistory();
    const { defectStore } = useStore();
    const { createDefect, updateDefect, loadDefect, loadingInitial } = defectStore;
    const { id } = useParams<{ id: string }>();
    const [defect, setDefect] = useState<DefectFormValues>(new DefectFormValues());

    const validationSchema = Yup.object({
        title: Yup.string().required('The defect title is required'),
        description: Yup.string().required('The defect description is required'),
        category: Yup.string().required(),
        date: Yup.string().required('Date is required').nullable(),
        priority: Yup.string().required(),
        status: Yup.string().required(),
    })

    useEffect(() => {
        if (id) loadDefect(id).then(defect => setDefect(new DefectFormValues(defect)))
    }, [id, loadDefect]);

    function handleFormSubmit(defect: DefectFormValues) {
        if (!defect.id) {
            let newDefect = {
                ...defect,
                id: uuid()
            };
            createDefect(newDefect).then(() => history.push(`/defects/${newDefect.id}`))
        }
        else {
            updateDefect(defect).then(() => history.push(`/defects/${defect.id}`))
        }
    }

    if (loadingInitial) return <LoadingComponent content='Loading Defect...' />

    return (
        <>
        <Header as='h2' content='Defect Details' size='huge' textAlign='center' color='blue' />
        <Segment clearing>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={defect}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <Header content='Title' sub color='teal' />
                        <MyTextInput name='title' placeholder='Title' />
                        <Header content='Description' sub color='teal' />
                        <MyTextArea rows={3} placeholder='Description' name='description' />
                        <Header content='Category' sub color='teal' />
                        <MyComboBox options={categoryOptions} placeholder='Category' name='category' />
                        <Header content='Date' sub color='teal' />
                        <MyDateInput
                            placeholderText='Date'
                            name='date'
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMMM, d, yyyy h:mm aa'
                        />
                        <Header content='Priority' sub color='teal' />
                        <MyComboBox options={priorityOptions} placeholder='Priority' name='priority' />
                        <Header content='Status' sub color='teal' />
                        <MyComboBox options={statusOptions} placeholder='Status' name='status' />
                        <Button
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={isSubmitting}
                            floated='right'
                            positive
                            type='submit'
                            content='Submit' />
                        <Button as={Link} to='/defects' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>

        </Segment>
        </>
    )
})