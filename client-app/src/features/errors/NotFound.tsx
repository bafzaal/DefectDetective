import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Icon, Segment } from 'semantic-ui-react';

export default function NotFound()
{
    return(
        <Segment placeholder>
            <Header icon>
                <Icon name='search' />
                We are unable to find what you're looking for.
            </Header>
            <Segment.Inline>
                <Button as={Link} to='/defects' primary>
                    Return to Defects Page
                </Button>
            </Segment.Inline>
        </Segment>
    )
}