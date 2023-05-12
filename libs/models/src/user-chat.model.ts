import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Chat } from "./chat.model";
import { User } from "./user.model";

@Table({ tableName: 'chat_users', createdAt: false, updatedAt: false})
export class UserChat extends Model<UserChat>{

	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	public id: number;

	@ForeignKey(()=>User)
	@Column({ type: DataType.INTEGER })
	public user_id: number;

	@ForeignKey(()=>Chat)
	@Column({ type: DataType.INTEGER })
	public chat_id: number;

}