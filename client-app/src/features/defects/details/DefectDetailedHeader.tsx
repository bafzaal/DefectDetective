import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
import {IDefect} from "../../../app/models/defect";

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

export default observer (function DefectDetailedHeader({defect}: IProps) {
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src={`/assets/categoryImages/${defect.category}.jpg`} fluid style={defectImageStyle}/>
                <Segment style={defectImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={defect.title}
                                    style={{color: 'white'}}
                                />
                                <p>{defect.date}</p>
                                <p>
                                    Hosted by <strong>Bilal</strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button color='teal'>Work on Defect</Button>
                <Button>Cancel Work</Button>
                <Button as={Link} to={`/manage/${defect.id}`} color='orange' floated='right'>
                    Manage Defect
                </Button>
            </Segment>
        </Segment.Group>
    )
})
