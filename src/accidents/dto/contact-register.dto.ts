import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterContactDto {

  @IsNotEmpty()
  @ApiProperty({
    description: 'name',
    example: 'Hussain',
  })
  name: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'new user email',
    minLength: 1,
    maxLength: 255,
    example: 'Hussain@guardlink.sa',
  })
  email: string;


  @IsNotEmpty()
  @ApiProperty({
    description: 'new user name',
    example: '97xxxxxxxx',
  })
  phoneNumber: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'new user password',
    example: 'Riyadh',
  })
  city: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'services',
    example: 'Other Service',
  })
  services: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Additional notes',
    example: 'XYZ',
  })
  notes: string;

  

}
