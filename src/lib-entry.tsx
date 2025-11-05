import React from 'react';
import ReactDOM from 'react-dom/client';
import MultiStepForm from './components/multi-step-form/MultiStepForm';
import './global.css';

// Export the component for direct import
export { MultiStepForm };

// Global mount function for use in .NET MVC/Razor views
(window as any).SeriousERPForm = {
  mount: (elementId: string, props = {}) => {
    const container = document.getElementById(elementId);
    if (!container) {
      console.error(`Element with id "${elementId}" not found`);
      return null;
    }

    const root = ReactDOM.createRoot(container);
    root.render(
      <React.StrictMode>
        <MultiStepForm {...props} />
      </React.StrictMode>
    );

    return root;
  },

  unmount: (root: ReactDOM.Root) => {
    if (root) {
      root.unmount();
    }
  }
};

// Auto-mount if data-serious-erp-form attribute is found
document.addEventListener('DOMContentLoaded', () => {
  const autoMountElements = document.querySelectorAll('[data-serious-erp-form]');
  autoMountElements.forEach((element) => {
    if (element.id) {
      (window as any).SeriousERPForm.mount(element.id);
    }
  });
});
