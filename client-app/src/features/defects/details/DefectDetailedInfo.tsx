import { observer } from 'mobx-react-lite';
import React from 'react'
import { Segment, Grid, Icon } from 'semantic-ui-react'
import { IDefect } from "../../../app/models/defect";
import { format } from 'date-fns';

interface IProps {
    defect: IDefect
}

export default observer(function DefectDetailedInfo({ defect }: IProps) {

    function Capitalize(str: string) 
    {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <Segment.Group>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={16}>
                        <Icon size='large' color='red' name='info' />
                        <span>{defect.description}</span>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={16}>
                        <Icon name='calendar' size='large' color='red' />
                        <span>
                            {format(defect.date!, 'dd MMM yyyy h:mm aa')}
                        </span>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={16}>
                        <Icon name='marker' size='large' color='red' />
                        <span>{`Priority: ${Capitalize(defect.priority)}`}</span>
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    )
})
