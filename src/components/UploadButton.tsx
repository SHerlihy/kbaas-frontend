import { Input } from './ui/input'
import { HandleFileUpload } from '@/features/uploadFile/UploadFileModel'

export const LABEL_TEXT = "Upload file input"

export type Props = {
    isWorking: boolean,
    handleChange: HandleFileUpload
}
const UploadButton = (
    {
        isWorking,
        handleChange
    }: Props
) => {
    return (
        <>
            <Input
                type='file'
                aria-label={LABEL_TEXT}
                disabled={isWorking ? true : false}
                onChange={handleChange}
            />
        </>
    )
}

export default UploadButton
