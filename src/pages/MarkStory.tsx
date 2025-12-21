import ParameterInput from '@/components/ParameterInput'
import StoryBox from '@/components/StoryBox'
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
            <StoryBox
                story=''
            />
        </>
    )
}

export default MarkStory
