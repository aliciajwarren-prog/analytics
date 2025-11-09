const dropzone = document.querySelector('#dropzone');
const table = document.querySelector('#results-table');
const tableHeader = document.querySelector('#table-header');
const tableBody = document.querySelector('#table-body');
const emptyState = document.querySelector('#empty-state');
const clearButton = document.querySelector('#clear-view');
const chipBin = document.querySelector('#chip-bin');
const playgroundCount = document.querySelector('#playground-count');
const tooltip = document.querySelector('#tooltip');
const activeView = document.querySelector('#active-view');
const appliedFieldsList = document.querySelector('#applied-fields');

const viewDefinitions = {
  country: {
    label: 'Country',
    description: 'Top consuming countries ranked by denials',
    columns: [
      { key: 'rank', label: '#' },
      { key: 'country', label: 'Country' },
      { key: 'organizations', label: 'Organizations', align: 'center' },
      { key: 'denials', label: 'Event types: Denials', align: 'right' }
    ],
    rows: [
      {
        rank: 1,
        country: { name: 'Australia', flag: 'https://flagcdn.com/w40/au.png', tone: ['#1d4ed8', '#1e40af'] },
        organizations: 3,
        denials: '2,764,063'
      },
      {
        rank: 2,
        country: { name: 'Canada', flag: 'https://flagcdn.com/w40/ca.png', tone: ['#ef4444', '#dc2626'] },
        organizations: 6,
        denials: '5,234,674'
      },
      {
        rank: 3,
        country: { name: 'China', flag: 'https://flagcdn.com/w40/cn.png', tone: ['#f97316', '#ea580c'] },
        organizations: 8,
        denials: '8,453,405'
      },
      {
        rank: 4,
        country: { name: 'Germany', flag: 'https://flagcdn.com/w40/de.png', tone: ['#facc15', '#b45309'] },
        organizations: 9,
        denials: '954,345'
      },
      {
        rank: 5,
        country: { name: 'United Kingdom', flag: 'https://flagcdn.com/w40/gb.png', tone: ['#6366f1', '#4338ca'] },
        organizations: 23,
        denials: '6,453,405'
      }
    ]
  },
  organization: {
    label: 'Organization',
    description: 'Usage by organization with trend indicators',
    columns: [
      { key: 'rank', label: '#' },
      { key: 'organization', label: 'Organization' },
      { key: 'trend', label: 'Trend', align: 'center' },
      { key: 'country', label: 'Country' },
      { key: 'sessions', label: 'Sessions', align: 'right' }
    ],
    rows: [
      { rank: 1, organization: 'University of Toronto', country: 'Canada', sessions: 175, trend: 'stable' },
      { rank: 2, organization: 'Washington State University', country: 'United States', sessions: 175, trend: 'up' },
      { rank: 3, organization: 'University of Kansas', country: 'United States', sessions: 175, trend: 'flat' },
      { rank: 4, organization: 'University of Calgary', country: 'Canada', sessions: 175, trend: 'down' },
      { rank: 5, organization: 'University of Toronto', country: 'Canada', sessions: 175, trend: 'up' },
      { rank: 6, organization: 'Washington State University', country: 'United States', sessions: 175, trend: 'flat' },
      { rank: 7, organization: 'University of Kansas', country: 'United States', sessions: 175, trend: 'up' },
      { rank: 8, organization: 'University of Calgary', country: 'Canada', sessions: 175, trend: 'down' }
    ]
  },
  accessType: {
    label: 'Access type',
    description: 'Event distribution by access type',
    columns: [
      { key: 'rank', label: '#' },
      { key: 'access', label: 'Access type' },
      { key: 'sessions', label: 'Sessions', align: 'right' },
      { key: 'denials', label: 'Denials', align: 'right' }
    ],
    rows: [
      { rank: 1, access: 'Direct', sessions: '45', denials: '1,245' },
      { rank: 2, access: 'Discovery service', sessions: '18', denials: '675' },
      { rank: 3, access: 'Link resolver', sessions: '7', denials: '128' },
      { rank: 4, access: 'Interlibrary loan', sessions: '3', denials: '58' },
      { rank: 5, access: 'Other', sessions: '2', denials: '34' }
    ]
  },
  format: {
    label: 'Format',
    description: 'Content performance by format',
    columns: [
      { key: 'rank', label: '#' },
      { key: 'format', label: 'Format' },
      { key: 'views', label: 'Views', align: 'right' },
      { key: 'unique', label: 'Unique titles', align: 'right' }
    ],
    rows: [
      { rank: 1, format: 'Journals', views: '38', unique: '31' },
      { rank: 2, format: 'Databases', views: '21', unique: '12' },
      { rank: 3, format: 'eBooks', views: '9', unique: '5' },
      { rank: 4, format: 'Newspapers', views: '6', unique: '4' },
      { rank: 5, format: 'Media', views: '1', unique: '0' }
    ]
  },
  topic: {
    label: 'Topic',
    description: 'Top trending subject areas',
    columns: [
      { key: 'rank', label: '#' },
      { key: 'topic', label: 'Topic' },
      { key: 'change', label: '90-day change', align: 'center' },
      { key: 'sessions', label: 'Sessions', align: 'right' }
    ],
    rows: [
      { rank: 1, topic: 'Artificial intelligence', sessions: '28', change: 'up' },
      { rank: 2, topic: 'Climate change', sessions: '18', change: 'up' },
      { rank: 3, topic: 'Public health', sessions: '12', change: 'flat' },
      { rank: 4, topic: 'Business strategy', sessions: '9', change: 'flat' },
      { rank: 5, topic: 'Education policy', sessions: '8', change: 'down' }
    ]
  }
};

