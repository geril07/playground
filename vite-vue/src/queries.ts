import { queryOptions } from '@tanstack/vue-query'

export const usersQueryOptions = () =>
  queryOptions({
    queryKey: ['users'],
    queryFn: () => Promise.resolve(1),
  })
