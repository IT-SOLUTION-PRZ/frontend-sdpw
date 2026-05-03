export const hasStaffSuperuserAccess = (user) => Boolean(user?.is_staff && user?.is_superuser)
