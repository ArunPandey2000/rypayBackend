export declare class Pagination {
    PaginateResponse(data: any[], total: number, page: number, limit: number): {
        data: any[];
        pagination: {
            page: number;
            pageSize: number;
            totalRecords: number;
            pageCount: number;
            hasPreviousPage: boolean;
            hasNextPage: boolean;
        };
    };
}
export declare class PaginationResponse {
    page: number;
    pageSize: number;
    totalRecords: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}
export declare class PaginatedResponseDto<T> {
    data: T[];
    pagination: PaginationResponse;
}
