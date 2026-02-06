interface Props {
  children: React.ReactNode;
}

export default function Card({ children }: Props) {
  return <div className="rounded-3xl bg-white p-5 shadow-inner shadow-neutral-400">{children}</div>;
}
