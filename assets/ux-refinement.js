/* Tranquilitas Intelligence · progressive navigation & command palette.
   No reporting data, persisted customer records, or business calculations touched. */
(() => {
  'use strict';
  const sidebar = document.querySelector('.sidebar');
  const nav = sidebar?.querySelector('.side-nav');
  if (!sidebar || !nav) return;

  document.body.classList.add('ux-refined');
  const sourceLinks = [...nav.querySelectorAll('a.nav-link[href]')];
  if (!sourceLinks.length) return;

  const category = (link) => {
    const href = (link.getAttribute('href') || '').toLowerCase();
    const label = link.textContent.toLowerCase();
    if (/caribbean|markets|partner|therapist|poc/.test(href + ' ' + label)) return 'Markets & partners';
    if (/portfolio|channels|acquisition|digital|seo/.test(href + ' ' + label)) return 'Digital intelligence';
    if (/methodology|source register|data quality/.test(href + ' ' + label)) return 'Sources & methods';
    return 'Reporting';
  };
  const categories = ['Reporting','Markets & partners','Digital intelligence','Sources & methods'];
  const linkMeta = sourceLinks.map(link => {
    const labelNode = link.cloneNode(true);
    labelNode.querySelectorAll('.nav-icon,.ux-nav-symbol').forEach(el => el.remove());
    return {link, name:labelNode.textContent.trim().replace(/\\s+/g,' '), group:category(link)};
  });

  nav.replaceChildren();
  nav.classList.add('ux-nav-ready');
  for (const groupName of categories) {
    const rows = linkMeta.filter(meta => meta.group === groupName);
    if (!rows.length) continue;
    const details = document.createElement('details');
    details.className = 'ux-nav-group';
    const summary = document.createElement('summary');
    summary.textContent = groupName;
    const items = document.createElement('div');
    items.className = 'ux-nav-items';
    for (const row of rows) {
      if (!row.link.querySelector('.nav-icon')) {
        const symbol = document.createElement('span');
        symbol.className = 'ux-nav-symbol';
        symbol.textContent = groupName === 'Reporting' ? '▤' : groupName === 'Markets & partners' ? '◎' : groupName === 'Digital intelligence' ? '◈' : '≡';
        symbol.setAttribute('aria-hidden','true');
        row.link.prepend(symbol);
      } else {
        row.link.querySelectorAll('.nav-icon').forEach(el => el.setAttribute('aria-hidden','true'));
      }
      items.append(row.link);
    }
    details.append(summary,items);
    details.open = rows.some(row => row.link.classList.contains('active'));
    nav.append(details);
  }
  if (!nav.querySelector('details[open]')) {
    const first = nav.querySelector('details');
    if (first) first.open = true;
  }

  const mobileToggle = document.createElement('button');
  mobileToggle.type = 'button';
  mobileToggle.className = 'ux-mobile-nav-toggle';
  mobileToggle.textContent = '☰  Explore reports';
  mobileToggle.setAttribute('aria-expanded','false');
  nav.id = nav.id || 'reports-primary-navigation';
  mobileToggle.setAttribute('aria-controls',nav.id);
  sidebar.querySelector('.brand')?.after(mobileToggle);
  mobileToggle.addEventListener('click',() => {
    const active = sidebar.classList.toggle('ux-mobile-nav-open');
    mobileToggle.setAttribute('aria-expanded',String(active));
    mobileToggle.textContent = active ? '✕  Close navigation' : '☰  Explore reports';
  });

  const topActions = document.querySelector('.top-actions') || document.querySelector('.topbar');
  if (!topActions || !('showModal' in HTMLDialogElement.prototype)) return;
  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'ux-search-trigger';
  trigger.setAttribute('aria-label','Search report pages and quick actions');
  const onMac = /Mac|iPhone|iPad/.test(navigator.platform || '');
  const shortcut = onMac ? '⌘ K' : 'Ctrl K';
  trigger.innerHTML = '<span aria-hidden="true">⌕</span><span>Search reports</span><kbd aria-hidden="true"></kbd>';
  trigger.querySelector('kbd').textContent = shortcut;
  topActions.prepend(trigger);

  const dialog = document.createElement('dialog');
  dialog.className = 'ux-command-dialog';
  dialog.setAttribute('aria-label','Search report pages and actions');
  dialog.innerHTML = '<div class="ux-command-shell"><label class="ux-command-label" for="ux-command-query">Find a report or action</label><input id="ux-command-query" class="ux-command-search" type="search" placeholder="Search pages and actions…" autocomplete="off"><div class="ux-command-results" role="list"></div><div class="ux-command-foot"><span>Use ↑ ↓ and Enter to select</span><span>Esc to close</span></div></div>';
  document.body.append(dialog);
  const input = dialog.querySelector('.ux-command-search');
  const results = dialog.querySelector('.ux-command-results');

  const commands = linkMeta.map(meta => ({
    name:meta.name,
    group:meta.group,
    action:() => { window.location.href = meta.link.href; }
  }));
  const addAction = (selector,name) => {
    const el = document.querySelector(selector);
    if (el && !el.disabled) commands.unshift({name,group:'Action',action:() => el.click()});
  };
  addAction('#printButton','Print report');
  addAction('#siteExport','Export website CSV');

  let visible = [], focused = 0;
  function render() {
    const q = input.value.trim().toLocaleLowerCase();
    visible = commands.filter(command => (command.name + ' ' + command.group).toLocaleLowerCase().includes(q)).slice(0,25);
    focused = 0;
    results.replaceChildren();
    if (!visible.length) {
      const empty = document.createElement('p');
      empty.className = 'ux-command-empty';
      empty.textContent = 'No matching reports or actions.';
      results.append(empty);
      return;
    }
    visible.forEach((command,index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'ux-command-item';
      button.setAttribute('role','listitem');
      const title = document.createElement('span');
      title.textContent = command.name;
      const group = document.createElement('small');
      group.textContent = command.group;
      button.append(title,group);
      button.addEventListener('click',() => execute(index));
      results.append(button);
    });
  }
  function execute(index) {
    const item = visible[index];
    if (!item) return;
    dialog.close();
    item.action();
  }
  function open() {
    if (dialog.open) return;
    input.value = '';
    render();
    dialog.showModal();
    input.focus();
  }
  trigger.addEventListener('click',open);
  document.addEventListener('keydown',event => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      if (dialog.open) dialog.close();
      else open();
    }
  });
  input.addEventListener('input',render);
  input.addEventListener('keydown',event => {
    const buttons = [...results.querySelectorAll('button')];
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      focused = Math.min(focused+1,buttons.length-1);
      buttons[focused]?.focus();
    } else if (event.key === 'Enter') {
      event.preventDefault();
      execute(0);
    }
  });
  results.addEventListener('keydown',event => {
    const buttons = [...results.querySelectorAll('button')];
    const at = buttons.indexOf(document.activeElement);
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const delta = event.key === 'ArrowDown' ? 1 : -1;
      buttons[Math.min(buttons.length-1,Math.max(0,at+delta))]?.focus();
    } else if (event.key === 'Enter' && at >= 0) {
      event.preventDefault();
      execute(at);
    }
  });
})();