import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '@lib/models/user.model';
import { Contract } from '../../libs/models/src/contract.model';
import { ContractStatus } from './contractStatus.enum';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';

@Injectable()
export class ContractService {
	constructor(
		@InjectModel(Contract) private contractRepository: typeof Contract,
		@Inject('USER_SERVICE') private readonly userService,
		){}

	async create(createContractDto: CreateContractDto):Promise<Contract> {
				
		const workers = await this.userService.getUsersByIDs(createContractDto.worker_id)		

		delete createContractDto.worker_id

		const contract = await this.contractRepository.create({
			...createContractDto,
			status: ContractStatus.ACTIVE
		})	
		
		await contract.$set('workers', workers)
		
		return contract

	}

	async findAll():Promise<Contract[]> {
		return await this.contractRepository.findAll({include:{all:true}});
	}

	async findOne(id: number):Promise<Contract> {
		return await this.contractRepository.findOne({where:{id:id}, include:{all:true}});
	}

	async findByEmployerId(employer_id: number):Promise<Contract[]> {
		return await this.contractRepository.findAll({where:{employer_id:employer_id}, include:{all:true}});
	}

	async findByWorkerId(worker_id: number):Promise<Contract[]> {		
		return await this.contractRepository.findAll({
			include: [
				{all:true},
				{
					model: User,
					as: 'workers',
					attributes: ['name']
				}
			],
			where: {				
				'$workers.user_id$': worker_id
			}
	  });
	}

	async update(id: number, updateContractDto: UpdateContractDto) {
		const contract = await this.findOne(id);
		return await contract.update(updateContractDto);
	}

	async delete(id: number):Promise<void> {
		const contract = await this.findOne(id);
		await contract.destroy();
	}
}