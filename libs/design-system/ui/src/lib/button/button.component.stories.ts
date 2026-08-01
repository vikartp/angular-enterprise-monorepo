import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ButtonComponent, ButtonVariant, ButtonSize } from './button.component';

const meta: Meta<ButtonComponent> = {
  title: 'Design System/Atoms/Button',
  component: ButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [ButtonComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger'] satisfies ButtonVariant[],
      description: 'Visual style variant of the button',
      table: { defaultValue: { summary: 'primary' } },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'] satisfies ButtonSize[],
      description: 'Size of the button',
      table: { defaultValue: { summary: 'md' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
      table: { defaultValue: { summary: 'false' } },
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button shows a loading spinner',
      table: { defaultValue: { summary: 'false' } },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the button takes full container width',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    fullWidth: false,
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

// ═══════════════════════════════════════════════════════
// 🎨 Primary Variants
// ═══════════════════════════════════════════════════════

export const Primary: Story = {
  render: (args) => ({
    props: args,
    template: `<ds-button [variant]="variant" [size]="size" [disabled]="disabled" [loading]="loading">Primary Action</ds-button>`,
  }),
};

export const Secondary: Story = {
  args: { variant: 'secondary' },
  render: (args) => ({
    props: args,
    template: `<ds-button [variant]="variant" [size]="size">Secondary Action</ds-button>`,
  }),
};

export const Outline: Story = {
  args: { variant: 'outline' },
  render: (args) => ({
    props: args,
    template: `<ds-button [variant]="variant" [size]="size">Outline Action</ds-button>`,
  }),
};

export const Ghost: Story = {
  args: { variant: 'ghost' },
  render: (args) => ({
    props: args,
    template: `<ds-button [variant]="variant" [size]="size">Ghost Action</ds-button>`,
  }),
};

export const Danger: Story = {
  args: { variant: 'danger' },
  render: (args) => ({
    props: args,
    template: `<ds-button [variant]="variant" [size]="size">Delete Item</ds-button>`,
  }),
};

// ═══════════════════════════════════════════════════════
// 📐 Size Variants
// ═══════════════════════════════════════════════════════

export const Small: Story = {
  args: { size: 'sm' },
  render: (args) => ({
    props: args,
    template: `<ds-button [variant]="variant" [size]="size">Small Button</ds-button>`,
  }),
};

export const Large: Story = {
  args: { size: 'lg' },
  render: (args) => ({
    props: args,
    template: `<ds-button [variant]="variant" [size]="size">Large Button</ds-button>`,
  }),
};

// ═══════════════════════════════════════════════════════
// ⚡ State Variants
// ═══════════════════════════════════════════════════════

export const Loading: Story = {
  args: { loading: true },
  render: (args) => ({
    props: args,
    template: `<ds-button [variant]="variant" [size]="size" [loading]="loading">Saving...</ds-button>`,
  }),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => ({
    props: args,
    template: `<ds-button [variant]="variant" [size]="size" [disabled]="disabled">Disabled</ds-button>`,
  }),
};

export const FullWidth: Story = {
  args: { fullWidth: true },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 400px; padding: 16px; border: 1px dashed #cbd5e1; border-radius: 8px;">
        <ds-button [variant]="variant" [size]="size" [fullWidth]="fullWidth">Full Width Button</ds-button>
      </div>
    `,
  }),
};

// ═══════════════════════════════════════════════════════
// 🖼️ Showcase: All Variants
// ═══════════════════════════════════════════════════════

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; padding: 32px; font-family: Inter, system-ui, sans-serif;">

        <h3 style="margin: 0; color: #334155; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em;">
          Color Variants
        </h3>
        <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
          <ds-button variant="primary">Primary</ds-button>
          <ds-button variant="secondary">Secondary</ds-button>
          <ds-button variant="outline">Outline</ds-button>
          <ds-button variant="ghost">Ghost</ds-button>
          <ds-button variant="danger">Danger</ds-button>
        </div>

        <h3 style="margin: 0; color: #334155; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em;">
          Sizes
        </h3>
        <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
          <ds-button variant="primary" size="sm">Small</ds-button>
          <ds-button variant="primary" size="md">Medium</ds-button>
          <ds-button variant="primary" size="lg">Large</ds-button>
        </div>

        <h3 style="margin: 0; color: #334155; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em;">
          States
        </h3>
        <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
          <ds-button variant="primary" [loading]="true">Loading</ds-button>
          <ds-button variant="primary" [disabled]="true">Disabled</ds-button>
          <ds-button variant="outline" [disabled]="true">Disabled Outline</ds-button>
        </div>

      </div>
    `,
  }),
};
