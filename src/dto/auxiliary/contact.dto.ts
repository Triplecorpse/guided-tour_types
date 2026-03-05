import {IsString} from 'class-validator';
import {Sanitize} from '../../utils/sanitize.decorator';

export class ContactDto {
    @IsString()
    @Sanitize()
    topic: string;

    @IsString()
    @Sanitize()
    body: string;
}
