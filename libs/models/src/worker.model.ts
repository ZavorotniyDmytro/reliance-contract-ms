import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Contract } from "./contract.model";
import { User } from "./user.model";

@Table({ tableName: 'workers', createdAt: false, updatedAt: false})
export class Worker extends Model<Worker>{

	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	public id: number;

	@ForeignKey(()=>User)
	@Column({ type: DataType.INTEGER })
	public user_id: number;

	@ForeignKey(()=>Contract)
	@Column({ type: DataType.INTEGER })
	public contract_id: number;

}