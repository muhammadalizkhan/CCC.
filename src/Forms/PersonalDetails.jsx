/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { CountrySelect, StateSelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import intlTelInput from "intl-tel-input";
import "intl-tel-input/build/css/intlTelInput.css";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { TextField } from "@mui/material";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";


export default function PersonalDetails() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValidPhone, setIsValidPhone] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const phoneInputRef = useRef(null);
  const iti = useRef(null);
  const navigate = useNavigate();
  const handleNextStep = () => {
    navigate('/BusinessDetails');
  };

  useEffect(() => {
    if (phoneInputRef.current) {
      iti.current = intlTelInput(phoneInputRef.current, {
        initialCountry: "auto",
        geoIpLookup: (callback) => {
          fetch("https://ipapi.co/json")
            .then((res) => res.json())
            .then((data) => callback(data.country_code))
            .catch(() => callback("us"));
        },
        utilsScript:
          "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js",
        nationalMode: true,
        formatOnDisplay: true,
        autoPlaceholder: "aggressive",
        separateDialCode: true,
        customPlaceholder: (
          selectedCountryPlaceholder,
          selectedCountryData
        ) => {
          return `e.g. ${selectedCountryPlaceholder}`;
        },
      });
      phoneInputRef.current.addEventListener(
        "countrychange",
        handlePhoneCountryChange
      );
      phoneInputRef.current.addEventListener("input", handlePhoneInput);

      return () => {
        if (iti.current) {
          iti.current.destroy();
        }
      };
    }
  }, []);

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setSelectedState("");
  };

  const handleStateChange = (state) => {
    setSelectedState(state);
  };

  const handlePhoneCountryChange = () => {
    if (iti.current) {
      setPhoneNumber(iti.current.getNumber());
      validatePhoneNumber();
    }
  };

  const handlePhoneInput = () => {
    if (iti.current) {
      setPhoneNumber(iti.current.getNumber());
      validatePhoneNumber();
    }
  };

  const validatePhoneNumber = () => {
    if (iti.current) {
      if (iti.current.isValidNumber()) {
        setIsValidPhone(true);
        setPhoneError("");
      } else {
        setIsValidPhone(false);
        const errorCode = iti.current.getValidationError();
        setPhoneError(getErrorMessage(errorCode));
      }
    }
  };

  const getErrorMessage = (errorCode) => {
    const errorMap = {
      1: "Invalid country code",
      2: "Too short",
      3: "Too long",
      4: "Invalid number",
    };
    return errorMap[errorCode] || "Invalid number";
  };

  return (
    <div className="p-8 bg-gray-50 rounded-lg shadow-md w-11/12 md:w-3/5 mx-auto mt-12">
      <form className="space-y-6">
        <div className="mb-8">
          <Stepper activeStep={0} alternativeLabel className="w-full">
            <Step>
              <StepLabel>Personal Details</StepLabel>
            </Step>
            <Step>
              <StepLabel>Business Details</StepLabel>
            </Step>
            <Step>
              <StepLabel>Service Details</StepLabel>
            </Step>
            <Step>
              <StepLabel>Request Quote</StepLabel>
            </Step>
          </Stepper>
        </div>
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Personal Information
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Use a permanent address where you can receive mail.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-full">
            <label
              htmlFor="photo"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Photo
            </label>
            <div className="mt-2 flex items-center gap-x-3">
              <UserCircleIcon
                className="h-12 w-12 text-gray-300"
                aria-hidden="true"
              />
              <button
                type="button"
                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Change
              </button>
            </div>
          </div>
          <div>
            <TextField label="First Name" variant="outlined" fullWidth />
          </div>
          <div>
            <TextField label="Last Name" variant="outlined" fullWidth />
          </div>
        </div>

        <div>
          <TextField
            label="Personal Email"
            type="email"
            variant="outlined"
            fullWidth
          />
        </div>

        <div>
          <TextField
            label="Business Email"
            type="email"
            variant="outlined"
            fullWidth
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <CountrySelect
              value={selectedCountry}
              onChange={handleCountryChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <StateSelect
              countryid={selectedCountry?.id}
              value={selectedState}
              onChange={handleStateChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!selectedCountry}
            />
          </div>
        </div>

        <div className="relative">
          <TextField
            label="Phone Number"
            inputRef={phoneInputRef}
            type="tel"
            variant="outlined"
            fullWidth
            error={!isValidPhone && phoneNumber}
            helperText={!isValidPhone && phoneNumber && phoneError}
            onChange={handlePhoneInput}
            InputLabelProps={{
              shrink: true,
              style: { transform: "translate(14px, -6px) scale(0.75)" },
            }}
            InputProps={{
              style: { paddingLeft: "52px" },
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <TextField label="Street Address" variant="outlined" fullWidth />
          </div>
          <div>
            <TextField label="City" variant="outlined" fullWidth />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <TextField label="State/Province" variant="outlined" fullWidth />
          </div>
          <div>
            <TextField label="Zip/Postal Code" variant="outlined" fullWidth />
          </div>
        </div>

        <div>
          <TextField
            label="Date of Birth"
            type="date"
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Preferred Contact Method
          </label>
          <div className="flex flex-col">
            <FormControlLabel control={<Checkbox />} label="Email" />
            <FormControlLabel control={<Checkbox />} label="Phone" />
            <FormControlLabel control={<Checkbox />} label="Text" />
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Notifications
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            We'll always let you know about important changes, but you pick what
            else you want to hear about.
          </p>

          <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">
                By Email
              </legend>
              <div className="mt-6 space-y-6">
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="comments"
                      name="comments"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label
                      htmlFor="comments"
                      className="font-medium text-gray-900"
                    >
                      Comments
                    </label>
                    <p className="text-gray-500">
                      Get notified when someones posts a comment on a posting.
                    </p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="candidates"
                      name="candidates"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label
                      htmlFor="candidates"
                      className="font-medium text-gray-900"
                    >
                      Candidates
                    </label>
                    <p className="text-gray-500">
                      Get notified when a candidate applies for a job.
                    </p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="offers"
                      name="offers"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label
                      htmlFor="offers"
                      className="font-medium text-gray-900"
                    >
                      Offers
                    </label>
                    <p className="text-gray-500">
                      Get notified when a candidate accepts or rejects an offer.
                    </p>
                  </div>
                </div>
              </div>
            </fieldset>
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">
                Push Notifications
              </legend>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                These are delivered via SMS to your mobile phone.
              </p>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-everything"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="push-everything"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Everything
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-email"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="push-email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Same as email
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-nothing"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="push-nothing"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    No push notifications
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-8">
          <Button variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button variant="contained" type="submit" color="primary" f onClick={handleNextStep}>
            Save and Continue
          </Button>
        </div>
      </form>
    </div>
  );
}
