import { Card } from "@/components/ui/Card";
import type { Pkg } from "@/lib/content";
import { formatPackagePrice } from "@/lib/format";

export function PackageCards({ packages }: { packages: Pkg[] }) {
  return (
    <ul className="mt-8 grid gap-6 md:grid-cols-3">
      {packages.map((pkg) => (
        <Card as="li" key={pkg.id} className="flex flex-col gap-3 p-6">
          <h3 className="text-h3">{pkg.name}</h3>
          {pkg.description && <p className="text-ink-muted">{pkg.description}</p>}
          <p className="mt-auto pt-2 text-lead font-semibold">{formatPackagePrice(pkg)}</p>
        </Card>
      ))}
    </ul>
  );
}
