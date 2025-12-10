import { Button } from './ui/button'

type Props = {
    isWorking: boolean,
    handleClick: () => void
}
const UploadButton = (
    {
        isWorking,
        handleClick
    }: Props
) => {
    return (
        <Button
            variant="ghost"
            onClick={handleClick}
        >
            Upload
        </Button>
    )
}

export default UploadButton
