
interface TestingComponentProps {
    titleprops : string
}

export const BasicComponent: React.FC<TestingComponentProps> = ({ titleprops}) => {

    const title  = "Elo3"
    return (
        <>
            <div>{title}</div>
            <div>{titleprops}</div>
        </>

    )

}