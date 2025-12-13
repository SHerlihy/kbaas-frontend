import UploadFile, {Props as FileProps} from '@/features/uploadFile/UploadFile'

type Props = {
    phrases: Omit<FileProps, 'title'>
    story: Omit<FileProps, 'title'>
}

const UploadControls = (props: Props) => {
  return (
    <section>
        <UploadFile title="Phrases" {...props.phrases}/>
        <UploadFile title="Story" {...props.story}/>
    </section>
  )
}

export default UploadControls
