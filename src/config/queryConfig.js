export const QUERY_KEY = {
  getAllCategory: () => ["category"],
  oauth2Google: () => ["authorizationCodeGoogle"],
  getContent: () => ["getContents"],
  getAllCarts: () => ["getAllCarts"],
  getAvatar: () => ["getAvatar"],
  getProfile: () => ["profile"],
  getNickname: (nickname) => ["nickname", nickname],
  getContentDetail: (id) => ["content", id],
  // get all content by creator
  getAllContentByCreator: () => ["allContentByCreator"],
};
