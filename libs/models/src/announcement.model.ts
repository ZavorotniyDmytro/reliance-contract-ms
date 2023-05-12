import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { Follower } from "./follower.model";

import { User } from "./user.model";


@Table({ tableName: 'announcements' })
export class Announcement extends Model<Announcement> {

	@ApiProperty({ example: 13, description: "Announcement ID" })
	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	public announcement_id: number;

	@ForeignKey(()=>User)
   @ApiProperty({example: 2, description: "User ID"})
   @Column({type: DataType.INTEGER, allowNull: false})
   public user_id: number;
	@BelongsTo(()=>User, 'user_id')
	public user: User

	@ApiProperty({example: "My Announcement", description: "Announcement title"})
   @Column({type: DataType.STRING, allowNull: false})
   public title: string;

	@ApiProperty({example: "Some announcement content", description: "Announcement content"})
   @Column({type: DataType.STRING, allowNull: false})
   public content: string;

	@HasMany(()=>Follower)
	followers: Follower[]
}