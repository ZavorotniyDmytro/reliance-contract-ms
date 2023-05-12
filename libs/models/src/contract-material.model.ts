import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Contract } from "./contract.model";
import { Material } from "./material.model";

@Table({ tableName: 'contract_materials', createdAt: false, updatedAt: false})
export class ContractMaterial extends Model<ContractMaterial>{

	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	public id: number;

	@ForeignKey(()=>Contract)
	@Column({ type: DataType.INTEGER })
	public contract_id: number;

	@ForeignKey(()=>Material)
	@Column({ type: DataType.INTEGER })
	public material_id: number;
	
	@Column
	count: number
}