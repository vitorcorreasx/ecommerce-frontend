import { useQuery, useMutation } from 'villus';

export async function runQuery(query, variables){
  const {data} = await useQuery({
    query,
    tags: ['query'],
    variables
  });
  return data;
}

export async function runMutation(query, variables){
  const { execute } = useMutation(query, {
    refetchTags: ['query']
  });
  await execute({
    variables
  });
}