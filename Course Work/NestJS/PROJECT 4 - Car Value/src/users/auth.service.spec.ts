import { Test, TestingModule } from '@nestjs/testing';

import { BadRequestException, NotFoundException } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUserService: Partial<UsersService>;

  beforeEach(async () => {
    const users: User[] = [];

    // Create a fake copy of users service
    fakeUserService = {
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = {
          email,
          password,
          id: Math.floor(Math.random() * 999999),
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };

    // Create a new DI Container
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUserService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signup('asdf@asdf.com', 'mypassword');

    const [salt, hash] = user.password.split('.');

    expect(user.password).not.toEqual('mypassword');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user signs up with email that is in use', async () => {
    await service.signup('asdf@asdf.com', 'mypassword');

    await expect(service.signup('asdf@asdf.com', 'mypassword')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('throws an error if user signin with an unuser email', async () => {
    await expect(service.signin('asdf@asdf.com', 'mypassword')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('throws an error if invalid password', async () => {
    await service.signup('asdf@asdf.com', 'mypassword');

    await expect(service.signin('asdf@asdf.com', 'mypassword1')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('returns a user if correct password is provided', async () => {
    await service.signup('asdf@asdf.com', 'mypassword');
    const user = await service.signin('asdf@asdf.com', 'mypassword');

    expect(user).toBeDefined();
  });
});
