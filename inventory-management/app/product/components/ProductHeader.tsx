import Link from "next/link";
export function ProductHeader() {
  return (
    <div className="flex items-center justify-between mb-4">
        <div className="grid gap-2">
           <h1 className="text-2xl font-bold">Product Management</h1>
            <p className="text-muted-foreground text-sm">
                Here is the current status of your product items.
            </p>
        </div>

        <Link href="/product/add" className="rounded-md bg-primary px-4 py-2 text-sm text-white hover:bg-primary-hover transition-colors"
        >
            Add Product
        </Link>
    </div>
  );
}