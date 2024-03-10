import './App.css';
import { Dispatch, SetStateAction, useState, useId } from 'react';
import { data, type Item } from './utils/data';
import { filterItems } from './utils/helper';

function App() {
  const [expanded, setExpanded] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [list, setList] = useState<Item[]>(data);

  return (
    <main>
      <input
        type="text"
        onChange={(e) => {
          setSearch(e.target.value);
          setList(filterItems(data, e.target.value));
        }}
        value={search}
        placeholder="Filter..."
      />
      <div className="list-wrapper">
        {list.length > 0 ? (
          list.map((item) => {
            return item.children ? (
              <ExpandableItem
                key={item.id}
                data={item}
                setExpanded={setExpanded}
                expanded={expanded}
              />
            ) : (
              <Item data={item} key={item.id} />
            );
          })
        ) : (
          <>No Result</>
        )}
      </div>
    </main>
  );
}

const Item = ({ data }: { data: Item }) => {
  return (
    <div className="list-item">
      <span>{data.label}</span>
    </div>
  );
};

const ExpandableItem = ({
  data,
  expanded,
  setExpanded,
}: {
  data: Item;
  expanded: string;
  setExpanded: Dispatch<SetStateAction<string>>;
}) => {
  const [childExpanded, setChildExpanded] = useState<string>('');
  const buttonId = useId();
  const expandedId = useId();

  return (
    <div className="expandable-trigger">
      <button
        aria-expanded={expanded === data.id}
        onClick={() => {
          setExpanded((id) => (id === data.id ? '' : data.id));
        }}
        id={buttonId}
        aria-controls={expandedId}
        type="button"
      >
        <span>{data.label}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
          width={16}
          aria-hidden="true"
        >
          <path
            fill="white"
            d="M31.3 192l121.5 121.5c4.7 4.7 12.3 4.7 17 0L291.3 192c4.7-4.7 4.7-12.3 0-17l-22.6-22.6c-4.7-4.7-12.3-4.7-17 0L160 239.8 68.3 152c-4.7-4.7-12.3-4.7-17 0L28.7 174.6c-4.7 4.7-4.7 12.3 0 17z"
          />
        </svg>
      </button>

      <div
        className="expanded-container"
        id={expandedId}
        aria-labelledby={buttonId}
        role="region"
        hidden={expanded !== data.id}
      >
        {data.children?.map((child) => {
          return child.children ? (
            <ExpandableItem
              key={child.id}
              data={child}
              setExpanded={setChildExpanded}
              expanded={childExpanded}
            />
          ) : (
            <Item data={child} key={child.id} />
          );
        })}
      </div>
    </div>
  );
};

export default App;
