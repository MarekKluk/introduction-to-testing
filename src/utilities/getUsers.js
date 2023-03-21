export async function getUsers() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!response.ok) {
    throw new Error('Something went wrong when fetching users');
  }
  return response.json();
}
