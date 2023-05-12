import { Contract } from '@lib/models';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';

@Controller('contracts')
export class ContractController {
  	constructor(private readonly contractService: ContractService) {}

	@MessagePattern({cmd:'create-contract'})
	async create(@Payload() createContractDto: CreateContractDto):Promise<Contract> {
		return this.contractService.create(createContractDto);
	}

	@MessagePattern({cmd:'find-all-contract'})
	async findAll():Promise<Contract[]> {
		return this.contractService.findAll();
	}

	@MessagePattern({cmd:'find-one-contract'})
	async findOne(@Payload() id: number):Promise<Contract> {
		return this.contractService.findOne(id);
	}

	@MessagePattern({cmd:'find-all-by-worker-contract'})
	async findAllByWorker(@Payload() id: number):Promise<Contract[]> {
		return this.contractService.findByWorkerId(id);
	}

	@MessagePattern({cmd:'find-all-by-employer-contract'})
	async findAllByEmployer(@Payload() id: number):Promise<Contract[]> {
		return this.contractService.findByEmployerId(id);
	}

	@MessagePattern({cmd:'update-contract'})
	async update(@Payload() updateContractDto: UpdateContractDto) {
		return this.contractService.update(updateContractDto.id, updateContractDto);
	}

	@MessagePattern({cmd:'remove-contract'})
	async delete(@Payload() id: number):Promise<void> {
		return this.contractService.delete(id);
	}
}
