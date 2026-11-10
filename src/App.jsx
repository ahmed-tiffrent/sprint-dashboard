import React, { useState, useEffect, useRef } from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, ReferenceLine
} from 'recharts';
import {
  LayoutDashboard, Flame, Target, ListTodo, AlertCircle,
  CheckCircle2, Clock, Activity, CalendarDays, Plus, Trash2, Check,
  Sun, Moon, ChevronLeft, ChevronRight, Menu, X, ChevronDown, ChevronUp
} from 'lucide-react';

// Remove static burndown constants to make them dynamic in App component

const sprintBacklogS1 = [
  { id: 'S1-1.1', group: 'Sprint Planning', title: 'Planning with Supervisor', resp: 'Me-Sup', status: 'Y', hours: 0.5, d1: 0.5, d2: 0, d3: 0, d4: 0, d5: 0, d6: 0, d7: 0, d8: 0, d9: 0, d10: 0 },
  { id: 'S1-1.2', group: 'Sprint Planning', title: 'Detailed sprint planning', resp: 'Me', status: 'Ongoing', hours: 4, d1: 2, d2: 0, d3: 0, d4: 0, d5: 0, d6: 0, d7: 0, d8: 0, d9: 0, d10: 0 },
  { id: 'S1-2.1', group: 'Determine main requirements', title: 'Identify main features', resp: 'Me', status: 'Ongoing', hours: 10, d1: 0, d2: 2, d3: 2, d4: 1, d5: 0, d6: 2, d7: 0, d8: 0, d9: 0, d10: 0 },
  { id: 'S1-2.2', group: 'Determine main requirements', title: 'Identify main stakeholders', resp: 'Me', status: 'Y', hours: 2, d1: 0, d2: 0, d3: 0, d4: 3, d5: 0, d6: 0, d7: 1, d8: 0, d9: 0, d10: 0 },
  { id: 'S1-2.3', group: 'Determine main requirements', title: 'First pass requirements', resp: 'Me', status: 'Ongoing', hours: 8, d1: 0, d2: 0, d3: 0, d4: 1, d5: 0, d6: 0, d7: 1, d8: 0, d9: 0, d10: 0 },
  { id: 'S1-3.1', group: 'Determine project requirements', title: 'Research programming lang', resp: 'Me', status: 'N', hours: 2, d1: 0, d2: 0, d3: 0, d4: 0, d5: 0, d6: 0, d7: 0, d8: 0, d9: 0, d10: 0 },
  { id: 'S1-3.2', group: 'Determine project requirements', title: 'Practice C#', resp: 'Me', status: 'Ongoing', hours: 4, d1: 0, d2: 0, d3: 0, d4: 0, d5: 0, d6: 0, d7: 0, d8: 3, d9: 0, d10: 0 },
  { id: 'S1-4.1', group: 'Review sprint', title: 'Review progress', resp: 'Me', status: 'Y', hours: 1, d1: 0, d2: 0, d3: 0, d4: 0, d5: 0, d6: 0, d7: 0, d8: 0, d9: 1, d10: 0 },
  { id: 'S1-4.2', group: 'Review sprint', title: 'Confirm with supervisor', resp: 'Me-Sup', status: 'Y', hours: 0.5, d1: 0, d2: 0, d3: 0, d4: 0, d5: 0, d6: 0, d7: 0, d8: 0, d9: 1, d10: 0 },
];

const sprintBacklogS2 = [
  { id: 'S2-1.1', group: 'Iteration Planning', title: 'Planning with Supervisor', priority: 'Must', hours: 1, d1: 1, d2: 0, d3: 0, d4: 0, d5: 0, d6: 0, d7: 0, d8: 0, d9: 0, d10: 0 },
  { id: 'S2-1.2', group: 'Iteration Planning', title: 'Detailed planning', priority: 'Must', hours: 1, d1: 3, d2: 0, d3: 0, d4: 0, d5: 0, d6: 0, d7: 0, d8: 0, d9: 0, d10: 0 },
  { id: 'S2-2.1', group: 'Add to basket user story', title: 'Wireframe screen', priority: '', hours: 1, d1: 0, d2: 0.5, d3: 0, d4: 0, d5: 0, d6: 0, d7: 0, d8: 0, d9: 0, d10: 0 },
  { id: 'S2-2.2', group: 'Add to basket user story', title: 'Gather content', priority: '', hours: 2, d1: 0, d2: 1, d3: 0, d4: 0, d5: 0, d6: 0, d7: 0, d8: 0, d9: 0, d10: 0 },
  { id: 'S2-2.3', group: 'Add to basket user story', title: 'User scenario analysis', priority: '', hours: 3, d1: 0, d2: 2, d3: 0, d4: 0, d5: 0, d6: 0, d7: 0, d8: 0, d9: 0, d10: 0 },
  { id: 'S2-2.4', group: 'Add to basket user story', title: 'Ensure database design and code covers function', priority: '', hours: 2, d1: 0, d2: 0, d3: 1, d4: 0, d5: 0, d6: 0, d7: 0, d8: 0, d9: 0, d10: 0 },
  { id: 'S2-2.5', group: 'Add to basket user story', title: 'Hi-fi screen(s) in scenario and test', priority: '', hours: 3, d1: 0, d2: 0, d3: 2, d4: 0, d5: 0, d6: 0, d7: 0, d8: 0, d9: 0, d10: 0 },
  { id: 'S2-2.6', group: 'Add to basket user story', title: 'Write test scripts', priority: '', hours: 4, d1: 0, d2: 0, d3: 0, d4: 3, d5: 0, d6: 0, d7: 0, d8: 0, d9: 0, d10: 0 },
  { id: 'S2-2.7', group: 'Add to basket user story', title: 'Code the user story', priority: '', hours: 10, d1: 0, d2: 0, d3: 0, d4: 0, d5: 0, d6: 4, d7: 2, d8: 0, d9: 0, d10: 0 },
  { id: 'S2-2.8', group: 'Add to basket user story', title: 'Test and integrate', priority: '', hours: 2, d1: 0, d2: 0, d3: 0, d4: 0, d5: 0, d6: 0, d7: 0, d8: 1, d9: 0, d10: 0 },
  { id: 'S2-3.1', group: 'Review and Retrospective', title: 'Review sprint with product owner', priority: '', hours: 2, d1: 0, d2: 0, d3: 0, d4: 0, d5: 0, d6: 0, d7: 0, d8: 0, d9: 2, d10: 0 },
  { id: 'S2-3.2', group: 'Review and Retrospective', title: 'Retrospective: with team', priority: '', hours: 1, d1: 0, d2: 0, d3: 0, d4: 0, d5: 0, d6: 0, d7: 0, d8: 0, d9: 0, d10: 1 },
];

