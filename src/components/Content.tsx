interface Props {
  children: React.ReactNode;
}

export default function Content({ children }: Props) {
  return <div className="float-right w-full p-5 lg:w-[calc(100%-15rem)] lg:p-10">{children}</div>;
}
