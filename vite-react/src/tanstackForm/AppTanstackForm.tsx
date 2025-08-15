import { useForm } from '@tanstack/react-form'

export const AppTanstackForm = () => {
  const { Field } = useForm({
    defaultValues: {
      login: '',
      password: '',
    },
  })
  return (
    <div>
      <Field name="login">
        {(field) => (
          <>
            <label htmlFor={field.name}>Age:</label>
            <input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </>
        )}
      </Field>
    </div>
  )
}
