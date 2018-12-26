const getters = {
  status: state => state.user.status,
  token: state => state.user.token,
  roles: state => state.user.roles,
  code: state => state.user.code
};
export default getters;
