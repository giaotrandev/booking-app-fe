export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum RoleRequest {
  USER = 'USER',
  ADMIN = 'ADMIN',
}
export enum PermissionCodeRequest {
  USER_UPDATE_SELF = 'USER_UPDATE_SELF',
  BOOKING_READ_SELF = 'BOOKING_READ_SELF',
  BOOKING_CREATE = 'BOOKING_CREATE',
  USER_READ_SELF = 'USER_READ_SELF',
}
export interface PermissionItemProps {
  code: PermissionCodeRequest;
  name?: string;
}

export interface UserRoleProps {
  name: RoleRequest;
  permissions?: PermissionItemProps[];
}

export interface InformationProfileRequestProps {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  birthday?: string;
  gender: Gender;
  address?: string;
  role?: UserRoleProps;
  avatarUrl?: string;
}
