import UploadFile from '@/features/uploadFile/UploadFile';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'UploadFile',
    component: UploadFile,
    tags: ['autodocs'],
    args: {
        handleClickValue: fn(),
        handleClickUpload: fn()
    },
} satisfies Meta<typeof UploadFile>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Value: Story = {
    args: {
        shared: {
            value: "datetime",
            isWorking: false,
            hasChanged: false
        }
    }
};

export const Working: Story = {
    args: {
        shared: {
            value: "datetime",
            isWorking: true,
            hasChanged: false
        }
    }
};

export const Changed: Story = {
    args: {
        shared: {
            value: "datetime",
            isWorking: false,
            hasChanged: true
        }
    }
};
