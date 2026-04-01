const TABS = ['Mobina Chat', 'Previous Chats', 'Insights', 'Memory', 'Usage']

export default function MobinaTabs({ activeTab, tabRefs, onTabClick, onTabEnter, onTabLeave }) {
  return TABS.map((tab, index) => (
    <button
      key={tab}
      ref={el => tabRefs.current[index] = el}
      className={`tab ${activeTab === index ? 'active' : ''}`}
      onClick={() => onTabClick(index)}
      onMouseEnter={() => onTabEnter(index)}
      onMouseLeave={onTabLeave}
    >
      {tab}
    </button>
  ))
}