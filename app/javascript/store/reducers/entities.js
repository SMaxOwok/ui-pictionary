const initialState = {};

function mapEntities(state, entityOrEntities) {
  const entities = Array.isArray(entityOrEntities) ? entityOrEntities : [entityOrEntities];
  const out = { ...state };

  entities.forEach(entity => {
    if (!out[entity.type]) out[entity.type] = {};
    out[entity.type][entity.id] = entity;
  });

  return out;
}

const setEntity = (state, action) => {
  if (!action.payload) return state;
  const entity = action.payload;
  const out = { ...state };

  if (!out[entity.type]) out[entity.type] = {};
  out[entity.type] = entity;

  return out;
};

const setEntities = (state, action) => {
  if (!action.payload) return state;
  const data = mapEntities(state, action.payload);

  return Object.assign({}, state, data);
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ENTITY':
      return setEntity(state, action);
    case 'SET_ENTITIES':
      return setEntities(state, action);
    case 'FLUSH_ENTITIES':
      return initialState;
    default:
      return state;
  }
};
