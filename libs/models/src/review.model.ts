import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Contract } from "./contract.model";
import { User } from "./user.model";

interface ReviewCreationAttrs {
   rating: number;
	user_id: number;
	contract_id: number;
	text: string;
}

@Table({ tableName: 'reviews' })
export class Review extends Model<Review, ReviewCreationAttrs>{

	@ApiProperty({example: 1, description: "Review ID"})
   @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
   public review_id: number;
	
	@ApiProperty({example:2 , description: "Reviewer ID"})
	@ForeignKey(()=>User)
	@Column({type: DataType.INTEGER, allowNull: false})
	public reviewer_id: number

	@BelongsTo(()=>User, 'reviewer_id')
	public reviewer: User

	@ApiProperty({example:2 , description: "User ID"})
	@ForeignKey(()=>User)
	@Column({type: DataType.INTEGER, allowNull: false})
	public user_id: number

	@BelongsTo(()=>User, 'user_id')
	public user: User

	@ApiProperty({example:14 , description: "Contract ID"})
	@ForeignKey(()=>Contract)
	@Column({type: DataType.INTEGER, allowNull: false})
	public contract_id: number

	@BelongsTo(()=>Contract, 'contract_id')
	public contract: Contract

	@ApiProperty({example: 4.7, description: "Review rating 0.0 to 5.0"})
   @Column({type: DataType.DECIMAL(3, 1), allowNull: true })
   public rating: number;

	@ApiProperty({example: "Good work", description: "Review text"})
   @Column({type: DataType.STRING, allowNull: true })
   public text: string;
}

