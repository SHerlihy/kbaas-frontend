import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import Field from './Field'
import FormButtons from './FormButtons'
import { Textarea } from '@/components/ui/textarea'

const BASE_URL = "https://pokeapi.co/api/v2/berry/"

const storySchema = z.object({
    story: z.string()
})

type FormDefaults = z.infer<typeof storySchema>
const formDefaults: FormDefaults = {
    story: ""
}

function SubmitStoryForm({
    defaultValues = formDefaults,
    handleFormActionReset,
    isResponseError,
}: {
    defaultValues: FormDefaults,
    handleFormActionReset: () => void,
    isResponseError: boolean,
}) {
    const form = useForm({
        defaultValues,
        validators: {
            onChange: storySchema,
            onMount: storySchema,
        },
        onSubmit: async ({ value }) => {
            const url = `${BASE_URL}`
            //return await postMarkStory(url, value)
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

export default SubmitStoryForm
