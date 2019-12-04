function isArtist(currentRound, currentUser) {
  if (!currentUser) return false;

  return currentRound.artist === currentUser.id;
}

function isOnDrawingTeam(currentRound, currentUser) {
  if (!currentUser) return false;

  return currentRound.team === currentUser.teamId;
}

function isOnTeam(currentRound, currentUser) {
  if (!currentUser) return false;

  return !!currentUser.teamId;
}

export default {
  isArtist,
  isOnDrawingTeam,
  isOnTeam
}
