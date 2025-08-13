import { queryOptions } from '@tanstack/react-query'

export const asdQueryOptions = () =>
  queryOptions({
    queryKey: ['asd'],
    queryFn: () => Promise.resolve(1),
  })
