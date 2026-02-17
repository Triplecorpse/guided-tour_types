import { ResourceDto } from "../resource/resource.dto";
import { TranslationDto } from "../translation/translation.dto";
export declare class AppSettingsDto {
    title?: string;
    subtitle?: string;
    banner_resources?: ResourceDto[];
    collection_resources?: ResourceDto[];
    about_site?: TranslationDto[] | TranslationDto;
}