const productBacklog = [
  { id: 'PB-01', title: 'Determine main requirements', sprintPlanned: '1', priority: 'Must', estimate: 20, done: 'Y', issues: 'Took longer than planned! 4 hours planned.' },
  { id: 'PB-02', title: 'Decide project requirements', sprintPlanned: '1', priority: 'Must', estimate: 12, done: 'Ongoing', issues: 'Need to learn the language to use (C#)!' },
  { id: 'PB-03', title: 'Catalog user display', sprintPlanned: '2', priority: 'Must', estimate: 16, done: 'Y', issues: "Planned for sprint 2 but didn't get to it until sprint 4." },
  { id: 'PB-04', title: 'Database for catalog', sprintPlanned: '2', priority: 'Must', estimate: 4, done: 'Y', issues: "Planned for sprint 2 but didn't get to it until sprint 4." },
  { id: 'PB-05', title: 'Customer registration interface', sprintPlanned: '3', priority: 'Must', estimate: 32, done: 'N', issues: 'Done on time. No problems.' },
  { id: 'PB-06', title: 'Work out barcode reader fn', sprintPlanned: '4', priority: 'Must', estimate: 16, done: 'N', issues: 'On-going' },
  { id: 'PB-07', title: 'Customer bookloans db', sprintPlanned: '4', priority: 'Should', estimate: 16, done: 'N', issues: 'Not started' },
  { id: 'PB-08', title: 'Link to catalog db', sprintPlanned: '5', priority: 'Could', estimate: 32, done: 'N', issues: 'Not started -- may delay?' },
  { id: 'PB-09', title: 'Catch up sprint!', sprintPlanned: '6', priority: 'Must', estimate: 32, done: 'N', issues: 'Need to fix all the bugs found so far' },
  { id: 'PB-10', title: 'Fine payment portal', sprintPlanned: '7', priority: 'Must', estimate: 16, done: 'N', issues: 'Will delay until sprint 8 probably.' },
  { id: 'PB-11', title: 'Online book renewal screens', sprintPlanned: '8', priority: 'Should', estimate: 20, done: 'N', issues: 'Not started yet.' },
  { id: 'PB-12', title: 'Write report', sprintPlanned: 'All', priority: 'Must', estimate: 0, done: 'N', issues: 'At sprint 5 yet to start!!' },
];

/* ---- Header Sprint Dropdown (Fused) ---- */
const FusedSprintToggle = ({ current, setSprint }) => (
  <div className="fused-sprint-container">
    <div className="sprint-select-wrapper">
      <select 
        className="sprint-dropdown" 
        value={current} 
        onChange={(e) => setSprint(e.target.value)}
      >
        <option value="Sprint 1">Sprint 1</option>
        <option value="Sprint 2">Sprint 2</option>
      </select>
      <ChevronDown size={14} className="dropdown-arrow" />
    </div>
    <span className="fused-label">Backlog</span>
  </div>
);

