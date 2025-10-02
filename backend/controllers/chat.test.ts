import { jest, beforeEach, test, expect } from '@jest/globals'; // Import jest explicitly
import { connectDB } from '../db/connectDB';
import { createChat } from './chat';

jest.mock('../db/connectDB', () => ({
  connectDB: {
    query: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});
const mockedQuery = connectDB.query as jest.MockedFunction<
  typeof connectDB.query
>;

test('should return 201 if title and user are present', async () => {
  const fakeReq = {
    user: {
      userId: 1,
      name: 'Rahwa',
    },
    body: {
      title: 'test chat',
    },
  };

  const fakeRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  mockedQuery.mockResolvedValueOnce({} as any);
  await createChat(fakeReq as any, fakeRes as any);

  expect(mockedQuery).toHaveBeenCalledWith(
    expect.stringContaining(`INSERT INTO Chats`),
    [fakeReq.body.title, fakeReq.user.userId]
  );
  expect(fakeRes.status).toHaveBeenCalledWith(201);
  expect(fakeRes.json).toHaveBeenCalledWith({ msg: 'chat is saved' });
});

test('should return 401 if user is not present', async () => {
  const fakeReq = {
    body: {
      title: 'test chat',
    },
  };
  const fakeRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await createChat(fakeReq as any, fakeRes as any);

  expect(mockedQuery).not.toHaveBeenCalled()
  expect(fakeRes.status).toHaveBeenCalledWith(401);
  expect(fakeRes.json).toHaveBeenCalledWith({ msg: 'Unauthorized' });
});

test('should return 400 if title is empty or not present', async () => {
  const fakeReq = {
    user: {
      userId: 1,
      name: 'Rahwa',
    },
    body: {
      title: '',
    },
  };

  const fakeRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await createChat(fakeReq as any, fakeRes as any);

  expect(mockedQuery).not.toHaveBeenCalled()
  expect(fakeRes.status).toHaveBeenCalledWith(400);
  expect(fakeRes.json).toHaveBeenCalledWith({
    msg: 'title is required',
  });
});

test('should return 500 for internal db errors', async () => {
  const fakeReq = {
    user: {
      userId: 1,
      name: 'Rahwa',
    },
    body: {
      title: 'test chat',
    },
  };

  const fakeRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  mockedQuery.mockRejectedValueOnce(new Error('db error'));

  await createChat(fakeReq as any, fakeRes as any);

  expect(fakeRes.status).toHaveBeenCalledWith(500);
  expect(fakeRes.json).toHaveBeenCalledWith({ msg: 'db error' });
  expect(mockedQuery).toHaveBeenCalledWith(
    expect.stringContaining('INSERT INTO Chats'),
    [fakeReq.body.title, fakeReq.user.userId]
  );
});
