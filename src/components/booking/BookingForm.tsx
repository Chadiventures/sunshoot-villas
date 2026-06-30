"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import PhoneNumberField, {
  isPhoneValid,
} from "@/components/PhoneNumberField";
import { useLanguage } from "@/context/LanguageContext";
import { VILLAS } from "@/lib/villas";
import {
  BOOKING_WHATSAPP,
  type BookingFields,
  buildBookingWhatsAppMessage,
  bookingInputClass,
  bookingInputStyle,
  bookingLabelClass,
  calcNights,
  createInitialBookingFields,
  getDepartureMinYmd,
  getTodayYmd,
  scrollToFirstBookError,
} from "@/components/booking/booking-form-utils";

function RequiredMark() {
  return <span className="text-red-500"> *</span>;
}

export function useBookingForm(defaultVilla = "") {
  const [fields, setFields] = useState<BookingFields>(() =>
    createInitialBookingFields(defaultVilla),
  );
  const [errors, setErrors] = useState<
    Partial<Record<keyof BookingFields, boolean>>
  >({});

  const nights = useMemo(
    () => calcNights(fields.arrivalDate, fields.departureDate),
    [fields.arrivalDate, fields.departureDate],
  );

  const reset = useCallback((villa = defaultVilla) => {
    setFields(createInitialBookingFields(villa));
    setErrors({});
  }, [defaultVilla]);

  const update = <K extends keyof BookingFields>(
    key: K,
    value: BookingFields[K],
  ) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: false }));
    }
  };

  const validate = (idPrefix: string) => {
    const next: Partial<Record<keyof BookingFields, boolean>> = {};
    const required: (keyof BookingFields)[] = [
      "villa",
      "arrivalDate",
      "departureDate",
      "fullName",
      "email",
      "phone",
    ];
    required.forEach((key) => {
      if (key === "phone") {
        if (!isPhoneValid(fields.phone)) next.phone = true;
      } else if (key === "fullName" || key === "email") {
        if (!fields[key].trim()) next[key] = true;
      } else if (!fields[key]) {
        next[key] = true;
      }
    });
    if (fields.arrivalDate && fields.departureDate && nights === null) {
      next.departureDate = true;
    }
    setErrors(next);

    if (Object.keys(next).length > 0) {
      scrollToFirstBookError(next, idPrefix);
      return false;
    }

    return true;
  };

  const fieldError = (key: keyof BookingFields) => Boolean(errors[key]);

  const arrivalMin = getTodayYmd();
  const departureMin = getDepartureMinYmd(fields.arrivalDate);

  useEffect(() => {
    if (fields.arrivalDate && fields.arrivalDate < getTodayYmd()) {
      setFields((prev) => ({ ...prev, arrivalDate: "", departureDate: "" }));
      return;
    }
    if (
      fields.departureDate &&
      fields.departureDate < getDepartureMinYmd(fields.arrivalDate)
    ) {
      setFields((prev) => ({ ...prev, departureDate: "" }));
    }
  }, [fields.arrivalDate, fields.departureDate]);

  const handleArrivalDateChange = (value: string) => {
    if (value && value < getTodayYmd()) {
      setFields((prev) => ({ ...prev, arrivalDate: "", departureDate: "" }));
    } else {
      setFields((prev) => ({
        ...prev,
        arrivalDate: value,
        departureDate:
          prev.departureDate && value && prev.departureDate <= value
            ? ""
            : prev.departureDate,
      }));
    }
    setErrors((prev) => ({
      ...prev,
      arrivalDate: false,
      departureDate: false,
    }));
  };

  const handleDepartureDateChange = (value: string) => {
    const min = getDepartureMinYmd(fields.arrivalDate);
    if (value && value < min) {
      setFields((prev) => ({ ...prev, departureDate: "" }));
      return;
    }
    update("departureDate", value);
  };

  const handleAirportPickupChange = (checked: boolean) => {
    setFields((prev) => ({
      ...prev,
      airportPickup: checked,
      flightNumber: checked ? prev.flightNumber : "",
    }));
  };

  const submit = (idPrefix: string) => {
    if (!validate(idPrefix)) return false;

    const message = buildBookingWhatsAppMessage(fields, nights);
    window.open(
      `https://wa.me/${BOOKING_WHATSAPP}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
    return true;
  };

  return {
    fields,
    errors,
    nights,
    arrivalMin,
    departureMin,
    reset,
    update,
    validate,
    submit,
    fieldError,
    handleArrivalDateChange,
    handleDepartureDateChange,
    handleAirportPickupChange,
  };
}

export type BookingFormState = ReturnType<typeof useBookingForm>;

type BookingFormProps = {
  form: BookingFormState;
  idPrefix: string;
  onSubmitSuccess?: () => void;
};

export function BookingForm({
  form,
  idPrefix,
  onSubmitSuccess,
}: BookingFormProps) {
  const { t } = useLanguage();
  const {
    fields,
    arrivalMin,
    departureMin,
    update,
    fieldError,
    handleArrivalDateChange,
    handleDepartureDateChange,
    handleAirportPickupChange,
    submit,
  } = form;

  const handleSubmit = () => {
    if (submit(idPrefix)) {
      onSubmitSuccess?.();
    }
  };

  return (
    <div className="space-y-3 md:space-y-5">
      <div>
        <label htmlFor={`${idPrefix}-villa`} className={bookingLabelClass}>
          {t.formLabelSelectVilla}
          <RequiredMark />
        </label>
        <select
          id={`${idPrefix}-villa`}
          value={fields.villa}
          onChange={(e) => update("villa", e.target.value)}
          className={`${bookingInputClass} cursor-pointer ${fieldError("villa") ? "border-red-400" : ""}`}
          style={bookingInputStyle}
        >
          <option value="">{t.formSelectChooseVilla}</option>
          <option value="any">{t.formSelectAnyVilla}</option>
          {VILLAS.map((v) => (
            <option key={v.slug} value={v.slug}>
              {v.name.replace("Villa ", "")}
            </option>
          ))}
        </select>
        {fieldError("villa") && (
          <p className="mt-1 text-xs text-red-500">{t.fieldRequired}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5">
        <div className="w-full">
          <label htmlFor={`${idPrefix}-arrival`} className={bookingLabelClass}>
            {t.formLabelArrivalDate}
            <RequiredMark />
          </label>
          <input
            id={`${idPrefix}-arrival`}
            type="date"
            value={fields.arrivalDate}
            min={arrivalMin}
            onChange={(e) => handleArrivalDateChange(e.target.value)}
            className={`${bookingInputClass} w-full [color-scheme:light] ${fieldError("arrivalDate") ? "border-red-400" : ""}`}
            style={bookingInputStyle}
          />
          {fieldError("arrivalDate") && (
            <p className="mt-1 text-xs text-red-500">{t.fieldRequired}</p>
          )}
        </div>
        <div className="w-full">
          <label htmlFor={`${idPrefix}-departure`} className={bookingLabelClass}>
            {t.formLabelDepartureDate}
            <RequiredMark />
          </label>
          <input
            id={`${idPrefix}-departure`}
            type="date"
            value={fields.departureDate}
            min={departureMin}
            onChange={(e) => handleDepartureDateChange(e.target.value)}
            className={`${bookingInputClass} w-full [color-scheme:light] ${fieldError("departureDate") ? "border-red-400" : ""}`}
            style={bookingInputStyle}
          />
          {fieldError("departureDate") && (
            <p className="mt-1 text-xs text-red-500">{t.fieldRequired}</p>
          )}
        </div>
      </div>

      <p
        className="text-center italic text-[var(--text-muted)]"
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "0.75rem",
          fontWeight: 300,
        }}
      >
        {t.bookMinimumStay}
      </p>

      <div className="grid grid-cols-2 gap-3 md:gap-5">
        <div>
          <label htmlFor={`${idPrefix}-adults`} className={bookingLabelClass}>
            {t.formLabelAdults}
          </label>
          <input
            id={`${idPrefix}-adults`}
            type="number"
            min={1}
            max={20}
            value={fields.adults}
            onChange={(e) => update("adults", e.target.value)}
            className={`${bookingInputClass} ${fieldError("adults") ? "border-red-400" : ""}`}
            style={bookingInputStyle}
          />
          {fieldError("adults") && (
            <p className="mt-1 text-xs text-red-500">{t.fieldRequired}</p>
          )}
        </div>
        <div>
          <label htmlFor={`${idPrefix}-children`} className={bookingLabelClass}>
            {t.formLabelChildren}
          </label>
          <input
            id={`${idPrefix}-children`}
            type="number"
            min={0}
            max={20}
            value={fields.children}
            onChange={(e) => update("children", e.target.value)}
            className={bookingInputClass}
            style={bookingInputStyle}
          />
        </div>
      </div>

      <div>
        <label htmlFor={`${idPrefix}-name`} className={bookingLabelClass}>
          {t.formLabelFullName}
          <RequiredMark />
        </label>
        <input
          id={`${idPrefix}-name`}
          type="text"
          value={fields.fullName}
          onChange={(e) => update("fullName", e.target.value)}
          className={`${bookingInputClass} ${fieldError("fullName") ? "border-red-400" : ""}`}
          style={bookingInputStyle}
        />
        {fieldError("fullName") && (
          <p className="mt-1 text-xs text-red-500">{t.fieldRequired}</p>
        )}
      </div>

      <div>
        <label htmlFor={`${idPrefix}-email`} className={bookingLabelClass}>
          {t.formLabelEmail}
          <RequiredMark />
        </label>
        <input
          id={`${idPrefix}-email`}
          type="email"
          value={fields.email}
          onChange={(e) => update("email", e.target.value)}
          className={`${bookingInputClass} ${fieldError("email") ? "border-red-400" : ""}`}
          style={bookingInputStyle}
        />
        {fieldError("email") && (
          <p className="mt-1 text-xs text-red-500">{t.fieldRequired}</p>
        )}
      </div>

      <PhoneNumberField
        idPrefix={idPrefix}
        fieldId={`${idPrefix}-phone-field`}
        label={t.formLabelPhoneNumber}
        value={fields.phone}
        onChange={(phone) => update("phone", phone)}
        hasError={fieldError("phone")}
        required
      />

      <div>
        <div
          role="button"
          tabIndex={0}
          onClick={() => handleAirportPickupChange(!fields.airportPickup)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleAirportPickupChange(!fields.airportPickup);
            }
          }}
          className="flex cursor-pointer items-center gap-3"
        >
          <div
            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border-2 transition-all duration-300 ${
              fields.airportPickup
                ? "border-[#C9A96E] bg-[#C9A96E]"
                : "border-[var(--text)]/25 bg-white"
            }`}
            aria-hidden="true"
          >
            {fields.airportPickup && (
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
              >
                <path d="M5 12l5 5L20 7" />
              </svg>
            )}
          </div>
          <span
            className="text-[var(--text)]"
            style={{ ...bookingInputStyle, fontSize: "0.8125rem" }}
          >
            {t.bookAirportPickupToggle}
          </span>
        </div>

        {fields.airportPickup && (
          <div className="mt-3">
            <label
              htmlFor={`${idPrefix}-flight-number`}
              className={bookingLabelClass}
            >
              {t.formLabelFlightNumber}
            </label>
            <input
              id={`${idPrefix}-flight-number`}
              type="text"
              placeholder={t.formPlaceholderFlightNumber}
              value={fields.flightNumber}
              onChange={(e) => update("flightNumber", e.target.value)}
              className={bookingInputClass}
              style={bookingInputStyle}
            />
          </div>
        )}
      </div>

      <div>
        <label htmlFor={`${idPrefix}-requests`} className={bookingLabelClass}>
          {t.formLabelSpecialRequests}
        </label>
        <textarea
          id={`${idPrefix}-requests`}
          rows={3}
          placeholder={t.formPlaceholderSpecialRequests}
          value={fields.specialRequests}
          onChange={(e) => update("specialRequests", e.target.value)}
          className={`${bookingInputClass} resize-none`}
          style={bookingInputStyle}
        />
      </div>

      <div
        role="button"
        tabIndex={0}
        onClick={handleSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleSubmit();
          }
        }}
        className="btn-primary w-full cursor-pointer text-center"
      >
        {t.bookSubmitButton}
      </div>
    </div>
  );
}
