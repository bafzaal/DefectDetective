import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import { PagingParams } from '../../../app/models/pagination';
import { useStore } from '../../../app/stores/store';
import DefectFilters from './DefectFilters';
import DefectList from './DefectList';
import InfiniteScroll from 'react-infinite-scroller';
import DefectListItemPlaceholder from './DefectListItemPlaceholder';

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

    return (
        <Grid centered>
            <Grid.Row id="filterRow">
                <DefectFilters />
            </Grid.Row>
            <Grid.Column width='16'>
                {defectStore.loadingInitial && !loadingNext ? (
                    <>
                        <DefectListItemPlaceholder />
                        <DefectListItemPlaceholder />
                    </>
                ) : (
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={handleGetNext}
                        hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
                        initialLoad={false}
                    >
                        <DefectList />
                    </InfiniteScroll>
                )}
            </Grid.Column>
            <Grid.Column width={16}>
                <Loader active={loadingNext} />
            </Grid.Column>
        </Grid>
    )
})