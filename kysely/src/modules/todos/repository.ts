import { type DB, type Todos as Todo } from '../../types/database.js'
import { type Insertable, type Kysely, type Selectable, type Updateable } from 'kysely'

export type TodoRow = Todo

interface Deps {
  db: Kysely<DB>
}

export class TodosRepository {
  private readonly db: Kysely<DB>

  constructor({ db }: Deps) {
    this.db = db
  }

  findById = async (id: number): Promise<Selectable<TodoRow> | undefined> => {
    return this.db.selectFrom('todos').selectAll().where('id', '=', id).executeTakeFirst()
  }

  listByUser = async (userId: number): Promise<Array<Selectable<TodoRow>>> => {
    return this.db.selectFrom('todos').selectAll().where('userId', '=', userId).execute()
  }

  list = async (limit = 100, offset = 0): Promise<Array<Selectable<TodoRow>>> => {
    return this.db.selectFrom('todos').selectAll().limit(limit).offset(offset).execute()
  }

  create = async (data: Insertable<TodoRow>): Promise<Selectable<TodoRow>> => {
    return this.db.insertInto('todos').values(data).returningAll().executeTakeFirstOrThrow()
  }

  toggleComplete = async (id: number, completed: boolean): Promise<Selectable<TodoRow>> => {
    return this.db
      .updateTable('todos')
      .set({ completed } as Updateable<TodoRow>)
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow()
  }

  update = async (id: number, patch: Updateable<TodoRow>): Promise<Selectable<TodoRow>> => {
    return this.db
      .updateTable('todos')
      .set(patch)
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow()
  }

  delete = async (id: number): Promise<void> => {
    await this.db.deleteFrom('todos').where('id', '=', id).execute()
  }
}

// Construct with: new TodosRepository({ db })
