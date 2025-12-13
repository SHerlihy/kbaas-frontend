import { Props } from '@/features/uploadFile/UploadFile';
import UploadControls from '@/pages/markDocs/UploadControls';
import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'UploadControls',
    component: UploadControls,
    tags: ['autodocs'],
} satisfies Meta<typeof UploadControls>;

export default meta;
type Story = StoryObj<typeof meta>;

const uploadState: Omit<Props, 'title'> = {
    shared: {
        value: "example-feedback",
        isWorking: false,
        hasChanged: false
    },
    handleClickValue: ()=>{},
    handleClickUpload: ()=>{}
}

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const init: Story = {
    args: {
        story: uploadState,
        phrases: uploadState
    }
};
