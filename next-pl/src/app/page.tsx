import Image from 'next/image'
import { jpClient } from '../lib/ky/jpClient'
import ky from 'ky'
import { Suspense } from 'react'

export default async function Home() {
  return (
    <div className="">
      <div>asd</div>

      <Suspense fallback={'Loading....'}>
        <Todo />
      </Suspense>
    </div>
  )
}

const Todo = async () => {
  const todo = await new Promise((res) => setTimeout(res, 5000)).then(() =>
    jpClient.get('todos/1').json(),
  )

  return <div>{JSON.stringify(todo)}</div>
}
