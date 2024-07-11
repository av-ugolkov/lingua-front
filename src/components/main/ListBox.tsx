export interface IListBoxItem {
  key: string;
  value: string;
  disabled?: boolean;
}

export default function ListBox({
  id,
  items,
  onChange,
  classSelect,
  classOption,
}: {
  id: string;
  items: IListBoxItem[];
  onChange: (value: string | number) => void;
  classSelect?: string;
  classOption?: string;
}) {
  return (
    <>
      <select
        id={id}
        defaultValue={items[0].value}
        onChange={(e) => {
          onChange(e.target.value as any);
        }}
        className={classSelect}>
        {items.map((item) => (
          <option
            key={item.key}
            disabled={item.disabled}
            className={classOption}>
            {item.value}
          </option>
        ))}
      </select>
    </>
  );
}
