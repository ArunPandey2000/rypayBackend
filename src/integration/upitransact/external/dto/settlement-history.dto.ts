import { ApiProperty } from '@nestjs/swagger';

export class SettlementHistoryDTO {
  @ApiProperty({ example: '2025-03-14' })
  date: string;

  @ApiProperty({ example: 10 })
  totalAmountSettled: number;

  @ApiProperty({example: 'SUCCESS'})
  status: string

  @ApiProperty({example: '25031610PSNFP002751'})
  bankReferenceNumber: string

  @ApiProperty({example: 'YESBN12025031605334037'})
  UTR: string
}

export class MergedDataResponseDTO {
  @ApiProperty({ example: 11, description: 'Total amount collected today' })
  todayTotalCollection: number;

  @ApiProperty({ example: 11, description: 'Total amount settled today that will be available tomorrow' })
  todayTotalSettlementForTomorrow: number;

  @ApiProperty({ type: [SettlementHistoryDTO], description: 'Settlement history grouped by date' })
  settlementHistory: SettlementHistoryDTO[];
}
