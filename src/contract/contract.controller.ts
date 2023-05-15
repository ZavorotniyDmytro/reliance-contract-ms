import { Contract } from '@lib/models';
import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';

@Controller('contracts')
export class ContractController {
  	constructor(private readonly contractService: ContractService) {}

	@MessagePattern({cmd:'create-contract'})
	async create(@Payload() createContractDto: CreateContractDto, @Ctx() context: RmqContext):Promise<Contract> {
		const contract = this.contractService.create(createContractDto);
		this.actMessage(context)
		return contract
	}

	@MessagePattern({cmd:'find-all-contract'})
	async findAll(@Ctx() context: RmqContext):Promise<Contract[]> {
		const contracts = this.contractService.findAll();
		this.actMessage(context)
		return contracts
	}

	@MessagePattern({cmd:'find-one-contract'})
	async findOne(@Payload() id: number, @Ctx() context: RmqContext):Promise<Contract> {
		const contract = this.contractService.findOne(id);
		this.actMessage(context)
		return contract
	}

	@MessagePattern({cmd:'find-all-by-worker-contract'})
	async findAllByWorker(@Payload() id: number, @Ctx() context: RmqContext):Promise<Contract[]> {
		const contracts = this.contractService.findByWorkerId(id);
		this.actMessage(context)
		return contracts
	}

	@MessagePattern({cmd:'find-all-by-employer-contract'})
	async findAllByEmployer(@Payload() id: number, @Ctx() context: RmqContext):Promise<Contract[]> {
		const contracts = this.contractService.findByEmployerId(id);
		this.actMessage(context)
		return contracts
	}

	@MessagePattern({cmd:'update-contract'})
	async update(@Payload() updateContractDto: UpdateContractDto, @Ctx() context: RmqContext) {
		const contract =  this.contractService.update(updateContractDto.id, updateContractDto);
		this.actMessage(context)
		return contract
	}

	@MessagePattern({cmd:'remove-contract'})
	async delete(@Payload() id: number, @Ctx() context: RmqContext):Promise<void> {
		this.actMessage(context)
		return this.contractService.delete(id);
	}

	private actMessage(context: RmqContext){
		const channel = context.getChannelRef();
  		const originalMsg = context.getMessage();
  		channel.ack(originalMsg);
	}
}
