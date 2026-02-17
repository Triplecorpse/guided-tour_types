import { TranslationDto } from "../translation/translation.dto";
export declare class ResourceDto {
    id?: number;
    title?: string;
    description?: string;
    file_size?: number;
    file_type?: string;
    is_wallpaper?: boolean;
    is_published?: boolean;
    is_public?: boolean;
    url?: string;
    preview_url?: string;
    translations?: TranslationDto[];
    created_at?: string;
    updated_at?: string;
    url_signed_until?: string;
}
