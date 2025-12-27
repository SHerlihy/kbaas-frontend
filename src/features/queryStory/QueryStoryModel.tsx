import {
    QueryClient,
    QueryClientProvider,
    useMutation,
} from '@tanstack/react-query'
import QueryStoryView, { HandleSubmit } from './QueryStoryView'
import { useEffect, useState } from 'react'
import { Phase } from '@/components/controlButton/ControlButton'

const queryClient = new QueryClient()

type Props = {
    postMarkStory: HandleSubmit,
    abortMarkStory: (reason?: any) => void
}

function QueryStoryModel({
    postMarkStory,
    abortMarkStory
}: Props) {
    const [feedback, setFeedback] = useState("submit")
    const [phase, setPhase] = useState<Phase>("ready")

    const { data, mutateAsync, isError, isPending, isSuccess } = useMutation({
        mutationFn: postMarkStory
    })

    const [marked, setMarked] = useState<string | null>(null)

    useEffect(() => {
        if (data) {
            setMarked(data)
        }
    }, [isSuccess])

    useEffect(() => {

        if (isSuccess) {
            setPhase("ready")
            setFeedback("submit")
            return
        }

        if (isError) {
            setPhase("error")
            setFeedback("retry?")
            return
        }

        if (isPending) {
            setPhase("uploading")
            setFeedback("cancel?")
            return
        }

    }, [isPending, isError, data])

    return (
        <QueryClientProvider client={queryClient}>
            <QueryStoryView
                marked={marked}
                handleQuery={mutateAsync}
                handleAbort={abortMarkStory}
                feedback={feedback}
                phase={phase}
                setPhase={setPhase}
            />
        </QueryClientProvider>
    )
}

export default QueryStoryModel
