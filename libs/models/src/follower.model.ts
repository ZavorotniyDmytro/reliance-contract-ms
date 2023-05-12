import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Announcement } from "./announcement.model";

import { User } from "./user.model";



@Table({ tableName: 'followers', createdAt: false, updatedAt: false })
export class Follower extends Model<Follower> {

	@ApiProperty({example: 14, description: "Follower ID"})
	@Column({type: DataType.INTEGER, primaryKey: true, unique: true, autoIncrement: true})
	follower_id: number

	@ForeignKey(()=>User)
   @ApiProperty({example: 2, description: "User ID"})
   @Column({type: DataType.INTEGER, allowNull: false})
   public user_id: number;

	@BelongsTo(()=>User, 'user_id')
	public user: User

	@ForeignKey(()=>Announcement)
   @ApiProperty({example: 14, description: "Announcement ID"})
   @Column({type: DataType.INTEGER, allowNull: false})
   public announcement_id: number;

	@BelongsTo(()=>Announcement, 'announcement_id')
	public announcement: Announcement
	
}