export const LOAD_STORIES = 'LOAD_STORIES';
export const LOAD_STORY = 'LOAD_STORY';
export const FLUSH_STORIES = 'FLUSH_STORIES';

export const loadStories = (type, page, items) => ({
  type: LOAD_STORIES,
  payload: { type: type, page: page, items: items }
});

export const flushStories = type => ({
  type: FLUSH_STORIES,
  payload: { type: type }
});

export const initialState = ['news', 'newest', 'show', 'ask', 'jobs'].reduce(
  (state, type) => ({
    ...state,
    [type]: {
      byPage: { [1]: [] }
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
    case FLUSH_STORIES:
      return {
        ...state,
        [action.payload.type]: {
          ...state[action.payload.type],
          byPage: { [1]: [] }
        }
      };
    default:
      return state;
  }
};
