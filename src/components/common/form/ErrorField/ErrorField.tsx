export function ErrorField({
  errors,
  fieldName,
}: {
  errors: any;
  fieldName: string;
}) {
  return (
    errors[fieldName] && (
      <div className="error">{errors[fieldName].message}</div>
    )
  );
}
