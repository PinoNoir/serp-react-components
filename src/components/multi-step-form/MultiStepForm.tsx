import { useState } from "react";
import type { FormData } from "./types";
import { Stepper } from "@progress/kendo-react-layout";
import {
  Input,
  MaskedTextBox,
  TextArea,
  Checkbox,
  RadioGroup,
  Slider,
} from "@progress/kendo-react-inputs";
import { DropDownList, MultiSelect } from "@progress/kendo-react-dropdowns";
import { Button } from "@progress/kendo-react-buttons";
import { Label } from "@progress/kendo-react-labels";
import { Notification, NotificationGroup } from "@progress/kendo-react-notification";
import styles from "./MultiStepForm.module.css";

const steps = [
  { label: "Contact Info", icon: "k-i-user" },
  { label: "Current Software", icon: "k-i-clipboard" },
  { label: "Business Info", icon: "k-i-file" },
];

const yesNoOptions = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];

const techsDriversOptions = [
  "1-5",
  "6-10",
  "11-50",
  "50+",
];

const patientCensusOptions = [
  "1-500",
  "501-1000",
  "1001-2000",
  "2000+",
];

const dmeSoftwareOptions = [
  "MedFlow Pro",
  "CareTech Solutions",
  "HealthStream DME",
  "QuickMed Manager",
  "EasyScript DME",
  "ProCare Systems",
  "MediTrack Plus",
  "CarePoint DME",
  "FlexMed Solutions",
  "Other",
];

