import { Button } from './ui/button'

export type Props = {
    feedback: string,
    isPending: boolean
}

const ConfirmFeedbackButton = ({
    feedback,
    isPending,
    ...props
}: React.ComponentProps<"button"> & Props) => {
    return (
        <Button
            disabled={isPending}
            {...props}
        >
            <p>{feedback}</p>
        </Button>
    )
}

export default ConfirmFeedbackButton
