import { DropzoneOptions } from 'react-dropzone';
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from 'react-hook-form';
import { Dropzone } from './dropzone';

/* eslint-disable-next-line */
export interface ImageDropzoneProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TContext = any
> {
  name: TName;
  control: Control<TFieldValues, TContext>;
  required?: boolean;
  onDrop?: DropzoneOptions['onDrop'];
  isLoading?: boolean;
}

export function ImageDropzone<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TContext = any
>(props: ImageDropzoneProps<TFieldValues, TName, TContext>) {
  const { field } = useController({
    name: props.name,
    control: props.control,
    rules: { required: props.required },
  });

  const onDrop: DropzoneOptions['onDrop'] = (
    acceptedFiles,
    fileRejections,
    event
  ) => {
    if (Array.isArray(field.value)) {
      field.onChange([...field.value, ...acceptedFiles]);
    } else {
      field.onChange(acceptedFiles);
    }

    if (props.onDrop) {
      props.onDrop(acceptedFiles, fileRejections, event);
    }
  };

  return (
    <Dropzone
      accept={{ 'image/*': [] }}
      isLoading={props.isLoading}
      disabled={props.isLoading}
      onDrop={onDrop}
    />
  );
}

export default ImageDropzone;
