import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterServicesDto {

  @IsNotEmpty()
  @ApiProperty({
    description: 'title',
    example: 'GuardLink Force',
  })
  title: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'title',
    example: 'GuardLink Force Description',
  })
  description: string;

}
