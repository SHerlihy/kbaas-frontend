import UploadButton from '@/components/UploadButton';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'UploadButton',
  component: UploadButton,
  tags: ['autodocs'],
  args: { handleClick: fn() },
} satisfies Meta<typeof UploadButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Working: Story = {
    args: {
        isWorking: true,
    }
};

export const Ready: Story = {
    args: {
        isWorking: false,
    }
};
