import { observer } from 'mobx-react-lite';
import React from 'react';
import { Card, Header, Tab, Image } from 'semantic-ui-react';
import { IProfile } from '../../app/models/profile';

interface IProps {
    profile: IProfile;
}

export default observer(function ProfilePhotos({ profile }: IProps) {
    return (
        <Tab.Pane>
            <Header icon='image' content='Photos' />
            <Card.Group itemsPerRow={5}>
                {profile.photos?.map(photo => (
                    <Card key={photo.id}>
                        <Image src={photo.url} />
                    </Card>
                ))}
            </Card.Group>
        </Tab.Pane>
    )
})