import { ApiProperty } from "@nestjs/swagger";
import { TransactionResponseDto } from "./transaction-response.dto";

export class Pagination {

  PaginateResponse(data: any[], total: number, page: number, limit: number) {
    return {
      data,
      pagination: {
        page: Number(page),
        pageSize: Number(limit),
        totalRecords: total,
        pageCount: Math.ceil(total / limit),
        hasPreviousPage: page > 1,
        hasNextPage: page < Math.ceil(total / limit),
      },
    };
  }
}
export class PaginationResponse {
  @ApiProperty({ example: 1, description: 'Current page number' })
  page: number;

  @ApiProperty({ example: 10, description: 'Number of items per page' })
  pageSize: number;

  @ApiProperty({ example: 100, description: 'Total number of items' })
  totalRecords: number;

  @ApiProperty({ example: 100, description: 'Total number of pages' })
  pageCount: number;
  @ApiProperty({ example: false, description: 'if there is items in previous page' })
  hasPreviousPage: boolean;
  @ApiProperty({ example: true, description: 'if there is items in next page' })
  hasNextPage: boolean
}

export class PaginatedResponseDto<T> {
  @ApiProperty({ type: [TransactionResponseDto], description: 'List of items' })
  data: T[];

  @ApiProperty()
  pagination: PaginationResponse
}
