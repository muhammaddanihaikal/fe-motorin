export const verifyRoleId = (requiredRoleId) => {
  const roleId = localStorage.getItem("roleId");
  return roleId == requiredRoleId;
};
