import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Bootcamp {
  @PrimaryGeneratedColumn("increment")
  id: string;

  @Column()
  userId: string;

  @Column({ unique: true })
  name: string;

  @Column("text")
  description: string;

  @Column({ nullable: true })
  website?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  email?: string;

  @Column()
  address: string;

  @Column("simple-array")
  careers: string[];

  @Column({ default: false })
  housing: boolean;

  @Column({ default: false })
  jobAssistance: boolean;

  @Column({ default: false })
  jobGuarantee: boolean;

  @Column({ default: false })
  acceptGi: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
