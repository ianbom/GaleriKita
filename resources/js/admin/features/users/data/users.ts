import { z } from 'zod';
import { userSchema } from './schema';
import data from './users.json';

export const users = z.array(userSchema).parse(data);
