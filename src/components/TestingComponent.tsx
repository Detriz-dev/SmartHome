
interface TestingComponentProps {
    titleprops : string
}

export const TestingComponent: React.FC<TestingComponentProps> = ({ titleprops}) => {

    const title  = "Elo"
    return (
        <>
            <div>{title}</div>
            <div>{titleprops}</div>
        </>

    )

}