let activeField = null;
let appliedFields = [];

function updatePlaygroundCount() {
  playgroundCount.textContent = String(appliedFields.length);
}

function renderTable(fieldId) {
  const definition = viewDefinitions[fieldId];
  if (!definition) {
    table.setAttribute('hidden', '');
    emptyState.hidden = false;
    emptyState.style.display = 'grid';
    dropzone.setAttribute('aria-label', 'Drop fields here to build the table');
    dropzone.dataset.activeView = '';
    activeView.setAttribute('hidden', '');
    updatePlaygroundCount();
    return;
  }

  dropzone.setAttribute('aria-label', `${definition.label} view. Drop a different field to swap.`);
  dropzone.dataset.activeView = definition.label;
  activeView.removeAttribute('hidden');
  emptyState.hidden = true;
  emptyState.style.display = 'none';
  table.removeAttribute('hidden');

  tableHeader.innerHTML = '';
  definition.columns.forEach((column) => {
    const th = document.createElement('th');
    th.textContent = column.label;
    if (column.align) {
      th.style.textAlign = column.align;
    }
    tableHeader.appendChild(th);
  });

  tableBody.innerHTML = '';
  definition.rows.forEach((row) => {
    const tr = document.createElement('tr');
    definition.columns.forEach((column) => {
      const td = document.createElement('td');
      if (column.align) {
        td.style.textAlign = column.align;
      }

      switch (column.key) {
        case 'country':
          td.appendChild(renderCountry(row[column.key]));
          break;
        case 'trend':
          td.appendChild(renderTrend(row[column.key]));
          break;
        case 'change':
          td.appendChild(renderChange(row[column.key]));
          break;
        default:
          td.textContent = typeof row[column.key] === 'undefined' ? '—' : row[column.key];
      }

      tr.appendChild(td);
    });
    tableBody.appendChild(tr);
  });

  updatePlaygroundCount();
}

