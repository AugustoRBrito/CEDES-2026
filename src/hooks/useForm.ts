/**
 * Hook genérico para gerenciamento de formulários type-safe
 * Implementação rigorosa com validação e estado controlado
 */

import type {
  FormActions,
  FormState,
  SubmissionHandler,
  UseFormReturn,
  ValidationHandler,
} from '@/types/utilities';
import { useCallback, useState } from 'react';

interface UseFormConfig<T extends Record<string, any>> {
  readonly initialValues: T;
  readonly validate?: {
    readonly [K in keyof T]?: ValidationHandler<T[K]>;
  };
  readonly onSubmit?: SubmissionHandler<T, void>;
}

/**
 * Hook para gerenciamento type-safe de formulários
 */
export function useForm<T extends Record<string, any>>(
  config: UseFormConfig<T>
): UseFormReturn<T> {
  const { initialValues, validate = {}, onSubmit } = config;

  // Inicializar estado dos campos
  const [fields, setFields] = useState(() => {
    const initialFields = {} as FormState<T>['fields'];

    for (const [key, value] of Object.entries(initialValues)) {
      initialFields[key as keyof T] = {
        value: value as T[keyof T],
        error: undefined,
        touched: false,
        dirty: false,
        valid: true,
      };
    }

    return initialFields;
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calcular estado derivado
  const isValid = Object.values(fields).every(field => field.valid);
  const isDirty = Object.values(fields).some(field => field.dirty);
  const errors = Object.entries(fields).reduce(
    (acc, [key, field]) => {
      if (field.error) {
        acc[key as keyof T] = field.error;
      }
      return acc;
    },
    {} as Partial<Record<keyof T, string>>
  );

  // Ações do formulário
  const setFieldValue = useCallback(
    <K extends keyof T>(field: K, value: T[K]) => {
      setFields(prev => ({
        ...prev,
        [field]: {
          ...prev[field],
          value,
          dirty: value !== initialValues[field],
          error: undefined, // Limpar erro ao digitar
        },
      }));
    },
    [initialValues]
  );

  const setFieldError = useCallback(
    <K extends keyof T>(field: K, error: string) => {
      setFields(prev => ({
        ...prev,
        [field]: {
          ...prev[field],
          error,
          valid: false,
        },
      }));
    },
    []
  );

  const setFieldTouched = useCallback(
    <K extends keyof T>(field: K, touched: boolean) => {
      setFields(prev => ({
        ...prev,
        [field]: {
          ...prev[field],
          touched,
        },
      }));
    },
    []
  );

  const validateField = useCallback(
    <K extends keyof T>(field: K): boolean => {
      const fieldValue = fields[field]?.value;
      const validator = (validate as any)[field] as
        | ValidationHandler<T[K]>
        | undefined;

      if (validator) {
        const error = validator(fieldValue);
        if (error) {
          setFieldError(field, error);
          return false;
        }
      }

      setFields(prev => ({
        ...prev,
        [field]: {
          ...prev[field],
          error: undefined,
          valid: true,
        },
      }));

      return true;
    },
    [fields, validate, setFieldError]
  );

  const validateForm = useCallback((): boolean => {
    let isFormValid = true;

    for (const fieldName of Object.keys(fields) as (keyof T)[]) {
      const isFieldValid = validateField(fieldName);
      if (!isFieldValid) {
        isFormValid = false;
      }
    }

    return isFormValid;
  }, [fields, validateField]);

  const resetField = useCallback(
    <K extends keyof T>(field: K) => {
      setFields(prev => ({
        ...prev,
        [field]: {
          value: initialValues[field],
          error: undefined,
          touched: false,
          dirty: false,
          valid: true,
        },
      }));
    },
    [initialValues]
  );

  const resetForm = useCallback(() => {
    setFields(() => {
      const resetFields = {} as FormState<T>['fields'];

      for (const [key, value] of Object.entries(initialValues)) {
        resetFields[key as keyof T] = {
          value: value as T[keyof T],
          error: undefined,
          touched: false,
          dirty: false,
          valid: true,
        };
      }

      return resetFields;
    });
    setIsSubmitting(false);
  }, [initialValues]);

  const submitForm = useCallback(async () => {
    if (!onSubmit || isSubmitting) return;

    // Validar todos os campos antes do submit
    const isFormValid = validateForm();
    if (!isFormValid) return;

    setIsSubmitting(true);

    try {
      // Extrair valores para submissão
      const values = Object.entries(fields).reduce((acc, [key, field]) => {
        acc[key as keyof T] = field.value;
        return acc;
      }, {} as T);

      await onSubmit(values);
    } catch (error) {
      // Tratar erro de submissão se necessário
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [fields, isSubmitting, onSubmit, validateForm]);

  const state: FormState<T> = {
    fields,
    isSubmitting,
    isValid,
    isDirty,
    errors,
  };

  const actions: FormActions<T> = {
    setFieldValue,
    setFieldError,
    setFieldTouched,
    resetField,
    resetForm,
    validateField,
    validateForm,
    submitForm,
  };

  return {
    state,
    actions,
  };
}

/**
 * Hook para campo individual com tipagem rigorosa
 */
export function useField<T>(
  name: string,
  initialValue: T,
  validator?: ValidationHandler<T>
) {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  const validate = useCallback(() => {
    if (validator) {
      const validationError = validator(value);
      setError(validationError);
      return validationError === null;
    }
    return true;
  }, [value, validator]);

  const handleChange = useCallback((newValue: T) => {
    setValue(newValue);
    setError(null); // Limpar erro ao digitar
  }, []);

  const handleBlur = useCallback(() => {
    setTouched(true);
    validate();
  }, [validate]);

  const reset = useCallback(() => {
    setValue(initialValue);
    setError(null);
    setTouched(false);
  }, [initialValue]);

  return {
    value,
    error,
    touched,
    dirty: value !== initialValue,
    valid: error === null,
    setValue: handleChange,
    setError,
    onBlur: handleBlur,
    validate,
    reset,
  };
}
