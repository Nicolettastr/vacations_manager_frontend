import { PlaneTakeoff } from "lucide-react";
import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return <PlaneTakeoff className="h-8 w-8 text-primary" {...props} />;
}
