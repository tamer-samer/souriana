import Link from "next/link";

export function Logo() {
  return (
    <div className="flex items-center">
      <Link href={"/"} className="w-full">
        <h1 className="text-xl font-bold text-primary text-center w-full">
          سوريانا التعليمية
        </h1>
      </Link>
    </div>
  );
}
