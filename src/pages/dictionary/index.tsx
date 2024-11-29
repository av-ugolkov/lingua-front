import Pagination from '@/components/elements/Pagination/Pagination';
import List from './component/List';
import Panel from './component/Panel';

export function Dictionary() {
  return (
    <div>
      <Panel />
      <List />
      <Pagination
        countsItemsPerPage={[
          { key: '40', value: '40' },
          { key: '60', value: '60' },
          { key: '80', value: '80' },
          { key: '100', value: '100' },
        ]}
      />
    </div>
  );
}
