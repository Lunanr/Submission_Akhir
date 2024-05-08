import { ActionType } from "./action";

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
    case ActionType.ADD_THREADS:
      // Digunakan untuk mengisi threads baru dari action payload yang diterima
      return [action.payload.threads, ...threads];
    case ActionType.RECEIVE_THREADS:
      return action.payload.threads;
    case ActionType.TOGGLE_UPVOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.includes(action.payload.userId)
            ? thread.upVotesBy.filter((id) => id !== action.payload.userId)
            : thread.upVotesBy.concat([action.payload.userId]),
          };
        }
        return threads;
      });
    case ActionType.TOGGLE_DOWNVOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            downVotesBy: thread.downVotesBy.includes(action.payload.userId)
            ? thread.downVotesBy.filter((id) => id !== action.payload.userId)
            : thread.downVotesBy.concat([action.payload.userId]),
          };
        }
        return threads;
      })
    case ActionType.TOGGLE_NEUTRALIZE_VOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.filter((id) => id !== action.payload.userId),
            downVotesBy: thread.downVotesBy.filter((id) => id !== action.payload.userId)
          };
        }
        return threads;
      })
  default:
    return threads;
  }
}

export default threadsReducer;