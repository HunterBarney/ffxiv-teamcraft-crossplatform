import { createFeatureSelector, createSelector } from '@ngrx/store';
import { listsAdapter, ListsState } from './lists.reducer';

const { selectAll } = listsAdapter.getSelectors();


// Lookup the 'Lists' feature state managed by NgRx
const getListsState = createFeatureSelector<ListsState>('lists');

const getListsLoading = createSelector(
  getListsState,
  (state: ListsState) => !state.listsConnected
);

const getConnectedTeams = createSelector(
  getListsState,
  (state: ListsState) => state.connectedTeams
);

const getNeedsVerification = createSelector(
  getListsState,
  (state: ListsState) => state.needsVerification
);

const getAutocompleteEnabled = createSelector(
  getListsState,
  (state: ListsState) => state.autocompletionEnabled
);

const getCompletionNotificationEnabled = createSelector(
  getListsState,
  (state: ListsState) => state.completionNotificationEnabled
);

const getShowArchived = createSelector(
  getListsState,
  (state: ListsState) => state.showArchived
);

const getAllListDetails = createSelector(
  getListsState,
  (state: ListsState) => {
    return selectAll(state.listDetails).filter(d => {
      return !state.deleted.includes(d.$key)
        && (state.showArchived || !d.archived);
    });
  }
);

const getAllListDetailsWithArchived = createSelector(
  getListsState,
  (state: ListsState) => {
    return selectAll(state.listDetails).filter(d => {
      return !state.deleted.includes(d.$key);
    });
  }
);

const getSelectedId = createSelector(
  getListsState,
  (state: ListsState) => state.selectedId
);

const getSelectedList = () => createSelector(
  getAllListDetailsWithArchived,
  getSelectedId,
  (lists, id) => {
    return lists.find(it => it.$key === id);
  }
);

const getPinnedListKey = () => createSelector(
  getListsState,
  (state) => {
    return state.pinned;
  }
);

export const listsQuery = {
  getAllListDetails,
  getSelectedList,
  getPinnedListKey,
  getNeedsVerification,
  getAutocompleteEnabled,
  getCompletionNotificationEnabled,
  getListsLoading,
  getConnectedTeams,
  getSelectedId,
  getShowArchived
};
