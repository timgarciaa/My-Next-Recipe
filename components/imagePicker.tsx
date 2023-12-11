
type Props = {
  label: string;
  name: string;
};

export default function ImagePicker({ label, name }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <label htmlFor={name}>{label}</label>
      <input
        className="rounded-md p-2 text-black"
        type="file"
        name={name}
        id={name}
        accept="image/png, image/jpeg"
      />
    </div>
  );
}
