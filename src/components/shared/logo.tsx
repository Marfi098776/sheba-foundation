import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Canadian Sheba Foundation home"
      className={cn(
        "group inline-flex shrink-0 items-center rounded-sm transition-opacity hover:opacity-90",
        className
      )}
    >
      <Image
        src="/images/Untitled design (1).png"
        alt="Canadian Sheba Foundation"
        width={1867}
        height={412}
        priority
        className="h-14 w-auto object-contain sm:h-16 rounded-md"
      />
    </Link>
  );
}