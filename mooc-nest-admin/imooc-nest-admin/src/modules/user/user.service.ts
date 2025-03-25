import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  findAll(query: any): Promise<User[]> {
    console.log(query);
    let where = 'WHERE 1=1';
    if (query.id) {
      where += ` AND id='${query.id}'`;
    }
    if (query.username) {
      where += ` AND username='${query.username}'`;
    }
    if (query.active) {
      where += ` AND active='${query.active}'`;
    }
    let page = +query.page || 1;
    let pageSize = +query.pageSize || 20;
    if (page <= 0) {
      page = 1;
    }
    if (pageSize <= 0) {
      pageSize = 20;
    }
    const sql = `SELECT id, username, avatar, role, nickname, active FROM admin_user ${where} limit ${pageSize} offset ${(page - 1) * pageSize}`;
    return this.usersRepository.query(sql);
  }

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    user.nickname = createUserDto.nickname || createUserDto.username;
    user.role = createUserDto.role;
    user.avatar = createUserDto.avatar;
    user.active = 1;

    return this.usersRepository.save(user);
  }

  update(params) {
    // console.log(params);
    const { username, nickname, active, role } = params;
    const setSql = [];
    if (nickname) {
      setSql.push(`nickname="${nickname}"`);
    }
    if (active) {
      setSql.push(`active="${active}"`);
    }
    if (role) {
      setSql.push(`role=${JSON.stringify(role)}`);
    }
    const updateSql = `UPDATE admin_user SET ${setSql.join(',')} WHERE username="${username}"`;
    return this.usersRepository.query(updateSql);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
  }

  findByUsername(username: string): Promise<User> {
    return this.usersRepository.findOneBy({ username });
  }
}
