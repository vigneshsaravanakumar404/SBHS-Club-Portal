interface PageTitleProps {
    title: string;
    size?: number;
}

export default function PageTitle(props: PageTitleProps) {
    return <h1>{props.title}</h1>;
}
