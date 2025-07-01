import { Sidebar } from "@/components/Sidebar";
import { TableOfContentsWrapper } from "@/components/TableOfContentsWrapper";
import "../globals.css";
import { DocsPagination } from "@/components/DocsPagination";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <main className={`antialiased`}>
          <div className="relative flex min-h-screen flex-col">
            {/* Main content */}
            <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 max-w-7xl mx-auto">
              {/* Sidebar */}
              <Sidebar />

              {/* Main content area */}
              <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
                <div className="mx-auto w-full min-w-0 max-w-4xl">
                  {children}
                  <DocsPagination />
                </div>
                
                {/* Table of Contents */}
                <aside className="hidden xl:block">
                  <div className="sticky top-14 -mt-10 pt-6">
                    <div className="rounded-lg border bg-card p-4 shadow-sm">
                      <TableOfContentsWrapper />
                    </div>
                  </div>
                </aside>
              </main>
            </div>
          </div>
      </main>
  );
} 