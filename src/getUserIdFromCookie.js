export default function getUserIdFromCookie(){
  if (document.cookie) {
    const splitCookieVal = document.cookie.split(' ');
    // const usernameStartPos = splitCookieVal[0].indexOf('=') + 1;
    // const usernameEndPos = splitCookieVal[0].indexOf(';');
    // const loggedInUsername = splitCookieVal[0].substring(usernameStartPos, usernameEndPos);
    
    const userIdStartPos = splitCookieVal[0].indexOf('=') + 1;
    const userIdEndPos = splitCookieVal[0].indexOf(';');
    const loggedInUserId = splitCookieVal[0].substring(userIdStartPos,userIdEndPos);
    
    return Number(loggedInUserId);
  }
  return null;
};
