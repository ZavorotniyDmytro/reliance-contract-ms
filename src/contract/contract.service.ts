import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '@lib/models/user.model';
import { Contract } from '../../libs/models/src/contract.model';
import { ContractStatus } from './contractStatus.enum';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ContractService {
	constructor(
		@InjectModel(Contract) private contractRepository: typeof Contract,
		@Inject('MAIN_SERVICE') private mainService: ClientProxy,
		){}

	
	async create(createContractDto: CreateContractDto):Promise<Contract> {		
		let users: User[] = []
		const ids: number[] = createContractDto.worker_id
		
		delete createContractDto.worker_id
		const contract = await this.contractRepository.create({
			...createContractDto,
			status: ContractStatus.ACTIVE
		})
		const myObserver = {
			next: (u: User) => {console.log('Observer got a new value'); users.push(new User(u))
			},
			error: (err: Error) => console.error('Observer got an error: ' + err),
			complete: () => { console.log(JSON.stringify(users));
			 	contract.$set('workers', users) },
		};
		const users$ = this.mainService.send<User, number[]>({cmd:'get-users-by-id'}, ids)
		users$.subscribe(myObserver)
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