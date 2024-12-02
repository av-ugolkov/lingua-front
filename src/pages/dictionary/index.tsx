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
          { key: '30', value: '30' },
          { key: '50', value: '50' },
          { key: '75', value: '75' },
          { key: '100', value: '100' },
        ]}
      />
    </div>
  );
}
