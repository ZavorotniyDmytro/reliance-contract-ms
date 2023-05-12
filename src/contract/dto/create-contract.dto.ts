export class CreateContractDto {
	description: string;
	price: number;
	employer_id: number;
	worker_id: number[];
	validity_period: Date
}