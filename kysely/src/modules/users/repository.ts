import { type DB, type Users as User } from '../../types/database.js'
import { type Insertable, type Kysely, type Selectable, type Updateable } from 'kysely'

export type UserRow = User

interface Deps {
  db: Kysely<DB>
}

export class UsersRepository {
  private readonly db: Kysely<DB>

  constructor({ db }: Deps) {
    this.db = db
  }

  findById = async (id: number): Promise<Selectable<UserRow> | undefined> => {
    return this.db.selectFrom('users').selectAll().where('id', '=', id).executeTakeFirst()
  }

  list = async (limit = 100, offset = 0): Promise<Array<Selectable<UserRow>>> => {
    return this.db.selectFrom('users').selectAll().limit(limit).offset(offset).execute()
  }

  getByEmail = async (email: string): Promise<Selectable<UserRow> | undefined> => {
    return this.db.selectFrom('users').selectAll().where('email', '=', email).executeTakeFirst()
  }

  create = async (data: Insertable<UserRow>): Promise<Selectable<UserRow>> => {
    return this.db.insertInto('users').values(data).returningAll().executeTakeFirstOrThrow()
  }

  update = async (id: number, patch: Updateable<UserRow>): Promise<Selectable<UserRow>> => {
    return this.db
      .updateTable('users')
      .set(patch)
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow()
  }

  delete = async (id: number): Promise<void> => {
    await this.db.deleteFrom('users').where('id', '=', id).execute()
  }
}

// Construct with: new UsersRepository({ db })
