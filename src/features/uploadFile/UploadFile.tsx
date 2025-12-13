import HasChangedValue from '@/components/HasChangedValue'
import UploadButton from '@/components/UploadButton'

import { Props as PropsValue } from '@/components/HasChangedValue'
import { Props as PropsUpload } from '@/components/UploadButton'
import { Card, CardAction, CardTitle } from '@/components/ui/card'

type Shared = Omit<PropsValue, 'handleClick'> & Omit<PropsUpload, 'handleClick'>

export type Props = {
    shared: Shared,
    title: string,
    handleClickValue: PropsValue['handleClick']
    handleClickUpload: PropsUpload['handleClick']
}

const UploadFile = (props: Props) => {
    const {
        shared,
        title,
        handleClickValue,
        handleClickUpload
    } = props

    return (
        <Card className='flex flex-row justify-center align-center'>
            <CardTitle>
                <p style={{'lineHeight': 2}}>{title}:</p>
            </CardTitle>
            <CardAction>
                <HasChangedValue {...shared} handleClick={handleClickValue} />
                <UploadButton {...shared} handleClick={handleClickUpload} />
            </CardAction>
        </Card>
    )
}

export default UploadFile
