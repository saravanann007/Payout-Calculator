import { Payout } from "./payout";

export interface Summary {
    total:number;
    equalShare:number;
    totalOwed: number;
    payouts:Payout[];
}