import ky from 'ky'

// jsonplaceholder client
export const jpClient = ky.create({
  prefixUrl: 'https://jsonplaceholder.typicode.com',
})
