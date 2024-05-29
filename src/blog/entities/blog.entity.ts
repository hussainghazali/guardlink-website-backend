import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToOne,
  } from 'typeorm';
  import { File } from 'src/files/entites/file.entity';
  
  @Entity('blog')
  export class Blog {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    title: string;
  
    @Column()
    description: string;

    @JoinColumn({ name: 'fileId' })
    @OneToOne(() => File, {
      nullable: true,
    })
    file?: File;
    @Column({ nullable: true })
    fileId?: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  