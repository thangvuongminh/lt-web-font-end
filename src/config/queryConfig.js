export const QUERY_KEY = {
  getAllCategory: () => ["category"],
  oauth2Google: () => ["authorizationCodeGoogle"],
  getContent: () => ["getContents"],
  getAllCarts: () => ["getAllCarts"],
  getAvatar: () => ["getAvatar"],
  getProfile: () => ["profile"],
  getNickname: (nickname) => ["nickname", nickname],
  getContentDetail: (id) => ["content", id],
  getBlockDetail: (contentId, blockId) => ["block", contentId, blockId],
  // get all content by creator
  getAllContentByCreator: () => ["allContentByCreator"],
  // get comfirm payment
  getPaymentConfirm: (params) => ["payment-confirm", params],
  // wallet
  getWalletUser: (userId) => ["getWalletUser", userId],
  // withdraw
  getMyWithdraw: (page) => ["withdrawal-my-requests", page],
};
