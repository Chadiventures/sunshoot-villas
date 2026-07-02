import type { Metadata } from "next";
import AdminCmsRequestResetForm from "@/components/admin-cms/AdminCmsRequestResetForm";
import AdminCmsResetPasswordForm from "@/components/admin-cms/AdminCmsResetPasswordForm";
import { siteName } from "@/lib/adminPath";

export const metadata: Metadata = {
  title: `Reset password | ${siteName()}`,
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<{ token?: string }>;
};

export default async function AdminResetPage({ searchParams }: Props) {
  const { token } = await searchParams;

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-[var(--bg)] px-4 py-16">
      <div className="w-full max-w-md">
        {token ? (
          <AdminCmsResetPasswordForm initialToken={token} />
        ) : (
          <AdminCmsRequestResetForm />
        )}
      </div>
    </div>
  );
}