function renderAppliedFields() {
  if (!appliedFieldsList) return;

  appliedFieldsList.innerHTML = '';

  if (appliedFields.length === 0) {
    emptyState.hidden = false;
    emptyState.style.display = 'grid';
    if (activeView) {
      activeView.setAttribute('hidden', '');
    }
    return;
  }

  emptyState.hidden = true;
  emptyState.style.display = 'none';
  if (activeView) {
    activeView.removeAttribute('hidden');
  }

  appliedFields.forEach((fieldId, index) => {
    const definition = viewDefinitions[fieldId];
    if (!definition) return;

    const chip = document.createElement('span');
    chip.className = 'active-chip';
    chip.dataset.field = fieldId;
    chip.setAttribute('role', 'listitem');
    chip.tabIndex = 0;
    chip.setAttribute('aria-label', `Activate ${definition.label} view`);

    if (fieldId === activeField && index === appliedFields.length - 1) {
      chip.dataset.active = 'true';
    }

    const label = document.createElement('span');
    label.textContent = definition.label;

    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'remove';
    remove.dataset.field = fieldId;
    remove.setAttribute('aria-label', `Remove ${definition.label}`);
    remove.textContent = '×';

    chip.append(label, remove);
    appliedFieldsList.appendChild(chip);
  });
}

function renderCountry(country) {
  const wrapper = document.createElement('span');
  wrapper.className = 'flag';

  const circle = document.createElement('span');
  circle.className = 'flag-circle';

  if (country && country.flag) {
    const img = document.createElement('img');
    img.src = country.flag;
    img.alt = `${country.name} flag`;
    img.loading = 'lazy';
    circle.appendChild(img);
  } else if (country && country.tone) {
    circle.style.background = `linear-gradient(135deg, ${country.tone[0]}, ${country.tone[1]})`;
  }

  const name = document.createElement('span');
  name.textContent = country?.name ?? country ?? '—';

  wrapper.append(circle, name);
  return wrapper;
}

function renderTrend(state) {
  const wrapper = document.createElement('span');
  wrapper.className = 'trend';

  const line = document.createElement('span');
  line.className = 'trend-line';

  const indicator = document.createElement('span');
  indicator.className = 'trend-indicator';

  switch (state) {
    case 'up':
      indicator.textContent = '↑';
      indicator.classList.add('up');
      break;
    case 'down':
      indicator.textContent = '↓';
      indicator.classList.add('down');
      line.style.background = 'linear-gradient(120deg, rgba(239, 68, 68, 0.8), rgba(220, 38, 38, 0.7))';
      break;
    case 'stable':
      indicator.textContent = '↗';
      indicator.classList.add('up');
      line.style.background = 'linear-gradient(120deg, rgba(14, 165, 233, 0.8), rgba(30, 64, 175, 0.7))';
      break;
    default:
      indicator.textContent = '→';
      indicator.style.color = '#6b7280';
      line.style.background = 'linear-gradient(120deg, rgba(107, 114, 128, 0.8), rgba(55, 65, 81, 0.7))';
  }

  wrapper.append(line, indicator);
  return wrapper;
}

function renderChange(change) {
  const indicator = document.createElement('span');
  indicator.className = 'trend-indicator';
  switch (change) {
    case 'up':
      indicator.textContent = '▲';
      indicator.classList.add('up');
      break;
    case 'down':
      indicator.textContent = '▼';
      indicator.classList.add('down');
      break;
    default:
      indicator.textContent = '—';
      indicator.style.color = '#6b7280';
  }
  return indicator;
}

function handleDragStart(event) {
  const field = event.target.dataset.field;
  if (!field) return;
  event.dataTransfer.setData('text/plain', field);
  event.dataTransfer.setData('text', field);
  event.dataTransfer.effectAllowed = 'copy';
  event.target.classList.add('dragging');
  dropzone.classList.add('is-active');
  showTooltip(event, `Build a ${viewDefinitions[field]?.label || 'custom'} view`);
}

function handleDragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'copy';
}

