import { API, graphqlOperation } from 'aws-amplify'

import { GetTodoQuery, GetTodoListQuery } from '../../src/API'
import { getTodo, getTodoList } from '../../src/graphql/queries'
import config from '../../src/aws-exports'

API.configure(config)

const TodoPage = (props: { todo: GetTodoQuery['getTodo'] }) => {
  return (
    <div>
      <h2>Individual Todo {props.todo.id}</h2>
      <pre>{JSON.stringify(props.todo, null, 2)}</pre>
    </div>
  )
}

export const getStaticPaths = async () => {
  let result = (await API.graphql(
    graphqlOperation(getTodoList, { id: 'global' })
  )) as { data: GetTodoListQuery; errors: any[] }
  if (result.errors) {
    console.error('Failed to fetch todo.', result.errors)
    throw new Error(result.errors[0].message)
  }
  const paths = result.data.getTodoList.todos.items.map(({ id }) => ({
    params: { id },
  }))
  return { paths, fallback: false }
}

export const getStaticProps = async ({ params: { id } }) => {
  const todo = (await API.graphql({
    ...graphqlOperation(getTodo),
    variables: { id },
  })) as { data: GetTodoQuery; errors: any[] }
  if (todo.errors) {
    console.error(todo.errors)
    throw new Error(todo.errors[0].message)
  }
  return {
    props: {
      todo: todo.data.getTodo,
    },
  }
}

export default TodoPage
