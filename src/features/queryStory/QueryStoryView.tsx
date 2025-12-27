import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import StoryField from './components/StoryField'
import ControlButton, { Props as PropsControlButton } from '@/components/controlButton/ControlButton'

const storySchema = z.object({
    story: z.string()
})

type FormSchema = z.infer<typeof storySchema>
export const formDefaults: FormSchema = {
    story: ""
}

export type HandleSubmit = (e: string) => Promise<string>

type Props = {
    defaultValues?: FormSchema,
    marked: string | null,
    handleQuery: HandleSubmit,
    handleAbort: (reason?: any) => void,
}
    & Omit<PropsControlButton, "onSubmit" | "onAbort">

function QueryStoryView({
    defaultValues = formDefaults,
    marked,
    phase,
    setPhase,
    feedback,
    handleQuery,
    handleAbort
}: Props) {

    const form = useForm({
        defaultValues,
        validators: {
            onChange: storySchema,
            onMount: storySchema,
        },
        onSubmit: async ({ value }) => { await handleQuery(value.story) }
    })

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
            }}
            onChange={(e) => {
                e.preventDefault()
                e.stopPropagation()
            }}
        >
            <form.Field
                name="story"
                children={(field) => (
                    <StoryField
                        field={field}
                        marked={marked}
                    />
                )}
            />
            <ControlButton
                phase={phase}
                setPhase={setPhase}
                feedback={feedback}
                onSubmit={form.handleSubmit}
                onAbort={handleAbort}
            />
        </form >
    )
}

export default QueryStoryView
