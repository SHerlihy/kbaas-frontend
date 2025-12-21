import ParameterInput from '@/components/ParameterInput'
import UploadFileModel from '@/features/uploadFile/UploadFileModel'

const MarkStory = () => {
    return (
        <>
            <ParameterInput />
            <UploadFileModel
                title="Phrases"
                getInitFeedback={() => Promise.resolve("init")}
                postFile={(e) => Promise.resolve("upload")}
            />
        </>
    )
}

export default MarkStory
