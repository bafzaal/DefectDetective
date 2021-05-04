import React, { SyntheticEvent, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Tab, Grid, Header, Card, Image, TabProps } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { IUserDefect } from '../../app/models/profile';
import { format } from 'date-fns';
import { useStore } from "../../app/stores/store";

const panes = [
    { menuItem: 'Open Defects', pane: { key: 'open' } },
    { menuItem: 'Closed Defects', pane: { key: 'closed' } },
    { menuItem: 'Creator', pane: { key: 'owner' } }
];

export default observer(function ProfileDefects() {
    const { profileStore } = useStore();
    const {
        loadUserDefects,
        profile,
        loadingDefects,
        userDefects
    } = profileStore;

    useEffect(() => {
        loadUserDefects(profile!.username);
    }, [loadUserDefects, profile]);

    const handleTabChange = (e: SyntheticEvent, data: TabProps) => {
        loadUserDefects(profile!.username, panes[data.activeIndex as number].pane.key);
    };

    return (
        <Tab.Pane loading={loadingDefects}>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated='left' icon='calendar' content={'Defects'} />
                </Grid.Column>
                <Grid.Column width={16}>
                    <Tab
                        panes={panes}
                        menu={{ secondary: true, pointing: true }}
                        onTabChange={(e, data) => handleTabChange(e, data)}
                    />
                    <br />
                    <Card.Group itemsPerRow={4}>
                        {userDefects.map((defect: IUserDefect) => (
                            <Card
                                as={Link}
                                to={`/defects/${defect.id}`}
                                key={defect.id}
                            >
                                <Image
                                    src={`/assets/categoryImages/${defect.category}.jpg`}
                                    style={{ minHeight: 100, objectFit: 'cover' }}
                                />
                                <Card.Content>
                                    <Card.Header textAlign='center'>{defect.title}</Card.Header>
                                    <Card.Meta textAlign='center'>
                                        <div>{format(new Date(defect.date), 'do LLL')}</div>
                                        <div>{format(new Date(defect.date), 'h:mm a')}</div>
                                    </Card.Meta>
                                </Card.Content>
                            </Card>
                        ))}
                    </Card.Group>
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    );
});