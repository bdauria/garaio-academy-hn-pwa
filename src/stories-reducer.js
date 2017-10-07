export const LOAD_STORIES = 'LOAD_STORIES';
export const LOAD_STORY = 'LOAD_STORY';

export const loadStories = (type, ids) => ({
  type: LOAD_STORIES,
  payload: { type: type, ids: ids }
});

export const loadStory = (type, id, item) => ({
  type: LOAD_STORY,
  payload: { type: type, id: id, item: item }
});

export const initialState = ['top', 'new', 'show', 'ask', 'job'].reduce(
  (state, type) => ({
    ...state,
    [type]: {
      ids: [],
      byId: {}
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
          ids: action.payload.ids
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
