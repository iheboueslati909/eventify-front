export enum Role {
  USER = 'ROLE_USER',
  ADMIN = 'ROLE_ADMIN'
}

export const RolePermissions = {
  [Role.USER]: [
    'CREATE_EVENTS',
    'CREATE_TICKETS',
    'PURCHASE_TICKETS',
    'FOLLOW_ENTITIES',
    'MANAGE_PROFILE'
  ],
  [Role.ADMIN]: [
    'CREATE_EVENTS',
    'CREATE_TICKETS',
    'PURCHASE_TICKETS',
    'FOLLOW_ENTITIES',
    'MANAGE_PROFILE',
    'MANAGE_USERS',
    'MANAGE_ALL_EVENTS',
    'VIEW_ANALYTICS'
  ]
} as const;