import Button from "./Button";

export default function ButtonGroup({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>;
}

ButtonGroup.Button = Button;
