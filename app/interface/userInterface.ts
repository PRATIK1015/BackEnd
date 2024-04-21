export default interface UserInfo {
	email: string;
	username: string;
	password: string;
	role: "ADMIN" | "USER";
}

// export interface UpdateUserInfo {
// 	firstName?: string;
// 	lastName?: string;
// 	phone?: string;
// 	companyId: string;
// 	roleId?: string;
// 	userId: string;
// 	status?: boolean;
// 	isChangeStatus?: boolean;
// }


// export interface RequestUserInterface {
// 	id: string,
// 	email: string,
// 	companyId: string,
// }