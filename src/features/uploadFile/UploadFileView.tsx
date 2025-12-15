import HasChangedValue from '@/components/HasChangedValue'
import UploadButton from '@/components/UploadButton'

import { Props as PropsValue } from '@/components/HasChangedValue'
import { Props as PropsUpload } from '@/components/UploadButton'
import { Card, CardAction, CardTitle } from '@/components/ui/card'

export type Shared = Omit<PropsValue, 'handleClick'> & Omit<PropsUpload, 'handleChange'>

export type Props = {
    title: string,
    value: string,
    hasChanged: boolean,
    isWorking: boolean,
    handleClickValue: PropsValue['handleClick']
    handleClickUpload: PropsUpload['handleChange']
}

const UploadFileView = (
    {
        title,
        value,
        hasChanged,
        isWorking,
        handleClickValue,
        handleClickUpload
    }: Props
) => {
    const shared: Shared = {
        value: value,
        hasChanged: hasChanged,
        isWorking: isWorking
    }

    return (
        <Card className='flex flex-row justify-center align-center'>
            <CardTitle>
                <p style={{ 'lineHeight': 2 }}>{title}:</p>
            </CardTitle>
            <UploadButton {...shared} handleChange={handleClickUpload} />
            <HasChangedValue {...shared} handleClick={handleClickValue} />
        </Card>
    )
}

export default UploadFileView
