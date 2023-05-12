import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';

@Controller()
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @MessagePattern('createContract')
  create(@Payload() createContractDto: CreateContractDto) {
    return this.contractService.create(createContractDto);
  }

  @MessagePattern('findAllContract')
  findAll() {
    return this.contractService.findAll();
  }

  @MessagePattern('findOneContract')
  findOne(@Payload() id: number) {
    return this.contractService.findOne(id);
  }

  @MessagePattern('updateContract')
  update(@Payload() updateContractDto: UpdateContractDto) {
    return this.contractService.update(updateContractDto.id, updateContractDto);
  }

  @MessagePattern('removeContract')
  remove(@Payload() id: number) {
    return this.contractService.remove(id);
  }
}
