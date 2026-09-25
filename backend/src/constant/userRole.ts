export const UserRole = {
    ADMIN: 'ADMIN', // Administrator who can manage the inventory system
    USER: 'USER' // Normal user with standard access to the system
} as const; 

export const UserStatus = {
    PENDING: 'PENDING', // Account is waiting to be activated
    ACTIVE: 'ACTIVE', // Account is active and can use the system
    BLOCK: 'BLOCK' // Account is blocked from accessing the system
} as const;  

export type TUserRole = 'ADMIN' | 'USER';  // Allowed user roles in the inventory system
export type TUserStatus = 'PENDING' | 'ACTIVE' | 'BLOCK'; // Allowed account statuses