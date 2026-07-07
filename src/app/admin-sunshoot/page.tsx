import type { Metadata } from "next";
import AdminCmsLoginForm from "@/components/admin-cms/AdminCmsLoginForm";
import { siteName } from "@/lib/adminPath";

export const metadata: Metadata = {
  title: `Admin | ${siteName()}`,
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-[var(--bg)] px-4 py-16">
      <div className="w-full max-w-md">
        <AdminCmsLoginForm />
      </div>
    </div>
  );
}
