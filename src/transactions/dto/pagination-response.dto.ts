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