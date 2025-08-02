"use client"

import { usePathname } from "next/navigation"
import { DocsPagination } from "./DocsPagination"

export function DocsPaginationWrapper() {
  const pathname = usePathname()

  return <DocsPagination currentPath={pathname} />
}
