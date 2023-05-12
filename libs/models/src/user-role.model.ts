import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Role } from "./role.model";
import { User } from "./user.model";

@Table({ tableName: 'user_roles', createdAt: false, updatedAt: false})
export class UserRole extends Model<UserRole>{

	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	public id: number;

	@ForeignKey(()=>User)
	@Column({ type: DataType.INTEGER })
	public user_id: number;

	@ForeignKey(()=>Role)
	@Column({ type: DataType.INTEGER })
	public role_id: number;

}