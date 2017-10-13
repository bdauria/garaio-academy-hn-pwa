export const LOAD_STORIES = 'LOAD_STORIES';
export const LOAD_STORY = 'LOAD_STORY';

export const loadStories = (type, page, items) => ({
  type: LOAD_STORIES,
  payload: { type: type, page: page, items: items }
});

export const loadStory = (type, id, item) => ({
  type: LOAD_STORY,
  payload: { type: type, id: id, item: item }
});

export const initialState = ['news', 'newest', 'show', 'ask', 'jobs'].reduce(
  (state, type) => ({
    ...state,
    [type]: {
      byPage: {}
    }
  }),
  {}
);

export const stories = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_STORIES:
      return {
        ...state,
        [action.payload.type]: {
          ...state[action.payload.type],
          byPage: {
            ...state[action.payload.type].byPage,
            [action.payload.page]: action.payload.items
          }
        }
      };
    case LOAD_STORY:
      return {
        ...state,
        [action.payload.type]: {
          ...state[action.payload.type],
          byId: {
            ...state[action.payload.type].byId,
            [action.payload.id]: action.payload.item
          }
        }
      };
    default:
      return state;
  }
};
