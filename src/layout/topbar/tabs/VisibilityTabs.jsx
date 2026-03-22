const TABS = ['Overview', 'Opportunities', 'Technical', 'Keyword', 'Content', 'Events', 'Changes']

export default function VisibilityTabs({ activeTab, tabRefs, onTabClick, onTabEnter, onTabLeave }) {
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