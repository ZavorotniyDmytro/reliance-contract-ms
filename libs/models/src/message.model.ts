//TODO: add to database module

import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Chat } from "./chat.model";
import { User } from "./user.model";

interface MessageCreationAttrs {
  	text: string;
}

@Table({ tableName: 'messages', updatedAt: false })
export class Message extends Model<Message, MessageCreationAttrs>{

	@ApiProperty({example: 0, description: "MessagesID"})
   @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
   id:number;

	@ApiProperty({example: 1, description: "SenderID"})
	@ForeignKey(() => User)
	@Column({type: DataType.INTEGER, allowNull: false})
	sender_id: number;

	@BelongsTo(() => User, 'sender_id')
	sender: User;

	@ApiProperty({example: 1, description: "ChatID"})
	@ForeignKey(() => Chat)
	@Column({type: DataType.INTEGER, allowNull: false})
	chat_id: number;

	@BelongsTo(() => User, 'chat_id')
	chat: Chat;	
}