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
          { key: '20', value: '20' },
          { key: '30', value: '30' },
          { key: '50', value: '50' },
          { key: '25', value: '25' },
          { key: '100', value: '100' },
        ]}
      />
    </div>
  );
}
