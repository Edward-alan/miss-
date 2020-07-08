let _user = null;


function init(){
  let user = sessionStorage.get('user');
  if(!user){
    _user = user;
  }
}

function isLogin(){
  return _user != null || _user != undefined;
}

function getUser(){
  return _user;
}

function setUser(user) {
  sessionStorage.setItem('user', user);
  _user = user
}

export default {
  init,
  isLogin,
  getUser,
  setUser
}