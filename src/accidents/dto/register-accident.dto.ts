import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterAccidentDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Date of the accident',
    example: '2022-12-31T14:30:00.000Z',
  })
  date: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Location of the accident',
    example: '123 Street, City, Country',
  })
  location: string;
  
  @IsNotEmpty()
  @ApiProperty({
    description: 'Details about the accident',
    example: 'Car collision at the intersection...',
  })
  details: string;
}
