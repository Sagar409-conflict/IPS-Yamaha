import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RoleModule } from './index.entities';

@Entity('modules')
export class Module {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => RoleModule, (roleModule) => roleModule.module)
  roleModules: RoleModule[];
}
