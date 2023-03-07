import Link from "next/link";

export default function NavigationIcon({ children, href }) {
  return (
    <Link href={href} passHref>
      <p className="cursor-pointer">{children}</p>
    </Link>
  );
}
