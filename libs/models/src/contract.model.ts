import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasOne, Model, Table } from "sequelize-typescript";
import { ContractStatus } from "../enums/contractStatus.enum";
import { ContractMaterial } from "./contract-material.model";
import { Material } from "./material.model";
import { Review } from "./review.model";
import { User } from "./user.model";
import { Worker } from './worker.model';

interface ContractCreationAttrs {
    price:number;
	 discription: string;
	 employer_id: number;
	 worker_id: number;
	 status: ContractStatus;
}

@Table({ tableName: 'contracts', updatedAt: false })
export class Contract extends Model<Contract>{

	@ApiProperty({example: 1, description: "Contact ID"})
   @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
   public id: number;

   @ApiProperty({example: "Some contract. Rules: ...", description: "Contact discription", })
   @Column({type: DataType.STRING, allowNull: false})
   public description: string;
    
   @ApiProperty({example: 400, description: "Contract price"})
   @Column({type: DataType.INTEGER })
   public price: number;

   @ApiProperty({example: 15, description: "Employer user ID"})
	@ForeignKey(()=>User)
   @Column({type: DataType.INTEGER })
   public employer_id: number;

	@BelongsTo(() => User, 'employer_id')
	employer: User
	
	@BelongsToMany(() => User, ()=> Worker)
	workers: User[]

   @ApiProperty({example: Date.now(), description: "Contract validity period"})
   @Column({type: DataType.DATE})
   public validity_period: Date;

   @ApiProperty({example: "active", description: "Contract status"})
   @Column({type: DataType.STRING(9), allowNull: false})
   public status: ContractStatus;

	@HasOne(()=>Review)
	review: Review

	@BelongsToMany(()=>Material, ()=> ContractMaterial)
	materials: Material[]
}

