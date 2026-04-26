export default function SubmitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-start justify-center bg-navy-50 px-4 py-12">
      <div className="w-full max-w-2xl">{children}</div>
    </div>
  );
}
