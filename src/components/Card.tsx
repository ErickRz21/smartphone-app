interface Props {
  children: React.ReactNode;
}

export default function Card({ children }: Props) {
  return <div className="bg-white p-5 rounded-3xl shadow-neutral-400 shadow-inner">{children}</div>;
}
