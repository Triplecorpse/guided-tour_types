export declare class PriceDto {
    id: number;
    amount: number;
    currency: string;
    interval?: "month" | "year";
    stripe_price_id?: string | null;
    is_active: boolean;
    created_at?: string;
    updated_at?: string;
}
