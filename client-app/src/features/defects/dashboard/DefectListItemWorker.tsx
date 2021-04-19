import { observer } from 'mobx-react-lite'
import React from 'react'
import { Link } from 'react-router-dom'
import { Image, List, Popup } from 'semantic-ui-react'
import { IProfile } from '../../../app/models/profile'
import ProfileCard from '../../profiles/ProfileCard'

interface IProps {
    workers: IProfile[];
}

export default observer(function DefectListItemWorker({ workers }: IProps) {
    const styles =
    {
        borderColor: 'orange',
        borderWidth: 3
    }

    return (
        <List horizontal>
            {workers.map(worker => (
                <Popup
                    hoverable key={worker.username}
                    trigger={
                        <List.Item key={worker.username} as={Link} to={`/profiles/${worker.username}`}>
                            <Image 
                                size='mini' 
                                circular src={worker.image || '/assets/user.png'} 
                                bordered style={worker.following ? styles : null}
                            />
                        </List.Item>
                    }
                >
                    <Popup.Content>
                        <ProfileCard profile={worker} />
                    </Popup.Content>
                </Popup>
            ))}
        </List>
    )
})