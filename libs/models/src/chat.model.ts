import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table, HasMany, BelongsToMany } from "sequelize-typescript";
import { Message } from "./message.model";
import { UserChat } from "./user-chat.model";
import { User } from "./user.model";


@Table({ tableName: 'chats' })
export class Chat extends Model<Chat>{

	@ApiProperty({ example: 1, description: "Chat ID" })
	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	public chat_id: number;

	@HasMany(()=>Message)
	messages: Message[]

	@BelongsToMany(()=>User, ()=>UserChat)
	users: User[]
}