function handleDrop(event) {
  event.preventDefault();
  const field =
    event.dataTransfer.getData('text/plain') || event.dataTransfer.getData('text');
  if (!field) return;

  setActiveField(field);
  hideTooltip();
  dropzone.classList.remove('is-active');
}

function handleDragEnd(event) {
  event.target.classList.remove('dragging');
  dropzone.classList.remove('is-active');
  hideTooltip();
}

function handleDropzoneKeydown(event) {
  const focusChip = document.querySelector('.chip:focus-visible');
  if (!focusChip) return;
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    setActiveField(focusChip.dataset.field);
  }
}

function clearView() {
  activeField = null;
  appliedFields = [];
  renderAppliedFields();
  renderTable(null);
  dropzone.focus();
}

function setActiveField(fieldId) {
  if (!viewDefinitions[fieldId]) return;

  const existingIndex = appliedFields.indexOf(fieldId);
  if (existingIndex !== -1) {
    appliedFields.splice(existingIndex, 1);
  }

  appliedFields.push(fieldId);
  activeField = fieldId;
  renderAppliedFields();
  renderTable(fieldId);
}

function showTooltip(event, text) {
  if (!tooltip) return;
  tooltip.textContent = text;
  tooltip.hidden = false;
  moveTooltip(event);
}

function moveTooltip(event) {
  if (tooltip.hidden) return;
  const x = event.clientX + 16;
  const y = event.clientY + 16;
  tooltip.style.transform = `translate(${x}px, ${y}px)`;
}

function hideTooltip() {
  if (!tooltip) return;
  tooltip.hidden = true;
}

chipBin.addEventListener('mousemove', moveTooltip);
chipBin.addEventListener('mouseleave', hideTooltip);

dropzone.addEventListener('dragover', handleDragOver);
dropzone.addEventListener('drop', handleDrop, true);
dropzone.addEventListener('keydown', handleDropzoneKeydown);
dropzone.addEventListener('dragenter', () => dropzone.classList.add('is-active'), true);
dropzone.addEventListener(
  'dragleave',
  (event) => {
    if (!dropzone.contains(event.relatedTarget)) {
      dropzone.classList.remove('is-active');
    }
  },
  true
);

[emptyState, table].forEach((target) => {
  target.addEventListener('dragover', handleDragOver);
  target.addEventListener('drop', handleDrop);
});

if (activeView) {
  activeView.addEventListener('dragover', handleDragOver);
  activeView.addEventListener('drop', handleDrop);
}

clearButton.addEventListener('click', clearView);

// Provide click-to-apply behaviour for quicker prototyping.
chipBin.querySelectorAll('.chip').forEach((chip) => {
  chip.addEventListener('dragstart', handleDragStart);
  chip.addEventListener('dragend', handleDragEnd);
  chip.addEventListener('click', () => {
    setActiveField(chip.dataset.field);
  });
  chip.addEventListener('focus', (event) => {
    showTooltip(event, `Press Enter to load ${chip.textContent.trim()}`);
  });
  chip.addEventListener('blur', hideTooltip);
});

if (appliedFieldsList) {
  appliedFieldsList.addEventListener('click', (event) => {
    const removeButton = event.target.closest('.remove');
    if (removeButton) {
      const { field } = removeButton.dataset;
      const index = appliedFields.indexOf(field);
      if (index !== -1) {
        appliedFields.splice(index, 1);
        activeField = appliedFields[appliedFields.length - 1] ?? null;
        renderAppliedFields();
        renderTable(activeField);
      }
      return;
    }

    const chip = event.target.closest('.active-chip');
    if (chip) {
      const { field } = chip.dataset;
      if (field) {
        setActiveField(field);
      }
    }
  });

  appliedFieldsList.addEventListener('keydown', (event) => {
    if (event.target.classList.contains('active-chip') && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      const { field } = event.target.dataset;
      if (field) {
        setActiveField(field);
      }
    }
  });
}

renderTable(null);
updatePlaygroundCount();
renderAppliedFields();

