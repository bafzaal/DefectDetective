import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { PagingParams } from '../../../app/models/pagination';
import { useStore } from '../../../app/stores/store';
import DefectFilters from './DefectFilters';
import DefectList from './DefectList';
import InfiniteScroll from 'react-infinite-scroller';

export default observer(function DefectDashboard() {
    const { defectStore } = useStore();
    const { loadDefects, defectRegistry, setPagingParams, pagination } = defectStore;
    const [loadingNext, setLoadingNext] = useState(false);

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1));
        loadDefects().then(() => setLoadingNext(false));
    }

    useEffect(() => {
        if (defectRegistry.size <= 1) loadDefects();
    }, [defectRegistry.size, loadDefects])

    if (defectStore.loadingInitial && !loadingNext) {
        return <LoadingComponent content="Loading Defects..." />
    }

    return (
        <Grid>
            <Grid.Column width='10'>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={handleGetNext}
                    hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
                    initialLoad={false}
                >
                    <DefectList />
                </InfiniteScroll>
            </Grid.Column>
            <Grid.Column width='6'>
                <DefectFilters />
            </Grid.Column>
            <Grid.Column width={10}>
                <Loader active={loadingNext} />
            </Grid.Column>
        </Grid>
    )
})