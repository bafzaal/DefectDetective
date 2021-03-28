import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Header, Item, Segment, Image, Label } from 'semantic-ui-react'
import { IDefect } from "../../../app/models/defect";
import { format } from 'date-fns';
import { useStore } from '../../../app/stores/store';

const defectImageStyle = {
    filter: 'brightness(30%)'
};

const defectImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface IProps {
    defect: IDefect
}

export default observer(function DefectDetailedHeader({ defect }: IProps) {
    const { defectStore: { updateWorkers, loading, cancelDefectToggle } } = useStore();
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{ padding: '0' }}>
                {defect.isClosed &&
                    <Label style={{ position: 'absolute', zIndex: 1000, left: -14, top: 20 }}
                        ribbon color='red' content='Closed' />
                }
                <Image src={`/assets/categoryImages/${defect.category}.jpg`} fluid style={defectImageStyle} />
                <Segment style={defectImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={defect.title}
                                    style={{ color: 'white' }}
                                />
                                <p>{format(defect.date!, 'dd MMM yyyy')}</p>
                                <p>
                                    Hosted by <strong><Link to={`/profiles/${defect.owner?.username}`}>{defect.owner?.displayName}</Link></strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                {defect.isOwner ? (
                    <>
                        <Button 
                            color={defect.isClosed ? 'green' : 'red'}
                            floated='left' basic
                            content={defect.isClosed ? 'Re-Open Defect' : 'Close Defect'}
                            onClick={cancelDefectToggle}
                            loading={loading}
                        />
                        <Button as={Link} 
                            disabled={defect.isClosed}
                            to={`/manage/${defect.id}`} 
                            color='orange' floated='right'>
                            Manage Defect
                        </Button>
                    </>
                ) : defect.isWorking ? (
                    <Button loading={loading} onClick={updateWorkers}>Cancel Work</Button>
                ) : (
                    <Button disabled={defect.isClosed} loading={loading} onClick={updateWorkers} color='teal'>Work on Defect</Button>
                )}
            </Segment>
        </Segment.Group>
    )
})
