import ParamInput from '@/features/paramInput/ParamInput'
import ParamStore from '@/features/paramInput/ParamStore'
import UploadFileControls from '@/features/uploadFile/UploadFileControls'
import UploadFileModel from '@/features/uploadFile/UploadFileModel'

// import QueryStoryControl from '@/features/queryStory/QueryStoryControl'
// import QueryStoryModel from '@/features/queryStory/QueryStoryModel'
// import { catchError } from '@/lib/async'

const BUCKET_URL = "https://1jp6i56akb.execute-api.eu-west-2.amazonaws.com/main/docs20251230081756234200000001/"

const { setParam, getParam } = new ParamStore()

const getKey = () => {
    return getParam("key")
}

const { loadFile, uploadFile, abortFileUpload, getFilename } = new UploadFileControls(BUCKET_URL, getKey)

// const POST_QUERY_URL = ""
// const { postQuery, demarshall, abortQuery } = new QueryStoryControl(POST_QUERY_URL, getKey)

const MarkStory = () => {

    // const handlePostMarkStory = async (story: string) => {
    //     const [error, response] = await catchError(postQuery(story))
    //
    //     if (error) {
    //         throw error
    //     }
    //
    //     return await demarshall(response)
    // }

    return (
        <>
            <ParamInput title={"key"} setParam={setParam} />
            <UploadFileModel
                title="Phrases"
                getInitFeedback={getFilename}
                loadFile={loadFile}
                uploadFile={uploadFile}
                abortUpload={abortFileUpload}
            />
        </>
    )

}

            // <QueryStoryModel
            //     postMarkStory={handlePostMarkStory}
            //     abortMarkStory={abortQuery}
            // />
export default MarkStory
