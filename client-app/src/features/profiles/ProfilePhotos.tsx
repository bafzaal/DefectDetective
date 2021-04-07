import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Card, Header, Tab, Image, Grid, Button } from 'semantic-ui-react';
import PhotoUploadWidget from '../../app/common/imageUpload/PhotoUploadWidget';
import { IProfile } from '../../app/models/profile';
import { useStore } from '../../app/stores/store';

interface IProps {
    profile: IProfile;
}

export default observer(function ProfilePhotos({ profile }: IProps) {
    const { profileStore: { isCurrentUser, uploadPhoto, uploading } } = useStore();
    const [addPhotomode, setAddPhotoMode] = useState(false);

    function handlePhotoUpload(file: Blob)
    {
        uploadPhoto(file).then(() => setAddPhotoMode(false));
    }

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated='left' icon='image' content='Photos' />
                    {isCurrentUser && (
                        <Button floated='right' basic
                            content={addPhotomode ? 'Cancel' : 'Add Photo'}
                            onClick={() => setAddPhotoMode(!addPhotomode)}
                        />
                    )}
                </Grid.Column>
                <Grid.Column width={16}>
                    {addPhotomode ? (
                        <PhotoUploadWidget uploadPhoto={handlePhotoUpload} loading={uploading} />
                    ) : (
                        <Card.Group itemsPerRow={5}>
                            {profile.photos?.map(photo => (
                                <Card key={photo.id}>
                                    <Image src={photo.url} />
                                </Card>
                            ))}
                        </Card.Group>
                    )}
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
})