interface User {
  id: number;
  username: string;
  email: string;
  createdAt: string;
}

export default async function Home() {
  
  // 1. Fetch the data from your running Express server
  const res = await fetch('http://127.0.0.1:3000/api/users', {cache: 'no-store'})
  
  // 2. Convert the response to JSON
  const users: User[] = await res.json();

  return (
    <main className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Registered Users</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      
        {users.map((user) => (
          // 3. Added some Tailwind styling to make them look like cards!
          <div key={user.id} className="border border-gray-200 p-4 rounded-xl shadow-sm bg-white">
            <p className="font-semibold text-lg text-gray-900">{user.username}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        ))}
      </div>
    </main>
  );
}