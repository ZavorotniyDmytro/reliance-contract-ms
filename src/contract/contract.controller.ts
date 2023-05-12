import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';

@Controller('contracts')
export class ContractController {
  	constructor(private readonly contractService: ContractService) {}

	@MessagePattern({cmd:'create-contract'})
	create(@Payload() createContractDto: CreateContractDto) {
		return this.contractService.create(createContractDto);
	}

	@MessagePattern({cmd:'find-all-contract'})
	findAll() {
		return this.contractService.findAll();
	}

	@MessagePattern({cmd:'find-one-contract'})
	findOne(@Payload() id: number) {
		return this.contractService.findOne(id);
	}

	@MessagePattern({cmd:'find-all-by-worker-contract'})
	findAllByWorker(@Payload() id: number) {
		return this.contractService.findByWorkerId(id);
	}

	@MessagePattern({cmd:'find-all-by-employer-contract'})
	findAllByEmployer(@Payload() id: number) {
		return this.contractService.findByEmployerId(id);
	}

	@MessagePattern({cmd:'update-contract'})
	update(@Payload() updateContractDto: UpdateContractDto) {
		return this.contractService.update(updateContractDto.id, updateContractDto);
	}

	@MessagePattern({cmd:'remove-contract'})
	delete(@Payload() id: number) {
		return this.contractService.delete(id);
	}
}
