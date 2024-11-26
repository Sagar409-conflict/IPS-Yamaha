import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './users.entities';
import { RoleModule } from './role-module.entities';

@Entity('roles') 
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  role: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];

  @OneToMany(() => RoleModule, (roleModule) => roleModule.role)
  roleModules: RoleModule[];
}
