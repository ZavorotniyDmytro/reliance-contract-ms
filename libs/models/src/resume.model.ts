import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "./user.model";

interface ResumeCreationAttrs {
		phone: string;
		experience: string;
}

@Table({ tableName: 'resumes', createdAt: false, updatedAt: false })
export class Resume extends Model<Resume, ResumeCreationAttrs>{

	@ApiProperty({example: 1, description: "ResumeID"})
   @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
   public resume_id: number;

   @ApiProperty({example: 1, description: "UserID", })
	@ForeignKey(()=>User)
   @Column({type: DataType.INTEGER, unique: true})
   public user_id: number;
    
	@BelongsTo(()=>User)
	user: User

	@ForeignKey(()=>User)
   @ApiProperty({example: "IvanVanilla", description: "Name of the user"})
   @Column({type: DataType.STRING, allowNull: false })
   public name: string;

	@ForeignKey(()=>User)
   @ApiProperty({example: "ivanvanilla@example.com", description: "The email of the user"})
   @Column({type: DataType.STRING, allowNull: false })
   public email: string;

	@ForeignKey(()=>User)
   @ApiProperty({example: "+380999999999", description: "The phone number of the user"})
   @Column({type: DataType.STRING, allowNull: false })
   public phone: string;

   @ApiProperty({example: "1 year of programming in Nodejs.", description: "Experiance of the user"})
   @Column({type: DataType.STRING })
   public experience: string;
	
}