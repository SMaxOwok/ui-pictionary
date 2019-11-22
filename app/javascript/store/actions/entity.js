export const setEntity = (payload) => ({
  type: 'SET_ENTITY',
  payload
});

export const setEntities = (payload) => ({
  type: 'SET_ENTITIES',
  payload
});

export const flush = () => ({
  type: 'FLUSH_ENTITIES'
});


export default {
  setEntity,
  setEntities,
  flush
}