export const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    phoneNumber: "",
    companyName: "",
    jobTitle: "",
    firstName: "",
    lastName: "",
    workEmail: "",
    consent: false,
    dmeSoftware: [],
    painPoints: "",
    csrCount: 0,
    billerCount: 0,
    dispatcherCount: 0,
    warehouseCount: 0,
    equipmentLossValue: 0,
    additionalComments: "",
    rentEquipment: "",
    billFacilities: "",
    billInsurance: "",
    techsDrivers: "",
    patientCensus: "",
  });
  const [errors, setErrors] = useState({
    consent: false,
    rentEquipment: false,
    billFacilities: false,
    billInsurance: false,
  });
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error" | "warning" | "info";
  }>({
    show: false,
    message: "",
    type: "success",
  });

  const handleInputChange = (
    field: keyof FormData,
    value: string | boolean | number | null
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user makes a change
    if (field in errors) {
      setErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 0: // Contact Details
        return Boolean(
          formData.firstName.trim() &&
          formData.lastName.trim() &&
          formData.workEmail.trim() &&
          formData.phoneNumber.trim() &&
          formData.companyName.trim() &&
          formData.jobTitle.trim() &&
          formData.consent
        );
      case 1: // Current Software
        return Boolean(
          formData.dmeSoftware.length > 0 &&
          formData.painPoints.trim()
        );
      case 2: // Final Details
        return Boolean(
          formData.rentEquipment &&
          formData.billFacilities &&
          formData.billInsurance
        );
      default:
        return false;
    }
  };

  const handleNext = () => {
    // Validate all fields for the current step
    if (!isStepValid(currentStep)) {
      // Show inline error messages for the current step
      if (currentStep === 0) {
        setErrors((prev) => ({ ...prev, consent: !formData.consent }));
      } else if (currentStep === 2) {
        setErrors({
          ...errors,
          rentEquipment: !formData.rentEquipment,
          billFacilities: !formData.billFacilities,
          billInsurance: !formData.billInsurance,
        });
      }
      return;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      // Mock API call - replace with actual endpoint
      await fetch("/api/demo/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Simulate API response for now
      // Remove this setTimeout and use actual response when backend is ready
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock success response
      const result = { success: true, message: "Demo request submitted successfully!" };

      if (result.success) {
        setNotification({
          show: true,
          message: result.message,
          type: "success",
        });

        // Optionally reset form or redirect
        console.log("Form submitted:", formData);
      } else {
        setNotification({
          show: true,
          message: result.message || "Submission failed. Please try again.",
          type: "error",
        });
      }
    } catch (error) {
      setNotification({
        show: true,
        message: "Network error. Please try again later.",
        type: "error",
      });
      console.error("Submission error:", error);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className={styles.formFieldGroup}>
            <div className={styles.formGrid}>
              <div>
                <Label>First Name</Label>
                <Input
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.value)}
                  style={{ width: "100%" }}
                />
              </div>
              <div>
                <Label>Last Name</Label>
                <Input
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.value)}
                  style={{ width: "100%" }}
                />
              </div>
            </div>
            <div>
              <Label>Valid work email</Label>
              <Input
                type="email"
                value={formData.workEmail}
                onChange={(e) => handleInputChange("workEmail", e.value)}
                style={{ width: "100%" }}
              />
            </div>
            <div>
              <Label>Direct Phone Number</Label>
              <MaskedTextBox
                mask="(000) 000-0000"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange("phoneNumber", e.value)}
                style={{ width: "100%" }}
              />
            </div>
            <div>
              <Label>Company Name</Label>
              <Input
                value={formData.companyName}
                onChange={(e) => handleInputChange("companyName", e.value)}
                style={{ width: "100%" }}
              />
            </div>
            <div>
              <Label>Job Title</Label>
              <Input
                value={formData.jobTitle}
                onChange={(e) => handleInputChange("jobTitle", e.value)}
                style={{ width: "100%" }}
              />
            </div>
            <div>
              <Checkbox
                checked={formData.consent}
                onChange={(e) => handleInputChange("consent", e.value)}
                label="I agree to allow Serious ERP to store and process my personal data according to its terms"
              />
              {errors.consent && (
                <div className={styles.errorMessage}>
                  Please agree to the terms to continue.
                </div>
              )}
            </div>
          </div>
        );

      case 1:
        return (
          <div className={styles.formFieldGroup}>
            <div>
              <Label>What DME software are you using?</Label>
              <MultiSelect
                data={dmeSoftwareOptions}
                value={formData.dmeSoftware}
                onChange={(e) => handleInputChange("dmeSoftware", e.value)}
                placeholder="Select one or more DME software"
                style={{ width: "100%" }}
              />
            </div>
            <div>
              <Label>How many CSRs? ({formData.csrCount})</Label>
              <Slider
                value={formData.csrCount}
                onChange={(e) => handleInputChange("csrCount", e.value)}
                min={0}
                max={50}
                step={1}
                style={{ width: "100%" }}
              />
            </div>
            <div>
              <Label>How many Billers? ({formData.billerCount})</Label>
              <Slider
                value={formData.billerCount}
                onChange={(e) => handleInputChange("billerCount", e.value)}
                min={0}
                max={30}
                step={1}
                style={{ width: "100%" }}
              />
            </div>
            <div>
              <Label>How many Dispatchers? ({formData.dispatcherCount})</Label>
              <Slider
                value={formData.dispatcherCount}
                onChange={(e) => handleInputChange("dispatcherCount", e.value)}
                min={0}
                max={20}
                step={1}
                style={{ width: "100%" }}
              />
            </div>
            <div>
              <Label>How many Warehouses? ({formData.warehouseCount})</Label>
              <Slider
                value={formData.warehouseCount}
                onChange={(e) => handleInputChange("warehouseCount", e.value)}
                min={0}
                max={10}
                step={1}
                style={{ width: "100%" }}
              />
            </div>
            <div>
              <Label>What is estimated lost equipment value loss per month? (${formData.equipmentLossValue.toLocaleString()})</Label>
              <Slider
                value={formData.equipmentLossValue}
                onChange={(e) => handleInputChange("equipmentLossValue", e.value)}
                min={0}
                max={50000}
                step={500}
                style={{ width: "100%" }}
              />
            </div>
            <div>
              <Label>
                What pain points are you looking for Serious ERP to address?
              </Label>
              <TextArea
                value={formData.painPoints}
                onChange={(e) => handleInputChange("painPoints", e.value)}
                rows={4}
                style={{ width: "100%" }}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className={styles.formFieldGroup}>
            <div>
              <Label>Do you rent equipment?</Label>
              <RadioGroup
                data={yesNoOptions}
                value={formData.rentEquipment}
                onChange={(e) => handleInputChange("rentEquipment", e.value)}
                layout="horizontal"
              />
              {errors.rentEquipment && (
                <div className={styles.errorMessage}>
                  This field is required.
                </div>
              )}
            </div>
            <div>
              <Label>Do you bill facilities?</Label>
              <RadioGroup
                data={yesNoOptions}
                value={formData.billFacilities}
                onChange={(e) => handleInputChange("billFacilities", e.value)}
                layout="horizontal"
              />
              {errors.billFacilities && (
                <div className={styles.errorMessage}>
                  This field is required.
                </div>
              )}
            </div>
            <div>
              <Label>Do you bill insurance?</Label>
              <RadioGroup
                data={yesNoOptions}
                value={formData.billInsurance}
                onChange={(e) => handleInputChange("billInsurance", e.value)}
                layout="horizontal"
              />
              {errors.billInsurance && (
                <div className={styles.errorMessage}>
                  This field is required.
                </div>
              )}
            </div>
            <div>
              <Label>How many techs/drivers do you have?</Label>
              <DropDownList
                data={techsDriversOptions}
                value={formData.techsDrivers}
                onChange={(e) => handleInputChange("techsDrivers", e.value)}
                style={{ width: "100%" }}
                defaultItem="Select a range"
              />
            </div>
            <div>
              <Label>What's your active patient census?</Label>
              <DropDownList
                data={patientCensusOptions}
                value={formData.patientCensus}
                onChange={(e) => handleInputChange("patientCensus", e.value)}
                style={{ width: "100%" }}
                defaultItem="Select a range"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <NotificationGroup
        style={{
          right: 20,
          top: 20,
          alignItems: "flex-end",
          flexWrap: "wrap-reverse",
        }}
      >
        {notification.show && (
          <Notification
            type={{ style: notification.type, icon: true }}
            closable={true}
            onClose={() => setNotification({ ...notification, show: false })}
          >
            <span>{notification.message}</span>
          </Notification>
        )}
      </NotificationGroup>

      <div className={styles.formWrapper}>
        <h1 className={styles.formTitle}>Request a SeriousERP Demo</h1>
        <Stepper
          value={currentStep}
          items={steps}
          onChange={(e) => setCurrentStep(e.value)}
        />

        <div className={styles.formStepContent}>{renderStepContent()}</div>

        <div className={currentStep === 0 ? styles.formActionsEnd : styles.formActions}>
          {currentStep > 0 && (
            <Button
              onClick={handleBack}
              themeColor="base"
            >
              Back
            </Button>
          )}

          {currentStep < steps.length - 1 ? (
            <Button
              onClick={handleNext}
              themeColor="primary"
            >
              Next
            </Button>
          ) : (
            <Button onClick={handleSubmit} themeColor="primary">
              Request Demo
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default MultiStepForm;
