import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </>
  );
}
