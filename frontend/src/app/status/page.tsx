import { getHealth } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function StatusPage() {
  let health;
  let error: string | null = null;

  try {
    health = await getHealth();
  } catch {
    error = "Could not reach the backend API.";
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-xl font-semibold">System Status</h1>
      {error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : (
        <dl className="text-sm text-neutral-600">
          <div>
            API: <span className="font-mono">{health?.status}</span>
          </div>
          <div>
            Database: <span className="font-mono">{health?.database}</span>
          </div>
        </dl>
      )}
    </main>
  );
}
