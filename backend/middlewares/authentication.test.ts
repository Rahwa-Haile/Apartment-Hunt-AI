import { describe, test, expect, beforeEach, jest } from '@jest/globals';
import { authentication } from './authenticaton';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken', () => ({ verify: jest.fn() }));

const jwtVerify = jwt.verify as jest.Mock

let fakeRes: any;
let fakeNext: any;                          

beforeEach(() => {
    jest.clearAllMocks();
    fakeRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };
    fakeNext = jest.fn();
})

describe('tests for authentication middleware', ()=> {
    test('should set req.user and move to the next middleware if token is valid', ()=> {
        const fakeReq: any = {
            headers: {
                authorization: 'Bearer 123'
            }
        }
        const old = process.env.JWT_SECRET;
        process.env.JWT_SECRET = 's'
        jwtVerify.mockReturnValue({ userId: 1, email: 'rahwa@gmail.com'})
        authentication()(fakeReq, fakeRes, fakeNext)

        expect(fakeReq.user).toEqual({ userId: 1, email: 'rahwa@gmail.com' });
        expect(fakeNext).toHaveBeenCalled();
        process.env.JWT_SECRET = old;
    });
    test('should return 401 if authorization header is missing', ()=> {
    });
    test('should return 401 if authorization header doesnt start with Bearer', ()=> {
    });
    test('should return 500 if jwt token secret is not set', ()=> {
    });
    test('should return 401 if token is invalid or expired', ()=> {
    });
})