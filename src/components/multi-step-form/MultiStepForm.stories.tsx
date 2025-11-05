import type { Meta, StoryObj } from "@storybook/react-vite";
import { MultiStepForm } from "./MultiStepForm";
import "@progress/kendo-theme-bootstrap/dist/all.css";
import "../../global.css";

const meta = {
  title: "Components/MultiStepForm",
  component: MultiStepForm,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A multi-step form for requesting a SeriousERP demo. Includes contact details, current software information, final details, and a review step.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MultiStepForm>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view of the MultiStepForm component.
 * The form starts at step 1 (Contact Details) with all fields empty.
 */
export const Default: Story = {
  render: () => (
    <div
      style={{
        padding: "2rem",
        backgroundColor: "#f9fafb",
      }}
    >
      <div
        style={{
          maxWidth: "56rem",
          margin: "0 auto",
          backgroundColor: "white",
          borderRadius: "0.5rem",
          padding: "2rem",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
        }}
      >
        <MultiStepForm />
      </div>
    </div>
  ),
};

/**
 * MultiStepForm with a clean white background.
 * Useful for viewing the form without the wrapper styling.
 */
export const WithoutWrapper: Story = {
  render: () => <MultiStepForm />,
};

/**
 * MultiStepForm in a compact container.
 * Shows how the form adapts to smaller spaces.
 */
export const Compact: Story = {
  render: () => (
    <div
      style={{
        padding: "1rem",
        backgroundColor: "#f9fafb",
      }}
    >
      <div
        style={{
          maxWidth: "40rem",
          margin: "0 auto",
          backgroundColor: "white",
          borderRadius: "0.5rem",
          padding: "1.5rem",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        }}
      >
        <MultiStepForm />
      </div>
    </div>
  ),
};

/**
 * MultiStepForm in a dark theme container.
 * Demonstrates the form's appearance against a darker background.
 */
export const DarkBackground: Story = {
  render: () => (
    <div
      style={{
        padding: "2rem",
        backgroundColor: "#1f2937",
      }}
    >
      <div
        style={{
          maxWidth: "56rem",
          margin: "0 auto",
          backgroundColor: "white",
          borderRadius: "0.5rem",
          padding: "2rem",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)",
        }}
      >
        <MultiStepForm />
      </div>
    </div>
  ),
};
