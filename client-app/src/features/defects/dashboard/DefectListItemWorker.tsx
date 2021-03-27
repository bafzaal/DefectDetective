import { observer } from 'mobx-react-lite'
import React from 'react'
import { Link } from 'react-router-dom'
import { Image, List } from 'semantic-ui-react'
import { IProfile } from '../../../app/models/profile'

interface IProps {
    workers: IProfile[];
}

export default observer(function DefectListItemWorker({ workers }: IProps) {
    return (
        <List horizontal>
            {workers.map(worker => (
                <List.Item key={worker.username} as={Link} to={`/profiles/${worker.username}`}>
                    <Image size='mini' circular src={worker.image || '/assets/user.png'} />
                </List.Item>
            ))}
        </List>
    )
})