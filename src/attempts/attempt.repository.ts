import { EntityRepository, Repository } from 'typeorm';
import { Attempt } from './attempt.entity';

@EntityRepository(Attempt)
export class AttemptRepository extends Repository<Attempt> {}
