const dropzone = document.querySelector('#dropzone');
const table = document.querySelector('#results-table');
const tableHeader = document.querySelector('#table-header');
const tableBody = document.querySelector('#table-body');
const emptyState = document.querySelector('#empty-state');
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
      {
        rank: 1,
        organization: 'University of Toronto',
        country: { name: 'Canada', flag: 'https://flagcdn.com/w40/ca.png' },
        sessions: 175,
        trend: { direction: 'stable', series: [24, 23, 25, 24, 24, 23, 24, 23, 24, 24] }
      },
      {
        rank: 2,
        organization: 'Washington State University',
        country: { name: 'United States', flag: 'https://flagcdn.com/w40/us.png' },
        sessions: 175,
        trend: { direction: 'up', series: [18, 19, 19, 20, 21, 22, 23, 24, 25, 26] }
      },
      {
        rank: 3,
        organization: 'University of Kansas',
        country: { name: 'United States', flag: 'https://flagcdn.com/w40/us.png' },
        sessions: 175,
        trend: { direction: 'flat', series: [21, 21, 21, 21, 22, 22, 21, 21, 21, 21] }
      },
      {
        rank: 4,
        organization: 'University of Calgary',
        country: { name: 'Canada', flag: 'https://flagcdn.com/w40/ca.png' },
        sessions: 175,
        trend: { direction: 'down', series: [26, 25, 24, 23, 22, 21, 21, 20, 19, 18] }
      },
      {
        rank: 5,
        organization: 'University of Toronto',
        country: { name: 'Canada', flag: 'https://flagcdn.com/w40/ca.png' },
        sessions: 175,
        trend: { direction: 'up', series: [17, 18, 19, 19, 20, 21, 22, 23, 24, 24] }
      },
      {
        rank: 6,
        organization: 'Washington State University',
        country: { name: 'United States', flag: 'https://flagcdn.com/w40/us.png' },
        sessions: 175,
        trend: { direction: 'flat', series: [20, 20, 19, 20, 19, 20, 20, 19, 20, 19] }
      },
      {
        rank: 7,
        organization: 'University of Kansas',
        country: { name: 'United States', flag: 'https://flagcdn.com/w40/us.png' },
        sessions: 175,
        trend: { direction: 'up', series: [16, 17, 18, 19, 19, 20, 21, 21, 22, 22] }
      },
      {
        rank: 8,
        organization: 'University of Calgary',
        country: { name: 'Canada', flag: 'https://flagcdn.com/w40/ca.png' },
        sessions: 175,
        trend: { direction: 'down', series: [23, 24, 23, 22, 21, 20, 19, 19, 18, 17] }
      }
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

function buildSparkline(series, { width = 92, height = 36, stroke = '#6366f1', fill = 'rgba(99, 102, 241, 0.18)' } = {}) {
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('class', 'sparkline');
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  svg.setAttribute('aria-hidden', 'true');

  const min = Math.min(...series);
  const max = Math.max(...series);
  const range = max - min || 1;
  const step = series.length > 1 ? width / (series.length - 1) : width;
  const verticalPadding = 6;

  const points = series.map((value, index) => {
    const x = index * step;
    const normalized = (value - min) / range;
    const y = height - verticalPadding - normalized * (height - verticalPadding * 2);
    return { x, y };
  });

  const areaPath = [`M 0 ${height}`, `L ${points[0].x} ${points[0].y}`];
  const linePath = [`M ${points[0].x} ${points[0].y}`];

  for (let i = 1; i < points.length; i += 1) {
    areaPath.push(`L ${points[i].x} ${points[i].y}`);
    linePath.push(`L ${points[i].x} ${points[i].y}`);
  }

  const lastPoint = points[points.length - 1];
  areaPath.push(`L ${lastPoint.x} ${height}`, 'Z');

  const area = document.createElementNS(svgNS, 'path');
  area.setAttribute('class', 'sparkline-area');
  area.setAttribute('d', areaPath.join(' '));
  area.setAttribute('fill', fill);

  const line = document.createElementNS(svgNS, 'path');
  line.setAttribute('class', 'sparkline-line');
  line.setAttribute('d', linePath.join(' '));
  line.setAttribute('stroke', stroke);
  line.setAttribute('fill', 'none');

  const marker = document.createElementNS(svgNS, 'circle');
  marker.setAttribute('class', 'sparkline-marker');
  marker.setAttribute('cx', lastPoint.x);
  marker.setAttribute('cy', lastPoint.y);
  marker.setAttribute('r', 3);
  marker.setAttribute('fill', stroke);
  marker.setAttribute('stroke', '#ffffff');
  marker.setAttribute('stroke-width', 1.5);

  svg.append(area, line, marker);
  return svg;
}

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

  const name = document.createElement('span');
  name.textContent = country?.name ?? country ?? '—';

  if (country && typeof country === 'object') {
    if (country.flag) {
      const img = document.createElement('img');
      img.src = country.flag;
      img.alt = `${country.name} flag`;
      img.loading = 'lazy';
      circle.appendChild(img);
    } else if (country.tone) {
      circle.style.background = `linear-gradient(135deg, ${country.tone[0]}, ${country.tone[1]})`;
    }
  }

  wrapper.append(circle, name);
  return wrapper;
}

function renderTrend(trend) {
  const wrapper = document.createElement('span');
  wrapper.className = 'trend';

  if (!trend) {
    wrapper.textContent = '—';
    return wrapper;
  }

  const direction = trend.direction || 'flat';
  const series = Array.isArray(trend.series) && trend.series.length ? trend.series : [0, 0];

  const colors = {
    up: '#16a34a',
    down: '#dc2626',
    stable: '#0ea5e9',
    flat: '#6366f1'
  };

  const areaColors = {
    up: 'rgba(22, 163, 74, 0.18)',
    down: 'rgba(220, 38, 38, 0.18)',
    stable: 'rgba(14, 165, 233, 0.18)',
    flat: 'rgba(99, 102, 241, 0.18)'
  };

  const svg = buildSparkline(series, {
    width: 92,
    height: 36,
    stroke: colors[direction] || colors.flat,
    fill: areaColors[direction] || areaColors.flat
  });

  const indicator = document.createElement('span');
  indicator.className = 'trend-indicator';

  switch (direction) {
    case 'up':
      indicator.textContent = '↑';
      indicator.classList.add('up');
      break;
    case 'down':
      indicator.textContent = '↓';
      indicator.classList.add('down');
      break;
    case 'stable':
      indicator.textContent = '↗';
      indicator.classList.add('up');
      break;
    default:
      indicator.textContent = '→';
      indicator.classList.add('flat');
  }

  wrapper.append(svg, indicator);
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

