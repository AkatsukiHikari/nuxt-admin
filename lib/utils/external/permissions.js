/*
 * @Author: Hikari
 * @Date: 2020-03-30 14:22:24
 * @LastEditTime: 2021-04-17 18:19:30
 * @LastEditors: Please set LastEditors
 * @Description: 权限认证
 * @FilePath: /sso-service/lib/external/permissons.js
 */

export const permissionCheck = (roles, permissions, acl) => {
  const permissionsArray = Array.isArray(permissions)
    ? permissions
    : [permissions]
  return roles.some((role) => {
    return permissionsArray.some((p) => {
      return acl[role] && acl[role].permissions.includes(p)
    })
  })
}

export const check = (store, permissions) => {
  const user_permission = store.getters['user/permissions'];
  return checkPermissions(user_permission, permissions)
}

export const checkPermissions = ( userPermissons, permissions , condition='some' )=>{
if(!userPermissons) return false;
const permissionsArray = Array.isArray(permissions)
    ? permissions
    : [permissions]


if(condition == 'some'){
  return permissionsArray.some((p)=>{
    let result = userPermissons.includes( p )
    return result;
  })
}else{
  return permissionsArray.every((p) => {
    return userPermissons.includes( p )
  })
}
}
