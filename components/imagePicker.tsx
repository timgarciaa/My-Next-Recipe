
type Props = {
  label: string;
  name: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function ImagePicker({ label, name, onChange }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <label htmlFor={name}>{label}</label>
      <input
        className="rounded-md p-2 text-black"
        type="file"
        name={name}
        id={name}
        accept="image/png, image/jpeg"
        onChange={onChange}
      />
    </div>
  );
}
