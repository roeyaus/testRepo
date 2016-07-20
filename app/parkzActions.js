/*
 * action types
 */

export const SET_CURRENT_USER = 'SET_CURRENT_USER'

/*
 * action creators
 */

export function setCurrentUser(user) {
  return { type: SET_CURRENT_USER, user }
}
