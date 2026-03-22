const TABS = ['Overview','Funnels', 'Behavioural Flow', 'Visitors', 'Events', 'Sources']

export default function AnalyticsTabs({ activeTab, tabRefs, onTabClick, onTabEnter, onTabLeave }) {
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