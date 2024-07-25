export interface CardLockResponse {
  message: string;
  cardId: string;
}
export interface CardLockDto {
  cardId: string;
  lock: string;
}
