import { useMutation, useQuery } from '@tanstack/react-query'
import { ChangeEvent, useEffect, useState } from 'react'
import UploadFileView from './UploadFileView'

export type GetString = () => Promise<string>
export type HandleFileUpload = (e: ChangeEvent<HTMLInputElement>) => Promise<void>

export const FEEDBACK_PENDING = "Pending..."
export const FEEDBACK_ERROR = "Error"

const UploadFileModel = ({
    title,
    getInitFeedback,
    postFile
}: {
    title: string,
    getInitFeedback: GetString,
    postFile: HandleFileUpload
}) => {
    const [isInit, setIsInit] = useState(true)
    const [feedback, setFeedback] = useState("")

    async function handleMutation(e?: ChangeEvent<HTMLInputElement>) {

        if (isInit) {
            return await getInitFeedback()
        }

        if (!e) {
            throw new Error("No event: handleMutation")
        }

        return await postFile(e)

    }

    const { isPending, isSuccess, isError, data, mutate } = useMutation({
        mutationFn: handleMutation,
        retry: false
    })

    useEffect(() => {

        mutate(undefined)

    }, [])

    useEffect(() => {

        if (isPending) {
            setFeedback(FEEDBACK_PENDING)
        }

        if (isError) {
            setFeedback(FEEDBACK_ERROR)
        }

        if (data) {
            setFeedback(data)
        }

    }, [isPending, isError, data])


    // const firstUpload = (e: ChangeEvent<HTMLInputElement>) => {
    //     // setNoUpload(true)
    //     mutate(e)
    // }
    //
    // if (noUpload) {
    return (
        <>
            <UploadFileView
                title={title}
                value={feedback}
                hasChanged={false}
                isWorking={false}
                handleClickValue={() => { }}
                // handleChangeUpload={firstUpload}
                handleChangeUpload={(e) => { setIsInit(false), mutate(e) }}
            />
        </>
    )
    // }

    useEffect(() => {
        if (isPending) {
            setFeedback(FEEDBACK_PENDING)
        }

        if (isError) {
            setFeedback(FEEDBACK_ERROR)
        }

        if (data) {
            setFeedback(data)
        }
    }, [isPending, isError, data])

    const handleClickValue = () => { }

    return <UploadFileView
        title={title}
        value={feedback}
        hasChanged={isSuccess}
        isWorking={isPending}
        handleClickValue={handleClickValue}
        handleChangeUpload={mutate}
    />
}

export default UploadFileModel;
