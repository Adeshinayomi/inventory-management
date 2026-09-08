const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

export async function apiFetch(
  endpoint: string,
  options: RequestInit = {}
){
  const token = 
  typeof window !== "undefined"
  ? localStorage.getItem("token")
  :null
   
  console.log("Token:", token);
  console.log("Request URL:", `${API_URL}${endpoint}`);
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}