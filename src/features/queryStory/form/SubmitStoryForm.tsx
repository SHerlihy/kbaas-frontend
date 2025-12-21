import { Updater, useForm } from '@tanstack/react-form'
import { z } from 'zod'
import Field from './Field'
import FormButtons from './FormButtons'
import { Textarea } from '@/components/ui/textarea'
import { useEffect, useState } from 'react'

const storySchema = z.object({
    story: z.string()
})

type FormDefaults = z.infer<typeof storySchema>
const formDefaults: FormDefaults = {
    story: ""
}

type Props = {
    defaultValues: FormDefaults,
    postMarkStory: (story: string) => Promise<{ error: string, response: string }>,
    handleFormActionReset: () => void,
    isResponseError: boolean,
}

function SubmitStoryForm({
    defaultValues = formDefaults,
    postMarkStory,
    handleFormActionReset,
    isResponseError,
}: Props) {

    const [story, setStory] = useState(defaultValues.story)

    const form = useForm({
        defaultValues,
        validators: {
            onChange: storySchema,
            onMount: storySchema,
        },
        onSubmit: async ({ value }) => {

            const { error, response } = await postMarkStory(value.story)

            if (error) { throw new Error(error) }

            setStory(response)

        },
    })

    const handleFormReset = () => {
        form.reset()
        handleFormActionReset()
    }

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                form.handleSubmit()
            }}
            onChange={(e) => {
                e.preventDefault()
                e.stopPropagation()

                if (isResponseError) {
                    handleFormActionReset()
                }
            }}
        >
            <form.Field
                name="story"
                children={(field) => (
                    <StoryField
                        field={field}
                        story={story}
                    />
                )}
            />
            <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) =>
                    <FormButtons
                        canSubmit={canSubmit}
                        isSubmitting={isSubmitting}
                        handleReset={handleFormReset}
                    />}
            />
        </form >
    )
}

function StoryField({
    field,
    story,
}: {
    field: any,
    story: string,
}) {

    useEffect(() => {
        field.setValue(story)
    }, [story])

    return (
        <Field
            errors={field.state.meta.errorMap.onChange}
        >
            <Textarea
                ref={(textarea) => {
                    if (textarea) {
                        textarea.style.height = "0px";
                        textarea.style.height = textarea.scrollHeight + "px";
                    }
                }}
                placeholder="Paste your story here :)"
                className={"h-full overflow-hidden"}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
            />
        </Field>
    )
}

export default SubmitStoryForm
