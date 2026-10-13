import { z } from 'zod';
import { taskSchema } from './schema';
import data from './tasks.json';

export const tasks = z.array(taskSchema).parse(data);
