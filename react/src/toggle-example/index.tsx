import useToggle from '../hooks/useToggle';

type Item = {
  label: string;
  value: string;
};

const items: Item[] = [
  { label: 'Item one', value: 'item-one' },
  { label: 'Item two', value: 'item-two' },
  { label: 'Item three', value: 'item-three' },
  { label: 'Item four', value: 'item-four' },
];

export default function ToggleExample() {
  const { currentItem, toggleItem } = useToggle<Item>({
    items,
    defaultItemIdx: 0,
  });

  return (
    <div>
      Item: {JSON.stringify(currentItem)}
      <button onClick={toggleItem}>Toggle</button>
    </div>
  );
}
