import { UserDto } from "./user.dto";
import { PermissionType } from "../../enum/PermissionType";
export declare class CheckUserResponseDto {
    isAuthenticated: boolean;
    user?: UserDto;
    permissions?: PermissionType[];
    deviceKey?: string;
}
