export const fetchLeaderboard = () => ({
  type: 'FETCH_LEADERBOARD'
});

export const fetchLeaderboardSuccess = (payload) => ({
  type: 'FETCH_LEADERBOARD_SUCCESS',
  payload
});

export default {
  fetchLeaderboard,
  fetchLeaderboardSuccess
}
