import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className=''>
      <h3>Welcome Home1!</h3>
    </div>
  )
}