/* ---- Add Sprint Task Modal ---- */
const AddTaskModal = ({ onSave, onClose }) => {
  const [form, setForm] = useState({ title: '', resp: '', hours: 8, group: 'General' });
  const ref = useRef();
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div className="kmodal-backdrop" onClick={(e) => e.target === ref.current && onClose()} ref={ref}>
      <div className="kmodal" style={{ maxWidth: '450px' }}>
        <div className="kmodal-header">
          <span className="kmodal-title">New Sprint Task</span>
          <button className="kmodal-close" onClick={onClose}><X size={18} /></button>
        </div>
        <div className="kmodal-body">
          <div style={{ color: 'var(--accent-primary)', marginBottom: '1.25rem', display: 'flex', justifyContent: 'center' }}>
            <div style={{ padding: '1rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '999px' }}>
              <ListTodo size={32} />
            </div>
          </div>
          
          <label className="kfield-label">TASK TITLE</label>
          <input className="kfield-input" autoFocus value={form.title} placeholder="e.g. Design user interface" onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />

          <div className="kmodal-row" style={{ marginTop: '1rem' }}>
            <div>
              <label className="kfield-label">RESPONSIBLE</label>
              <input className="kfield-input" value={form.resp} placeholder="e.g. Me" onChange={e => setForm(f => ({ ...f, resp: e.target.value }))} />
            </div>
            <div>
              <label className="kfield-label">EST. HRS</label>
              <input className="kfield-input" type="number" min="0" value={form.hours} onChange={e => setForm(f => ({ ...f, hours: e.target.value }))} />
            </div>
          </div>

          <label className="kfield-label" style={{ marginTop: '1rem' }}>GROUP / CATEGORY</label>
          <input className="kfield-input" value={form.group} placeholder="e.g. 1. Planning" onChange={e => setForm(f => ({ ...f, group: e.target.value }))} />
        </div>
        <div className="kmodal-footer">
          <button className="kbtn-cancel" onClick={onClose}>Cancel</button>
          <button 
            className="kbtn-save" 
            style={{ background: 'var(--accent-primary)' }} 
            disabled={!form.title}
            onClick={() => { onSave(form); onClose(); }}
          >
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
};

/* ---- Add Product Backlog Item Modal ---- */
const AddPBModal = ({ onSave, onClose }) => {
  const [form, setForm] = useState({ title: '', sprintPlanned: '1', priority: 'Must', estimate: 8 });
  const ref = useRef();
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div className="kmodal-backdrop" onClick={(e) => e.target === ref.current && onClose()} ref={ref}>
      <div className="kmodal" style={{ maxWidth: '450px' }}>
        <div className="kmodal-header">
          <span className="kmodal-title">New Task</span>
          <button className="kmodal-close" onClick={onClose}><X size={18} /></button>
        </div>
        <div className="kmodal-body">
          <div style={{ color: 'var(--accent-primary)', marginBottom: '1.25rem', display: 'flex', justifyContent: 'center' }}>
            <div style={{ padding: '1rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '999px' }}>
              <ListTodo size={32} />
            </div>
          </div>
          
          <label className="kfield-label">ITEM TITLE</label>
          <input className="kfield-input" autoFocus value={form.title} placeholder="e.g. Implement search function" onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />

          <div className="kmodal-row" style={{ marginTop: '1rem' }}>
            <div>
              <label className="kfield-label">SPRINT PLANNED</label>
              <input className="kfield-input" value={form.sprintPlanned} onChange={e => setForm(f => ({ ...f, sprintPlanned: e.target.value }))} />
            </div>
            <div>
              <label className="kfield-label">EST. HOURS</label>
              <input className="kfield-input" type="number" min="0" value={form.estimate} onChange={e => setForm(f => ({ ...f, estimate: e.target.value }))} />
            </div>
          </div>

          <label className="kfield-label" style={{ marginTop: '1rem' }}>PRIORITY</label>
          <select className="kfield-input" value={form.priority} onChange={e => setForm(f => ({ ...f, priority: e.target.value }))}>
            <option>Must</option>
            <option>Should</option>
            <option>Could</option>
            <option>Mo</option>
          </select>
        </div>
        <div className="kmodal-footer">
          <button className="kbtn-cancel" onClick={onClose}>Cancel</button>
          <button 
            className="kbtn-save" 
            style={{ background: 'var(--accent-primary)' }} 
            disabled={!form.title}
            onClick={() => { onSave(form); onClose(); }}
          >
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
};

const PriorityBadge = ({ priority }) => {
  if (!priority) return null;
  const cn = priority.toLowerCase();
  return <span className={`badge priority-${cn}`}>{priority}</span>;
}

const StatusBadge = ({ status }) => {
  const mapping = {
    'Y': 'done',
    'N': 'notdone',
    'Ongoing': 'review'
  };
  const labelMapping = {
    'Y': 'Done',
    'N': 'Not Done',
    'Ongoing': 'Ongoing'
  };
  return <span className={`badge status-${mapping[status] || 'todo'}`}>{labelMapping[status] || status}</span>;
}

const EditableCell = ({ value, onBlur, type = 'text', options = [], truncate = false, showDashForZero = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [val, setVal] = useState(value);

  const handleBlur = () => {
    setIsEditing(false);
    onBlur(val);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleBlur();
  };

  if (isEditing) {
    if (type === 'select') {
      return (
        <select
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onBlur={handleBlur}
          autoFocus
          className="edit-select"
        >
          {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      );
    }
    return (
      <input
        type={type}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        autoFocus
        className={`edit-input ${type === 'number' ? 'number' : ''}`}
      />
    );
  }

  const getDisplayValue = () => {
    if (type === 'status') return <StatusBadge status={value} />;
    if (type === 'priority') return <PriorityBadge priority={value} />;
    if (showDashForZero && (value === 0 || value === '0')) {
      return <span style={{ color: 'var(--text-dark)', opacity: 0.5 }}>-</span>;
    }
    return (value === 0 || value === '0' ? '0' : value || '-');
  };

  return (
    <div
      className={`editable-cell ${truncate ? 'truncate-text' : ''}`}
      onClick={() => setIsEditing(true)}
      title={truncate ? value : undefined}
    >
      {getDisplayValue()}
    </div>
  );
};

const Sidebar = ({ activeSection, onNavigate, theme, setTheme, isCollapsed, setIsCollapsed }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'product', label: 'Product Backlog', icon: CalendarDays },
  ];

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', overflow: 'hidden' }}>
          <Flame className="sidebar-logo" size={24} />
          {!isCollapsed && <span className="sidebar-title">ScrumBoard</span>}
        </div>
        <button
          className="collapse-toggle"
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      <nav className="sidebar-nav">
        {!isCollapsed && <div className="nav-label">Navigation</div>}
        {navItems.map((item) => (
          <div
            key={item.id}
            className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
            title={isCollapsed ? item.label : ''}
          >
            <item.icon className="nav-icon" size={20} />
            {!isCollapsed && <span className="nav-text">{item.label}</span>}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="theme-toggle-container">
          <div className="theme-label" style={{ color: 'var(--text-main)', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
            {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
            {!isCollapsed && <span>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>}
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={theme === 'dark'}
              onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </aside>
  );
};

const SprintToggle = ({ sprint, setSprint }) => (
  <div className="sprint-tabs-container">
    <div className="sprint-label">Active Sprint:</div>
    <div className="sprint-tabs">
      <button
        className={`sprint-tab ${sprint === 'Sprint 1' ? 'active' : ''}`}
        onClick={() => setSprint('Sprint 1')}
      >
        Sprint 1
      </button>
      <button
        className={`sprint-tab ${sprint === 'Sprint 2' ? 'active' : ''}`}
        onClick={() => setSprint('Sprint 2')}
      >
        Sprint 2
      </button>
    </div>
  </div>
);

const SprintBacklogCard = ({ task, sprint, idx, updateCell, deleteRow }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const actualEffort = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].reduce((acc, d) => acc + (parseFloat(task[`d${d}`]) || 0), 0);

  return (
    <div className="backlog-card">
      <div className="backlog-card-header">
        <div className="backlog-card-title">
          <EditableCell value={task.title} onBlur={(v) => updateCell(idx, 'title', v)} />
        </div>
        <button className="trash-btn" onClick={() => deleteRow(idx, task.title)} style={{ color: 'var(--status-notdone)', background: 'none', border: 'none', cursor: 'pointer' }}>
          <Trash2 size={16} />
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="backlog-card-meta">
          <span className="badge" style={{ background: 'var(--bg-card)' }}>{task.group || 'General'}</span>
          {sprint === 'Sprint 1' ? (
            <span className="badge" style={{ color: 'var(--accent-primary)' }}>{task.resp}</span>
          ) : (
            <PriorityBadge priority={task.priority} />
          )}
        </div>
        <button className="card-details-toggle" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          {isExpanded ? 'Less' : 'Details'}
        </button>
      </div>

      <div className="details-grid">
        <div className="data-item">
          <span className="data-label">EST. (HRS)</span>
          <span className="data-value">{task.hours}h</span>
        </div>
        <div className="data-item">
          <span className="data-label">ACTUAL (HRS)</span>
          <span className="data-value" style={{ color: 'var(--accent-secondary)' }}>{actualEffort}h</span>
        </div>
      </div>

      {isExpanded && (
        <div className="backlog-card-details">
          <div className="data-item" style={{ marginBottom: '0.8rem' }}>
            <span className="data-label">WEEK 1 EFFORT</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.4rem' }}>
              {[1, 2, 3, 4, 5].map(d => (
                <div key={d} style={{ fontSize: '0.7rem', background: 'var(--bg-card)', padding: '3px 6px', borderRadius: '4px', border: '1px solid var(--border-light)' }}>
                  {['Mon', 'Tues', 'Wed', 'Thur', 'Fri'][d - 1]}: {task[`d${d}`] || 0}
                </div>
              ))}
            </div>
          </div>
          <div className="data-item">
            <span className="data-label">WEEK 2 EFFORT</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.4rem' }}>
              {[6, 7, 8, 9, 10].map(d => (
                <div key={d} style={{ fontSize: '0.7rem', background: 'var(--bg-card)', padding: '3px 6px', borderRadius: '4px', border: '1px solid var(--border-light)' }}>
                  {['Mon', 'Tues', 'Wed', 'Thur', 'Fri'][d - 6]}: {task[`d${d}`] || 0}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SprintBacklogCardView = ({ backlog, sprint, updateCell, deleteRow }) => (
  <div className="card-view mobile-only">
    {backlog.map((task, idx) => (
      <SprintBacklogCard key={idx} task={task} sprint={sprint} idx={idx} updateCell={updateCell} deleteRow={deleteRow} />
    ))}
  </div>
);

/* ---- Kanban Edit Modal ---- */
const KanbanEditModal = ({ item, onSave, onClose }) => {
  const [form, setForm] = useState({ ...item });
  const ref = useRef();

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div className="kmodal-backdrop" onClick={(e) => e.target === ref.current && onClose()} ref={ref}>
      <div className="kmodal">
        <div className="kmodal-header">
          <span className="kmodal-title">Edit Item</span>
          <button className="kmodal-close" onClick={onClose}><X size={18} /></button>
        </div>
        <div className="kmodal-body">
          <label className="kfield-label">TASK</label>
          <input className="kfield-input" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />

          <label className="kfield-label">ISSUES / NOTES</label>
          <textarea className="kfield-input kfield-textarea" value={form.issues} onChange={e => setForm(f => ({ ...f, issues: e.target.value }))} />

          <div className="kmodal-row">
            <div>
              <label className="kfield-label">SPRINT PLANNED</label>
              <input className="kfield-input" value={form.sprintPlanned} onChange={e => setForm(f => ({ ...f, sprintPlanned: e.target.value }))} />
            </div>
            <div>
              <label className="kfield-label">EST. (HRS)</label>
              <input className="kfield-input" type="number" min="0" value={form.estimate} onChange={e => setForm(f => ({ ...f, estimate: e.target.value }))} />
            </div>
          </div>

          <div className="kmodal-row">
            <div>
              <label className="kfield-label">PRIORITY</label>
              <select className="kfield-input" value={form.priority} onChange={e => setForm(f => ({ ...f, priority: e.target.value }))}>
                <option>Must</option>
                <option>Should</option>
                <option>Could</option>
              </select>
            </div>
            <div>
              <label className="kfield-label">STATUS</label>
              <select className="kfield-input" value={form.done} onChange={e => setForm(f => ({ ...f, done: e.target.value }))}>
                <option value="N">To Do</option>
                <option value="Ongoing">In Progress</option>
                <option value="Y">Done</option>
              </select>
            </div>
          </div>
        </div>
        <div className="kmodal-footer">
          <button className="kbtn-cancel" onClick={onClose}>Cancel</button>
          <button className="kbtn-save" onClick={() => { onSave(form); onClose(); }}>Save Changes</button>
        </div>
      </div>
    </div>
  );
};
/* ---- Confirm Delete Modal ---- */
const ConfirmDeleteModal = ({ title, onConfirm, onClose }) => {
  const ref = useRef();
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div className="kmodal-backdrop" onClick={(e) => e.target === ref.current && onClose()} ref={ref}>
      <div className="kmodal" style={{ maxWidth: '400px' }}>
        <div className="kmodal-header">
          <span className="kmodal-title">Delete Item</span>
          <button className="kmodal-close" onClick={onClose}><X size={18} /></button>
        </div>
        <div className="kmodal-body" style={{ textAlign: 'center', padding: '2rem 1.25rem' }}>
          <div style={{ color: '#ef4444', marginBottom: '1.25rem', display: 'flex', justifyContent: 'center' }}>
            <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '999px' }}>
              <Trash2 size={40} />
            </div>
          </div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-main)', margin: '0 0 0.5rem 0' }}>Are you sure?</h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
            You are about to delete <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>"{title}"</span>.<br/> This action cannot be undone.
          </p>
        </div>
        <div className="kmodal-footer">
          <button className="kbtn-cancel" onClick={onClose}>Cancel</button>
          <button className="kbtn-save" style={{ background: '#ef4444' }} onClick={() => { onConfirm(); onClose(); }}>Delete Item</button>
        </div>
      </div>
    </div>
  );
};

/* ---- Kanban Card ---- */
const KanbanCard = ({ item, idx, onEdit, deleteRow, onDragStart, updateCell }) => {
  const [showMove, setShowMove] = useState(false);
  const moveRef = useRef();
  const isHighlighted = item.title === 'Fine payment portal';

  useEffect(() => {
    const handleOutside = (e) => { if (moveRef.current && !moveRef.current.contains(e.target)) setShowMove(false); };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const moveOptions = [
    { label: 'To Do', val: 'N', color: '#6366f1' },
    { label: 'In Progress', val: 'Ongoing', color: '#f59e0b' },
    { label: 'Done', val: 'Y', color: '#10b981' }
  ].filter(opt => opt.val !== item.done);

  return (
    <div
      className={`kanban-card${isHighlighted ? ' kanban-card--highlight' : ''}`}
      draggable
      onDragStart={(e) => onDragStart(e, idx)}
    >
      <div className="kanban-card-header">
        <span className="kanban-card-title" onClick={() => onEdit(idx)} title="Click to edit">
          {item.title}
        </span>
        <button
          className="kanban-delete-btn"
          onClick={() => deleteRow(idx, item.title)}
          title="Delete"
        >
          <Trash2 size={13} />
        </button>
      </div>
      {item.issues && (
        <p className="kanban-card-desc">{item.issues}</p>
      )}
      <div className="kanban-card-footer">
        <div className="kanban-card-badges">
          <PriorityBadge priority={item.priority} />
        </div>
        <div className="kanban-card-meta">
          <span className="kanban-meta-item">Sprint {item.sprintPlanned}</span>
          <span className="kanban-meta-item">{item.estimate}h</span>
          <button className="kanban-edit-btn" onClick={() => onEdit(idx)} title="Edit">
            Edit
          </button>
        </div>
      </div>
      <div className="kanban-card-mobilestatus" ref={moveRef}>
        <button className="kanban-move-btn" onClick={() => setShowMove(!showMove)}>
          Move to <span>&rarr;</span>
        </button>
        {showMove && (
          <div className="kanban-move-dropdown">
            {moveOptions.map(opt => (
              <button 
                key={opt.val} 
                className="kanban-move-option"
                style={{ '--opt-color': opt.color }}
                onClick={() => { updateCell(idx, 'done', opt.val); setShowMove(false); }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/* ---- Kanban Board ---- */
const KanbanBoard = ({ backlog, updateCell, deleteRow, addRow }) => {
  const [editIdx, setEditIdx] = useState(null);
  const [dragOverCol, setDragOverCol] = useState(null);
  const [activeTab, setActiveTab] = useState('todo');
  const dragSrcIdx = useRef(null);

  const columns = [
    { id: 'todo',    label: 'TO DO',       statusVal: 'N',       color: '#6366f1' },
    { id: 'ongoing', label: 'IN PROGRESS', statusVal: 'Ongoing', color: '#f59e0b' },
    { id: 'done',    label: 'DONE',        statusVal: 'Y',       color: '#10b981' },
  ];

  const handleDragStart = (e, idx) => {
    dragSrcIdx.current = idx;
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (e, col) => {
    e.preventDefault();
    if (dragSrcIdx.current !== null) {
      updateCell(dragSrcIdx.current, 'done', col.statusVal);
      dragSrcIdx.current = null;
    }
    setDragOverCol(null);
  };

  const handleSaveEdit = (form) => {
    Object.entries(form).forEach(([key, val]) => {
      if (backlog[editIdx][key] !== val) updateCell(editIdx, key, val);
    });
  };

  return (
    <>
      {editIdx !== null && (
        <KanbanEditModal
          item={backlog[editIdx]}
          onSave={handleSaveEdit}
          onClose={() => setEditIdx(null)}
        />
      )}
      <div className="kanban-mobile-tabs">
        {columns.map(col => {
          const items = backlog.map((item, idx) => ({ item, idx })).filter(({ item }) => item.done === col.statusVal);
          return (
            <button
              key={col.id}
              className={`kanban-tab ${activeTab === col.id ? 'active' : ''}`}
              style={{ '--tab-color': col.color }}
              onClick={() => setActiveTab(col.id)}
            >
              {col.label} <span className="kanban-tab-count">{items.length}</span>
            </button>
          );
        })}
      </div>
      <div className="kanban-board-wrapper">
        <div className={`kanban-board active-tab-${activeTab}`}>
          {columns.map(col => {
            const items = backlog.map((item, idx) => ({ item, idx })).filter(({ item }) => item.done === col.statusVal);
            const isOver = dragOverCol === col.id;
            return (
              <div
                key={col.id}
                className={`kanban-column kanban-column-${col.id} ${isOver ? ' kanban-column--over' : ''}`}
                onDragOver={(e) => { e.preventDefault(); setDragOverCol(col.id); }}
                onDragLeave={() => setDragOverCol(null)}
                onDrop={(e) => handleDrop(e, col)}
              >
                <div className="kanban-column-header" style={{ '--col-accent': col.color }}>
                  <span className="kanban-column-label">{col.label}</span>
                  <span className="kanban-column-count">{items.length}</span>
                </div>
                <div className="kanban-column-body">
                  {items.map(({ item, idx }) => (
                    <KanbanCard
                      key={idx}
                      item={item}
                      idx={idx}
                      onEdit={setEditIdx}
                      deleteRow={deleteRow}
                      onDragStart={handleDragStart}
                      updateCell={updateCell}
                    />
                  ))}
                  {items.length === 0 && (
                    <div className={`kanban-empty${isOver ? ' kanban-empty--over' : ''}`}>
                      Drop here
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="kanban-scroll-indicator desktop-hidden">
          <ChevronRight size={24} color="var(--text-muted)" />
        </div>
      </div>
    </>
  );
};

const MobileNav = ({ activeSection, onNavigate, theme, setTheme, isOpen, setIsOpen }) => (
  <>
    <header className="top-nav">
      <div className="top-nav-logo">
        <Flame color="var(--accent-primary)" size={24} />
        <span>ScrumBoard</span>
      </div>
      <button className="mobile-menu-toggle" onClick={() => setIsOpen(true)}>
        <Menu size={24} />
      </button>
    </header>

    {isOpen && (
      <div className="mobile-menu-overlay">
        <div className="mobile-menu-header">
          <div className="top-nav-logo">
            <Flame color="var(--accent-primary)" size={28} />
            <span style={{ fontSize: '1.25rem' }}>ScrumBoard</span>
          </div>
          <button className="mobile-menu-toggle" onClick={() => setIsOpen(false)}>
            <X size={28} />
          </button>
        </div>

        <div className="mobile-menu-items">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'product', label: 'Product Backlog', icon: CalendarDays },
          ].map(item => (
            <div
              key={item.id}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => { onNavigate(item.id); setIsOpen(false); }}
            >
              <item.icon size={22} />
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 'auto', padding: '1.25rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
          <div className="theme-toggle-container">
            <div className="theme-label">
              {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
              <span style={{ fontSize: '1rem' }}>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
            </div>
            <label className="switch">
              <input type="checkbox" checked={theme === 'dark'} onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </div>
    )}
  </>
);

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [sprint, setSprint] = useState('Sprint 1');
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [dashboardView, setDashboardView] = useState('chart'); // 'chart' or 'table'
  const [hiddenTasks, setHiddenTasks] = useState([]);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsCollapsed(true);
    }
  }, []);

  const [s1Backlog, setS1Backlog] = useState(sprintBacklogS1);
  const [s2Backlog, setS2Backlog] = useState(sprintBacklogS2);
  const [pbLocal, setPbLocal] = useState(productBacklog);

  const currentBacklog = sprint === 'Sprint 1' ? s1Backlog : s2Backlog;
  const setBacklog = (newBacklog) => {
    if (sprint === 'Sprint 1') setS1Backlog(newBacklog);
    else setS2Backlog(newBacklog);
  };

  // KPIs
  const totalHours = currentBacklog.reduce((acc, task) => acc + (parseFloat(task.hours) || 0), 0);
  const completedHours = currentBacklog.reduce((acc, task) => {
    let taskDone = 0;
    for (let i = 1; i <= 10; i++) taskDone += parseFloat(task[`d${i}`]) || 0;
    return acc + taskDone;
  }, 0);

  // Dynamic Burndown Calculation
  const generateBurndown = (backlog) => {
    const total = backlog.reduce((acc, task) => acc + (parseFloat(task.hours) || 0), 0);
    const data = [];
    let currentActual = total;

    // Day 1 to 11
    const chartLabels = ['Est. Effort', 'Mon (W1)', 'Tues (W1)', 'Wed (W1)', 'Thur (W1)', 'Fri (W1)', 'Mon (W2)', 'Tues (W2)', 'Wed (W2)', 'Thur (W2)', 'Fri (W2)'];
    for (let i = 0; i <= 10; i++) {
      const dayLabel = chartLabels[i];
      const ideal = Math.max(0, total - (total / 10) * i);

      if (i > 0) {
        // Correct the effort day index. Task day property is d1, d2, etc.
        const effortOnDay = backlog.reduce((acc, task) => acc + (parseFloat(task[`d${i}`]) || 0), 0);
        currentActual -= effortOnDay;
      }

      data.push({
        day: dayLabel,
        ideal: parseFloat(ideal.toFixed(1)),
        actual: parseFloat(Math.max(0, currentActual).toFixed(1))
      });
    }
    return data;
  };

  const currentBurndown = generateBurndown(currentBacklog);
  const remainingHours = currentBurndown[currentBurndown.length - 1].actual;
  const progressPercent = Math.round((completedHours / totalHours) * 100) || 0;

  // Actions
  const updateCell = (index, field, value) => {
    const next = [...currentBacklog];
    next[index][field] = field === 'hours' || field.startsWith('d') ? parseFloat(value) || 0 : value;
    setBacklog(next);
  };

  const updatePbCell = (index, field, value) => {
    const next = [...pbLocal];
    next[index][field] = field === 'estimate' ? parseFloat(value) || 0 : value;
    setPbLocal(next);
  };

  const [deleteModal, setDeleteModal] = useState({ isOpen: false, type: '', index: null, title: '' });
  const [addTaskModal, setAddTaskModal] = useState(false);
  const [addPbModal, setAddPbModal] = useState(false);

  const confirmDelete = (type, index, title) => {
    setDeleteModal({ isOpen: true, type, index, title });
  };

  const handleFinalDelete = () => {
    if (deleteModal.type === 'pb') {
      const next = [...pbLocal];
      next.splice(deleteModal.index, 1);
      setPbLocal(next);
    } else {
      const next = [...currentBacklog];
      next.splice(deleteModal.index, 1);
      setBacklog(next);
    }
  };

  const handleAddTask = (formData) => {
    const newId = `T-${Date.now()}`;
    const newTask = { 
      id: newId, 
      title: formData.title || 'New Task', 
      resp: formData.resp || '-', 
      status: 'N', 
      hours: parseFloat(formData.hours) || 0,
      group: formData.group || 'General',
      d1: 0, d2: 0, d3: 0, d4: 0, d5: 0, d6: 0, d7: 0, d8: 0, d9: 0, d10: 0 
    };
    setBacklog([...currentBacklog, newTask]);
  };

  const handleAddPbItem = (formData) => {
    const newId = `PB-${Date.now()}`;
    const newItem = { 
      id: newId, 
      title: formData.title || 'New Requirement', 
      sprintPlanned: formData.sprintPlanned || '1', 
      priority: formData.priority || 'Mo', 
      estimate: parseFloat(formData.estimate) || 0, 
      done: 'N',
      issues: ''
    };
    setPbLocal([...pbLocal, newItem]);
  };

  const deleteRow = (index) => {
    const next = currentBacklog.filter((_, i) => i !== index);
    setBacklog(next);
  };

  const deletePbRow = (index) => {
    const next = pbLocal.filter((_, i) => i !== index);
    setPbLocal(next);
  };

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
  };

  return (
    <div className={`dashboard-container ${theme === 'light' ? 'light-mode' : ''}`}>
      <MobileNav
        activeSection={activeSection}
        onNavigate={setActiveSection}
        theme={theme}
        setTheme={setTheme}
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
      />
      <Sidebar
        activeSection={activeSection}
        onNavigate={setActiveSection}
        theme={theme}
        setTheme={setTheme}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      <div className="content-wrapper">


        <main className="main-content">
          {activeSection === 'dashboard' ? (
            <>


              {/* Top Cards Grid */}


              {/* Backlog Section */}
              <section className="tables-grid">
                {/* Sprint Backlog */}
                <div className="table-panel" id="sprint-backlog-section">
                  <div className="table-header">
                    <div className="section-title" style={{ margin: 0 }}>
                      <ListTodo color="var(--accent-primary)" />
                      <FusedSprintToggle current={sprint} setSprint={setSprint} />
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                      <button 
                        className="add-row-btn" 
                        onClick={() => setAddTaskModal(true)}
                        style={{ background: 'var(--accent-primary)', border: 'none', color: 'white' }}
                      >
                        <Plus size={18} />
                        Add Task
                      </button>
                      <div className="v-divider"></div>
                      <button 
                        className="view-toggle-btn"
                        onClick={() => setDashboardView(dashboardView === 'chart' ? 'table' : 'chart')}
                      >
                        {dashboardView === 'chart' ? 'View Table' : 'View Chart'}
                      </button>
                      <span className="badge" style={{ background: 'var(--bg-card)' }}>
                        {currentBacklog.length} Tasks
                      </span>
                    </div>
                  </div>

                  {dashboardView === 'chart' ? (
                    <div className="chart-backlog-view">
                      <div className="backlog-stats-row">
                        <div className="b-stat-card">
                          <span className="b-stat-label">Total Estimated Hours</span>
                          <div className="b-stat-main">
                            <span className="b-stat-value">{totalHours} hrs</span>
                          </div>
                        </div>
                        <div className="b-stat-card">
                          <span className="b-stat-label">Total Actual Hours</span>
                          <div className="b-stat-main">
                            <span className="b-stat-value">{completedHours} hrs</span>
                            <div className={`b-stat-indicator ${completedHours > totalHours ? 'over' : 'under'}`}>
                              <span>
                                {Math.abs(totalHours - completedHours).toFixed(1)} hrs {completedHours > totalHours ? 'over' : 'under'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="backlog-bar-container">
                        <ResponsiveContainer width="100%" height={350}>
                          <BarChart
                            data={(() => {
                              const dayLabels = ['Mon (W1)', 'Tues (W1)', 'Wed (W1)', 'Thur (W1)', 'Fri (W1)', 'Mon (W2)', 'Tues (W2)', 'Wed (W2)', 'Thur (W2)', 'Fri (W2)'];
                              const days = ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri'];
                              return days.map((d, i) => {
                                const entry = { name: d, label: dayLabels[i], week: i < 5 ? 1 : 2 };
                                currentBacklog.forEach(t => {
                                  entry[t.title] = parseFloat(t[`d${i+1}`]) || 0;
                                });
                                return entry;
                              });
                            })()}
                            margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-light)" />
                            <XAxis 
                              dataKey="label" 
                              stroke="var(--text-dark)" 
                              tick={{ fill: 'var(--text-dark)', fontSize: 11 }} 
                              axisLine={false}
                              tickLine={false}
                            />
                            <YAxis 
                              stroke="var(--text-dark)" 
                              tick={{ fill: 'var(--text-dark)', fontSize: 12 }}
                              axisLine={false}
                              tickLine={false}
                            />
                            <Tooltip 
                              cursor={{ fill: 'rgba(255, 255, 255, 0.03)' }}
                              content={({ active, payload, label }) => {
                                if (active && payload && payload.length) {
                                  // Group payload by task group
                                  const groups = {};
                                  payload.forEach(entry => {
                                    const task = currentBacklog.find(t => t.title === entry.name);
                                    const groupName = task ? (task.group || 'General') : 'General';
                                    if (!groups[groupName]) groups[groupName] = [];
                                    groups[groupName].push(entry);
                                  });

                                  return (
                                    <div className="chart-tooltip-dark" style={{ minWidth: '220px' }}>
                                      <p className="tooltip-label" style={{ fontSize: '0.8rem', opacity: 0.8, marginBottom: '8px' }}>
                                        {label.replace(' (W2)', '')} - Week {payload[0].payload.week}
                                      </p>
                                      {Object.keys(groups).map(g => (
                                        <div key={g} style={{ marginBottom: '12px' }}>
                                          <div style={{ color: 'var(--accent-primary)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.05em' }}>
                                            {g}
                                          </div>
                                          {groups[g].map((entry, index) => (
                                            <div key={`item-${index}`} className="tooltip-item" style={{ marginBottom: '4px' }}>
                                              <div className="dot" style={{ backgroundColor: entry.color, width: '8px', height: '8px' }}></div>
                                              <span className="name" style={{ fontSize: '0.8rem' }}>{entry.name}:</span>
                                              <span className="value" style={{ fontSize: '0.8rem' }}>{entry.value}h</span>
                                            </div>
                                          ))}
                                        </div>
                                      ))}
                                    </div>
                                  );
                                }
                                return null;
                              }}
                            />
                            <ReferenceLine x="Mon (W2)" stroke="var(--accent-primary)" strokeWidth={1} strokeDasharray="3 3" />
                            {currentBacklog.map((task, idx) => {
                              if (hiddenTasks.includes(task.title)) return null;
                              const taskColors = ['#6366f1', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#ec4899', '#14b8a6', '#f97316', '#a855f7'];
                              return (
                                <Bar 
                                  key={task.title} 
                                  dataKey={task.title} 
                                  stackId="a" 
                                  fill={taskColors[idx % taskColors.length]} 
                                  radius={[idx === currentBacklog.length - 1 ? 4 : 0, idx === currentBacklog.length - 1 ? 4 : 0, 0, 0]} 
                                />
                              );
                            })}
                          </BarChart>
                        </ResponsiveContainer>
                        
                        <div className="backlog-chart-legend">
                          {currentBacklog.map((task, idx) => {
                            const taskColors = ['#6366f1', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#ec4899', '#14b8a6', '#f97316', '#a855f7'];
                            const isHidden = hiddenTasks.includes(task.title);
                            return (
                              <button 
                                key={task.title} 
                                className={`legend-item ${isHidden ? 'hidden' : ''}`}
                                onClick={() => {
                                  if (isHidden) setHiddenTasks(hiddenTasks.filter(t => t !== task.title));
                                  else setHiddenTasks([...hiddenTasks, task.title]);
                                }}
                              >
                                <span className="legend-dot" style={{ background: isHidden ? 'var(--text-dark)' : taskColors[idx % taskColors.length] }}></span>
                                {task.title}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="table-wrapper">
                      <table className="custom-table">
                        <thead>
                          <tr>
                            <th rowSpan={2} style={{ minWidth: '220px' }}>TASK</th>
                            <th rowSpan={2}>{sprint === 'Sprint 1' ? 'RESP' : 'PRIORITY'}</th>
                            <th rowSpan={2}>EST. (HRS)</th>
                            <th colSpan={5} style={{ textAlign: 'center', backgroundColor: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)' }}>WEEK 1</th>
                            <th colSpan={5} style={{ textAlign: 'center', backgroundColor: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)' }}>WEEK 2</th>
                            <th rowSpan={2}>ACTUAL (HRS)</th>
                            <th rowSpan={2} style={{ width: '50px' }}></th>
                          </tr>
                          <tr>
                            {['Mon', 'Tues', 'Wed', 'Thur', 'Fri'].map((day, i) => (
                              <th key={`w1-${i}`} style={{ width: '40px', fontSize: '0.7rem' }}>{day}</th>
                            ))}
                            {['Mon', 'Tues', 'Wed', 'Thur', 'Fri'].map((day, i) => (
                              <th key={`w2-${i}`} style={{ width: '40px', fontSize: '0.7rem' }}>{day}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {(() => {
                            const rows = [];
                            let lastGroup = null;
                            currentBacklog.forEach((task, idx) => {
                              if (task.group !== lastGroup) {
                                rows.push(
                                  <tr key={`group-${task.group || idx}`} className="group-header-row">
                                    <td colSpan={15}>{task.group || 'General'}</td>
                                  </tr>
                                );
                                lastGroup = task.group;
                              }
                              const actualEffort = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].reduce((acc, d) => acc + (parseFloat(task[`d${d}`]) || 0), 0);
                              rows.push(
                                <tr key={idx}>
                                  <td style={{ fontWeight: 500, paddingLeft: '1.5rem' }}>
                                    <EditableCell value={task.title} onBlur={(v) => updateCell(idx, 'title', v)} />
                                  </td>
                                  <td>
                                    <EditableCell
                                      value={sprint === 'Sprint 1' ? task.resp : task.priority}
                                      type={sprint === 'Sprint 1' ? 'text' : 'priority'}
                                      onBlur={(v) => updateCell(idx, sprint === 'Sprint 1' ? 'resp' : 'priority', v)}
                                    />
                                  </td>
                                  <td style={{ fontWeight: 600 }}>
                                    <EditableCell value={task.hours} type="number" onBlur={(v) => updateCell(idx, 'hours', v)} />
                                  </td>
                                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(day => (
                                    <td key={day}>
                                      <EditableCell
                                        value={task[`d${day}`]}
                                        type="number"
                                        showDashForZero={true}
                                        onBlur={(v) => updateCell(idx, `d${day}`, v)}
                                      />
                                    </td>
                                  ))}
                                  <td className="actual-hrs">
                                    {actualEffort}
                                  </td>
                                  <td style={{ textAlign: 'right', paddingRight: '1rem' }}>
                                    <button className="delete-row-btn" onClick={() => confirmDelete('sprint', idx, task.title)}>
                                      <Trash2 size={13} />
                                    </button>
                                  </td>
                                </tr>
                              );
                            });

                            return rows;
                          })()}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </section>

              {/* Chart Section */}
              <section className="chart-section" id="burndown-section">
                <div className="section-title">
                  <Activity color="var(--accent-primary)" />
                  Sprint Burndown Progress
                </div>
                <div style={{ position: 'relative', width: '100%', height: '300px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={currentBurndown}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                      <XAxis dataKey="day" stroke="var(--text-muted)" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                      <YAxis stroke="var(--text-muted)" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{ backgroundColor: 'var(--bg-panel)', borderColor: 'var(--border-light)', borderRadius: '8px', boxShadow: 'var(--shadow-md)' }}
                        itemStyle={{ color: 'var(--text-main)' }}
                      />
                      <Legend wrapperStyle={{ paddingTop: '20px' }} />
                      <Line
                        type="monotone"
                        dataKey="ideal"
                        name="Ideal Burndown"
                        stroke="var(--text-dark)"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="actual"
                        name="Actual Remaining"
                        stroke="var(--accent-primary)"
                        strokeWidth={3}
                        activeDot={{ r: 8, stroke: 'var(--bg-panel)', strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </section>
            </>
          ) : (
            <section id="product-backlog-section" style={{ padding: '0 1rem 1.5rem' }}>
              <div className="table-header" style={{ marginBottom: '1.5rem' }}>
                <div className="section-title" style={{ margin: 0 }}>
                  <CalendarDays color="var(--accent-secondary)" />
                  Product Backlog
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <span className="badge" style={{ background: 'var(--bg-card)' }}>
                    {pbLocal.length} Items
                  </span>
                  <button 
                    className="add-row-btn" 
                    onClick={() => setAddPbModal(true)} 
                    style={{ margin: 0, background: 'var(--accent-primary)', border: 'none', color: 'white' }}
                  >
                    <Plus size={18} />
                    Add Task
                  </button>
                </div>
              </div>
                <KanbanBoard
                  backlog={pbLocal}
                  updateCell={updatePbCell}
                  deleteRow={(idx, title) => confirmDelete('pb', idx, title)}
                  addRow={() => setAddPbModal(true)}
                />
            </section>
          )}

          {deleteModal.isOpen && (
            <ConfirmDeleteModal
              title={deleteModal.title}
              onConfirm={handleFinalDelete}
              onClose={() => setDeleteModal({ ...deleteModal, isOpen: false })}
            />
          )}

          {addTaskModal && (
            <AddTaskModal
              onSave={handleAddTask}
              onClose={() => setAddTaskModal(false)}
            />
          )}

          {addPbModal && (
            <AddPBModal
              onSave={handleAddPbItem}
              onClose={() => setAddPbModal(false)}
            />
          )}

        </main>
      </div>
    </div>
  );
}
